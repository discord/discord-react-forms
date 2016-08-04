const webpack = require('webpack');
const webpackConfig = require('./helpers/webpack.config');

webpack(webpackConfig.getBuildConfig(), (err, stats) => {
  if (err) {
    console.error(err);
  }
  else {
    console.log(stats.toString({colors: true}));
  }
});
