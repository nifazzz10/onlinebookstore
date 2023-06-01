import React from 'react';
import { Route } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, ...props }) => {
  if (isAuthenticated) {
    return <Route {...props} />;
  } else {
    // Redirect to login page or show an error message
  }
};

export default ProtectedRoute;