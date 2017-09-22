const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const config = require('../config/templates');
const requireGlob = require('require-glob');
const errorHandler = require('../lib/errorHandler');

const templatesTask = () => gulp.src(config.source)
    .pipe(plugins.changed(config.dest, { extension: '.html' }))

    // Catch errors
    .on('error', errorHandler)

    // Cache templates if watching
    // .pipe(plugins.if(global.isWatching, plugins.cached('pug')))

    // Watch partials for change
    .pipe(plugins.pugInheritance(config.pugInheritance))

    .on('error', errorHandler)

    .pipe(plugins.plumber())

    // Ignore build of files starting with _
    .pipe(plugins.filter(file => !/\/_/.test(file.path) && !/^_/.test(file.relative)))

    // Catch errors
    .on('error', errorHandler)
    
    // Call plumber to continue task on error
    .pipe(plugins.plumber())

    // Pull in some data (overrides pug locals)
    .pipe(plugins.data(() => requireGlob('../../app/src/data/**/*.js', { bustCache: true })))

    // Output HTML from pug
    .pipe(plugins.pug({ pretty: true }))

    // Catch errors
    .on('error', errorHandler)

    // Distribute to build path
    .pipe(gulp.dest(config.dest))

    // Show notification
    .pipe(plugins.if(global.isWatching, plugins.notify({ message: 'templates task complete' })));

gulp.task('templates', templatesTask);
module.exports = templatesTask;
