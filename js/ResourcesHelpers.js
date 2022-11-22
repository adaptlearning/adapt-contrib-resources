import Handlebars from 'handlebars';

const helpers = {

  resources_has_type(resources, type) {
    const hasType = resources.some(_.matcher({ _type: type }));
    return !hasType;
  },

  resources_has_multiple_types(resources) {
    if (resources.length === 1) return false;

    const allSameType = resources.every(_.matcher({ _type: resources[0]._type }));
    return !allSameType;
  },

  resources_get_column_count(resources) {
    return _.uniq(_.pluck(resources, '_type')).length + 1;// add 1 for the 'All' button column
  }

};

for (const name in helpers) {
  Handlebars.registerHelper(name, helpers[name]);
}

export default helpers;
