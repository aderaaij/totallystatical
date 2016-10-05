var browserSync   = require('browser-sync')
var gulp          = require('gulp')
var plugins       = require('gulp-load-plugins')()
var config        = require('../config/templates')
var errorHandler  = require('../lib/errorHandler')

var templatesTask = function() {
  return gulp.src(config.source)

  // Only build changed files
  .pipe(plugins.changed(config.dest, {extension: '.html'}))

  // Catch errors
  .on('error', errorHandler)

  // Cache templates if watching
  .pipe(plugins.if(global.isWatching, plugins.cached('pug')))

  // Watch partials for change
  .pipe(plugins.pugInheritance(config.pugInheritance))

  .on('error', errorHandler)

  // Ignore build of files starting with _
  .pipe(plugins.filter(file => {
    return !/\/_/.test(file.path) && !/^_/.test(file.relative)
  }))

  // Catch errors
  .on('error', errorHandler)

  // Output Jade
  .pipe(plugins.pug({pretty: true}))

  // Catch errors
  .on('error', errorHandler)

  // Distribute to build path
  .pipe(gulp.dest(config.dest))

  // Show notification
  .pipe(plugins.if(global.isWatching, plugins.notify({ message: 'templates task complete' })))
}
gulp.task('templates', templatesTask)
module.exports = templatesTask
