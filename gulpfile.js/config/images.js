var config = require('./')

module.exports = {
  source: config.assetsPath+'img/**/*',
  dest: config.buildPath+'assets/img/',
  imagemin: {
    optimizationLevel: 3,
    progressive: true,
    interlaced: true
  }
}