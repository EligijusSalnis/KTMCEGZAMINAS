import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ path, children }) => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default ProtectedRoute;
