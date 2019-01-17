define([
  'core/js/adapt'
], function(Adapt) {

  var ResourcesView = Backbone.View.extend({

    className: "resources",

    initialize: function() {
      this.listenTo(Adapt, 'remove', this.remove);
      this.render();
    },

    events: {
      'click .js-resources-filter-btn-click': 'onFilterClicked',
      'click .js-resources-item-btn-click': 'onResourceClicked'
    },

    render: function() {
      var collectionData = this.collection.toJSON();
      var modelData = this.model.toJSON();
      var template = Handlebars.templates["resources"];
      this.$el.html(template({model: modelData, resources:collectionData, _globals: Adapt.course.get('_globals')}));
      _.defer(_.bind(this.postRender, this));
      return this;
    },

    postRender: function() {
      this.listenTo(Adapt, 'drawer:triggerCustomView', this.remove);
    },

    onFilterClicked: function(event) {
      event.preventDefault();
      var $currentTarget = $(event.currentTarget);
      this.$('.js-resources-filter-btn-click').removeClass('is-selected');
      var filter = $currentTarget.addClass('is-selected').attr('data-filter');
      var items = [];

      if (filter === 'all') {
        items = this.$('.js-resources-item').removeClass('u-display-none');
      } else {
        this.$('.js-resources-item').removeClass('u-display-none').not("." + filter).addClass('u-display-none');
        items = this.$('.js-resources-item.' + filter);
      }

      if (items.length === 0) return;
      $(items[0]).a11y_focus();
    },

    onResourceClicked: function(event) {
      var data = $(event.currentTarget).data();

      if (!data.forceDownload || Adapt.device.OS === 'ios') {
        window.top.open(data.href);
        return;
      }

      var dummyLink = document.createElement('a');
      // Internet Explorer has no support for the 'download' attribute
      if (Adapt.device.browser === "internet explorer") {
        dummyLink.target = "_blank";
      } else {
        dummyLink.download = data.filename;
      }
      dummyLink.href = data.href;

      document.body.appendChild(dummyLink);
      dummyLink.click();
      document.body.removeChild(dummyLink);
      delete dummyLink;
    }

  });

  return ResourcesView;

});
