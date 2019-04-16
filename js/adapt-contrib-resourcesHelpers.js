define([
    'handlebars',
    'core/js/adapt'
], function(Handlebars, Adapt) {

    var helpers = {

        resources_has_type: function(resources, type, block) {
            var hasType = _.some(resources, _.matcher({_type: type}));
            return hasType ? block.fn(this) : block.inverse(this);
        },

        resources_has_multiple_types: function(resources, block) {
            if (resources.length === 1) return block.inverse(this);

            var allSameType = _.every(resources, _.matcher({_type: resources[0]._type}));
            return allSameType ? block.inverse(this) : block.fn(this);
        },

        resources_get_column_count: function(resources) {
            return _.uniq(_.pluck(resources, '_type')).length + 1;// add 1 for the 'All' button column
        },

        /**
         * IE doesn't support the 'download' attribute
         * https://github.com/adaptlearning/adapt_framework/issues/1559
         * and iOS just opens links with that attribute in the same window
         * https://github.com/adaptlearning/adapt_framework/issues/1852
         */
        resources_force_download: function(resource, block) {
            if (Adapt.device.browser === 'internet explorer' || Adapt.device.OS === 'ios') {
                return block.inverse(this);
            }

            return (resource._forceDownload || resource.filename) ? block.fn(this) : block.inverse(this);
        }

    };

    for (var name in helpers) {
        if (helpers.hasOwnProperty(name)) {
            Handlebars.registerHelper(name, helpers[name]);
        }
    }

});
