const path = require('path');
const fs = require('fs');

module.exports = function (publicPath, dest, filename) {
    filename = filename || 'rev-manifest.json';

    return function () {
        this.plugin('done', (stats) => {
            var stats = stats.toJson();
            const chunks = stats.assetsByChunkName;
            const manifest = {};

            for (const key in chunks) {
                const originalFilename = `${key}.js`;
                manifest[path.join(publicPath, originalFilename)] = path.join(publicPath, chunks[key]);
            }

            fs.writeFileSync(
        path.join(process.cwd(), dest, filename),
        JSON.stringify(manifest),
      );
        });
    };
};
