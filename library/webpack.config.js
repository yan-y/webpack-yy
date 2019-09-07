const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    /**
     * externals
     * 此配置项代表打包时忽略**库(这里为 lodash 库), 同时减小了包的体积.
     * 目的: 为了避免用户在其项目中使用 lodash 库时与本库的 lodash 发生冲突.(这里举例使用 lodash, 实际可根据需求配置多项, 可以是数组可以是对象)
     * 注意: 添加此配置后如果用户所在项目没有用到 lodash 库, 则需要手动引入 lodash.
     */
    externals: ['lodash'],
    // externals: 'lodash', // 不管什么环境下引入, 名字必须叫 lodash.
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'library.js',
        /**
         * 此配置项代表将 library 添加到项目的全局变量, 并取名 library 来调用.(仅设置此配置后可以使用 script 标签引入)
         * 例: <script src='library.js'></script>
         * 使用: library.math ...
         */
        library: 'library',
        /**
         * 此配置项代表无论是使用 cmd/amd 规范都可以引用该库文件.
         * 例:
         *    1. import library from 'library'
         *    2. const library = require('library')
         *    3. require(['library'], function() {})
         * 如果把 umd 换为 this 或者 window 上, 那么 library 就会被注入到 this 或者 window 上.
         */
        libraryTarget: 'umd',
    }
}