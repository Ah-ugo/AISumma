import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const sessionId = localStorage.getItem('session');

  return sessionId ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
