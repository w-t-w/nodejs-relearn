const path = require('path');

const OUTPUT_DIR = path.resolve(__dirname, '../backend/template/source/static/');

const webConfig = {
    mode: 'production',
    devtool: false,
    target: 'web',
    entry: {
        web_index: './stage/list/frontend/src/index.js',
    },
    output: {
        publicPath: '.',
        path: OUTPUT_DIR,
        filename: '[name].js',
        chunkFilename: '[name].js',
        library: {
            type: 'umd',
        }
    },
    stats: {
        preset: 'minimal',
    },
    module: {
        rules: [{
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                }
            }]
        }]
    }
};

module.exports = webConfig;
