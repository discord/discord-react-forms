const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./helpers/webpack.config');
const {PORT} = require('./helpers/Constants');

function watch() {
  return new WebpackDevServer(webpack(webpackConfig.getWatchConfig()), {
    contentBase: './example',
    inline: true,
    quiet: false,
    noInfo: false,
    watchOptions: {
      aggregateTimeout: 100,
      poll: 1000
    },
    stats: {
      colors: true
    }
  }).listen(PORT, err => {
    console.log('Running webpack server');
  });
}

watch();
