var
  gulp                = require('gulp'),
  plugins             = require('gulp-load-plugins')(),
  config              = require('../config/images');

// Images
gulp.task('images', function() {
  return gulp.src(config.source)

    // Only add to stream if changed
    .pipe(plugins.changed(config.dest))

    // Image optimization
    .pipe(plugins.imagemin(config.imagemin))

    // Distribute to build path
    .pipe(gulp.dest(config.dest))

    // Show notification
    .pipe(plugins.if(global.isWatching, plugins.notify({ message: 'Images task complete' })));
});