const ExtractTextPlugin = require('extract-text-webpack-plugin');
const nib = require('nib');
const path = require('path');
const babelOptions = require('./babelOptions.js');
const webpack = require('webpack');


module.exports = {
  devtool: 'source-map',
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'react-hot'},
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
  entry: {
    app: ['./example/index.js']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/assets/',
    filename: 'index.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  stylus: {
    use: [nib()],
    import: ['~nib/lib/nib/index.styl']
  }
};
