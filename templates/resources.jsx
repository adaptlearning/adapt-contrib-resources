import React, { useState, useEffect } from 'react';
import Adapt from 'core/js/adapt';
import a11y from 'core/js/a11y';
import device from 'core/js/device';
import { classes, templates } from 'core/js/reactHelpers';

export default function Resources (props) {
  const {
    model,
    resources
  } = props;

  const _globals = Adapt.course.get('_globals');

  function resourcesHasType(resources, type) {
    const hasType = resources.some(_.matcher({ _type: type }));
    return hasType;
  }

  function resourcesHasMultipleTypes(resources) {
    if (resources.length === 1) return false;

    const allSameType = resources.every(_.matcher({ _type: resources[0]._type }));
    return !allSameType;
  }

  function resourcesGetColumnCount(resources) {
    return _.uniq(_.pluck(resources, '_type')).length + 1;// add 1 for the 'All' button column
  }

  /**
   * IE doesn't support the 'download' attribute
   * https://github.com/adaptlearning/adapt_framework/issues/1559
   * and iOS just opens links with that attribute in the same window
   * https://github.com/adaptlearning/adapt_framework/issues/1852
   */
  function resourcesForceDownload(filename, _forceDownload) {
    if (device.browser === 'internet explorer' || device.OS === 'ios') {
      return false;
    }

    return (_forceDownload || filename);
  }

  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedId, setSelectedId] = useState('resources__show-all');
  const [focusFlag, setFocusFlag] = useState(false);

  useEffect(() => {
    if (focusFlag) {
      let $items;
      if (selectedFilter === 'all') {
        $items = $('.resources__item');
      } else {
        $items = $('.resources__item.is-' + selectedFilter);
      }

      if ($items.length < 0) return;

      a11y.focusFirst($items);

      setFocusFlag(false);
    }
  }, [focusFlag]);

  function onFilterClicked(e) {
    if (e && e.preventDefault) e.preventDefault();

    const $clickedButton = this.$(e.currentTarget);
    const filter = $clickedButton.data('filter');
    const id = $clickedButton.attr('id');

    setSelectedFilter(filter);
    setSelectedId(id);

    setFocusFlag(true);
  }

  return (
    <div className="component__inner resources__inner">

      <templates.header {...props} />

      {resourcesHasMultipleTypes(resources) &&
      <div className={classes([
        'resources__filter',
        `has-${resourcesGetColumnCount(resources)}-columns`
      ])}>
        <div className="resources__filter-inner" role="tablist">

          <div className="aria-label" aria-label={_globals._extensions._resources.resources} />

          <button
            id="resources__show-all"
            className={classes([
              'resources__filter-btn',
              selectedFilter === 'all' && 'is-selected'
            ])}
            onClick={onFilterClicked}
            data-filter="all"
            aria-label={model._filterAria.allAria}
            role="tab"
            aria-selected={selectedFilter === 'all'}
            aria-controls="resources"
            dangerouslySetInnerHTML={{ __html: model._filterButtons.all }} />

          {resourcesHasType(resources, 'document') &&
          <button
            id="resources__document"
            className={classes([
              'resources__filter-btn',
              selectedFilter === 'document' && 'is-selected'
            ])}
            onClick={onFilterClicked}
            data-filter="document"
            aria-label={model._filterAria.documentAria}
            role="tab"
            aria-selected={selectedFilter === 'document'}
            aria-controls="resources"
            dangerouslySetInnerHTML={{ __html: model._filterButtons.document }} />
          }

          {resourcesHasType(resources, 'media') &&
          <button
            id="resources__media"
            className={classes([
              'resources__filter-btn',
              selectedFilter === 'media' && 'is-selected'
            ])}
            onClick={onFilterClicked}
            data-filter="media"
            aria-label={model._filterAria.mediaAria}
            role="tab"
            aria-selected={selectedFilter === 'media'}
            aria-controls="resources"
            dangerouslySetInnerHTML={{ __html: model._filterButtons.media }} />
          }

          {resourcesHasType(resources, 'link') &&
          <button
            id="resources__link"
            className={classes([
              'resources__filter-btn',
              selectedFilter === 'link' && 'is-selected'
            ])}
            onClick={onFilterClicked}
            data-filter="link"
            aria-label={model._filterAria.linkAria}
            role="tab"
            aria-selected={selectedFilter === 'link'}
            aria-controls="resources"
            dangerouslySetInnerHTML={{ __html: model._filterButtons.link }} />
          }

        </div>
      </div>
      }

      <div id="resources" className="resources__item-container" role="tabpanel" aria-labelledby={selectedId}>

        <div role="list">

          {resources.map(({ title, description, _link, _type, _isGlobal, filename, _forceDownload }, index) =>
            <div className={classes([
              'resources__item drawer__item',
              `is-${_type}`,
              _isGlobal && 'is-global',
              (!['all', _type].includes(selectedFilter)) && 'u-display-none'
            ])}
            role="listitem"
            key={index}>

              <a href={_link} className="resources__item-btn drawer__item-btn"
                data-type={_type}
                download={resourcesForceDownload(filename, _forceDownload) && filename }
                target="_blank"
                rel="noreferrer"
                aria-label={title}>

                {title &&
                <div className="resources__item-title drawer__item-title">
                  <div className="resources__item-title-inner drawer__item-title-inner" dangerouslySetInnerHTML={{ __html: title }} />
                </div>
                }

                {description &&
                <div className="resources__item-body drawer__item-body">
                  <div className="resources__item-body-inner drawer__item-body-inner" dangerouslySetInnerHTML={{ __html: description }} />
                </div>
                }

              </a>

            </div>
          )};

        </div>

      </div>

    </div>

  );
}
