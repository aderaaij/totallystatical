const config = require('../../config');
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const path = require('path');

// 2) Update asset references with reved filenames in compiled css + js
gulp.task('rev-update-references', () => {
    const manifest = gulp.src(path.join(config.buildPath, 'rev-manifest.json'));

    return gulp.src(path.join(config.buildPath, '**/**.{css,js}'))
        .pipe(plugins.replace('url(../img/', 'url(assets/img/'))
        .pipe(plugins.revReplace({ manifest }))
        .pipe(gulp.dest(config.buildPath));
});
