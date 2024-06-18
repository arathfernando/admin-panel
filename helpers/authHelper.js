import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAuthGuardActive } from '../constants/defaultValues';
import { getCurrentUser } from './Utils';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const setComponent = (props) => {
    if (isAuthGuardActive) {
      const currentUser = getCurrentUser();
      if (currentUser) {
        return <Component {...props} />;
      }
      return (
        <Redirect
          to={{
            pathname: '/user/login',
            state: { from: props.location },
          }}
        />
      );
    }
    return <Component {...props} />;
  };

  return <Route {...rest} render={setComponent} />;
};
const UserRole = {
  SuperAdmin: 'SUPER_ADMIN',
  Admin: 'ADMIN',
};

export { ProtectedRoute, UserRole };
