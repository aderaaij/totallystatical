var
  gulp                = require('gulp'),
  plugins             = require('gulp-load-plugins')();

gulp.task('build:production', function(cb) {
  plugins.sequence(
    'clean',
    [
      'bower'
    ],
    [
      'images',
      'scripts:standalone'
    ],
    [
      'styles:production',
      'scripts:production',
      'templates'
    ],
    cb
  );
});