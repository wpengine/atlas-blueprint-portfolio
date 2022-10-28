import { setConfig } from '@faustwp/core';
import templates from './wp-templates';
import possibleTypes from './possibleTypes.json';

class ProjectTemplatePlugin {
  constructor() {}

  apply(hooks) {
    hooks.addFilter(
      'possibleTemplatesList',
      'ProjectTemplate',
      (templates, data) => {
        if (data?.seedNode?.__typename === 'Project') {
          return Array.from(new Set(['project', ...templates]));
        }
        return templates;
      }
    );
  }
}

/**
 * @type {import('@faustwp/core').FaustConfig}
 **/
export default setConfig({
  templates,
  experimentalPlugins: [new ProjectTemplatePlugin()],
  possibleTypes,
});
