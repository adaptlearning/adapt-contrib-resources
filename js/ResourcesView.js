import Adapt from 'core/js/adapt';

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
    
    this.$('.js-resources-filter-btn-click').removeClass('is-selected');
    
    let items;
    const filter = $(e.currentTarget).addClass('is-selected').attr('data-filter');
    if (filter === 'all') {
      items = this.$('.js-resources-item').removeClass('u-display-none');
    } else {
      this.$('.js-resources-item')
        .removeClass('u-display-none').not('.is-' + filter)
        .addClass('u-display-none');
      items = this.$('.js-resources-item.is-' + filter);
    }

    if (items.length < 0) return;
    Adapt.a11y.focusFirst($(items[0]));
  }
}
