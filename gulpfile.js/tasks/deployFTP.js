const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const ftp = require('vinyl-ftp');
const config = require('../config/index');

// Rename the .ftppass-example.json file to .ftppass.json and change the referred name here
const ftppass = require('../../.ftppass-example');

const ftpcreds = {
    host: ftppass.host,
    user: ftppass.user,
    password: ftppass.pass,
    parallel: 10,
    log: plugins.util.log,
    debug: false,
};

function deployFTP() {
    const conn = ftp.create(ftpcreds);
    const globs = [
        `${config.buildPath}**/*`,
    ];

    // turn off buffering in gulp.src for best performance
    return gulp.src(globs, { base: config.buildPath, buffer: false })
        .pipe(conn.newer(ftppass.remotePath)) // only upload newer files
        .pipe(conn.dest(ftppass.remotePath));
}

gulp.task('deploy:ftp', ['build:production'], deployFTP);
module.exports = deployFTP;

// gulp.task( 'rmAssets', ['rmdirScripts', 'rmdirStyles'] );
//
// // Remove dist/scripts directory
// gulp.task( 'rmdirScripts', function ( cb ) {
//   var conn = ftp.create( ftpcreds );
//   conn.rmdir( if(ftppass.remotePath+'assets/css'), cb );
// });
//
// // Remove dist/styles directory
// gulp.task( 'rmdirStyles', function ( cb ) {
//   var conn = ftp.create( ftpcreds );
//   conn.rmdir( ftppass.remotePath+'assets/js', cb );
// });
