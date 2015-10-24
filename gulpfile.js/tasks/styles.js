var
  browserSync         = require('browser-sync'),
  gulp                = require('gulp'),
  plugins             = require('gulp-load-plugins')(),
  config              = require('../config/styles'),
  errorHandler        = require('../lib/errorHandler');

// Styles
gulp.task('styles', function() {
  return gulp.src(config.source)

    // Specify output style
    .pipe(plugins.sass(config.settings))

    // Catch errors
    .on('error', errorHandler)

    // Autoprefixer
    .pipe(plugins.autoprefixer(config.autoprefixer))

    // Add a .min version
    .pipe(plugins.rename({suffix: '.min'}))

    // Minify .min version
    // .pipe(plugins.minifyCss())

    // Distribute to build path
    .pipe(gulp.dest(config.dest))

    // Livereload connect
    .pipe(browserSync.reload({stream:true}))

    // Show notification
    .pipe(plugins.if(global.isWatching, plugins.notify({ message: 'Styles task complete' })));
});