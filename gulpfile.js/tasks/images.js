var browserSync         = require('browser-sync')
var gulp                = require('gulp')
var plugins             = require('gulp-load-plugins')()
var config              = require('../config/images')

// Images
var imagesTask = function() {
  return gulp.src(config.source)

  // Only add to stream if changed
  .pipe(plugins.changed(config.dest))

  // Image optimization
  .pipe(plugins.imagemin(config.imagemin))

  // Distribute to build path
  .pipe(gulp.dest(config.dest))

  // Notify browsersync of changes
  .pipe(browserSync.stream())

  // Show notification if watching
  .pipe(plugins.if(global.isWatching, plugins.notify({ message: 'Images task complete' })))

}
gulp.task('images', imagesTask)
module.exports = imagesTask