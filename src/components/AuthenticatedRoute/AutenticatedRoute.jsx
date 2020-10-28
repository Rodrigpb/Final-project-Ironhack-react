import React from "react";
import { Redirect, Route } from "react-router-dom";

export function AuthenticatedRoute({ user, path }) {
  return (
    <div>
      {user ? <Route path={path} /> : <Redirect to="/login" />}
    </div>
  ) 
}

export function NotAuthenticatedRoute({ user, path }) {
  return (
    <div>
      {user ? <Redirect to="/login" /> : <Route path={path} />}
    </div>
  ) 
}

