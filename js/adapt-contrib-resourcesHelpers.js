define([
	'handlebars',
	'core/js/adapt'
], function(Handlebars, Adapt) {

	Handlebars.registerHelper('if_has_type', function(resources, type, block) {
		var hasType = _.some(resources, _.matcher({_type: type}));
		return hasType ? block.fn(this) : block.inverse(this);
  });

	Handlebars.registerHelper('if_has_multiple_types', function(resources, block) {
		if (resources.length === 1) return block.inverse(this);

		var allSameType = _.every(resources, _.matcher({_type: resources[0]._type}));
		return allSameType ? block.inverse(this) : block.fn(this);
	});

	Handlebars.registerHelper('get_column_count', function(resources) {
		return _.uniq(_.pluck(resources, '_type')).length + 1;// add 1 for the 'All' button column
	});

	Handlebars.registerHelper('if_force_download', function(resource, block) {
		/*
		IE doesn't support the 'download' attribute
		https://github.com/adaptlearning/adapt_framework/issues/1559
		and iOS just opens links with that attribute in the same window
		https://github.com/adaptlearning/adapt_framework/issues/1852
		*/
		if (Adapt.device.browser === 'internet explorer' || Adapt.device.OS === 'ios') {
			return block.inverse(this);
		}

		return resource._forceDownload ? block.fn(this) : block.inverse(this);
	});

});
