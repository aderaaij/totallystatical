const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');

function defaultTask(cb) {
    gulpSequence(
    'clean',
        [
            'images',
            'svg:sprite',
        ],
        [
            'scripts:standalone',
            'styles',
        ],
    'watch',
    cb,
  );
}
gulp.task('default', defaultTask);
module.exports = defaultTask;
