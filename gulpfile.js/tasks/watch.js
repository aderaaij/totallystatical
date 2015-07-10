var
  gulp                    = require('gulp'),
  config                  = require('../config/index'),
  templates               = require('../config/templates'),
  plugins                 = require('gulp-load-plugins')();

gulp.task('watch', function() {

  // Watch all the things with the gulp-watch plugins
  plugins.watch(templates.source, function() { gulp.start('templates'); });


  // Start livereload listener
  plugins.livereload.listen();

  // Watch folder with default gulp watch livereload somehow doesn't work with the gulp-watch plugin
  // gulp.watch([config.buildPath+'**/*']).on('change', plugins.livereload.changed)
});
