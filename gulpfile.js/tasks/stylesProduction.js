var browserSync         = require('browser-sync')
var gulp                = require('gulp')
var plugins             = require('gulp-load-plugins')()
var config              = require('../config/styles')
var errorHandler        = require('../lib/errorHandler')

var stylesProductionTask = function(cb) {
  return gulp.src(config.source)

    .pipe(plugins.sass(config.settings))

    .on('error', errorHandler)

    .pipe(plugins.autoprefixer(config.autoprefixer))

    .pipe(gulp.dest(config.dest))
}
gulp.task('styles:production', stylesProductionTask)
module.exports = stylesProductionTask
