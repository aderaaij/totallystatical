// Distribution paths
var
  app_path       = 'app/',
  src_path        = app_path + 'src/',
  build_path      = app_path + 'build/';

// Gulp requirements
var
  gulp            = require('gulp'),
  sass            = require('gulp-sass'),
  jade            = require('gulp-jade'),
  jadeInheritance = require('gulp-jade-inheritance'),
  autoprefixer    = require('gulp-autoprefixer'),
  minifycss       = require('gulp-minify-css'),
  jshint          = require('gulp-jshint'),
  uglify          = require('gulp-uglify'),
  imagemin        = require('gulp-imagemin'),
  concat          = require('gulp-concat'),
  rename          = require('gulp-rename'),
  notify          = require('gulp-notify'),
  cache           = require('gulp-cache'),
  cached          = require('gulp-cached'),
  livereload      = require('gulp-livereload'),
  plumber         = require('gulp-plumber'),
  gutil           = require('gulp-util'),
  changed         = require('gulp-changed'),
  gulpif          = require('gulp-if'),
  filter          = require('gulp-filter'),
  del             = require('del');
  bower           = require('gulp-bower');

// Don't break watch on error
var onError = function (err) {
  gutil.beep();
  console.log(err);
  this.emit('end');
};

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('./bower_components'));
});

// Templates
gulp.task('templates', function() {
  return gulp.src(src_path+'**/*.jade')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(changed(build_path, {extension: '.html'}))
    .pipe(gulpif(global.isWatching, cached('jade')))
    .pipe(jadeInheritance({basedir: src_path}))
    .pipe(filter(function (file) {
      return !/\/_/.test(file.path) && !/^_/.test(file.relative);
    }))
    .pipe(jade({pretty: true}))
    .pipe(plumber({errorHandler: onError}))
    .pipe(gulp.dest(build_path))
    .pipe(notify({ message: 'templates task complete' }));
});

// Styles
gulp.task('styles', function() {
  return gulp.src(src_path+'assets/sass/screen.scss')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sass({outputStyle: 'nested'}))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest(build_path+'assets/css/'))
    .pipe(gulp.dest(theme_path + '/assets/css/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest(build_path+'assets/css/'))
    .pipe(gulp.dest(theme_path + '/assets/css/'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src([
      src_path+'assets/js/vendor/moment.js',
      src_path+'assets/js/vendor/pikaday.js',
      src_path+'assets/js/vendor/*.js',
      src_path+'assets/js/partials/*.js',
      src_path+'assets/js/*.js'
    ])
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(concat('script.js'))
    .pipe(gulp.dest(build_path + 'assets/js/'))
    .pipe(gulp.dest(theme_path + 'assets/js/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(build_path + 'assets/js/'))
    .pipe(gulp.dest(theme_path + 'assets/js/'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
  return gulp.src(src_path+'assets/img/**/**/*')
    .pipe(cache(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(build_path+'assets/img/'))
    .pipe(gulp.dest(theme_path + 'assets/img/'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Clear (image) cache
gulp.task('clear', function (done) {
  return cache.clearAll(done);
});

// Clean everything
gulp.task('clean', function(cb) {
  del([build_path+'assets/css', build_path+'assets/js', build_path+'assets/img', build_path], cb);
});

// Copy font files
gulp.task('copyfonts',['clean'], function() {
  gulp.src(src_path+'assets/fonts/**/*')
  .pipe(gulp.dest(build_path+'assets/fonts'))
  .pipe(gulp.dest(theme_path+'assets/fonts'));
});

// Default task
gulp.task('default', ['clean'], function() {
  gulp.start('clean', 'templates', 'styles', 'scripts', 'images', 'copyfonts');
});

// Set watch task for template caching and
gulp.task('setWatch', function() {
  global.isWatching = true;
});

// Watch
gulp.task('watch', ['setWatch', 'templates'], function() {

  // Watch .scss files
  gulp.watch(src_path+'assets/sass/**/*.scss', ['styles']);

  // Watch .jade files
  gulp.watch(src_path+'**/*.jade', ['templates']);

  // Images
  gulp.watch(src_path+'assets/img/**/*', ['images']);

  // Watch .js files
  gulp.watch(src_path+'assets/js/**/*.js', ['scripts']);

  // Copy stuff
  gulp.watch(src_path+'assets/fonts/**/*', ['copyfonts']);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in build/, reload on change
  gulp.watch([build_path+'/**/**/*']).on('change', livereload.changed);

});