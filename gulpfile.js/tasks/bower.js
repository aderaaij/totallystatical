var gulp    = require('gulp')
var plugins = require('gulp-load-plugins')()
var config  = require('../config/bower')

var bowerTask = function(cb) {
  return plugins.bower()
    .pipe(gulp.dest(config.dest))
}
gulp.task('bower', bowerTask)
module.exports = bowerTask