var config = require('./')

module.exports = {
  source: [
    config.assetsPath+'js/vendor/*.js',
    config.assetsPath+'js/partials/*.js',
    config.assetsPath+'js/*.js'
  ],
  entry: {
    "script": [config.assetsPath+'js/script.js'],
    "shared": [config.assetsPath+'js/shared.js']
  },
  // entry: config.assetsPath+'js/script.js',
  dest: config.buildPath+'assets/js',
  extractSharedJs: true,
  concat: 'scripts.js',
  rename: {
    suffix: '.min'
  }
}