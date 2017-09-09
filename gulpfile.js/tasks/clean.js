const gulp = require('gulp');
const del = require('del');
const config = require('../config/index');

const cleanTask = cb => del(config.buildPath, cb);

gulp.task('clean', cleanTask);
module.exports = cleanTask;
