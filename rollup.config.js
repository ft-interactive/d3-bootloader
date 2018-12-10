import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";

export default [
  {
    entry: "index.js",
    dest: "dist/d3-bootloader.js",
    format: "umd",
    external: ["fs"],
    moduleName: "bootD3",
    plugins: [
      resolve(),
      commonjs({
        include: [
          "node_modules/systemjs/dist/system.src.js",
          "node_modules/systemjs/dist/index.js"
        ]
      })
    ]
  },
  {
    entry: "offline/index.js",
    dest: "offline/d3-bootloader.js",
    format: "umd",
    external: ["fs"],
    moduleName: "bootD3",
    plugins: [
      resolve(),
      commonjs({
        include: [
          "node_modules/systemjs/dist/system.src.js",
          "node_modules/systemjs/dist/index.js"
        ]
      })
    ]
  }
];
