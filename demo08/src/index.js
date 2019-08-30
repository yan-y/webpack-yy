import "@babel/polyfill"; // 对低版本浏览器的补充(变量、方法等...) 配置完毕之后不需要引入 babel/polyfill

import React, { Component } from "react";
import ReactDom from "react-dom";

class App extends Component {
	render() {
		return <div>Halo World</div>
	}
}

ReactDom.render(<App />, document.getElementById("root"));