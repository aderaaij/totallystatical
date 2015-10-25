var browserSync   = require('browser-sync')
var gulp          = require('gulp')
var config        = require('../config/index')
var templates     = require('../config/templates')
var styles        = require('../config/styles')
var scripts       = require('../config/scripts')
var images        = require('../config/images')
var svgSprite     = require('../config/svgsprite')
var plugins       = require('gulp-load-plugins')()

gulp.task('watch', ['browserSync','setWatch', 'templates', 'webpack:watch'], function() {
  plugins.watch(templates.source, function() { gulp.start('jade:watch'); });
  plugins.watch(styles.base, function() { gulp.start('styles'); });
  // plugins.watch(scripts.source, function() { gulp.start('scripts'); });
  plugins.watch(images.source, function() { gulp.start('images'); });
  plugins.watch(svgSprite.source, function() { gulp.start('svg:sprite'); });
});
