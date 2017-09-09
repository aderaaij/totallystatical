const gulp = require('gulp');
const browserSync = require('browser-sync');

gulp.task('pug:watch', ['templates'], browserSync.reload);
