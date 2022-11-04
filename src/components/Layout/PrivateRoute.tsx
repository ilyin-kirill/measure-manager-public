import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { IAuth } from '../../types/types';

const PrivateRoute: React.FC<IAuth> = ({isAuthenticated}) => {
    return (
      isAuthenticated ? (
        <Outlet />
      ) : (
        <Navigate
          to="/login" replace
        />
      )
    );
}

export default PrivateRoute;