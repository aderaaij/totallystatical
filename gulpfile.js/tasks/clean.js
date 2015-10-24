var
  gulp = require('gulp'),
  del = require('del'),
  config = require('../config/index');

gulp.task('clean', function (cb) {
  return del(config.buildPath, cb);
});