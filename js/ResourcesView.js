import Adapt from 'core/js/adapt';
import a11y from 'core/js/a11y';

export default class ResourcesView extends Backbone.View {

  className() {
    return 'resources';
  }

  initialize() {
    this.listenTo(Adapt, 'remove', this.remove);
    this.render();
    this.addEventListeners();
  }

  remove() {
    this.removeEventListeners();
    super.remove();
  }

  events() {
    return {
      'click .js-resources-filter-btn-click': 'onFilterClicked'
    };
  }

  addEventListeners() {
    this.removeEventListeners();
    $(window).on('keyup', this.onKeyUp);
  }

  removeEventListeners() {
    $(window).off('keyup', this.onKeyUp);
  }

  onKeyUp(event) {
    if (event.which === 9) return; // tab key
    if (!$(document.activeElement).is('.js-resources-filter-btn-click')) return;

    const prevAll = $(document.activeElement).prevAll('.js-resources-filter-btn-click');
    const nextAll = $(document.activeElement).nextAll('.js-resources-filter-btn-click');

    if (this.$('[role="tablist"]').attr('aria-orientation') === 'vertical') {
      switch (event.which) {
        case 38: // ↑ up
          event.preventDefault();
          a11y.focus(prevAll.length > 0 ? prevAll.first() : nextAll.last());
          break;
        case 40: // ↓ down
          event.preventDefault();
          a11y.focus(nextAll.length > 0 ? nextAll.first() : prevAll.last());
          break;
      }
    } else {
      switch (event.which) {
        case 37: // ← left
          event.preventDefault();
          a11y.focus(prevAll.length > 0 ? prevAll.first() : nextAll.last());
          break;
        case 39: // → right
          event.preventDefault();
          a11y.focus(nextAll.length > 0 ? nextAll.first() : prevAll.last());
          break;
      }
    }
  }

  render() {
    this.$el.html(Handlebars.templates.resources({
      model: this.model.toJSON(),
      resources: this.collection.toJSON()
    }));

    _.defer(() => {
      this.listenTo(Adapt, 'drawer:triggerCustomView', this.remove);
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
}
