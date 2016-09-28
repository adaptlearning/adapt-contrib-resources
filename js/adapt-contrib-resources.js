define([
    'backbone',
    'core/js/adapt',
    './adapt-contrib-resourcesView',
    './adapt-contrib-resourcesHelpers'
], function(Backbone, Adapt, ResourcesView, ResourcesHelpers) {

    function setupResources(resourcesData) {

        var resourcesModel = new Backbone.Model(resourcesData);
        var resourcesCollection = new Backbone.Collection(resourcesModel.get('_resourcesItems'));

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

        setupResources(courseResources);

    }

    Adapt.once('app:dataReady', function() {
        initResources();
        Adapt.on('app:languageChanged', initResources);
    });

});
