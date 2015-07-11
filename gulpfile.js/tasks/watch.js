var
  browserSync             = require('browser-sync'),
  gulp                    = require('gulp'),
  config                  = require('../config/index'),
  templates               = require('../config/templates'),
  styles                  = require('../config/styles'),
  scripts                 = require('../config/scripts'),
  images                  = require('../config/images'),
  plugins                 = require('gulp-load-plugins')();

gulp.task('watch', ['setWatch', 'templates'], function() {

  // Watch all the things with the gulp-watch plugins
  plugins.watch(templates.source, function() { gulp.start('jade-watch'); });
  plugins.watch(styles.base, function() { gulp.start('styles'); });
  plugins.watch(scripts.source, function() { gulp.start('scripts'); });
  plugins.watch(images.source, function() { gulp.start('images'); });

  // Start browsersync server
  browserSync({server: config.buildPath});
});
