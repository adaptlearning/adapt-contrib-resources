import Adapt from 'core/js/adapt';
import ResourcesView from './ResourcesView';
import ResourcesHelpers from './ResourcesHelpers';

class Resources {
  initResources() {
    const courseResources = Adapt.course.get('_resources');

    // do not proceed until resource set on course.json
    if (!courseResources || courseResources._isEnabled === false) return;

    const drawerObject = {
      title: courseResources.title,
      description: courseResources.description,
      className: 'is-resources',
      drawerOrder: courseResources._drawerOrder || 0
    };

    Adapt.drawer.addItem(drawerObject, 'resources:showResources');

    this.setupResources(courseResources);
  }
  
  setupResources(resourcesData) {
    const model = new Backbone.Model(resourcesData);
    const collection = new Backbone.Collection(model.get('_resourcesItems'));

    Adapt.on('resources:showResources', () => {
      Adapt.drawer.triggerCustomView(new ResourcesView({
        model,
        collection
      }).$el);
    });
  }
}

Adapt.on('adapt:start', _.bind(new Resources().initResources, new Resources()));

export default Resources;
