import React from "react";
import Routes from "./routes.js";

import Header from './components/header/Header';
import { withRouter } from "react-router-dom";

const App = ({ location }) => {
  return (
    <div>
      {location.pathname !== '/login' &&  <Header />}
      <Routes />
    </div>
  );
}

export default withRouter(App);