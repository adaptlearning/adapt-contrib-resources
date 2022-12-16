import React, { useState, useEffect } from 'react';
import Adapt from 'core/js/adapt';
import a11y from 'core/js/a11y';
import { classes, templates } from 'core/js/reactHelpers';

export default function Resources (props) {
  const {
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

    const $clickedButton = this.$(e.currentTarget);
    const filter = $clickedButton.data('filter');
    const id = $clickedButton.attr('id');

    setSelectedFilter(filter);
    setSelectedId(id);
    setFocusFlag(true);
  };

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

          <templates.resourcesFilterButton {...props} _filter='all' onClick={onFilterClicked} selected={selectedFilter} />

          {resourcesHasType(resources, 'document') &&
          <templates.resourcesFilterButton {...props} _filter='document' onClick={onFilterClicked} selected={selectedFilter} />
          }

          {resourcesHasType(resources, 'media') &&
          <templates.resourcesFilterButton {...props} _filter='media' onClick={onFilterClicked} selected={selectedFilter} />
          }

          {resourcesHasType(resources, 'link') &&
          <templates.resourcesFilterButton {...props} _filter='link' onClick={onFilterClicked} selected={selectedFilter} />
          }

        </div>
      </div>
      }

      <div id="resources" className="resources__item-container" role="tabpanel" aria-labelledby={selectedId}>

        <div role="list">

          {resources.map(({ title, description, _link, _type, _isGlobal, filename, _forceDownload }, index) =>
            <templates.resourcesItem {...props}
              key={index}
              title={title}
              description={description}
              _link={_link}
              _type={_type}
              _isGlobal={_isGlobal}
              selectedFilter={selectedFilter}
              filename={ filename}
              _forceDownload={_forceDownload} />
          )};

        </div>

      </div>

    </div>

  );
}
