const config = require('../../config');
const gulp = require('gulp');
const repeatString = require('../../lib/repeatString');
const sizereport = require('gulp-sizereport');

// 6) Report sizes
gulp.task('size-report', () => {
    const hashedFiles = `/**/*-${repeatString('[a-z,0-9]', 8)}*.*`;

    return gulp.src([config.buildPath + hashedFiles, '*!rev-manifest.json'])
    .pipe(sizereport({
        gzip: true,
    }));
});
