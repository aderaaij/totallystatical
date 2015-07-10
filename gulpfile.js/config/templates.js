var config = require('./')

module.exports = {
  source: config.sourcePath+'**/*.jade',
  dest: './app/build/',
  base: config.sourcePath
}