const config = require('../lib/webpack-multi-config')('production');
const logger = require('../lib/compileLogger');
const gulp = require('gulp');
const path = require('path');
const webpack = require('webpack');

const webpackProductionTask = function (callback) {
    webpack(config, (err, stats) => {
        logger(err, stats);
        callback();
    });
};

gulp.task('webpack:production', webpackProductionTask);
module.exports = webpackProductionTask;
