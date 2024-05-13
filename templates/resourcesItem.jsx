import React from 'react';
import { classes } from 'core/js/reactHelpers';

export default function ResourcesItem (props) {
  const {
    _forceDownload,
    _canDownload,
    _isGlobal,
    _link,
    _type,
    _index,
    description,
    filename,
    selectedFilter,
    title,
    onResourceItemClicked
  } = props;

  return (
    <div
      className={classes([
        'resources__item drawer__item',
        `is-${_type}`,
        _isGlobal && 'is-global',
        (!['all', _type].includes(selectedFilter)) && 'u-display-none'
      ])}
      role="listitem">

      <a href={_link} className="resources__item-btn drawer__item-btn"
        data-type={_type}
        data-index={_index}
        download={(_canDownload && _forceDownload) && filename }
        onClick={onResourceItemClicked}
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
  );
}
