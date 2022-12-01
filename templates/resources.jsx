import React, { useState } from 'react';
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

  const [selectedType, updateSelectedType] = useState('all');

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

  function onFilterClicked(e) {
    if (e && e.preventDefault) e.preventDefault();

    const $clickedButton = this.$(e.currentTarget);
    const type = $clickedButton.data('filter');

    updateSelectedType(type);

    // const clickedTabId = $clickedButton.attr('id');

    // this.$('.js-resources-filter-btn-click').removeClass('is-selected').attr('aria-selected', false);

    // $resources.attr('aria-labelledby', clickedTabId);
    // $clickedButton.attr('aria-selected', true);

    // let items;
    // const filter = $clickedButton.addClass('is-selected').attr('data-filter');
    // if (filter === 'all') {
    //   items = this.$('.js-resources-item').removeClass('u-display-none');
    // } else {
    //   this.$('.js-resources-item')
    //     .removeClass('u-display-none').not('.is-' + filter)
    //     .addClass('u-display-none');
    //   items = this.$('.js-resources-item.is-' + filter);
    // }

    // if (items.length < 0) return;
    // a11y.focusFirst($(items[0]));
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
              selectedType === 'all' && 'is-selected'
            ])}
            onClick={onFilterClicked}
            data-filter="all"
            aria-label={model._filterAria.allAria}
            role="tab"
            aria-selected="true"
            aria-controls="resources"
            dangerouslySetInnerHTML={{ __html: model._filterButtons.all }} />

          {resourcesHasType(resources, 'document') &&
          <button
            id="resources__document"
            className={classes([
              'resources__filter-btn',
              selectedType === 'document' && 'is-selected'
            ])}
            onClick={onFilterClicked}
            data-filter="document"
            aria-label={model._filterAria.documentAria}
            role="tab"
            aria-selected="false"
            aria-controls="resources"
            dangerouslySetInnerHTML={{ __html: model._filterButtons.document }} />
          }

          {resourcesHasType(resources, 'media') &&
          <button
            id="resources__media"
            className={classes([
              'resources__filter-btn',
              selectedType === 'media' && 'is-selected'
            ])}
            onClick={onFilterClicked}
            data-filter="media"
            aria-label={model._filterAria.mediaAria}
            role="tab"
            aria-selected="false"
            aria-controls="resources"
            dangerouslySetInnerHTML={{ __html: model._filterButtons.media }} />
          }

          {resourcesHasType(resources, 'link') &&
          <button
            id="resources__link"
            className={classes([
              'resources__filter-btn',
              selectedType === 'link' && 'is-selected'
            ])}
            onClick={onFilterClicked}
            data-filter="link"
            aria-label={model._filterAria.linkAria}
            role="tab"
            aria-selected="false"
            aria-controls="resources"
            dangerouslySetInnerHTML={{ __html: model._filterButtons.link }} />
          }

        </div>
      </div>
      }

      <div id="resources" className="resources__item-container" role="tabpanel" aria-labelledby="resources__show-all">

        <div role="list">

          {resources.map(({ title, description, _link, _type, _isGlobal, filename, _forceDownload }, index) =>
            <div className={classes([
              'resources__item drawer__item js-resources-item',
              `is-${_type}`,
              _isGlobal && 'is-global'
            ])}
            role="listitem"
            key={index}>

              <a href={_link} className="resources__item-btn drawer__item-btn js-resources-item-btn-click"
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
