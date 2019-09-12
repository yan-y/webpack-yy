const path = require('path');
// HtmlWebpackPlugin 会在打包结束后，自动生成一个html文件，并把打包生成的js自动引入到这个html文件中
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

// plugin 可以在 webpack 运行到某个时刻的时候，帮你做一些事情

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: {
        main: './src/index.js'
    },
    devServer: {
        contentBase: './dist',
        open: true,
		hot: true,
        hotOnly: true,
        proxy: { // 代理 & 转发(仅在开发环境生效)
            // index: '', // 此配置代表以根目录为代理
            '/react/api': {
                /**
                 * 当用户访问 /react/api 时, 首先会访问 http://www.dell-lee.com 域名下的接口
                 * 其次, 虽然在 axios 里写的是 header.json, 但其实访问的是 demo.json.
                 */
                target: 'https://www.dell-lee.com',
                secure: false, // 如果所代理的协议是 https, 必须配置此项
                pathRewrite: {
                    'header.json': 'demo.json'
                },
                changeOrigin: true, // 某些网站限制 origin, 比如某些网站防止爬虫, 设置此配置之后可突破此限制(建议配置此项)
                /**
                 * bypass
                 * 当用户请求 html 文件时, 返回 false, 跳过本次代理
                 */
                bypass: function(req, res, proxyOptions) {
                    if (req.headers.accept.indexOf('html') !== -1) {
                        console.log('Skipping proxy for browser request.');
                        return false;
                    }
                }
            }
        }
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/, // node_modules 中都是一些第三方代码, 已自动转换为 es5, 所以不使用 babel-loader
            loader: "babel-loader", // babel-loader 只是 webpack 和 babel 通信的桥梁
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
        // new CleanWebpackPlugin(['dist']) 这是一次旧版本写法，新版本写法如下
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    }
}