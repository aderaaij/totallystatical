const config = require('../../config');
const gulp = require('gulp');
const path = require('path');
const rev = require('gulp-rev');
const revNapkin = require('gulp-rev-napkin');

// 1) Add md5 hashes to assets referenced by CSS and JS files
gulp.task('rev-assets', () => {
  // Ignore files that may reference assets. We'll rev them next.
    const ignoreThese = `!${path.join(config.buildPath, '/**/*+(css|js|json|html)')}`;

    return gulp.src([path.join(config.buildPath, '/**/*'), ignoreThese])
    .pipe(rev())
    .pipe(gulp.dest(config.buildPath))
    .pipe(revNapkin({ verbose: false }))
    .pipe(rev.manifest(path.join(config.buildPath, 'rev-manifest.json'), { merge: true }))
    .pipe(gulp.dest(''));
});
