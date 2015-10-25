var gulp    = require('gulp')
var del     = require('del')
var config  = require('../config/index')

var cleanTask = function (cb) {
  return del(config.buildPath, cb)
}
gulp.task('clean', cleanTask)
module.exports = cleanTask