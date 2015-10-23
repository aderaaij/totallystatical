var config = require('./');

module.exports = {
  source: config.sourcePath+'assets/img/**/*.svg',
  dest: config.buildPath+'assets/img/svg/'
}