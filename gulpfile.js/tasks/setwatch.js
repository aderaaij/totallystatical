const gulp = require('gulp');

const setWatch = function () {
    global.isWatching = true;
};
gulp.task('setWatch', setWatch);
module.exports = setWatch;
