const commonConfig = require('./webpack.common');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const prodConfig = {
    mode: 'production',
    devtool: 'cheap-module-source-map', // production
    module: {
        rules: [{
            test: /\.scss$/,
            use: [ // loader的执行顺序永远是从下到上，从右到左
                MiniCssExtractPlugin.loader, // 这里使用 css 分割插件替换 'style-loader'
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2 // 此属性代表如果页面含有import引入的css文件，也会先执行postcss-loader、sass-loader
                    }
                },
                'sass-loader',
                'postcss-loader'
            ]
        }, {
			test: /\.css$/,
			use: [
				MiniCssExtractPlugin.loader, // 这里使用 css 分割插件替换 'style-loader'
				'css-loader',
				'postcss-loader'
			]
		}]
    },
    optimization: {
        minimizer: [new OptimizeCSSAssetsPlugin({})]
    },
    plugins: [
        new MiniCssExtractPlugin({ // css 代码分割插件
            filename: '[name].css',
            chunkFilename: '[name].chunk.css',
            // ignoreOrder: false, // 启用删除关于冲突顺序的警告
        }),
    ],
}

module.exports = merge(commonConfig, prodConfig);