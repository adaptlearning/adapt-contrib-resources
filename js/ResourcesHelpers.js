import Handlebars from 'handlebars';
import Adapt from 'core/js/adapt';

const helpers = {

  resources_has_type(resources, type, block) {
    const hasType = resources.some(_.matcher({ _type: type }));
    return hasType ? block.fn(this) : block.inverse(this);
  },

  resources_has_multiple_types(resources, block) {
    if (resources.length === 1) return block.inverse(this);

    const allSameType = resources.every(_.matcher({ _type: resources[0]._type }));
    return allSameType ? block.inverse(this) : block.fn(this);
  },

  resources_get_column_count(resources) {
    return _.uniq(_.pluck(resources, '_type')).length + 1;// add 1 for the 'All' button column
  },

  /**
   * IE doesn't support the 'download' attribute
   * https://github.com/adaptlearning/adapt_framework/issues/1559
   * and iOS just opens links with that attribute in the same window
   * https://github.com/adaptlearning/adapt_framework/issues/1852
   */
  resources_force_download(resource, block) {
    if (Adapt.device.browser === 'internet explorer' || Adapt.device.OS === 'ios') {
      return block.inverse(this);
    }

    return (resource._forceDownload || resource.filename) ? block.fn(this) : block.inverse(this);
  }

};

for (const name in helpers) {
  Handlebars.registerHelper(name, helpers[name]);
}

export default helpers;
