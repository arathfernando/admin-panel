/* eslint-disable react/destructuring-assignment */
import React, { Suspense } from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import Middlwware from './Middlwware';
import { NotificationContainer } from './components/common/react-notifications';
import { adminRoot } from './constants/defaultValues';
import './helpers/Firebase';
import { ProtectedRoute, UserRole } from './helpers/authHelper';
import AppLocale from './lang';
import { getCurrentAdmin } from './redux/actions';

const ViewApp = React.lazy(() => import('./views/app'));
const ViewUser = React.lazy(() => import('./views/user'));
const ViewError = React.lazy(() => import('./views/error'));
const ViewUnauthorized = React.lazy(() => import('./views/unauthorized'));


class App extends React.Component {
  constructor(props) {
    super(props);
    document.body.classList.add('ltr');
    document.body.classList.remove('rtl');
  }

  componentDidMount() {
    if (localStorage.getItem('accessToken')) {
      setTimeout(() => {
        this.props.dispatch(getCurrentAdmin());
      }, 1000);
    }
  }

  render() {
    const { locale } = this.props;
    const currentAppLocale = AppLocale[locale];

    return (
      <div className="h-100">
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <>
            <Middlwware />
            <NotificationContainer />
            <Suspense fallback={<div className="loading" />}>
              <Router>
                <Switch>
                  <ProtectedRoute
                    path={adminRoot}
                    component={ViewApp}
                    roles={[UserRole.SuperAdmin, UserRole.Admin]}
                  />
                  <Route
                    path="/user"
                    render={(props) => <ViewUser {...props} />}
                  />
                  <Route
                    path="/error"
                    exact
                    render={(props) => <ViewError {...props} />}
                  />
                  <Route
                    path="/unauthorized"
                    exact
                    render={(props) => <ViewUnauthorized {...props} />}
                  />
                  <Redirect exact from="/" to={adminRoot} />
                  <Redirect to="/error" />
                </Switch>
              </Router>
            </Suspense>
          </>
        </IntlProvider>
      </div>
    );
  }
}

const mapStateToProps = ({ authUser, settings, admin }) => {
  const { currentUser } = authUser;
  const { locale } = settings;
  return { currentUser, locale, admin };
};

export default connect(mapStateToProps)(App);
