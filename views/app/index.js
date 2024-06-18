import 'ckeditor5-build-classic-dna';
import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import { ProtectedRoute, UserRole } from '../../helpers/authHelper';
import AppLayout from '../../layout/AppLayout';
import Permission from './Permission';
import AdminProfile from './admin/AdminProfile';
import ChangeAdminPassword from './admin/ChangeAdminPassword';
import ContestList from './contest/list';
import ExpertMarketplacesList from './expert-marketplace/ExpertMarketplaceList';
import ExpertiseUsersList from './expert-marketplace/ExpertiseUsersList';
import ExpertiseReviewsList from './expert-marketplace/expertiseReview/ExpertiseReviewList';
import InvestorTransactionAndShare from './investor/investorTransactionAndShare';
import ZonesList from './investor/zones/ZonesList';
import JobsList from './job/JobList';
import JobReviewsList from './job/jobReview/JobReviewList';
import Managements from './management';
import MasterclasssList from './masterclass/masterclass/masterclassList';
import MasterclassReviewsList from './masterclass/masterclassReview/MasterclassReviewList';
import StudentAndInvestorList from './masterclass/sstudentAndInvestor/StudentAndInvestorList';
import ProductLaunchersList from './product_launcher/ProductLauncherList';
import EditProduct from './product_launcher/edit-product';
import TeammateAndWorkspaces from './product_launcher/teammates_workspaces';

const Dashboard = React.lazy(() => import('./dashboard'));
const Admins = React.lazy(() => import('./admin'));
const Users = React.lazy(() => import('./user'));
const EditUser = React.lazy(() => import('./user/editUser/index'));

const Community = React.lazy(() => import('./community'));

const HubbersTeam = React.lazy(() => import('./hubbers-team'));

const Partner = React.lazy(() => import('./partner'));

const Options = React.lazy(() => import('./options'));
const BlankPage = React.lazy(() => import('./blank-page'));
const Module = React.lazy(() => import('./module'));
const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect
              exact
              from={`${match.url}/`}
              to={`${match.url}/dashboard`}
            />
            <Route
              path={`${match.url}/dashboard`}
              render={(props) => <Dashboard {...props} />}
            />
            <Route
              exact
              path={`${match.url}/admins`}
              render={(props) => (
                <Permission>
                  <Admins {...props} />
                </Permission>
              )}
              roles={[UserRole.Admin]}
            />
            <Route
              exact
              path={`${match.url}/admin/profile`}
              render={(props) => <AdminProfile {...props} />}
            />
            <Route
              exact
              path={`${match.url}/admin/change-password`}
              render={(props) => <ChangeAdminPassword {...props} />}
            />
            <Route
              exact
              path={`${match.url}/users`}
              render={(props) => (
                <Permission>
                  <Users {...props} />
                </Permission>
              )}
            />
            <Route
              path={`${match.url}/users/:id`}
              render={(props) => (
                <Permission>
                  <EditUser {...props} />
                </Permission>
              )}
            />
            <Route
              path={`${match.url}/community`}
              render={(props) => <Community {...props} />}
            />
            <Route
              exact
              path={`${match.url}/investor/zones`}
              render={(props) => (
                <Permission>
                  <ZonesList {...props} />
                </Permission>
              )}
            />
            <Route
              exact
              path={`${match.url}/investor/worldwide-shares`}
              render={(props) => (
                <Permission>
                  <InvestorTransactionAndShare {...props} />
                </Permission>
              )}
            />
            <Route
              exact
              path={`${match.url}/investor/investor-transaction/:userId?/:userName?`}
              render={(props) => (
                <Permission>
                  <InvestorTransactionAndShare {...props} />
                </Permission>
              )}
            />
            <Route
              exact
              path={`${match.url}/investor/share-price`}
              render={(props) => (
                <Permission>
                  <InvestorTransactionAndShare {...props} />
                </Permission>
              )}
            />

            <Route
              exact
              path={`${match.url}/hubbers-team`}
              render={(props) => (
                <Permission>
                  <HubbersTeam {...props} />
                </Permission>
              )}
            />

            {/* <Route
              // exact
              path={`${match.url}/team`}
              render={(props) => (
                <Permission>
                  <Team {...props} />
                </Permission>
              )}
            /> */}

            <Route
              // exact
              path={`${match.url}/module`}
              render={(props) => <Module {...props} />}
            />

            <Route
              path={`${match.url}/contests/:contestList`}
              render={(props) => (
                <Permission>
                  <ContestList {...props} />
                </Permission>
              )}
            />
            <Route
              path={`${match.url}/contests/:contestMember`}
              render={(props) => (
                <Permission>
                  <ContestList {...props} />
                </Permission>
              )}
            />
            <Route
              path={`${match.url}/contests/:contestTemplate`}
              render={(props) => (
                <Permission>
                  <ContestList {...props} />
                </Permission>
              )}
            />
            <Route
              path={`${match.url}/contests/:contestEntry`}
              render={(props) => (
                <Permission>
                  <ContestList {...props} />
                </Permission>
              )}
            />

            <Route
              // exact
              path={`${match.url}/partner`}
              render={(props) => <Partner {...props} />}
            />

            <Route
              exact
              path={`${match.url}/masterclass/:masterclassId/:masterclassTitle`}
              render={(props) => (
                <Permission>
                  <StudentAndInvestorList {...props} />
                </Permission>
              )}
            />

            <Route
              // exact
              path={`${match.url}/masterclass/review`}
              render={(props) => (
                <Permission>
                  <MasterclassReviewsList {...props} />
                </Permission>
              )}
            />

            <Route
              // exact
              path={`${match.url}/masterclass`}
              render={(props) => (
                <Permission>
                  <MasterclasssList {...props} />
                </Permission>
              )}
            />

            <Route
              path={`${match.url}/blank-page`}
              render={(props) => <BlankPage {...props} />}
            />

            <Route
              exact
              path={`${match.url}/expert-marketplace/expetises/:marketplaceId?`}
              render={(props) => (
                <Permission>
                  <ExpertMarketplacesList {...props} />
                </Permission>
              )}
            />

            <Route
              exact
              path={`${match.url}/expert-marketplace/expetises/:expertiseId/:expertiseName`}
              render={(props) => (
                <Permission>
                  <ExpertiseUsersList {...props} />
                </Permission>
              )}
            />

            <Route
              exact
              path={`${match.url}/expert-marketplace/review`}
              render={(props) => (
                <Permission>
                  <ExpertiseReviewsList {...props} />
                </Permission>
              )}
            />

            <Route
              // exact
              path={`${match.url}/product-launcher/edit/:productId?`}
              render={(props) => (
                <Permission>
                  <EditProduct {...props} />
                </Permission>
              )}
            />

            <Route
              exact
              path={`${match.url}/product-launcher/:productId?`}
              render={(props) => (
                <Permission>
                  <ProductLaunchersList {...props} />
                </Permission>
              )}
            />
            <Route
              exact
              path={`${match.url}/product-launcher/:productId/:productName`}
              render={(props) => (
                <Permission>
                  <TeammateAndWorkspaces {...props} />
                </Permission>
              )}
            />
            <Route
              exact
              path={`${match.url}/jobs`}
              render={(props) => (
                <Permission>
                  <JobsList {...props} />
                </Permission>
              )}
            />
            <Route
              exact
              path={`${match.url}/job/review`}
              render={(props) => (
                <Permission>
                  <JobReviewsList {...props} />
                </Permission>
              )}
            />

            <ProtectedRoute path={`${match.url}/options`} component={Options} />
            <ProtectedRoute
              path={`${match.url}/managements`}
              component={Managements}
            />

            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
