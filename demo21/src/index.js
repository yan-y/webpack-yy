/**
 * @description webpack 性能优化(提升打包速度)
 * 
 * 1. 跟上技术的迭代( 尽可能使用较新版本的 webpack、Node、Npm、Yarn )
 * 2. 在尽可能少的模块上应用 Loader ( 减少不必要的代码分析 )
 * 3. Plugin 尽可能精简并确保可靠
 * 4. resolve 参数合理配置
 * 5. 控制包文件大小
 * 6. thread-loader, parallel-webpack, happypack 多进程打包(根据项目复杂程度进行合理使用)
 * 7. 合理使用 sourceMap
 */

import React, { Component } from 'react';
import ReactDom from 'react-dom';
import _ from 'lodash';

class App extends Component {
    render() {
        return (
            <div>
                <div>{_.join(['This', 'is', 'App'], ' ')}</div>
            </div>
        )
    }
}

ReactDom.render(<App />, document.getElementById('root'));