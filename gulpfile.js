// Distribution paths
var
  app_path       = 'app/',
  src_path        = app_path + 'src/',
  build_path      = app_path + 'build/';

// Requirements, gulp plugins loaded  with gulp-load-plugins
var
  gulp                = require('gulp'),
  del                 = require('del'),
  gulpLoadPlugins     = require('gulp-load-plugins'),
  plugins             = gulpLoadPlugins({
    rename: {
        'gulp-if' : 'gulpIf',
        'gulp-minify-css': 'minifyCss'
      }
    });

// Don't break watch on error
var onError = function (err) {
  plugins.gulputil.beep();
  console.log(err);
  this.emit('end');
};

// Install bower components in specified folder
gulp.task('bower', function() {
  return plugins.bower()
    .pipe(gulp.dest('./bower_components'));
});

// Local server
gulp.task('connect', function() {
  plugins.connect.server({
    root: 'app/build',
    port: 9021,
    livereload: true,
  });
});

// Execute Jade Templates
gulp.task('templates', function() {
  return gulp.src(src_path+'**/*.jade')
    // Catch errors
    .pipe(plugins.plumber({errorHandler: onError}))

    // Only build changed files
    .pipe(plugins.changed(build_path, {extension: '.html'}))

    .pipe(plugins.gulpIf(global.isWatching, plugins.cached('jade')))

    // Watch partials for change
    .pipe(plugins.jadeInheritance({basedir: src_path}))

    // Ignore build of files starting with _
    .pipe(plugins.filter(function (file) {
      return !/\/_/.test(file.path) && !/^_/.test(file.relative);
    }))

    // Output Jade
    .pipe(plugins.jade({pretty: true}))

    // Catch errors
    .pipe(plugins.plumber({errorHandler: onError}))

    // Distribute to build path
    .pipe(gulp.dest(build_path))

    // Livereload
    .pipe(plugins.connect.reload())

    // Show notification
    .pipe(plugins.gulpIf(global.isWatching, plugins.notify({ message: 'templates task complete' })));
});

// Styles
gulp.task('styles', function() {
  return gulp.src(src_path+'assets/sass/screen.scss')

    // Catch errors
    .pipe(plugins.plumber({errorHandler: onError}))

    // Specify output style
    .pipe(plugins.sass({outputStyle: 'nested'}))

    // Autoprefixer
    .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))

    // Distribute to build
    .pipe(gulp.dest(build_path + 'assets/css/'))

    // Add a .min version
    .pipe(plugins.rename({ suffix: '.min' }))

    // Minify .min version
    .pipe(plugins.minifyCss())

    // Distribute to build path
    .pipe(gulp.dest(build_path + 'assets/css/'))

    // Livereload
    .pipe(plugins.connect.reload())

    // Show notification
    .pipe(plugins.gulpIf(global.isWatching, plugins.notify({ message: 'Styles task complete' })));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src([
      src_path+'assets/js/vendor/*.js',
      src_path+'assets/js/partials/*.js',
      src_path+'assets/js/*.js'
    ])

    // Catch Errors
    .pipe(plugins.plumber({errorHandler: onError}))

    // Concatinate in one file
    .pipe(plugins.concat('script.js'))

    // Distribute to build
    .pipe(gulp.dest(build_path + 'assets/js/'))

    // Add a .min version
    .pipe(plugins.rename({ suffix: '.min' }))

    // Minify with jsUglify
    .pipe(plugins.uglify())

    // Distribute to build
    .pipe(gulp.dest(build_path + 'assets/js/'))

    // Livereload
    .pipe(plugins.connect.reload())

    // Show notifcation
    .pipe(plugins.gulpIf(global.isWatching, plugins.notify({ message: 'Scripts task complete' })));
});

// Images
gulp.task('images', function() {
  return gulp.src(src_path+'assets/img/**/**/*')

    // Image optimization
    .pipe(plugins.cache(plugins.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))

    // Distribute to build path
    .pipe(gulp.dest(build_path+'assets/img/'))

    // Livereload
    .pipe(plugins.connect.reload())

    // Show notification
    .pipe(plugins.gulpIf(global.isWatching, plugins.notify({ message: 'Images task complete' })));
});

// Clear (image) cache
gulp.task('clear', function (done) {
  return plugins.cache.clearAll(done);
});

// Clean out build
gulp.task('clean', function(cb) {
  del(build_path, cb);
});

// Copy font files, clean before copy
gulp.task('copyfonts', ['clean'], function() {
  gulp.src(src_path+'assets/fonts/**/*')

  // Distribute to build path
  .pipe(gulp.dest(build_path+'assets/fonts'))

  // livereload
  .pipe(plugins.connect.reload());

});

// Cleans build folder if present and builds
gulp.task('default', ['clean', 'bower'], function() {
  gulp.start( 'templates', 'styles', 'scripts', 'images', 'copyfonts' );
});

// Set global watch var to true
gulp.task('setWatch', function() {
  global.isWatching = true;
});

// Watch
gulp.task('watch', ['setWatch', 'templates', 'connect'], function() {

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
  // plugins.livereload.listen();

  // Watch any files in build directory, reload on change
  // gulp.watch([build_path+'/**/**/*']).on('change', plugins.livereload.changed);

});