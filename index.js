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

var defaultMap = {
  '@financial-times/load-data': 'https://unpkg.com/@financial-times/load-data@^1.0.2/dist/loadData.dist.min.js',
  'd3': 'https://unpkg.com/d3@5.4.0/index.js',
  'd3-array': 'https://unpkg.com/d3-array/index.js',
  'd3-axis': 'https://unpkg.com/d3-axis/index.js',
  'd3-brush': 'https://unpkg.com/d3-brush/index.js',
  'd3-chord': 'https://unpkg.com/d3-chord/index.js',
  'd3-collection': 'https://unpkg.com/d3-collection/index.js',
  'd3-contour': 'https://unpkg.com/d3-contour/index.js',
  'd3-scale-chromatic': 'https://unpkg.com/d3-scale-chromatic/index.js',
  'd3-color': 'https://unpkg.com/d3-color/index.js',
  'd3-dispatch': 'https://unpkg.com/d3-dispatch/index.js',
  'd3-drag': 'https://unpkg.com/d3-drag/index.js',
  'd3-dsv': 'https://unpkg.com/d3-dsv/index.js',
  'd3-ease': 'https://unpkg.com/d3-ease/index.js',
  'd3-force': 'https://unpkg.com/d3-force/index.js',
  'd3-format': 'https://unpkg.com/d3-format/index.js',
  'd3-geo': 'https://unpkg.com/d3-geo/index.js',
  'd3-hierarchy': 'https://unpkg.com/d3-hierarchy/index.js',
  'd3-interpolate': 'https://unpkg.com/d3-interpolate/index.js',
  'd3-path': 'https://unpkg.com/d3-path/index.js',
  'd3-polygon': 'https://unpkg.com/d3-polygon/index.js',
  'd3-quadtree': 'https://unpkg.com/d3-quadtree/index.js',
  'd3-quarterly': 'https://rawgit.com/ft-interactive/d3-quarterly/master/index.js',
  'd3-queue': 'https://unpkg.com/d3-queue/index.js',
  'd3-random': 'https://unpkg.com/d3-random/index.js',
  'd3-fetch': 'https://unpkg.com/d3-fetch/index.js',
  'd3-scale': 'https://unpkg.com/d3-scale/index.js',
  'd3-selection-multi': 'https://unpkg.com/d3-selection-multi@1.0.1',
  'd3-selection': 'https://unpkg.com/d3-selection/index.js',
  'd3-shape': 'https://unpkg.com/d3-shape/index.js',
  'd3-time-format': 'https://unpkg.com/d3-time-format/index.js',
  'd3-time': 'https://unpkg.com/d3-time/index.js',
  'd3-timer': 'https://unpkg.com/d3-timer/index.js',
  'd3-transition': 'https://unpkg.com/d3-transition/index.js',
  'd3-voronoi': 'https://unpkg.com/d3-voronoi/index.js',
  'd3-zoom': 'https://unpkg.com/d3-zoom/index.js',
  'g-axis': 'https://rawgit.com/ft-interactive/g-axis/master/build/g-axis.js',
  'g-chartcolour': 'https://rawgit.com/ft-interactive/g-chartcolour/master/build/g-chartcolour.js',
  'g-chartframe': 'https://rawgit.com/ft-interactive/g-chartframe/master/build/g-chartframe.js',
  'g-legend': 'https://rawgit.com/ft-interactive/g-legend/master/build/g-legend.js',
  'g-xaxisdate': 'https://rawgit.com/ft-interactive/g-axis/master/build/g-axis.js',
  'g-yaxislinear': 'https://rawgit.com/ft-interactive/g-axis/master/build/g-axis.js',
  'plugin-babel': 'https://unpkg.com/systemjs-plugin-babel@0.0.25',
  'plugin-json': 'https://unpkg.com/systemjs-plugin-json@0.3.0',
  'save-svg-as-png': 'https://unpkg.com/save-svg-as-png@^1.2.0/saveSvgAsPng.js',
  'simple-statistics': 'https://unpkg.com/simple-statistics@^5.2.0',
  'systemjs-babel-build': 'https://unpkg.com/systemjs-plugin-babel@0.0.25/systemjs-babel-browser.js',
  'topojson-client': 'https://unpkg.com/topojson-client@3',

};

var config = {
  map: Object.assign({}, defaultMap, window.D3_BOOTLOADER_MODULES),
  packages: {
    'plugin-babel': {
      main: 'plugin-babel.js',
    },
  },
  meta: { '*.json': { loader: 'plugin-json' } },
  transpiler: 'plugin-babel',
};

SystemJS.config(config);

export default SystemJS.import('./index.js');
