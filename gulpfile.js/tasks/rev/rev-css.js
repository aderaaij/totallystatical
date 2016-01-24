var config      = require('../../config')
var gulp        = require('gulp')
var cssnano     = require('gulp-cssnano')
var path        = require('path')
var rev         = require('gulp-rev')
var revNapkin   = require('gulp-rev-napkin')
var uglify      = require('gulp-uglify')

// 4) Rev and compress CSS and JS files (this is done after assets, so that if a
//    referenced asset hash changes, the parent hash will change as well
gulp.task('rev-css', function(){
  return gulp.src(path.join(config.buildPath,'**/*.css'))
    .pipe(rev())
    .pipe(cssnano())
    .pipe(gulp.dest(config.buildPath))
    .pipe(revNapkin({verbose: false}))
    .pipe(rev.manifest(path.join(config.buildPath, 'rev-manifest.json'), {merge: true}))
    .pipe(gulp.dest(''))
})
