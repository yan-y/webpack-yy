const path = require('path');
// HtmlWebpackPlugin 会在打包结束后，自动生成一个html文件，并把打包生成的js自动引入到这个html文件中
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

// plugin 可以在 webpack 运行到某个时刻的时候，帮你做一些事情

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    devServer: {
        contentBase: './dist',
        open: true,
		hot: true,
		hotOnly: true
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/, // node_modules 中都是一些第三方代码, 已自动转换为es5, 所以不使用 babel-loader
            loader: "babel-loader", // babel-loader 只是 webpack 和 babel 通信的桥梁
            options: {
                presets: [["@babel/preset-env", { // 真正 ES6 转 ES5 是通过 babel/preset 工具转换的
                    useBuiltIns: 'usage' // 此配置代表仅在打包后的 main.js 中加载业务需要的特性，而非全部加载使 main.js 文件变大
                }]]
            }
        }, {
            test: /\.(jpe?g|png|gif)$/,
            use: {
                loader: 'url-loader',
                options: { // placeholder 占位符
                    name: '[name].[ext]',
                    outputPath: 'images/',
					limit: 10240
                }
            }
        }, {
            test: /\.(eot|ttf|svg|woff)$/,
            use: {
                loader: 'file-loader'
            }
        }, {
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
        new HtmlWebpackPlugin({
            template: 'src/index.html' // 以 index 为模板生成
        }),
        // new CleanWebpackPlugin(['dist']) 这是一次错误写法，新版本写法如下
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    }
}