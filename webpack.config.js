var path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    filename: './d3-bootloader.js',
    library: 'bootD3',
    libraryTarget: 'umd'
  },
  externals: ['fs']
};
