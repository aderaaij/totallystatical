var gulp    = require('gulp')
var plugins = require('gulp-load-plugins')()
var config  = require('../config/bower')

gulp.task('bower', function(cb) {
  return plugins.bower()
    .pipe(gulp.dest(config.dest))
})