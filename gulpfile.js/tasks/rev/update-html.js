var gulp       = require('gulp')
var config     = require('../../config')
var revReplace = require('gulp-rev-replace')
var path       = require('path')

// 5) Update asset references in HTML
gulp.task('update-html', function(){
  var manifest = gulp.src(path.join(config.buildPath, "rev-manifest.json"))
  return gulp.src(path.join(config.buildPath, '**/*.html'))
    .pipe(revReplace({manifest: manifest}))
    .pipe(gulp.dest(config.buildPath))
})
