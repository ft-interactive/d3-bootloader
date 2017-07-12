import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'index.js',
  dest: 'd3-bootloader.js',
  format: 'umd',
  external: ['fs'],
  globals: {
    fs: 'fs',
  },
  moduleName: 'bootd3',
  plugins: [
    resolve(),
    commonjs({
      include: 'node_modules/systemjs/dist/system.src.js',
    }),
  ],
};
