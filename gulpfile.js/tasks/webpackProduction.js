var config  = require('../lib/webpack-multi-config')('production')
var logger  = require('../lib/compileLogger')
var gulp    = require('gulp')
var path    = require('path')
var webpack = require('webpack')

var webpackProductionTask = function(callback) {
  webpack(config, function(err, stats) {
    logger(err, stats)
    callback()
  })
}

gulp.task('webpack:production', webpackProductionTask)
module.exports = webpackProductionTask