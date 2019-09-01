const commonConfig = require('./webpack.common');
const merge = require('webpack-merge');

const prodConfig = {
    mode: 'production',
    devtool: 'cheap-module-source-map', // production
}

module.exports = merge(commonConfig, prodConfig);