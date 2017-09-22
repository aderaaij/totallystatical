const config = require('../config/scripts');
const root = require('../config/index');
const path = require('path');
const webpack = require('webpack');
const webpackManifest = require('./webpackManifest');

const webpackExports = (env) => {
    const filenamePattern = env === 'production' ? '[name]-[hash].js' : '[name].js';

    const webpackConfig = {
        cache: false,
        entry: config.entries,
        output: {
            path: path.resolve(__dirname, '../../app/build/assets/js/'),
            publicPath: '/js/',
            filename: filenamePattern,
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    query: {
                        // https://github.com/babel/babel-loader#options
                        cacheDirectory: true,
                        presets: [
                            ['env', {
                                targets: {
                                    browsers: ['last 2 versions'],
                                },
                            }],
                        ],
                    },
                    exclude: /(node_modules|bower_components)/,
                },
            ],
        },
        plugins: [],
    };

    if (env === 'development') {
        webpackConfig.devtool = 'source-map';
        webpack.debug = true;
    }

    if (env === 'production') {
        webpackConfig.plugins.push(
            webpackManifest('/js/', root.buildPath),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production'),
                },
            }),
            new webpack.optimize.UglifyJsPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
        );
    }

    return webpackConfig;
};

module.exports = webpackExports;
