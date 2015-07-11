var
  gulp                    = require('gulp'),
  config                  = require('../config/index'),
  templates               = require('../config/templates'),
  styles                  = require('../config/styles'),
  plugins                 = require('gulp-load-plugins')();

gulp.task('watch', ['templates', 'browserSync'], function() {

  // Watch all the things with the gulp-watch plugins
  plugins.watch(templates.source, function() { gulp.start('templates'); });
  plugins.watch(styles.base, function() { gulp.start('styles'); });

  // Start livereload listener
  // plugins.livereload.listen();

  // Watch folder with default gulp watch livereload somehow doesn't work with the gulp-watch plugin
  // gulp.watch([config.buildPath+'**/*']).on('change', plugins.livereload.changed)
});
