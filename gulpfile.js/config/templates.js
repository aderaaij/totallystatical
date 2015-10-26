var config = require('./')

module.exports = {
  source: config.sourcePath+'jade/**/*.jade',
  dest: config.buildPath,
  jadeInheritance: {
    "basedir": config.sourcePath+'jade/'
  }
}