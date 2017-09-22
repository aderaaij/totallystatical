const config = require('./');

module.exports = {
    source: [
        `${config.assetsPath}js/vendor/*.js`,
        `${config.assetsPath}js/partials/*.js`,
        `${config.assetsPath}js/*.js`,
    ],
    entry: {
        script: [`${config.assetsPath}js/script.js`],
    },
    dest: `${config.buildPath}assets/js/`,
    base: `${config.assetsPath}js/`,
    extractSharedJs: true,
    concat: 'scripts.js',
    rename: {
        suffix: '.min',
    },
};
