const config = require('./');

module.exports = {
    entry: {
        script: [`${config.assetsPath}js/script.js`],
    },
    dest: `${config.buildPath}assets/js/`,
};
