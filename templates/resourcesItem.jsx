import React from 'react';
import device from 'core/js/device';
import { classes } from 'core/js/reactHelpers';

export default function ResourcesItem (props) {
  const {
    _forceDownload,
    _isGlobal,
    _link,
    _type,
    description,
    filename,
    selectedFilter,
    title
  } = props;

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

  return (
    <div className={classes([
      'resources__item drawer__item',
      `is-${_type}`,
      _isGlobal && 'is-global',
      (!['all', _type].includes(selectedFilter)) && 'u-display-none'
    ])}
    role="listitem">

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
  );
}
