import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'index.js',
  dest: 'd3-bootloader.js',
  format: 'umd',
  moduleName: 'bootd3',
  plugins: [
    resolve(),
    commonjs({
      namedExports: {
        'node_modules/systemjs/dist/system.src.js': [
          'System'
        ]
      },
      include: 'node_modules/systemjs',
    }),
  ],
}
