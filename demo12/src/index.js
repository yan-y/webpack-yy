/**
 * Code Splitting
 * 同步代码分割, 需要在 webpack.common.js 中添加以下配置
 * optimization:{
 *       splitChunks: { // 此配置会让 webpack 自动对项目进行分割, 优化项目性能
 *           chunks: 'all'
 *       }
 *  },
 */

import _ from 'lodash';
import jquery from 'jquery';

// 第一种方式(首次访问页面时, 加载 main.js (假设为 2mb)
// main.js 2mb
// 打包文件很大，加载时间很长
// 当页面业务逻辑发生变化时, 又要加载 2mb 的内容

// 假设业务逻辑 1mb
console.log('loadsh', _.join(['a', 'b', 'c'], '***'));

// 第二种方式
// main.js 被拆成 lodash.js(假设大小为 1mb), main.js(假设大小为 1mb)
// 当页面业务逻辑发生变化时, 只要加载 main.js 即可(假设大小为 1mb)

// console.log('loadsh', _.join(['a', 'b', 'c'], '***'));

/**
 * Code Splitting
 * 异步代码分割
 * .babelrc 文件需添加 "plugins": "dynamic-import-webpack" 配置(可参考 .babelrc)
 */

// function getComponent() {
//     /**
//      * webpackChunkName 魔法注释
//      * 使用此注释之后会打包生成一个以 value 为名的 js 包
//      */
//     return import(/* webpackChunkName: "lodash" */  'lodash').then(({ default: _ }) => { // 异步获取 lodash 库
//         var element = document.createElement('div');
//         element.innerHTML = _.join(['yy'], '-');
//         return element;
//     })
// }

// getComponent().then(element => {
//     document.body.appendChild(element);
// });

// import test from './test';

// console.log(test.name);