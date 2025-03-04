import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin, getCourse, testStopWhere, testSuccessWhere } from 'adapt-migrations';

describe('Resources - v3.0.3 to v4.0.0', async () => {
  let course;
  const originalDescriptionDefault = 'Click here to view resources for this course';
  whereFromPlugin('Resources - from v3.0.3', { name: 'adapt-contrib-resources', version: '<4.0.0' });

  whereContent('Resources - where Resources', async (content) => {
    course = getCourse();
    return course?._resources;
  });

  mutateContent('Resources - modify description default', async (content) => {
    if (course._resources.description === originalDescriptionDefault) course._resources.description = 'Select here to view resources for this course';
    return true;
  });

  checkContent('Resources - check description default', async (content) => {
    const isValid = course._resources.description !== originalDescriptionDefault;
    if (!isValid) throw new Error('Resources - description default not updated');
    return true;
  });

  updatePlugin('Resources - update to v4.0.0', { name: 'adapt-contrib-resources', version: '4.0.0', framework: '>=5.0.0' });

  testSuccessWhere('resources with course._resources', {
    fromPlugins: [{ name: 'adapt-contrib-resources', version: '3.0.3' }],
    content: [
      { _type: 'course', _resources: {} }
    ]
  });

  testStopWhere('resources with empty course', {
    fromPlugins: [{ name: 'adapt-contrib-resources', version: '3.0.3' }],
    content: [
      { _type: 'course' }
    ]
  });

  testStopWhere('resources incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-resources', version: '4.0.0' }]
  });
});
