const browserSync = require('browser-sync');
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const config = require('../config/scriptsStandalone');

// Copy files
const scriptsStandalone = () => gulp.src(config.source)

    // only copy files that have been changed (on watch)
    .pipe(plugins.changed(config.dest))

    // Distribute to build
    .pipe(gulp.dest(config.dest))

    .pipe(browserSync.stream())

    // If is watching
    .pipe(plugins.if(global.isWatching, plugins.notify({ message: 'Standalone scripts task complete' })));

gulp.task('scripts:standalone', scriptsStandalone);
module.exports = scriptsStandalone;
