const config = require('../../config');
const gulp = require('gulp');
const cssnano = require('gulp-cssnano');
const path = require('path');
const rev = require('gulp-rev');
const revNapkin = require('gulp-rev-napkin');

// 4) Rev and compress CSS and JS files (this is done after assets, so that if a
//    referenced asset hash changes, the parent hash will change as well
gulp.task('rev-css', () => gulp.src(path.join(config.buildPath, '**/*.css'))
    .pipe(rev())
    .pipe(cssnano())
    .pipe(gulp.dest(config.buildPath))
    .pipe(revNapkin({ verbose: false }))
    .pipe(rev.manifest(path.join(config.buildPath, 'rev-manifest.json'), { merge: true }))
    .pipe(gulp.dest('')));
