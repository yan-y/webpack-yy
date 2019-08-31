const commonConfig = require('./webpack.common');
const webpack = require('webpack');
const merge = require('webpack-merge');

const devConfig = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map', // development
    devServer: {
        contentBase: './dist',
        open: true,
		hot: true,
		// hotOnly: true 注释此配置可实现自动刷新
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization: { // production 环境可以注释, development 须添加此配置
        usedExports: true // 配置 Tree Shaking
    }
}

module.exports = merge(commonConfig, devConfig);