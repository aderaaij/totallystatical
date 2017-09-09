const gulp = require('gulp');

const setWatch = () => {
    global.isWatching = true;
};

gulp.task('setWatch', setWatch);
module.exports = setWatch;
