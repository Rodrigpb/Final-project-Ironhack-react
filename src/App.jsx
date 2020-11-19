import React from "react";
import Routes from "./routes.js";
import './App.css'
import Header from './components/header/Header';
import { withRouter } from "react-router-dom";
import Footer from "./components/home/footer.jsx";

const App = ({ location }) => {
  return (
    <div className="App">

      {location.pathname !== '/login' &&  <Header />}
      <Routes />
      {(location.pathname !== '/login' && location.pathname !== '/register')  &&  <Footer /> }
    </div>
  );
}

export default withRouter(App);