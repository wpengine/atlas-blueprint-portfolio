import { setConfig } from '@faustwp/core';
import { RelayStylePaginationPlugin } from 'plugins/RelayStylePaginationPlugin';

import possibleTypes from './possibleTypes.json';
import templates from './wp-templates';

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
  experimentalPlugins: [
    new ProjectTemplatePlugin(),
    new RelayStylePaginationPlugin(),
  ],
  possibleTypes,
});
