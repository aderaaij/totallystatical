const path = require('path');
const fs = require('fs');

module.exports = function webpackManifest(publicPath, dest, filename) {
    filename = filename || 'rev-manifest.json';

    return function webpackManifestInside() {
        this.plugin('done', (stats) => {
            const statsJSON = stats.toJson();
            const chunks = statsJSON.assetsByChunkName;
            const manifest = {};

            for (const key in chunks) {
                if (Object.prototype.hasOwnProperty.call(chunks, key)) {
                    const originalFilename = `${key}.js`;
                    manifest[path.join(publicPath, originalFilename)] = path.join(publicPath, chunks[key]);
                }
            }

            fs.writeFileSync(
                path.join(process.cwd(), dest, filename),
                JSON.stringify(manifest),
            );
        });
    };
};
