
var
  html_path       = './app/html/'
  src_path        = html_path+'src/',
  build_path      = html_path+'build/';

var
  gulp            = require('gulp'),
  sass            = require('gulp-sass'),
  jade            = require('gulp-jade'),
  autoprefixer    = require('gulp-autoprefixer'),
  minifycss       = require('gulp-minify-css'),
  jshint          = require('gulp-jshint'),
  uglify          = require('gulp-uglify'),
  imagemin        = require('gulp-imagemin'),
  spritesmith     = require('gulp.spritesmith'),
  concat          = require('gulp-concat'),
  rename          = require('gulp-rename'),
  notify          = require('gulp-notify'),
  cache           = require('gulp-cache'),
  livereload      = require('gulp-livereload'),
  plumber         = require('gulp-plumber'),
  gutil           = require('gulp-util'),
  inlinecss       = require('gulp-inline-css'),
  del             = require('del');

// Stop breaking watch on error
var onError = function (err) {  
  gutil.beep();
  console.log(err);
  this.emit('end');
};

// Templates
gulp.task('templates', function() {
  return gulp.src(src_path+'**/*.jade')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(jade({
      pretty: true
    }))
    .pipe(plumber({
      errorHandler: onError
    }))
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
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest(build_path+'assets/css/'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src([src_path+'assets/js/libs/*.js', src_path+'assets/js/*.js'])
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(concat('script.js'))
    .pipe(gulp.dest(build_path+'assets/js/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(build_path+'assets/js/'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Clear (image) cache
gulp.task('clear', function (done) {
  return cache.clearAll(done);
});

// Clean
gulp.task('clean', function(cb) {
  del([build_path+'assets/css', build_path+'assets/js', build_path+'assets/img', 'build/'], cb)
});

// Default task
gulp.task('default', ['clean'], function() {
  gulp.start('templates', 'styles', 'scripts');
});

// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch(src_path+'assets/sass/**/*.scss', ['styles']);
  
  // Watch .jade files
  gulp.watch(src_path+'**/*.jade', ['templates']);

  // Watch .js files
  gulp.watch(src_path+'assets/js/**/*.js', ['scripts']);


  // Create LiveReload server
  livereload.listen();
 
  // Watch any files in build/, reload on change
  gulp.watch([build_path+'**']).on('change', livereload.changed);

});
