var browserSync = require('browser-sync')
var gulp        = require('gulp')
var config      = require('../config/browserSync')

var browserSyncTask = function() {
  return browserSync(config)
}
gulp.task('browserSync', browserSyncTask)
module.exports = browserSyncTask