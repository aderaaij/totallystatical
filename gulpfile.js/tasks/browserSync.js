const browserSync = require('browser-sync');
const gulp = require('gulp');
const config = require('../config/browserSync');

const browserSyncTask = function startBrowserSyncTask() {
    return browserSync(config);
};
gulp.task('browserSync', browserSyncTask);
module.exports = browserSyncTask;
