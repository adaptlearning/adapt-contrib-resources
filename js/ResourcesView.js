import Adapt from 'core/js/adapt';
import a11y from 'core/js/a11y';

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
