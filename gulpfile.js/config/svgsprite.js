var config = require('./');

module.exports = {
  source: config.sourcePath+'assets/sprites/**/*.svg',
  dest: config.buildPath+'assets/img/'
}