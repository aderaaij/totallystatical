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

// Install bower components in specified folder
gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('./bower_components'));
});

// Execute Jade Templates
gulp.task('templates', function() {
  return gulp.src(src_path+'**/*.jade')
    // Catch errors
    .pipe(plumber({errorHandler: onError}))

    // Only build changed files
    .pipe(changed(build_path, {extension: '.html'}))

    .pipe(gulpif(global.isWatching, cached('jade')))

    // Watch partials for change
    .pipe(jadeInheritance({basedir: src_path}))

    // Ignore build of files starting with _
    .pipe(filter(function (file) {
      return !/\/_/.test(file.path) && !/^_/.test(file.relative);
    }))

    // Output Jade
    .pipe(jade({pretty: true}))

    // Catch errors
    .pipe(plumber({errorHandler: onError}))

    // Distribute to build path
    .pipe(gulp.dest(build_path))

    // Show notification
    .pipe(notify({ message: 'templates task complete' }));
});

// Styles
gulp.task('styles', ['bower'], function() {
  return gulp.src(src_path+'assets/sass/screen.scss')

    // Catch errors
    .pipe(plumber({errorHandler: onError}))

    // Specify output style
    .pipe(sass({outputStyle: 'nested'}))

    // Autoprefixer
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))

    // Distribute to build
    .pipe(gulp.dest(build_path+'assets/css/'))

    // Add a .min version
    .pipe(rename({ suffix: '.min' }))

    // Minify .min version
    .pipe(minifycss())

    // Distribute to build path
    .pipe(gulp.dest(build_path+'assets/css/'))

    // Show notification
    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', ['bower'], function() {
  return gulp.src([
      src_path+'assets/js/vendor/*.js',
      src_path+'assets/js/partials/*.js',
      src_path+'assets/js/*.js'
    ])

    // Catch Errors
    .pipe(plumber({errorHandler: onError}))

    // Concatinate in one file
    .pipe(concat('script.js'))

    // Distribute to build
    .pipe(gulp.dest(build_path + 'assets/js/'))

    // Add a .min version
    .pipe(rename({ suffix: '.min' }))

    // Minify with jsUglify
    .pipe(uglify())

    // Distribute to build
    .pipe(gulp.dest(build_path + 'assets/js/'))

    // Show notifcation
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
  return gulp.src(src_path+'assets/img/**/**/*')

    // Image optimization
    .pipe(cache(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))

    // Distribute to build path
    .pipe(gulp.dest(build_path+'assets/img/'))

    // Show notification
    .pipe(notify({ message: 'Images task complete' }));
});

// Clear (image) cache
gulp.task('clear', function (done) {
  return cache.clearAll(done);
});

// Clean out build
gulp.task('clean', function(cb) {
  del(build_path, cb);
});

// Copy font files, clean before copy
gulp.task('copyfonts', ['clean'], function() {
  gulp.src(src_path+'assets/fonts/**/*')
  .pipe(gulp.dest(build_path+'assets/fonts'));
});

// Run clean task before default task
gulp.task('default', ['clean'], function() {
  gulp.start('bower', 'templates', 'styles', 'scripts', 'images', 'copyfonts');
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

  // Watch image folder
  gulp.watch(src_path+'assets/img/**/*', ['images']);

  // Watch .js files
  gulp.watch(src_path+'assets/js/**/*.js', ['scripts']);

  // Copy fonts
  gulp.watch(src_path+'assets/fonts/**/*', ['copyfonts']);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in build directory, reload on change
  gulp.watch([build_path+'/**/**/*']).on('change', livereload.changed);

});