/**
 * @description webpack 性能优化
 * 
 * 1. 跟上技术的迭代( 尽可能使用较新版本的 webpack、Node、Npm、Yarn )
 * 2. 在尽可能少的模块上应用 Loader ( 减少不必要的代码分析 )
 * 3. Plugin 尽可能精简并确保可靠
 * 4. resolve 参数合理配置
 */

import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Child from './child';

class App extends Component {
    render() {
        return (
            <div>
                <div>This is App</div>
                <Child />
            </div>
        )
    }
}

ReactDom.render(<App />, document.getElementById('root'));