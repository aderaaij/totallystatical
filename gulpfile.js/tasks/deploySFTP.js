const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const config = require('../config/index');

// Rename the .ftppass-example.json file to .ftppass.json and change the referred name here
const ftppass = require('../../.ftppass-example');

const sftp = () =>
    gulp.src(`${config.buildPath}**/*`)
        .pipe(plugins.sftp({
            host: ftppass.host,
            user: ftppass.user,
            pass: ftppass.pass,
            port: ftppass.sftpPort,
            remotePath: ftppass.remotePath,
        }));

gulp.task('deploy:sftp', ['build:production'], sftp);
module.exports = sftp;
