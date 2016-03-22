define(function(require) {

	var Adapt = require('coreJS/adapt');
	var Backbone = require('backbone');
	var ResourcesView = require('extensions/adapt-contrib-resources/js/adapt-contrib-resourcesView');
	var ResourcesHelpers = require('extensions/adapt-contrib-resources/js/adapt-contrib-resourcesHelpers');

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

        // do not proceed until resource set on course.json
        if (!courseResources) {
            return console.log('Sorry, no resources object is set on the course.json file');
        } else if (courseResources._isEnabled !== undefined && courseResources._isEnabled !== true) {
            return console.log('Sorry, resources object is not enabled on the course.json file');
        }

        var drawerObject = {
            title: courseResources.title,
            description: courseResources.description,
            className: 'resources-drawer'
        };
        // Syntax for adding a Drawer item
        // Adapt.drawer.addItem([object], [callbackEvent]);
        Adapt.drawer.addItem(drawerObject, 'resources:showResources');

		setupResources(courseResources, courseResources._resourcesItems);

	});

})
