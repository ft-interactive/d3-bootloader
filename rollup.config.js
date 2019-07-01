import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default [
  {
    input: 'index.js',
    output: {
      file: 'dist/d3-bootloader.js',
      format: 'umd',
      name: 'bootD3',
      sourcemap: true,
    },

    external: ['fs'],

    plugins: [
      resolve(),
      commonjs({
        include: [
          'node_modules/systemjs/dist/system.src.js',
          'node_modules/systemjs/dist/index.js',
        ],
      }),
    ],
  },
  {
    input: 'offline/index.js',
    output: {
      file: 'offline/d3-bootloader.js',
      format: 'umd',
      name: 'bootD3',
      sourcemap: true,
    },
    external: ['fs'],
    plugins: [
      resolve(),
      commonjs({
        include: [
          'node_modules/systemjs/dist/system.src.js',
          'node_modules/systemjs/dist/index.js',
        ],
      }),
    ],
  },
];
