const config = require('../lib/webpack-multi-config')('production');
const logger = require('../lib/compileLogger');
const gulp = require('gulp');
const webpack = require('webpack');

const webpackProduction = (callback) => {
    webpack(config, (err, stats) => {
        logger(err, stats);
        callback();
    });
};

gulp.task('webpack:production', webpackProduction);
module.exports = webpackProduction;
