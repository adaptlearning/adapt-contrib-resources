define(function(require) {

    var Backbone = require('backbone');
    var Adapt = require('coreJS/adapt');

    var ResourcesView = Backbone.View.extend({

        className: "resources",

        initialize: function() {
            this.listenTo(Adapt, 'remove', this.remove);
            this.render();
        },

        events: {
            'click .resources-filter a': 'onFilterClicked'
        },

        render: function() {
            var collectionData = this.collection.toJSON();
            var modelData = this.model.toJSON();
            var template = Handlebars.templates["resources"];
            this.$el.html(template({model: modelData, resources:collectionData, _globals: Adapt.course.get('_globals')}));
            return this;
        },

        postRender: function() {
            this.listenTo(Adapt, 'drawer:triggerCustomView', this.remove);
        },

        onFilterClicked: function(event) {
            event.preventDefault();
            var $currentTarget = $(event.currentTarget);
            if ($currentTarget.hasClass('selected')) {
                return;
            }
            this.$('.resources-filter a').removeClass('selected');
            var filter = $currentTarget.addClass('selected').attr('data-filter');
            
            if (filter === 'all') {
                var items = this.$('.resources-item').removeClass('display-none');
                if (items.length === 0) return;
                $(items[0]).a11y_focus();
                return;
            }
            this.$('.resources-item').removeClass('display-none').not("." + filter).addClass('display-none');
            var items = this.$('.resources-item.' + filter);
            if (items.length === 0) return;
            $(items[0]).a11y_focus();
        }

    });

    return ResourcesView;
})
    