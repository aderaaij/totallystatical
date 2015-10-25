var
  browserSync         = require('browser-sync'),
  gulp                = require('gulp'),
  plugins             = require('gulp-load-plugins')(),
  config              = require('../config/images');

// Images
gulp.task('images', ['svg:sprite'], function() {
  return gulp.src(config.source)

  // Only add to stream if changed
  .pipe(plugins.changed(config.dest))

  // Image optimization
  .pipe(plugins.imagemin(config.imagemin))

  // Distribute to build path
  .pipe(gulp.dest(config.dest))

  // Notify browsersync of changes
  .pipe(browserSync.stream())

  // Show notification
  .pipe(plugins.if(global.isWatching, plugins.notify({ message: 'Images task complete' })));

});