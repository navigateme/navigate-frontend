import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './containers/Home';

export default props => (
	<Router>
		<Switch>
			<Route exact path="/" component={Home} />
		</Switch>
	</Router>
);
