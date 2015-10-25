var browserSync   = require('browser-sync')
var gulp          = require('gulp')
var plugins       = require('gulp-load-plugins')()
var config          = require('../config/scriptsStandalone')

// Copy files
gulp.task('scripts:standalone', function() {

  // Standalone scripts
  gulp.src(config.source)

  // only copy files that have been changed (on watch)
  .pipe(plugins.changed(config.dest))

  // Distribute to build
  .pipe(gulp.dest(config.dest))

  .pipe(browserSync.stream())

  // If is watching
  .pipe(plugins.if(global.isWatching, plugins.notify({ message: 'Standalone scripts task complete' })))
})