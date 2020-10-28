import './App.css';
import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from './components/screens/home'
import Profile from './components/screens/profile'
import Login from './components/screens/login'
import NewSpace from './components/screens/newSpace'
import Header from './components/header/Header';
import { AuthenticatedRoute } from './components/AuthenticatedRoute/AutenticatedRoute';

function App() {

	return (
		<div className="App">
			{/* <Header user={user} /> */}
			<Switch>
        <AuthenticatedRoute exact path='/profile' component={Profile}/>
				<Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/new" component={NewSpace}/>
				<Redirect to="/"/>
			</Switch>
		</div>
	);
}

export default App;
