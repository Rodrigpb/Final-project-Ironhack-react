import './App.css';
import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './components/login/Login';
import ProductList from './components/product-list/ProductList';
import Header from './components/header/Header';
import AuthenticatedRoute from './components/AuthenticatedRoute/AutenticatedRoute';

function App() {
  const [user, setUser] = useState()

  return (
    <div className="App">
      <Header user={user}/>
      <Switch>
        <Route render={() => <Login setUser={setUser}/> } path="/login"/>
        <AuthenticatedRoute path="/products" user={user} />
        <Redirect to="/products" user={user} />
      </Switch>
    </div>
  );
}

export default App;
