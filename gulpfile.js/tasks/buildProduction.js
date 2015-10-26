var gulp    = require('gulp')
var plugins = require('gulp-load-plugins')()

var buildProductionTask = function(cb) {
  plugins.sequence(
    'clean',
    [
      'bower'
    ],
    [
      'images',
      'svg:sprite',
      'scripts:standalone'
    ],
    [
      'styles:production',
      'webpack:production',
      'templates'
    ],
    'rev',
    cb
  )
}
gulp.task('build:production', buildProductionTask)
module.exports = buildProductionTask