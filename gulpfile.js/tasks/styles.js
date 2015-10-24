var
  browserSync         = require('browser-sync'),
  gulp                = require('gulp'),
  plugins             = require('gulp-load-plugins')(),
  config              = require('../config/styles'),
  errorHandler        = require('../lib/errorHandler');

gulp.task('styles', function(cb) {
  return gulp.src(config.source)

    .pipe(plugins.sourcemaps.init())

    .pipe(plugins.sass(config.settings))

    .on('error', errorHandler)

    .pipe(plugins.autoprefixer(config.autoprefixer))

    .pipe(plugins.sourcemaps.write('./'))

    .pipe(gulp.dest(config.dest))

    .pipe(browserSync.reload({stream:true}))

    .pipe(plugins.if(global.isWatching, plugins.notify({ message: 'Styles task complete' })));
});

gulp.task('styles:production', function(cb) {
  return gulp.src(config.source)

    .pipe(plugins.sass(config.settings))

    .on('error', errorHandler)

    .pipe(plugins.autoprefixer(config.autoprefixer))

    .pipe(plugins.minifyCss())

    .pipe(gulp.dest(config.dest))
});