import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin, getCourse, testStopWhere, testSuccessWhere } from 'adapt-migrations';
import _ from 'lodash';

describe('Resources - v2.1.3 to v3.0.0', async () => {
  let course, courseResourcesGlobals;
  const originalDescriptionDefault = 'Click here to view resources for this course';
  whereFromPlugin('Resources - from v2.1.3', { name: 'adapt-contrib-resources', version: '<3.0.0' });

  whereContent('Resources - where Resources', async (content) => {
    course = getCourse();
    return course?._resources;
  });

  mutateContent('Resources - modify description default', async (content) => {
    if (course._resources.description === originalDescriptionDefault) course._resources.description = 'Select here to view resources for this course';
    return true;
  });

  mutateContent('Resources - add globals if missing', async (content) => {
    if (!_.has(course, '_globals._extensions._resources')) _.set(course, '_globals._extensions._resources', {});
    courseResourcesGlobals = course._globals._extensions._resources;
    return true;
  });

  mutateContent('Resources - replace globals resourcesEnd with resources', async (content) => {
    if (_.has(courseResourcesGlobals, 'resourcesEnd')) delete courseResourcesGlobals.resourcesEnd;
    courseResourcesGlobals.resources = 'Additional resources.';
    return true;
  });

  checkContent('Resources - check description default', async (content) => {
    const isValid = course._resources.description !== originalDescriptionDefault;
    if (!isValid) throw new Error('Resources - description default not updated');
    return true;
  });

  checkContent('Resources - check globals exist', async (content) => {
    const isValid = _.has(course, '_globals._extensions._resources');
    if (!isValid) throw new Error('Resources - globals do not exist');
    return true;
  });

  checkContent('Resources - check globals resourcesEnd replaced', async (content) => {
    const isValid = !_.has(courseResourcesGlobals, 'resourcesEnd') && _.has(courseResourcesGlobals, 'resources');
    if (!isValid) throw new Error('Resources - globals resourcesEnd not replaced');
    return true;
  });

  updatePlugin('Resources - update to v3.0.0', { name: 'adapt-contrib-resources', version: '3.0.0', framework: '>=2.2.0' });

  testSuccessWhere('resources with course._resources, no globals', {
    fromPlugins: [{ name: 'adapt-contrib-resources', version: '2.1.3' }],
    content: [
      { _type: 'course', _resources: {} }
    ]
  });

  testSuccessWhere('resources with course._resources and globals', {
    fromPlugins: [{ name: 'adapt-contrib-resources', version: '2.1.3' }],
    content: [
      { _type: 'course', _resources: {}, _globals: { _extensions: { _resources: {} } } }
    ]
  });

  testStopWhere('resources with empty course', {
    fromPlugins: [{ name: 'adapt-contrib-resources', version: '2.1.3' }],
    content: [
      { _type: 'course' }
    ]
  });

  testStopWhere('resources incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-resources', version: '3.0.0' }]
  });
});
