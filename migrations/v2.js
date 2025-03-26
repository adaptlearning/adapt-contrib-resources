import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin, getCourse, testStopWhere, testSuccessWhere } from 'adapt-migrations';
import _ from 'lodash';

describe('Resources - v2.0.1 to v2.0.2', async () => {
  let course;
  whereFromPlugin('Resources - from v2.0.1', { name: 'adapt-contrib-resources', version: '>=2.0.0 <2.0.2' });

  whereContent('Resources - where Resources', async (content) => {
    course = getCourse();
    return course?._resources;
  });

  mutateContent('Resources - add _isEnabled attribute', async (content) => {
    course._resources._isEnabled = true;
    return true;
  });

  checkContent('Resources - check _isEnabled attribute', async (content) => {
    const isValid = _.has(course, '_resources._isEnabled');
    if (!isValid) throw new Error('Resources - _isEnabled attribute not updated');
    return true;
  });

  updatePlugin('Resources - update to v2.0.2', { name: 'adapt-contrib-resources', version: '2.0.2', framework: '^2.0.0' });

  testSuccessWhere('resources with course._resources', {
    fromPlugins: [{ name: 'adapt-contrib-resources', version: '2.0.1' }],
    content: [
      { _type: 'course', _resources: {} }
    ]
  });

  testStopWhere('resources with empty course', {
    fromPlugins: [{ name: 'adapt-contrib-resources', version: '2.0.1' }],
    content: [
      { _type: 'course' }
    ]
  });

  testStopWhere('resources incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-resources', version: '2.0.2' }]
  });
});

describe('Resources - v2.0.5 to v2.0.6', async () => {
  let course;
  whereFromPlugin('Resources - from v2.0.5', { name: 'adapt-contrib-resources', version: '<2.0.6' });

  whereContent('Resources - where Resources', async (content) => {
    course = getCourse();
    return course?._resources?._resourcesItems;
  });

  mutateContent('Resources - add _resourcesItems filename attribute', async (content) => {
    course._resources._resourcesItems.forEach(item => {
      item.filename = '';
    });
    return true;
  });

  checkContent('Resources - check _resourcesItems filename attribute', async (content) => {
    const isValid = course._resources._resourcesItems.every(item => _.has(item, 'filename'));
    if (!isValid) throw new Error('Resources - _resourcesItems filename attribute not updated');
    return true;
  });

  updatePlugin('Resources - update to v2.0.6', { name: 'adapt-contrib-resources', version: '2.0.6', framework: '^2.0.0' });

  testSuccessWhere('resources with course._resources_resourcesItems', {
    fromPlugins: [{ name: 'adapt-contrib-resources', version: '2.0.5' }],
    content: [
      { _type: 'course', _resources: { _resourcesItems: [ { title: 'Item 1' }, { title: 'Item 2' } ] } }
    ]
  });

  testStopWhere('resources with empty course', {
    fromPlugins: [{ name: 'adapt-contrib-resources', version: '2.0.5' }],
    content: [
      { _type: 'course' }
    ]
  });

  testStopWhere('resources with no _resourcesItems', {
    fromPlugins: [{ name: 'adapt-contrib-resources', version: '2.0.5' }],
    content: [
      { _type: 'course', _resources: {} }
    ]
  });

  testStopWhere('resources incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-resources', version: '2.0.6' }]
  });
});

describe('Resources - v2.0.6 to v2.1.0', async () => {
  let course;
  whereFromPlugin('Resources - from v2.0.6', { name: 'adapt-contrib-resources', version: '<2.1.0' });

  whereContent('Resources - where Resources', async (content) => {
    course = getCourse();
    return course?._resources;
  });

  mutateContent('Resources - add _drawerOrder attribute', async (content) => {
    course._resources._drawerOrder = 0;
    return true;
  });

  checkContent('Resources - check _drawerOrder attribute', async (content) => {
    const isValid = _.has(course, '_resources._drawerOrder');
    if (!isValid) throw new Error('Resources - _drawerOrder attribute not updated');
    return true;
  });

  updatePlugin('Resources - update to v2.1.0', { name: 'adapt-contrib-resources', version: '2.1.0', framework: '>=2.2.0' });

  testSuccessWhere('resources with course._resources', {
    fromPlugins: [{ name: 'adapt-contrib-resources', version: '2.0.6' }],
    content: [
      { _type: 'course', _resources: {} }
    ]
  });

  testStopWhere('resources with empty course', {
    fromPlugins: [{ name: 'adapt-contrib-resources', version: '2.0.6' }],
    content: [
      { _type: 'course' }
    ]
  });

  testStopWhere('resources incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-resources', version: '2.1.0' }]
  });
});
