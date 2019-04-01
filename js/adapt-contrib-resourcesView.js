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
            'click .resources-filter button': 'onFilterClicked'
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

            this.$('.resources-filter button').removeClass('selected');

            var items;
            var filter = $(e.currentTarget).addClass('selected').attr('data-filter');
            if (filter === 'all') {
                items = this.$('.resources-item').removeClass('display-none');
            } else {
                this.$('.resources-item').removeClass('display-none').not('.' + filter).addClass('display-none');
                items = this.$('.resources-item.' + filter);
            }

            if (items.length > 0) $(items[0]).a11y_focus();
        }
    });

    return ResourcesView;
});
