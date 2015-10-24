var config = require('./')

module.exports = {
  autoprefixer: { browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'] },
  source: config.assetsPath+'sass/screen.scss',
  dest: config.buildPath+'assets/css/',
  base: config.assetsPath+'sass/**/*',
  settings: {
    outputStyle: 'nested',
    includePaths: [
      './bower_components/normalize-scss/',
      './bower_components/susy/sass/',
      './bower_components/compass-breakpoint/stylesheets/'
    ]
  }
}