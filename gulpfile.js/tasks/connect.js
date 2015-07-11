var
  gulp                    = require('gulp'),
  config                  = require('../config/index'),
  plugins                 = require('gulp-load-plugins')();

gulp.task('connect', function() {
  plugins.connect.server({
    root: config.buildPath,
    port: 9021,
    livereload: true,
  });
});