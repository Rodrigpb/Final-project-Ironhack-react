import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

const RedirectToHome = () => <Redirect to='/' />
const RedirectToLogin = () => <Redirect to='/login' />
const UserExist = () => {
  const { user } = useAuthContext()
  return user
}

export function AuthenticatedRoute(props) {
	return <Route {...props} component={UserExist() !== null ? props.component : RedirectToLogin} />;
}


export function NotAuthenticatedRoute(props) {
	return <Route {...props} component={UserExist() !== null ?  RedirectToHome : props.component} />;
}
