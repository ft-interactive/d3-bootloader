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

import SystemJS from "systemjs";
import modules from "../modules.js";

const offlineModules = Object.entries(modules).reduce(
  (a, [k, v]) =>
    Object.assign({}, a, {
      [k]: `./${/^@/.test(pkg) ? pkg.slice(pkg.indexOf("/") + 1) : pkg}.js`
    }),
  {}
);

var config = {
  map: offlineModules,
  packages: {
    "plugin-babel": {
      main: "plugin-babel.js"
    }
  },
  meta: { "*.json": { loader: "plugin-json" } },
  transpiler: "plugin-babel"
};

SystemJS.config(config);

export default SystemJS.import("./index.js");
