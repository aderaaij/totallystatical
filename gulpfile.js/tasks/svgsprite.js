var
  gulp                = require('gulp'),
  plugins             = require('gulp-load-plugins')(),
  config              = require('../config/svgSprite');

gulp.task('svg:sprite', function() {
  return gulp.src(config.source)

    .pipe(plugins.imagemin({
      svgoPlugins: [{removeTitle: true}]
    }))

    .pipe(plugins.svgstore())

    .pipe(gulp.dest(config.dest));

});
