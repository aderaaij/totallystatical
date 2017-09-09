const gulp = require('gulp');
const express = require('express');
const config = require('../config/server');
const compress = require('compression');
const logger = require('morgan');
const open = require('open');
const plugins = require('gulp-load-plugins')();

const server = () => {
    const url = `http://localhost:${config.port}`;

    express()
        .use(compress())
        .use(logger(config.logLevel))
        .use('/', express.static(config.root, config.staticOptions))
        .listen(config.port);

    plugins.util.log(`production server started on ${plugins.util.colors.green(url)}`);
    open(url);
};

gulp.task('server', server);
module.exports = server;
