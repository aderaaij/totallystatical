const webpackConfig = require('../lib/webpack-multi-config');
const logger = require('../lib/compileLogger');
const gulp = require('gulp');
const webpack = require('webpack');
const browserSync = require('browser-sync');

const webpackWatchTask = function webpackWatchTask(callback) {
    let initialCompile = false;

    webpack(webpackConfig('development')).watch(200, (err, stats) => {
        logger(err, stats);
        browserSync.reload();
    // On the initial compile, let gulp know the task is done
        if (!initialCompile) {
            initialCompile = true;
            callback();
        }
    });
};

gulp.task('webpack:watch', webpackWatchTask);
module.exports = webpackWatchTask;
