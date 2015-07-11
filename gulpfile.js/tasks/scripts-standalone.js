var
  browserSync         = require('browser-sync'),
  gulp                = require('gulp'),
  plugins             = require('gulp-load-plugins')(),
  config              = require('../config/scripts-standalone')

// Copy files
gulp.task('scripts-standalone', function() {

  // Standalone scripts
  gulp.src(config.source)

  // only copy files that have been changed (on watch)
  .pipe(plugins.changed(config.dest))

  // Distribute to build
  .pipe(gulp.dest(config.dest))

  .pipe(browserSync.reload({stream:true}))

  // If is watching
  .pipe(plugins.if(global.isWatching, plugins.notify({ message: 'Standalone scripts task complete' })));
});