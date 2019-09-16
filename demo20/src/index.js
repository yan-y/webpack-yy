import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import ReactDom from 'react-dom';
import Home from './home';
import List from './list';

class App extends Component {
	render() {
		return(
			<HashRouter>
				<Route path = '/' exact component = { Home } />
				<Route path = '/list' component = { List } />
			</HashRouter>
		)
	}
}

ReactDom.render(<App />, document.getElementById('root'));