var
  gulp     = require('gulp'),
  express  = require('express'),
  config   = require('../config/server'),
  compress = require('compression'),
  logger   = require('morgan'),
  open     = require('open'),
  plugins             = require('gulp-load-plugins')();

gulp.task('server', function() {
  var url = 'http://localhost:' + config.port;

  express()
    .use(compress())
    .use(logger(config.logLevel))
    .use('/', express.static(config.root, config.staticOptions))
    .listen(config.port)

  plugins.util.log('production server started on ' + plugins.util.colors.green(url));
  open(url);
});