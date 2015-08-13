var config = require('./')

module.exports = {
  source: [
  	config.assetsPath+'img/**/*',
  	'!'+config.assetsPath+'img/symbol/svg/sprite.symbol.svg'
  ],
  dest: config.buildPath+'assets/img/',
  imagemin: {
    optimizationLevel: 3,
    progressive: true,
    interlaced: true
  }
}