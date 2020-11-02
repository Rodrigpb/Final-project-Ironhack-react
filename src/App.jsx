import React from "react";
import Routes from "./routes.js";
import './App.css'
import Header from './components/header/Header';
import { withRouter } from "react-router-dom";

const App = ({ location }) => {
  return (
    <div className="App">
      {location.pathname !== '/login' &&  <Header />}
      <Routes />
    </div>
  );
}

export default withRouter(App);