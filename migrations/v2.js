import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';
import _ from 'lodash';

describe('Resources - v2.0.1 to v2.0.2', async () => {
  let course;
  whereFromPlugin('Resources - from v2.0.1', { name: 'adapt-contrib-resources', version: '<2.0.2' });
  whereContent('Resources - where Resources', async (content) => {
    course = content.find(({ _type }) => _type === 'course');
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

  updatePlugin('Resources - update to v2.0.2', { name: 'adapt-contrib-resources', version: '2.0.2', framework: '>=2.2.0' });
});

describe('Resources - v2.0.5 to v2.0.6', async () => {
  let course;
  whereFromPlugin('Resources - from v2.0.5', { name: 'adapt-contrib-resources', version: '<2.0.6' });
  whereContent('Resources - where Resources', async (content) => {
    course = content.find(({ _type }) => _type === 'course');
    return course?._resources?._resourcesItems;
  });
  mutateContent('Resources - add _resourceItems filename attribute', async (content) => {
    course._resources._resourceItems.forEach(item => {
      item.filename = '';
    });
    return true;
  });
  checkContent('Resources - check _resourceItems filename attribute', async (content) => {
    const isValid = course._resources._resourcesItems.every(item => _.has(item, 'filename'));
    if (!isValid) throw new Error('Resources - _resourceItems filename attribute not updated');
    return true;
  });

  updatePlugin('Resources - update to v2.0.6', { name: 'adapt-contrib-resources', version: '2.0.6', framework: '>=2.2.0' });
});

describe('Resources - v2.0.6 to v2.1.0', async () => {
  let course;
  whereFromPlugin('Resources - from v2.0.6', { name: 'adapt-contrib-resources', version: '<2.1.0' });
  whereContent('Resources - where Resources', async (content) => {
    course = content.find(({ _type }) => _type === 'course');
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
});
