var
  gulp                = require('gulp'),
  browserSync         = require('browser-sync');

gulp.task('jade-watch', ['templates'], browserSync.reload);