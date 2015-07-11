var
  gulp                = require('gulp'),
  plugins             = require('gulp-load-plugins')(),
  config              = require('../config/bower');

gulp.task('bower', function() {
  return plugins.bower()
    .pipe(gulp.dest(config.dest));
});