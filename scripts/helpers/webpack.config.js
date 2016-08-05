const ExtractTextPlugin = require('extract-text-webpack-plugin');
const nib = require('nib');
const path = require('path');
const babelOptions = require('./babelOptions.js');
const webpack = require('webpack');
const {EXAMPLES_PORT} = require('./Constants');

const baseOptions = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: babelOptions
      },
      {
        test: /\.(styl|css)$/,
        loader: 'style!css!stylus'
      }
    ]
  },
  stylus: {
    use: [nib()],
    import: ['~nib/lib/nib/index.styl']
  }
};

function getWatchConfig() {
  return getConfig(false);
}

function getBuildConfig() {
  return getConfig(true);
}

function getConfig(build) {
  let options;
  if (build) {
    options = {
      entry: './lib/index.js',
      output: {filename: 'index.js'}
    };
  }
  else {
    options = {
      devtool: 'source-map',
      loaders: [
        {test: /\.js$/, exclude: /node_modules/, loader: 'react-hot'},
      ],
      entry: [
        './example/index.js',
        `webpack-dev-server/client?http://0.0.0.0:${EXAMPLES_PORT}`,
        'webpack/hot/only-dev-server'
      ],
      output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/assets/',
        filename: 'index.js'
      },
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
      ]
    };
  }

  return Object.assign({}, options, baseOptions);
}

module.exports = {getWatchConfig, getBuildConfig};
