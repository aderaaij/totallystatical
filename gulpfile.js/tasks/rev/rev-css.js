const config = require('../../config');
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const path = require('path');

// 4) Rev and compress CSS and JS files (this is done after assets, so that if a
//    referenced asset hash changes, the parent hash will change as well
gulp.task('rev-css', () => gulp.src(path.join(config.buildPath, '**/*.css'))
    .pipe(plugins.replace('assets/img/', '../img/'))
    .pipe(plugins.rev())
    .pipe(plugins.cssnano())
    .pipe(gulp.dest(config.buildPath))
    .pipe(plugins.revNapkin({ verbose: false }))
    .pipe(plugins.rev.manifest(path.join(config.buildPath, 'rev-manifest.json'), { merge: true }))
    .pipe(gulp.dest('')));
