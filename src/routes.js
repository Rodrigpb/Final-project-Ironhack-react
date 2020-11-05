import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from './components/home/home';
import Profile from './components/screens/profile';
import Login from './components/screens/login';
import NewSpace from './components/screens/newSpace';
import { AuthenticatedRoute, NotAuthenticatedRoute } from './components/AuthenticatedRoute/AutenticatedRoute';
import SearchSpace from './components/screens/searchSpace';
import SignUp from './components/signUp/signUp';
import SpaceDetail from './components/screens/spaceDetail';

function Routes() {
	return (
		<div>
			<Switch>
				<AuthenticatedRoute exact path="/profile/:id" component={Profile} />
				<AuthenticatedRoute exact path="/new-space" component={NewSpace} />
				<NotAuthenticatedRoute exact path="/login" component={Login} />
				<Route exact path="/search/:search" component={SearchSpace} />
				<Route exact path="/" component={Home} />
				<Route exact path="/register" component={SignUp} />
				<Route exact path="/search" component={SearchSpace} />
				<Route exact path="/space/:id" component={SpaceDetail} />
				<Redirect to="/" />
			</Switch>
		</div>
	);
}

export default Routes;
