import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../../components/Hooks/Spinner';
import useAuth from '../../components/Hooks/useAuth';

const PrivateRoute = ({ children, ...rest }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <Spinner />;
  }
  if (user?.email) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
