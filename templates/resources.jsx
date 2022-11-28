import React from 'react';
import Adapt from 'core/js/adapt';
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

          <button id="resources__show-all" className="resources__filter-btn resources__show-all is-selected js-resources-filter-btn-click" data-filter="all" aria-label={model._filterAria.allAria} role="tab" aria-selected="true" aria-controls="resources" dangerouslySetInnerHTML={{ __html: model._filterButtons.all }} />

          {resourcesHasType(resources, 'document') &&
          <button id="resources__document" className="resources__filter-btn resources__show-document js-resources-filter-btn-click" data-filter="document" aria-label={model._filterAria.documentAria} role="tab" aria-selected="false" aria-controls="resources" dangerouslySetInnerHTML={{ __html: model._filterButtons.document }} />
          }

          {resourcesHasType(resources, 'media') &&
          <button id="resources__media" className="resources__filter-btn resources__show-media js-resources-filter-btn-click" data-filter="media" aria-label={model._filterAria.mediaAria} role="tab" aria-selected="false" aria-controls="resources" dangerouslySetInnerHTML={{ __html: model._filterButtons.media }} />
          }

          {resourcesHasType(resources, 'link') &&
          <button id="resources__link" className="resources__filter-btn resources__show-link js-resources-filter-btn-click" data-filter="link" aria-label={model._filterAria.linkAria} role="tab" aria-selected="false" aria-controls="resources" dangerouslySetInnerHTML={{ __html: model._filterButtons.link }} />
          }

        </div>
      </div>
      }

      <div id="resources" className="resources__item-container" role="tabpanel" aria-labelledby="resources__show-all">

        <div role="list">

          {resources.map(({ title, description, _link, _type, _isGlobal, _forceDownload, filename }, index) =>
            <div className={classes([
              'resources__item drawer__item js-resources-item',
              `is-${_type}`,
              _isGlobal && 'is-global'
            ])}
            role="listitem"
            key={index}>

              <a href={_link} className="resources__item-btn drawer__item-btn js-resources-item-btn-click"
                data-type={_type}
                download={_forceDownload && filename }
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
