const browserSync = require('browser-sync');
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const config = require('../config/styles');
const errorHandler = require('../lib/errorHandler');

const stylesProductionTask = function (cb) {
    return gulp.src(config.source)

    .pipe(plugins.sass(config.settings))

    .on('error', errorHandler)

    .pipe(plugins.autoprefixer(config.autoprefixer))

    .pipe(gulp.dest(config.dest));
};
gulp.task('styles:production', stylesProductionTask);
module.exports = stylesProductionTask;
