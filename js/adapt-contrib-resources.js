define([
    'backbone',
    'coreJS/adapt',
    './adapt-contrib-resourcesView',
    './adapt-contrib-resourcesHelpers'
], function(Backbone, Adapt, ResourcesView, ResourcesHelpers) {

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

    function initRessources() {

        var courseResources = Adapt.course.get('_resources');

        // do not proceed until resource set on course.json
        if (!courseResources || courseResources._isEnabled === false) return;

        var drawerObject = {
            title: courseResources.title,
            description: courseResources.description,
            className: 'resources-drawer'
        };
        // Syntax for adding a Drawer item
        // Adapt.drawer.addItem([object], [callbackEvent]);
        Adapt.drawer.addItem(drawerObject, 'resources:showResources');

        setupResources(courseResources, courseResources._resourcesItems);

    }

    Adapt.once('app:dataReady', initRessources);
    Adapt.on('languagePicker:languageChange', initRessources);

});
