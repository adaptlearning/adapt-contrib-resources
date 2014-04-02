/*
* Page Level Progress
* License - http://github.com/adaptlearning/adapt_framework/LICENSE
* Maintainers - Daryl Hedley <darylhedley@hotmail.com>
*/

define(function(require) {

	var Adapt = require('coreJS/adapt');
	var Backbone = require('backbone');
	var Drawer = require('coreJS/drawer');

	var ResourcesView = Backbone.View.extend({

		className: "resources",

		initialize: function() {
			this.listenTo(Adapt, 'remove', this.remove);
			this.listenTo(Adapt, 'drawer:empty', this.remove);
			this.render();
		},

		events: {
			'click .resources-filter a': 'onFilterClicked'
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
		}

	});

	function setupResources(resourcesModel, resourcesItems) {

		var resourcesCollection = new Backbone.Collection(resourcesItems);
		var resourcesModel = new Backbone.Model(resourcesModel);

		Adapt.on('resources:showResources', function() {
			Adapt.drawer.triggerCustomView(new ResourcesView({
				model: resourcesModel, 
				collection: resourcesCollection
			}).$el);
		});
	
	}

	Adapt.once('app:dataReady', function() {

		var courseResources = Adapt.course.get('_resources');

		if (courseResources) {
			var drawerObject = {
		        title: courseResources.title,
		        description: courseResources.description,
		        className: 'resources-drawer'
		    };
		    // Syntax for adding a Drawer item
		    // Adapt.drawer.addItem([object], [callbackEvent]);
		    Adapt.drawer.addItem(drawerObject, 'resources:showResources');
		} else {
			console.log('Sorry, no resources object is set on the course.json file');
		}

		setupResources(courseResources, courseResources._resourcesItems);

	});

	Handlebars.registerHelper('if_collection_contains', function(collection, attribute, value, block) {
		var makeBlockVisible = false;

		_.each(collection, function(resource) {
			if (resource[attribute] === value) {
				makeBlockVisible = true;
			}
		});
		if(makeBlockVisible) {
            return block.fn(this);
        } else {
            return block.inverse();
        }
    });

    Handlebars.registerHelper('if_collection_contains_one_item', function(collection, attribute, block) {
		var attributeCount = [];

		_.each(collection, function(resource) {
			var resourceAttribute = resource[attribute];
			if (_.indexOf(attributeCount, resourceAttribute) === -1) {
				attributeCount.push(resourceAttribute);
			}
		});

		if (attributeCount.length <= 1) {
			return block.fn(this);
		} else {
			return block.inverse(this);
		}

    });

    Handlebars.registerHelper('return_column_layout_from_collection_length', function(collection, attribute) {
		var attributeCount = [];

		_.each(collection, function(resource) {
			var resourceAttribute = resource[attribute];
			if (_.indexOf(attributeCount, resourceAttribute) === -1) {
				attributeCount.push(resourceAttribute);
			}
		});

		return (attributeCount.length + 1);

    });

})