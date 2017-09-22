const config = require('./');

module.exports = {
    source: `${config.sourcePath}assets/sprite/**/*.svg`,
    dest: `${config.buildPath}assets/img/`,
    pluginConfig: {
        svgoPlugins: [{ removeTitle: true }],
    },
};
