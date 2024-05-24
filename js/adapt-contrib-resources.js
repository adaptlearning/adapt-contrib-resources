import Adapt from 'core/js/adapt';
import drawer from 'core/js/drawer';
import device from 'core/js/device';
import ResourcesView from './ResourcesView';

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

    Object.assign(courseResources, {
      _isA11yComponentDescriptionEnabled: true,
      _id: 'resources',
      _extension: 'resources',
      _ariaLevel: 1
    });

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
      if (isContentObjectNotCourseModel) {
        resources = resources.filter(resource => resource._isGlobal !== false);
      }
      model.set('_resources', resources);

      this.setupTypes(model, resourcesData);
      this.setupFilters(model, resources);
      this.setupCanDownload(model);

      drawer.openCustomView(new ResourcesView({ model }).$el);
    });
  }

  setupTypes(model, resourcesData) {
    const configuredTypes = Object.keys(resourcesData._filterButtons).filter(type => type !== 'all');
    const typesWithItems = configuredTypes.filter(type => {
      return resourcesData._resourcesItems.some(_.matcher({ _type: type }));
    });

    model.set('_resourceTypes', [ 'all', ...typesWithItems ]);
  }

  setupFilters(model, resources) {
    const hasMultipleResources = resources.length > 1;
    const hasMultipleTypes = !resources.every(_.matcher({ _type: resources[0]._type }));
    const enableFilters = model.get('_enableFilters') ?? true;

    const showFilters = hasMultipleResources && hasMultipleTypes && enableFilters;
    model.set('_showFilters', showFilters);

    const filterColumnCount = _.uniq(_.pluck(resources, '_type')).length + 1;
    model.set('_filterColumnCount', filterColumnCount);
  }

  /**
    * IE doesn't support the 'download' attribute
    * https://github.com/adaptlearning/adapt_framework/issues/1559
    * and iOS just opens links with that attribute in the same window
    * https://github.com/adaptlearning/adapt_framework/issues/1852
  */
  setupCanDownload(model) {
    const canEnableDownloads = device.browser !== 'internet explorer' && device.OS !== 'ios';
    model.set('_canDownload', canEnableDownloads);
  }

}

export default new Resources();
