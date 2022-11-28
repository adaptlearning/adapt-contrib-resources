import Adapt from 'core/js/adapt';
import a11y from 'core/js/a11y';
import React from 'react';
import ReactDOM from 'react-dom';
import { templates } from 'core/js/reactHelpers';

export default class ResourcesView extends Backbone.View {

  className() {
    return 'resources';
  }

  initialize() {
    this.listenTo(Adapt, 'remove', this.remove);
    this.render();
  }

  events() {
    return {
      'click .js-resources-filter-btn-click': 'onFilterClicked'
    };
  }

  render() {
    const data = {
      model: this.model.toJSON(),
      view: this,
      resources: this.model.get('_resources')
    };
    ReactDOM.render(<templates.resources {...data} />, this.el);

    _.defer(() => {
      this.listenTo(Adapt, 'drawer:closed', this.remove);
    });

    return this;
  }

  onFilterClicked(e) {
    if (e && e.preventDefault) e.preventDefault();

    const $resources = this.$('#resources');
    const $clickedButton = this.$(e.currentTarget);
    const clickedTabId = $clickedButton.attr('id');

    this.$('.js-resources-filter-btn-click').removeClass('is-selected').attr('aria-selected', false);

    $resources.attr('aria-labelledby', clickedTabId);
    $clickedButton.attr('aria-selected', true);

    let items;
    const filter = $clickedButton.addClass('is-selected').attr('data-filter');
    if (filter === 'all') {
      items = this.$('.js-resources-item').removeClass('u-display-none');
    } else {
      this.$('.js-resources-item')
        .removeClass('u-display-none').not('.is-' + filter)
        .addClass('u-display-none');
      items = this.$('.js-resources-item.is-' + filter);
    }

    if (items.length < 0) return;
    a11y.focusFirst($(items[0]));
  }

  resourcesHasType(resources, type) {
    const hasType = resources.some(_.matcher({ _type: type }));
    return hasType;
  }

  resourcesHasMultipleTypes(resources) {
    if (resources.length === 1) return false;

    const allSameType = resources.every(_.matcher({ _type: resources[0]._type }));
    return !allSameType;
  }

  resourcesGetColumnCount(resources) {
    return _.uniq(_.pluck(resources, '_type')).length + 1;// add 1 for the 'All' button column
  }

}
