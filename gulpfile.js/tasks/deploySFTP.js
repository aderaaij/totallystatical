var gulp          = require('gulp')
var plugins       = require('gulp-load-plugins')()
var config        = require('../config/index')

// Create a .ftppass file in the root folder with the credentials, fill in host and remotepath and deploy like the wind.
var deploySFTP = function() {
  return gulp.src(config.buildPath+'**/*')
    .pipe(plugins.sftp({
      host: '0.0.0.0',
      auth: 'keyMain',
      remotePath: '/httpdocs/'
    }));
}

gulp.task('deploy:sftp', ['build:production'], deploySFTP)
module.exports = deploySFTP
