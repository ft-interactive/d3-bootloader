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

/* globals SystemJS */

// This adds plugin-babel, systemjs-babel-build, and maps all of the D3
// micro-libs to the D3 monorepo.
SystemJS.config({
  map: {
    'plugin-babel': '//unpkg.com/systemjs-plugin-babel@0.0.24',
    'systemjs-babel-build': '//unpkg.com/systemjs-plugin-babel@0.0.24/systemjs-babel-browser.js',
    d3: '//d3js.org/d3.v4.js',
    'd3-array': '//d3js.org/d3.v4.js',
    'd3-axis': '//d3js.org/d3.v4.js',
    'd3-brush': '//d3js.org/d3.v4.js',
    'd3-chord': '//d3js.org/d3.v4.js',
    'd3-collection': '//d3js.org/d3.v4.js',
    'd3-color': '//d3js.org/d3.v4.js',
    'd3-dispatch': '//d3js.org/d3.v4.js',
    'd3-drag': '//d3js.org/d3.v4.js',
    'd3-dsv': '//d3js.org/d3.v4.js',
    'd3-ease': '//d3js.org/d3.v4.js',
    'd3-force': '//d3js.org/d3.v4.js',
    'd3-format': '//d3js.org/d3.v4.js',
    'd3-geo': '//d3js.org/d3.v4.js',
    'd3-hierarchy': '//d3js.org/d3.v4.js',
    'd3-interpolate': '//d3js.org/d3.v4.js',
    'd3-path': '//d3js.org/d3.v4.js',
    'd3-polygon': '//d3js.org/d3.v4.js',
    'd3-quadtree': '//d3js.org/d3.v4.js',
    'd3-queue': '//d3js.org/d3.v4.js',
    'd3-random': '//d3js.org/d3.v4.js',
    'd3-request': '//d3js.org/d3.v4.js',
    'd3-scale': '//d3js.org/d3.v4.js',
    'd3-selection': '//d3js.org/d3.v4.js',
    'd3-shape': '//d3js.org/d3.v4.js',
    'd3-time': '//d3js.org/d3.v4.js',
    'd3-time-format': '//d3js.org/d3.v4.js',
    'd3-timer': '//d3js.org/d3.v4.js',
    'd3-transition': '//d3js.org/d3.v4.js',
    'd3-voronoi': '//d3js.org/d3.v4.js',
    'd3-zoom': '//d3js.org/d3.v4.js',
    'g-chartcolour': '//unpkg.com/g-chartcolour',
  },
  transpiler: 'plugin-babel',
});

window.boot = function boot(deps) {
  const defaultDeps = {
    d3: '//d3js.org/d3.v4.js',
    d3SelectionMulti: '//d3js.org/d3-selection-multi.v1.min.js',
    gChartframe: '//unpkg.com/g-chartframe',
    gYAxisLinear: '//rawgit.com/ft-interactive/g-yaxislinear/master/build/g-yaxislinear.js',
    gXAxisDate: '//rawgit.com/ft-interactive/g-xaxisdate/master/build/g-xaxisdate.js',
  };

  const merged = Object.assign({}, defaultDeps, deps);
  const resolved = Promise.all(Object.keys(merged)
    .map(item => merged[item]).map(item => SystemJS.import(item)));

  return resolved.then((items) => {
    const keys = Object.keys(merged);
    return items.reduce((_col, v, i) => {
      const col = _col;
      col[keys[i]] = v;
      return col;
    });
  });
};
