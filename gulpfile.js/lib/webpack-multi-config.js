var config          = require('../config/scripts')
var root            = require('../config/index')
var path            = require('path')
var webpack         = require('webpack')
var webpackManifest = require('./webpackManifest')

module.exports = function(env) {
  var filenamePattern = env === 'production' ? '[name]-[hash].js' : '[name].js'

  var webpackConfig = {
    // context: './app/src/assets/js/',
    cache: false,
    entry: config.entries,
    output: {
      path: path.resolve(__dirname, '../../app/build/assets/js/'),
      publicPath: '/js/',
      filename: filenamePattern
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
            // https://github.com/babel/babel-loader#options
            cacheDirectory: true,
            presets: ['es2015', 'stage-2']
          },
          exclude: /(node_modules|bower_components)/
        }
      ]
    },
    plugins: []
  }

  if(env === 'development') {
    webpackConfig.devtool = 'source-map'
    webpack.debug = true
  }

  // if(config.extractSharedJs) {
  //   webpackConfig.plugins.push(
  //     new webpack.optimize.CommonsChunkPlugin({
  //       name: 'shared',
  //       filename: 'shared.js',
  //     })
  //   )
  // }

  if(env === 'production') {
    webpackConfig.plugins.push(
      new webpackManifest('/js/', root.buildPath),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.NoErrorsPlugin()
    )
  }

  return webpackConfig
}
