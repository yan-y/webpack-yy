const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
// HtmlWebpackPlugin 会在打包结束后，自动生成一个html文件，并把打包生成的js自动引入到这个html文件中
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod');

const commonConfig = {
    entry: {
        main: './src/index.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/, // node_modules 中都是一些第三方代码, 已自动转换为es5, 所以不使用 babel-loader
            // loader: "babel-loader", // babel-loader 只是 webpack 和 babel 通信的桥梁
            use: [{
                loader: 'babel-loader'
            }, {
                loader: 'imports-loader?this=>window' // 此 loader 改变模块内部的 this ，使其指向 window
            }]
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
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html' // 以 index 为模板生成
        }),
        // new CleanWebpackPlugin(['dist']) 这是一次错误写法，新版本写法如下
        new CleanWebpackPlugin({
            root: path.resolve(__dirname, '../')
        }),
        new webpack.ProvidePlugin({ // Shimming (即使模块内不引人 jquery， webpack内部也会自动引入)
            $: 'jquery'
        })
    ],
    optimization:{
        runtimeChunk: { // 兼容旧版本 webpack 使用 output [contenthash]，新版本配置也没问题
            name: 'runtime'
        },
        usedExports: true, // 配置 Tree Shaking
        splitChunks: {
            chunks: 'all', // 实际开发中仅设置此配置即可, 其余默认配置如下
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    name: 'vendors',
                },
            }
        }
        /**
         * splitChunks 默认配置
         */
        // splitChunks: {
        //     chunks: 'all',
        //     /**
        //      * chunks 默认值为 async
        //      * async: 在做代码分割时, 只对异步代码生效,
        //      * all: 表示同步异步都进行分割,
        //      * initial: 表示对同步代码进行分割,
        //      * chunks 会配合 cacheGroups 来进行打包
        //      * 如果发现引入的库在 node_modules 里边, 那么在 打包过程中, 
        //      * 会统一分到 vendors 配置下的 filename 配置项中(此处为 vendors.js)
        //      */
        //     minSize: 30000,
        //     /**
        //      * minSize
        //      * 发现你引入的包、模块、库大于30000字节(30kb)才帮你进行代码分割
        //      */
        //     maxSize: 0,
        //     /**
        //      * maxSize
        //      * 了解即可, 如果这个 maxSize 设置为50000(50kb), lodash 大概为 1mb, 那么这时会对 lodash 二次分割
        //      */
        //     minChunks: 1,
        //     /**
        //      * minChunks
        //      * 代表一个模块至少被用到 *(这里为 1次) 此以后, 才会被分割
        //      */
        //     maxAsyncRequests: 5,
        //     /**
        //      * maxAsyncRequests
        //      * 同时加载的模块数最多是 5 个
        //      */
        //     maxInitialRequests: 3,
        //     /**
        //      * maxInitialRequests
        //      * 首页加载的模块数
        //      */
        //     automaticNameDelimiter: '~',
        //     /**
        //      * automaticNameDelimiter
        //      * 文佳生成时的连接符
        //      */
        //     automaticNameMaxLength: 30,
        //     name: true,
        //     cacheGroups: {
        //         /**
        //          * cacheGroups(缓存组 -- 符合上述配置要求的模块统一分割到某个文件里(这里为 vendors.js))
        //          * 打包同步代码时有效, 根据 cacheGroups 决定分割的代码放到哪个文件里
        //          */
        //         vendors: {
        //             test: /[\\/]node_modules[\\/]/,
        //             priority: -10,
        //             /**
        //              * priority
        //              * 代表优先级, 如果模块同时满足 vendors 和 default, 这里会根据 priority 的配置进行打包
        //              */
        //             // filename: 'vendors.js',
        //         },
        //         default: {
        //             priority: -20,
        //             reuseExistingChunk: true,
        //             /**
        //              * reuseExistingChunk
        //              * 如果一个模块已经被打包过了, 再次打包的时候, 就会忽略这个模块, 直接使用之前被打包过的模块
        //              */
        //             filename: 'common.js',
        //         }
        //     }
        // },

        // --------------------------------------------------------------------------------------------------------

        // splitChunks: { // 此配置会让 webpack 自动对项目进行分割, 优化项目性能
        //     chunks: 'all',
        //     cacheGroups: { // 此配置可让魔法注释中的 value 成为包名(适用于同步, 异步代码分割)
        //         vendors: false,
        //         default: false
        //     }
        // }
    },
    performance: false, // 关闭打包提示
    output: {
        path: path.resolve(__dirname, '../dist')
    }
}

module.exports = env => { // 了解环境变量概念, 并不推荐实际应用使用
    if(env && env.production) {
        return merge(commonConfig, prodConfig);
    } else {
        return merge(commonConfig, devConfig);
    }
}