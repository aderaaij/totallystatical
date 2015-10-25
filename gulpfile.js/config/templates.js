var config = require('./')

module.exports = {
  source: config.sourcePath+'jade/**/*.jade',
  dest: config.buildPath,
  base: config.sourcePath+'jade/'
}