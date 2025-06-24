import React, { useState, useEffect } from 'react';
import Adapt from 'core/js/adapt';
import a11y from 'core/js/a11y';
import { classes, compile, templates } from 'core/js/reactHelpers';

export default function Resources (props) {
  const {
    resources,
    resourceTypes,
    _showFilters,
    _filterColumnCount
  } = props;

  const _globals = Adapt.course.get('_globals');
  const _resources = Adapt.course.get('_resources');
  const _drawer = _resources._drawer;
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

  const onFilterClicked = e => {
    if (e && e.preventDefault) e.preventDefault();

    const $clickedButton = $(e.currentTarget);
    const filter = $clickedButton.data('filter');
    const id = $clickedButton.attr('id');

    setSelectedFilter(filter);
    setSelectedId(id);
    setFocusFlag(true);
  };

  return (
    <div className="resources__inner">

      <div
        className={classes([
          'drawer__header',
          'resources__header',
          !_drawer.displayTitle && 'aria-label'
        ])}
      >
        <div className='drawer__header-inner resources__header-inner'>

          <div
            id='drawer-heading'
            className='drawer__title resources__title'
            role='heading'
            aria-level={a11y.ariaLevel({ level: 'drawer' })}
          >
            <div
              className='drawer__title-inner resources__title-inner'
              dangerouslySetInnerHTML={{
                __html: compile(_drawer.displayTitle
                  ? _drawer.displayTitle
                  : _resources.title)
              }}
            />
          </div>

          <div className="aria-label">{_globals._extensions._resources.resources}</div>

          {(_drawer.displayTitle && _drawer.body) &&
          <div className='drawer__body resources__body'>
            <div
              className='drawer__body-inner resources__body-inner'
              dangerouslySetInnerHTML={{ __html: compile(_drawer.body) }}
            />
          </div>
          }

        </div>
      </div>

      {_showFilters &&
      <div
        className={classes([
          'resources__filter',
          `has-${_filterColumnCount}-columns`,
          (_filterColumnCount > 4) && 'has-extra-types'
        ])}
      >
        <div className="resources__filter-inner" role="tablist">

          {resourceTypes.map((type, index) =>
            <templates.resourcesFilterButton {...props}
              key={index}
              resources={resources}
              _filter={type}
              onClick={onFilterClicked}
              selected={selectedFilter} />
          )}

        </div>
      </div>
      }

      <div id="resources" className="resources__item-container" role="tabpanel" aria-labelledby={selectedId}>

        <div role="list">

          {resources.map(({ title, description, _link, _type, _isGlobal, filename, _forceDownload }, index) =>
            <templates.resourcesItem {...props}
              key={index}
              _index={index}
              title={title}
              description={description}
              _link={_link}
              _type={_type}
              _isGlobal={_isGlobal}
              selectedFilter={selectedFilter}
              filename={ filename}
              _forceDownload={_forceDownload} />
          )}

        </div>

      </div>

    </div>

  );
}
