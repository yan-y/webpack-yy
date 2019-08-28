const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');
// 在 node 中使用 webpack
// complier 是一个编译器(node API)，会使用 webpack 以及所传的 config 参数进行编译。
const complier = webpack(config);

const app = express();

app.use(webpackDevMiddleware(complier, {
    publicPath: config.output.publicPath
}))

app.listen(3000, () => {
    console.log('server is running');
})