const ExtractTextPlugin = require('extract-text-webpack-plugin');
const nib = require('nib');
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
        loaders: [
          'style',
          'css?camelCase&modules&sourceMap&importLoaders=1&localIdentName=forms-[local]',
          'postcss'
        ]
      }
    ]
  },
  postcss: [
    require('postcss-import')(),
    require('postcss-simple-vars')({ silent: true }),
    require('postcss-url')({
      url: 'inline'
    }),
    require('postcss-short-size')(),
    require('postcss-pxtorem')(),
    require('postcss-color-function')(),
    require('postcss-reporter'),
    require('postcss-browser-reporter'),
    require('postcss-inline-comment'),
    require('autoprefixer')({browsers: ['last 2 versions']})
  ]
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
