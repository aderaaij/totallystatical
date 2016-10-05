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
  plugins.watch(templates.source, () => { gulp.start('pug:watch') })
  plugins.watch(styles.base, () => { gulp.start('styles') })
  plugins.watch(images.source, () => { gulp.start('images') })
  plugins.watch(svgSprite.source,() => { gulp.start('svg:sprite') })
}

gulp.task('watch', ['browserSync','setWatch', 'templates', 'webpack:watch'], watchTask)
module.exports = watchTask
