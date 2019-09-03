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
    module: {
        rules: [{
            test: /\.scss$/,
            use: [ // loader的执行顺序永远是从下到上，从右到左
                'style-loader',
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
				'style-loader',
				'css-loader',
				'postcss-loader'
			]
		}]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = merge(commonConfig, devConfig);