import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Permission from '../Permission';

const PartnerList = React.lazy(() => import('./partner-list'));
const PartnerType = React.lazy(() => import('./partner-type'));

const Partner = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        path={`${match.url}/partner-list`}
        render={(props) => (
          <Permission>
            <PartnerList {...props} />
          </Permission>
        )}
      />
      <Route
        path={`${match.url}/partner-type`}
        render={(props) => (
          <Permission>
            <PartnerType {...props} />
          </Permission>
        )}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Partner;
