const gulp = require('gulp');

const setWatch = function setWatchVariable() {
    global.isWatching = true;
};

gulp.task('setWatch', setWatch);
module.exports = setWatch;
