import React from 'react';
import { Navigate } from 'react-router';

const AuthRoute = ({ authenticated, component: Component }) => {
  return authenticated.data ? Component : <Navigate replace to="/login" {...alert('로그인이 필요합니다.')} />;
};

export default AuthRoute;
