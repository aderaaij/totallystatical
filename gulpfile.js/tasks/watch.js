var browserSync   = require('browser-sync')
var gulp          = require('gulp')
var config        = require('../config/index')
var templates     = require('../config/templates')
var styles        = require('../config/styles')
var scripts       = require('../config/scripts')
var images        = require('../config/images')
var svgSprite     = require('../config/svgsprite')
var plugins       = require('gulp-load-plugins')()

var watchTask = function() {
  plugins.watch(templates.source, function() { gulp.start('jade:watch') })
  plugins.watch(styles.base, function() { gulp.start('styles') })
  plugins.watch(images.source, function() { gulp.start('images') })
  plugins.watch(svgSprite.source, function() { gulp.start('svg:sprite') })
}

gulp.task('watch', ['browserSync','setWatch', 'templates', 'webpack:watch'], watchTask)
module.exports = watchTask