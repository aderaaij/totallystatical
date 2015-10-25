var gulp    = require('gulp')
var plugins = require('gulp-load-plugins')()

gulp.task('build:production', function(cb) {
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
    cb
  );
})