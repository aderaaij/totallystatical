var gulp          = require('gulp')
var plugins       = require('gulp-load-plugins')()
var config        = require('../config/index')

// Fill in credentials and rename to deployFTP.js. Make sure deployFTP.js is in your .gitignore file so it won't be commited to Git.
var deployFTP = function() {
  return gulp.src(config.buildPath+'**/*')
    .pipe(plugins.ftp({
      host: 'host.com',
      user: 'user',
      pass: 'pass',
      remotePath: '/path/to/remote'
    }));
}

gulp.task('deploy:ftp', ['build:production'], deployFTP)
module.exports = deployFTP
