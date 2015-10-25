var gulp                = require('gulp')
var express             = require('express')
var config              = require('../config/server')
var compress            = require('compression')
var logger              = require('morgan')
var open                = require('open')
var plugins             = require('gulp-load-plugins')()

var serverTask = function() {
  var url = 'http://localhost:' + config.port

  express()
    .use(compress())
    .use(logger(config.logLevel))
    .use('/', express.static(config.root, config.staticOptions))
    .listen(config.port)

  plugins.util.log('production server started on ' + plugins.util.colors.green(url))
  open(url)
}

gulp.task('server', serverTask)
module.exports = serverTask