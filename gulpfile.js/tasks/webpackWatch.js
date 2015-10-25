var webpackConfig = require('../lib/webpack-multi-config')
var logger        = require('../lib/compileLogger')
var gulp          = require('gulp')
var webpack       = require('webpack')
var browserSync   = require('browser-sync')

var webpackWatchTask = function(callback) {
  var initialCompile = false

  webpack(webpackConfig('development')).watch(200, function(err, stats) {
    logger(err, stats)
    browserSync.reload()
    // On the initial compile, let gulp know the task is done
    if(!initialCompile) {
      initialCompile = true
      callback()
    }
  })
}

gulp.task('webpack:watch', webpackWatchTask)
module.exports = webpackWatchTask