const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

const buildProductionTask = function (cb) {
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
gulp.task('build:production', buildProductionTask);
module.exports = buildProductionTask;
