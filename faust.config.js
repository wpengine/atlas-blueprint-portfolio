import { setConfig } from '@faustwp/core';
import { RelayStylePaginationPlugin } from 'plugins/RelayStylePaginationPlugin';

import possibleTypes from './possibleTypes.json';
import templates from './wp-templates';

/**
 * @type {import('@faustwp/core').FaustConfig}
 **/
export default setConfig({
  templates,
  experimentalPlugins: [new RelayStylePaginationPlugin()],
  possibleTypes,
});
