var config = require('./');

module.exports = {
  source: config.assetsPath+'img/**/*.svg',
  dest: config.assetsPath+'/img',
  svg: {
    mode                    : {
        inline              : true,
        symbol              : true
    }
  }
}