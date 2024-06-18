import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Permission from '../Permission';

const ModuleType = React.lazy(() => import('./moduleType'));

const Module = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        path={`${match.url}/module-type`}
        render={(props) => (
          <Permission>
            <ModuleType {...props} />
          </Permission>
        )}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Module;
