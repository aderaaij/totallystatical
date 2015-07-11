var config = require('./')

module.exports = {
  source: config.sourcePath+'**/*.jade',
  dest: config.buildPath,
  base: config.sourcePath
}