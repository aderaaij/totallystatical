const config = require('./');

module.exports = {
    source: `${config.sourcePath}templates/**/*.pug`,
    dest: config.buildPath,
    pugInheritance: {
        basedir: `${config.sourcePath}templates/`,
        skip: 'node_modules',
        extension: '.pug',
    },
};
