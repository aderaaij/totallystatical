var config = require('./')

module.exports = {
  source: config.sourcePath+'assets/sprite/**/*.svg',
  dest: config.buildPath+'assets/img/'
}