const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

const buildProduction = (cb) => {
    plugins.sequence(
        'clean',
        [
            'images',
            'svg:sprite',
            'scripts:standalone',
        ],
        [
            'styles:production',
            'webpack:production',
            'templates',
        ],
        'rev',
        cb,
    );
};

gulp.task('build:production', buildProduction);
module.exports = buildProduction;
