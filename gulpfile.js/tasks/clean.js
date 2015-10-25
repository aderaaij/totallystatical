var gulp    = require('gulp')
var del     = require('del')
var config  = require('../config/index')

gulp.task('clean', function (cb) {
  return del(config.buildPath, cb)
})