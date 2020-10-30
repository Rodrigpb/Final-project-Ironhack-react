import './App.css';
import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from './components/screens/home';
import Profile from './components/screens/profile';
import Login from './components/screens/login';
import NewSpace from './components/screens/newSpace';
import Header from './components/header/Header';
import { AuthenticatedRoute } from './components/AuthenticatedRoute/AutenticatedRoute';
import SearchSpace from './components/screens/searchSpace';
import NewUser from './components/screens/newUser';

function App() {
	return (
		<div className="App">
			<Header />
			<Switch>
				<AuthenticatedRoute exact path="/profile" component={Profile} />
				{/* <AuthenticatedRoute exact path="/new-space" component={NewSpace} /> */}
				<Route exact path="/new-space" component={NewSpace} />
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={NewUser} />
				<Route exact path="/search" component={SearchSpace} />
				<Redirect to="/" />
			</Switch>
		</div>
	);
}

export default App;
