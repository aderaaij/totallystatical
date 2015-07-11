var config = require('./')

module.exports = {
  source: [
    config.assetsPath+'js/vendor/*.js',
    config.assetsPath+'js/partials/*.js',
    config.assetsPath+'js/*.js'
  ],
  dest: config.buildPath+'js',
  concat: 'scripts.js',
  rename: {
    suffix: '.min'
  }
}