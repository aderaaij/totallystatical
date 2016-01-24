var gulp          = require('gulp')
var plugins       = require('gulp-load-plugins')()
var config        = require('../config/index')

// Rename the .ftppass-example.json file to .ftppass.json and change the referred name here
var ftppass       = require('../../.ftppass-example')

var deploySFTP = function() {
  return gulp.src(config.buildPath+'**/*')
    .pipe(plugins.sftp({
      host: ftppass.host,
      user: ftppass.user,
      pass: ftppass.pass,
      port: ftppass.sftpPort,
      remotePath: ftppass.remotePath
    }));
}

gulp.task('deploy:sftp', ['build:production'], deploySFTP)
module.exports = deploySFTP
