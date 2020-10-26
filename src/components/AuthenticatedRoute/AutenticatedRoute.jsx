import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function AuthenticatedRoute({ user, path }) {
  return (
    <div>
      {user ? <Route path={path} /> : <Redirect to="/login" />}
    </div>
  ) 
}