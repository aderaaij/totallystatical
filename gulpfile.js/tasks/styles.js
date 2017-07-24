const browserSync = require('browser-sync');
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const config = require('../config/styles');
const errorHandler = require('../lib/errorHandler');

const stylesDefault = function stylesDefaultTask() {
    return gulp.src(config.source)

    .pipe(plugins.sourcemaps.init())

    .pipe(plugins.sass(config.settings))

    .on('error', errorHandler)

    .pipe(plugins.autoprefixer(config.autoprefixer))

    .pipe(plugins.sourcemaps.write('./'))

    .pipe(gulp.dest(config.dest))

    .pipe(browserSync.stream())

    .pipe(plugins.if(global.isWatching, plugins.notify({ message: 'Styles task complete' })));
};

gulp.task('styles', stylesDefault);
module.exports = stylesDefault;
