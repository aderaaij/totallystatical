const browserSync = require('browser-sync');
const gulp = require('gulp');
const config = require('../config/browserSync');

const browserSyncTask = () => browserSync(config);

gulp.task('browserSync', browserSyncTask);
module.exports = browserSyncTask;
