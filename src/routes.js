import './App.css';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from './components/home/home';
import Profile from './components/screens/profile';
import Login from './components/screens/login';
import NewSpace from './components/screens/newSpace';
import Header from './components/header/Header';
import { AuthenticatedRoute } from './components/AuthenticatedRoute/AutenticatedRoute';
import SearchSpace from './components/screens/searchSpace';
import SignUp from './components/signUp/signUp';

function Routes() {
	return (
		<div className="App">
			{/* <Header /> */}
			<Switch>

        <AuthenticatedRoute exact path='/profile' component={Profile}/>
				{/* <AuthenticatedRoute exact path="/new-space" component={NewSpace} /> */}
        <Route exact path="/new-space" component={NewSpace} />
				<Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={SignUp}/>
        <Route exact path="/search" component={SearchSpace}/>
				<Redirect to="/"/>

			</Switch>
		</div>
	);
}

export default Routes;
