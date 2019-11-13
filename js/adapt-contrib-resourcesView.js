define([
  'core/js/adapt'
], function(Adapt) {

  var ResourcesView = Backbone.View.extend({

    className: 'resources',

    initialize: function() {
      this.listenTo(Adapt, 'remove', this.remove);
      this.render();
    },

    events: {
      'click .js-resources-filter-btn-click': 'onFilterClicked',
    },

    render: function() {
      this.$el.html(Handlebars.templates.resources({
        model: this.model.toJSON(),
        resources: this.collection.toJSON()
      }));
      
      _.defer(function() {
        this.listenTo(Adapt, 'drawer:triggerCustomView', this.remove);
      }.bind(this));

      return this;
    },

    onFilterClicked: function(e) {
      if (e && e.preventDefault) e.preventDefault();
      
      this.$('.js-resources-filter-btn-click').removeClass('is-selected');
      
      var items;
      var filter = $(e.currentTarget).addClass('is-selected').attr('data-filter');
      if (filter === 'all') {
        items = this.$('.js-resources-item').removeClass('u-display-none');
      } else {
        this.$('.js-resources-item').removeClass('u-display-none').not('.is-' + filter).addClass('u-display-none');
        items = this.$('.js-resources-item.is-' + filter);
      }

      if (items.length > 0) $(items[0]).a11y_focus();
    }
  });

  return ResourcesView;
});
