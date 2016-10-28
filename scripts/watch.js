const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./helpers/webpack.config');
const {EXAMPLES_PORT, EXAMPLES_FOLDER} = require('./helpers/Constants');

return new WebpackDevServer(webpack(webpackConfig.getWatchConfig()), {
  contentBase: EXAMPLES_FOLDER,
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
}).listen(EXAMPLES_PORT, () => {
  console.log('Running webpack server');
});
