const path = require('path');
const babelOptions = require('./babelOptions.js');
const webpack = require('webpack');
const {EXAMPLES_PORT, LIB_FOLDER, EXAMPLES_FOLDER, EXAMPLES_OUTPUT_FOLDER} = require('./Constants');

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
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: ['style', 'css']
      }
    ]
  },
};

function getWatchConfig() {
  return getConfig('watch');
}

function getBuildConfig() {
  return getConfig('build');
}

function getExampleBuildConfig() {
  return getConfig('example-build');
}

function getConfig(target) {
  let options;
  if (target == 'build') {
    options = {
      entry: `${LIB_FOLDER}/index.js`,
      output: {
        filename: 'index.js',
        libraryTarget: 'umd'
      }
    };
  }
  else if (target == 'watch') {
    options = {
      devtool: 'source-map',
      loaders: [
        {test: /\.js$/, exclude: /node_modules/, loader: 'react-hot'},
      ],
      entry: [
        `${EXAMPLES_FOLDER}/index.js`,
        `webpack-dev-server/client?http://0.0.0.0:${EXAMPLES_PORT}`,
        'webpack/hot/only-dev-server'
      ],
      output: {
        path: path.resolve('./', EXAMPLES_OUTPUT_FOLDER),
        filename: 'index.js',
        publicPath: '/assets/'
      },
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
      ]
    };
  }
  else if (target == 'example-build') {
    options = {
      entry: `${EXAMPLES_FOLDER}/index.js`,
      output: {
        path: path.resolve('./', EXAMPLES_OUTPUT_FOLDER),
        filename: 'index.js',
        publicPath: '/assets/'
      }
    };
  }

  return Object.assign({}, options, baseOptions);
}

module.exports = {getWatchConfig, getBuildConfig, getExampleBuildConfig};
