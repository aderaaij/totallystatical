const config = require('../../config');
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const path = require('path');


// 1) Add md5 hashes to assets referenced by CSS and JS files
gulp.task('rev-assets', () => {
    // Ignore files that may reference assets. We'll rev them next.
    const ignoreThese = `!${path.join(config.buildPath, '/**/*+(css|js|json|html)')}`;

    return gulp.src([path.join(config.buildPath, '/**/*'), ignoreThese])
        .pipe(plugins.rev())
        .pipe(gulp.dest(config.buildPath))
        .pipe(plugins.revNapkin({ verbose: false }))
        .pipe(plugins.rev.manifest(path.join(config.buildPath, 'rev-manifest.json'), { merge: true }))
        .pipe(gulp.dest(''));
});
