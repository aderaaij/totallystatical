var
  gulp                = require('gulp'),
  plugins             = require('gulp-load-plugins')();

gulp.task('build', function(cb) {
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
      'styles',
      'scripts',
      'templates'
    ],
    cb
  );
});