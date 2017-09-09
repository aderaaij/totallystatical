const gulp = require('gulp');
const config = require('../../config');
const revReplace = require('gulp-rev-replace');
const path = require('path');

// 5) Update asset references in HTML
gulp.task('update-html', () => {
    const manifest = gulp.src(path.join(config.buildPath, 'rev-manifest.json'));
    return gulp.src(path.join(config.buildPath, '**/*.html'))
        .pipe(revReplace({ manifest }))
        .pipe(gulp.dest(config.buildPath));
});
