const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackOptions = require('../webpack.config');

function watch() {
  return new WebpackDevServer(webpack(webpackOptions), {
    contentBase: './example',
    hot: true,
    quiet: false,
    noInfo: false,
    watchOptions: {
      aggregateTimeout: 100,
      poll: 1000
    },
    stats: {
      colors: true,
      chunkModules: false
    }
  }).listen(8080, err => {
    console.log('Running webpack server');
  });
}

watch();
