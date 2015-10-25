var
  browserSync             = require('browser-sync'),
  gulp                    = require('gulp'),
  config                  = require('../config/index'),
  templates               = require('../config/templates'),
  styles                  = require('../config/styles'),
  scripts                 = require('../config/scripts'),
  images                  = require('../config/images'),
  svgSprite               = require('../config/svgsprite'),
  plugins                 = require('gulp-load-plugins')();

gulp.task('watch', ['browserSync','setWatch', 'templates', 'webpack:watch'], function() {
  plugins.watch(templates.source, function() { gulp.start('jade:watch'); });
  plugins.watch(styles.base, function() { gulp.start('styles'); });
  // plugins.watch(scripts.source, function() { gulp.start('scripts'); });
  plugins.watch(images.source, function() { gulp.start('images'); });
  plugins.watch(svgSprite.source, function() { gulp.start('svg:sprite'); });
});
