var gulp    = require('gulp')
var plugins = require('gulp-load-plugins')()

gulp.task('build', function(cb) {
  plugins.sequence(
    'clean',
    [
      'bower'
    ],
    [
      'images',
      'svg:sprite',
      'webpack:production'
    ],
    [
      'styles',
      'scripts',
      'templates'
    ],
    cb
  );
});