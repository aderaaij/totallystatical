var gulp                = require('gulp')
var browserSync         = require('browser-sync')

gulp.task('pug:watch', ['templates'], browserSync.reload)
