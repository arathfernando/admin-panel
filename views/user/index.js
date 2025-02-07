import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import UserLayout from '../../layout/UserLayout.jsx';
import ResetedPassword from './ResetedPassword';
import ForgotResetPassword from './forgot-reset-password';

const Login = React.lazy(() => import('./Login'));

const User = ({ match }) => {
  return (
    <UserLayout>
      <Suspense fallback={<div className="loading" />}>
        <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/login`} />
          <Route
            path={`${match.url}/login`}
            render={(props) => <Login {...props} />}
          />
          <Route
            path={`${match.url}/forgot-password`}
            render={(props) => <ForgotResetPassword {...props} />}
          />
          <Route
            path={`${match.url}/password-reseted`}
            render={(props) => <ResetedPassword {...props} />}
          />
        </Switch>
      </Suspense>
    </UserLayout>
  );
};

export default User;
