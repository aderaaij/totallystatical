const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const config = require('../config/svgSprite');

const SVGSprite = function startSVGSpriteTask() {
    return gulp.src(config.source)

    .pipe(plugins.imagemin({
        svgoPlugins: [{ removeTitle: true }],
    }))

    .pipe(plugins.svgstore())

    .pipe(gulp.dest(config.dest));
};

gulp.task('svg:sprite', SVGSprite);
module.exports = SVGSprite;

