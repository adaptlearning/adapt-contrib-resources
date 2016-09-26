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

    function initResources() {

        var courseResources = Adapt.course.get('_resources');

        // do not proceed until resource set on course.json
        if (!courseResources || courseResources._isEnabled === false) return;

        var drawerObject = {
            title: courseResources.title,
            description: courseResources.description,
            className: 'resources-drawer'
        };

        Adapt.drawer.addItem(drawerObject, 'resources:showResources');

        setupResources(courseResources, courseResources._resourcesItems);

    }

    Adapt.once('app:dataReady', initResources);
    Adapt.on('languagePicker:languageChange', initResources);

});
