/**
 * d3-bootloader
 * 2017 Ændrew Rininsland <@aendrew>, Financial Times
 *
 * Allows the use of D3 using ES6 modules via SystemJS.
 * This does Babel transpilation in the browser. It's probably
 * not very performant — at all — and is intended for scenarios
 * such as with Visual Vocabulary (I.e., D3 is being used as an
 * in-browser tool for creating static print visualisations).
 */

import SystemJS from 'systemjs';
import modules from './modules.js';

var config = {
  paths: {
    'npm:': 'https://unpkg.com/',
  },
  packages: {
    babel: {
      main: 'browser.min.js',
    },
    react: {
      main: 'react.js',
    },
    'react-dom': {
      main: 'index.js',
    },
  },
  map: Object.assign({}, modules, window.D3_BOOTLOADER_MODULES),
  meta: { '*.json': { loader: 'plugin-json' } },
  transpiler: 'babel',
};

SystemJS.config(config);

export default SystemJS.import('./index.js');
