import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";

export default [
  {
    input: "index.js",
    output: {
      file: "dist/d3-bootloader.js",
      name: "bootD3",
      format: "umd"
    },
    external: ["fs"],
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
    input: "offline/index.js",
    output: {
      file: "offline/d3-bootloader.js",
      name: "bootD3",
      format: "umd"
    },
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
