var gulp = require('gulp')

var setWatch = function() {
  global.isWatching = true
}
gulp.task('setWatch', setWatch)
module.exports = setWatch
