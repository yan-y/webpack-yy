import React, { Component } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';

class App extends Component {
	componentDidMount() { // render 函数执行完毕之后会执行此函数
		axios.get('/react/api/header.json')
		.then(res => {
			console.log('res', res);
		})
		.catch(err => {
			console.log('err', err);
		})
	}

	render() {
		return <div>Halo World</div>
	}
}

ReactDom.render(<App />, document.getElementById('root'));