var gulp                = require('gulp')
var plugins             = require('gulp-load-plugins')()
var config              = require('../config/svgSprite')

var svgSpriteTask = function() {
  return gulp.src(config.source)

    .pipe(plugins.imagemin({
      svgoPlugins: [{removeTitle: true}]
    }))

    .pipe(plugins.svgstore())

    .pipe(gulp.dest(config.dest))

}
gulp.task('svg:sprite', svgSpriteTask)
module.exports = svgSpriteTask

