import Adapt from 'core/js/adapt';
import drawer from 'core/js/drawer';
import ResourcesView from './ResourcesView';
import './ResourcesHelpers';

class Resources extends Backbone.Controller {

  initialize() {
    this.listenTo(Adapt, 'adapt:start', this.initResources);
  }

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

    drawer.addItem(drawerObject, 'resources:showResources');

    this.setupResources(courseResources);
  }

  setupResources(resourcesData) {
    this.listenTo(Adapt, 'resources:showResources', () => {
      const model = new Backbone.Model(resourcesData);
      let resources = model.get('_resourcesItems');
      const contentObjectModel = Adapt.parentView?.model;
      const contentObjectConfig = contentObjectModel?.get('_resources');
      const isContentObjectNotCourseModel = (contentObjectModel !== Adapt.course);
      const contentObjectResourceItems = isContentObjectNotCourseModel && contentObjectConfig?._isEnabled && contentObjectConfig?._resourcesItems;
      if (contentObjectResourceItems) resources = resources.concat(contentObjectResourceItems ?? []);
      model.set('_resources', resources);
      drawer.triggerCustomView(new ResourcesView({ model }).$el);
    });
  }
}

export default new Resources();
