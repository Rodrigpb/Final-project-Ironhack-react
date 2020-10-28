import './App.css';
import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './components/login/Login';
import Header from './components/header/Header';
import { AuthenticatedRoute, NotAuthenticatedRoute } from './components/AuthenticatedRoute/AutenticatedRoute';

function App() {
	const [ user, setUser ] = useState();

	return (
		<div className="App">
			<Header user={user} />
			<Switch>
				<Route render={() => <Login setUser={setUser} />} path="/login" />
        <AuthenticatedRoute path='/profile' user={user} />
				<NotAuthenticatedRoute path="/" user={user} />
				<Redirect to="/" user={user} />
			</Switch>
		</div>
	);
}

export default App;
