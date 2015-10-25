var gulp                = require('gulp')
var browserSync         = require('browser-sync')

gulp.task('jade:watch', ['templates'], browserSync.reload)