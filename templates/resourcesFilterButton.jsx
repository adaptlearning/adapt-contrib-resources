import React from 'react';
import { classes } from 'core/js/reactHelpers';

export default function ResourcesFilterButton (props) {
  const {
    model,
    onClick,
    selected,
    _filter
  } = props;

  const buttonText = model._filterButtons[_filter];
  const ariaLabel = model._filterAria[`${_filter}Aria`];

  return (
    <button
      id={`resources__show-${_filter}`}
      className={classes([
        'resources__filter-btn',
        selected === _filter && 'is-selected'
      ])}
      onClick={onClick}
      data-filter={_filter}
      aria-label={ariaLabel}
      role="tab"
      aria-selected={selected === _filter}
      aria-controls="resources"
      dangerouslySetInnerHTML={{ __html: buttonText }} />
  );
}
