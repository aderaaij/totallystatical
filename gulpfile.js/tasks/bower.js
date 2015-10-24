var
  gulp                = require('gulp'),
  plugins             = require('gulp-load-plugins')(),
  config              = require('../config/bower');

gulp.task('bower', function(cb) {
  return plugins.bower()
    .pipe(gulp.dest(config.dest));
});