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
	        this.$el.html(template({model: modelData, resources:collectionData}));
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
				this.$('.resources-item').removeClass('display-none');
				return;
			}
			this.$('.resources-item').removeClass('display-none').not("." + filter).addClass('display-none');
		}

	});

	return ResourcesView;
})
	