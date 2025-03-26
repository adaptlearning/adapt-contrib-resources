import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin, getCourse, testStopWhere, testSuccessWhere } from 'adapt-migrations';
import _ from 'lodash';

describe('Resources - v5.2.1 to v5.3.0', async () => {
  let course, contentObjects;
  whereFromPlugin('Resources - from v5.2.1', { name: 'adapt-contrib-resources', version: '<5.3.0' });

  whereContent('Resources - where Resources', async (content) => {
    course = getCourse();
    return course?._resources;
  });

  mutateContent('Resources - add _resourcesItems _isGlobal attribute', async (content) => {
    if (course._resources._resourcesItems?.length) {
      course._resources._resourcesItems.forEach((item) => {
        item._isGlobal = true;
      });
    }
    return true;
  });

  mutateContent('Resources - add content object _resources object', async (content) => {
    contentObjects = content.filter(({ _type }) => _type === 'page');
    contentObjects.forEach((contentObject) => {
      contentObject._resources = {};
    });
    return true;
  });

  mutateContent('Resources - add _isEnabled attribute to content object', async (content) => {
    contentObjects.forEach((contentObject) => {
      contentObject._resources._isEnabled = true;
    });
    return true;
  });

  mutateContent('Resources - add _resourcesItems to content object', async (content) => {
    contentObjects.forEach((contentObject) => {
      contentObject._resources._resourcesItems = [];
    });
    return true;
  });

  checkContent('Resources - check _resourcesItems _isGlobal attribute', async (content) => {
    if (course._resources._resourcesItems?.length) {
      const isValid = course._resources._resourcesItems.every((item) => _.has(item, '_isGlobal'));
      if (!isValid) throw new Error('Resources - _resourcesItems _isGlobal does not exist');
    }
    return true;
  });

  checkContent('Resources - check content object _resources object', async (content) => {
    const isValid = contentObjects.every((contentObject) => _.has(contentObject, '_resources'));
    if (!isValid) throw new Error('Resources - content object _resources does not exist');
    return true;
  });

  checkContent('Resources - check _isEnabled attribute', async (content) => {
    const isValid = contentObjects.every((contentObject) => _.has(contentObject, '_resources._isEnabled'));
    if (!isValid) throw new Error('Resources - content objects _isEnabled does not exist');
    return true;
  });

  checkContent('Resources - check _resourcesItems attribute', async (content) => {
    const isValid = contentObjects.every((contentObject) => _.has(contentObject, '_resources._resourcesItems'));
    if (!isValid) throw new Error('Resources - content objects _resourcesItems does not exist');
    return true;
  });

  updatePlugin('Resources - update to v5.3.0', { name: 'adapt-contrib-resources', version: '5.3.0', framework: '>=5.19.1' });

  testSuccessWhere('resources with course._resources_resourcesItems, empty page', {
    fromPlugins: [{ name: 'adapt-contrib-resources', version: '5.2.1' }],
    content: [
      { _type: 'course', _resources: { _resourcesItems: [ { title: 'Item 1' }, { title: 'Item 2' } ] } },
      { _type: 'page' }
    ]
  });

  testSuccessWhere('resources with course._resources_resourcesItems, page with _resources', {
    fromPlugins: [{ name: 'adapt-contrib-resources', version: '5.2.1' }],
    content: [
      { _type: 'course', _resources: { _resourcesItems: [ { title: 'Item 1' }, { title: 'Item 2' } ] } },
      { _type: 'page', _resources: {} }
    ]
  });

  testSuccessWhere('resources with no _resourcesItems', {
    fromPlugins: [{ name: 'adapt-contrib-resources', version: '5.2.1' }],
    content: [
      { _type: 'course', _resources: {} },
      { _type: 'page', _resources: {} }
    ]
  });

  testStopWhere('resources with empty course and empty page', {
    fromPlugins: [{ name: 'adapt-contrib-resources', version: '5.2.1' }],
    content: [
      { _type: 'course' },
      { _type: 'page' }
    ]
  });

  testStopWhere('resources with empty course', {
    fromPlugins: [{ name: 'adapt-contrib-resources', version: '5.2.1' }],
    content: [
      { _type: 'course' }
    ]
  });

  testStopWhere('resources incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-resources', version: '5.3.0' }]
  });
});

describe('Resources - v5.3.8 to v5.3.9', async () => {
  let course, courseResourcesGlobals;
  whereFromPlugin('Resources - from v5.3.8', { name: 'adapt-contrib-resources', version: '<5.3.9' });

  whereContent('Resources - where Resources', async (content) => {
    course = getCourse();
    return course?._resources;
  });

  mutateContent('Resources - add globals if missing', async (content) => {
    if (!_.has(course, '_globals._extensions._resources')) _.set(course, '_globals._extensions._resources', {});
    courseResourcesGlobals = course._globals._extensions._resources;
    return true;
  });

  mutateContent('Resources - add global ariaRegion attribute', async (content) => {
    courseResourcesGlobals.ariaRegion = '';
    return true;
  });

  mutateContent('Resources - add displayTitle attribute', async (content) => {
    course._resources.displayTitle = '';
    return true;
  });

  mutateContent('Resources - add body attribute', async (content) => {
    course._resources.body = '';
    return true;
  });

  mutateContent('Resources - add instruction attribute', async (content) => {
    course._resources.instruction = '';
    return true;
  });

  checkContent('Resources - check globals exist', async (content) => {
    const isValid = _.has(course, '_globals._extensions._resources');
    if (!isValid) throw new Error('Resources - globals do not exist');
    return true;
  });

  checkContent('Resources - check global ariaRegion attribute', async (content) => {
    const isValid = _.has(course, '_globals._extensions._resources.ariaRegion');
    if (!isValid) throw new Error('Resources - global ariaRegion attribute not found');
    return true;
  });

  checkContent('Resources - check displayTitle attribute', async (content) => {
    const isValid = _.has(course, '_resources.displayTitle');
    if (!isValid) throw new Error('Resources - displayTitle does not exist');
    return true;
  });

  checkContent('Resources - check body attribute', async (content) => {
    const isValid = _.has(course, '_resources.body');
    if (!isValid) throw new Error('Resources - body does not exist');
    return true;
  });

  checkContent('Resources - check instruction attribute', async (content) => {
    const isValid = _.has(course, '_resources.instruction');
    if (!isValid) throw new Error('Resources - instruction does not exist');
    return true;
  });

  updatePlugin('Resources - update to v5.3.9', { name: 'adapt-contrib-resources', version: '5.3.9', framework: '>=5.19.1' });

  testSuccessWhere('resources with course._resources, no globals', {
    fromPlugins: [{ name: 'adapt-contrib-resources', version: '5.3.8' }],
    content: [
      { _type: 'course', _resources: {} }
    ]
  });

  testSuccessWhere('resources with course._resources and globals', {
    fromPlugins: [{ name: 'adapt-contrib-resources', version: '5.3.8' }],
    content: [
      { _type: 'course', _resources: {}, _globals: { _extensions: { _resources: {} } } }
    ]
  });

  testStopWhere('resources with empty course', {
    fromPlugins: [{ name: 'adapt-contrib-resources', version: '5.3.8' }],
    content: [
      { _type: 'course' }
    ]
  });

  testStopWhere('resources incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-resources', version: '5.3.9' }]
  });
});

describe('Resources - v5.4.0 to v5.4.1', async () => {
  let course;
  whereFromPlugin('Resources - from v5.4.0', { name: 'adapt-contrib-resources', version: '<5.4.1' });

  whereContent('Resources - where Resources', async (content) => {
    course = getCourse();
    return course?._resources;
  });

  mutateContent('Resources - add custom _filterButtons', async (content) => {
    const customFilterButtons = { custom1: 'Custom category 1', custom2: 'Custom category 2', custom3: 'Custom category 3', custom4: 'Custom category 4', custom5: 'Custom category 5', custom6: 'Custom category 6', custom7: 'Custom category 7', custom8: 'Custom category 8', custom9: 'Custom category 9', custom10: 'Custom category 10' };
    course._resources._filterButtons = { ...course._resources._filterButtons, ...customFilterButtons };
    return true;
  });

  mutateContent('Resources - add custom _filterAria', async (content) => {
    const customFilterArias = { custom1Aria: 'View custom category 1 links', custom2Aria: 'View custom category 2 links', custom3Aria: 'View custom category 3 links', custom4Aria: 'View custom category 4 links', custom5Aria: 'View custom category 5 links', custom6Aria: 'View custom category 6 links', custom7Aria: 'View custom category 7 links', custom8Aria: 'View custom category 8 links', custom9Aria: 'View custom category 9 links', custom10Aria: 'View custom category 10 links' };
    course._resources._filterAria = { ...course._resources._filterAria, ...customFilterArias };
    return true;
  });

  checkContent('Resources - check custom _filterButtons exist', async (content) => {
    const isValid = _.has(course, '_resources._filterButtons.custom1');
    if (!isValid) throw new Error('Resources - _resources._filterButtons custom buttons do not exist');
    return true;
  });

  checkContent('Resources - check custom _filterAria exist', async (content) => {
    const isValid = _.has(course, '_resources._filterAria.custom1Aria');
    if (!isValid) throw new Error('Resources - _resources._filterAria custom buttons do not exist');
    return true;
  });

  updatePlugin('Resources - update to v5.4.1', { name: 'adapt-contrib-resources', version: '5.3.9', framework: '>=5.19.1' });

  testSuccessWhere('resources with course._resources._filterButtons/._filterAria', {
    fromPlugins: [{ name: 'adapt-contrib-resources', version: '5.4.0' }],
    content: [
      { _type: 'course', _resources: { _filterButtons: { link: 'Link' }, _filterAria: { allAria: 'View all resources' } } }
    ]
  });

  testSuccessWhere('resources with empty course._resources', {
    fromPlugins: [{ name: 'adapt-contrib-resources', version: '5.4.0' }],
    content: [
      { _type: 'course', _resources: {} }
    ]
  });

  testStopWhere('resources with empty course', {
    fromPlugins: [{ name: 'adapt-contrib-resources', version: '5.4.0' }],
    content: [
      { _type: 'course' }
    ]
  });

  testStopWhere('resources incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-resources', version: '5.4.1' }]
  });
});

describe('Resources - v5.4.3 to v5.5.0', async () => {
  let course;
  whereFromPlugin('Resources - from v5.4.3', { name: 'adapt-contrib-resources', version: '<5.5.0' });

  whereContent('Resources - where Resources', async (content) => {
    course = getCourse();
    return course?._resources;
  });

  mutateContent('Resources - add _enableFilters attribute', async (content) => {
    course._resources._enableFilters = true;
    return true;
  });

  checkContent('Resources - check _enableFilters attribute', async (content) => {
    const isValid = _.has(course, '_resources._enableFilters');
    if (!isValid) throw new Error('Resources - _enableFilters attribute not found');
    return true;
  });

  updatePlugin('Resources - update to v5.5.0', { name: 'adapt-contrib-resources', version: '5.5.0', framework: '>=5.19.1' });

  testSuccessWhere('resources with course._resources', {
    fromPlugins: [{ name: 'adapt-contrib-resources', version: '5.4.3' }],
    content: [
      { _type: 'course', _resources: {} }
    ]
  });

  testStopWhere('resources with empty course', {
    fromPlugins: [{ name: 'adapt-contrib-resources', version: '5.4.3' }],
    content: [
      { _type: 'course' }
    ]
  });

  testStopWhere('resources incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-resources', version: '5.5.0' }]
  });
});
