import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Permission from '../Permission';
import AIPromptsList from './aiPrompt/AIPromptList';
import AIPromptTypesList from './aiPromptType/AIPromptTypeList';
import NotificationsList from './notification/NotificationList';
import PermissionsList from './permission/PermissionList';
import TranslationKeyAndLanguages from './translation/TanslationKeyAndLanguages';
import TranslationProjectsList from './translation/translationProject/TranslationProjectList';
import WalkthroughCategorysList from './walkthroughCategory/WalkthroughCategoryList';
import WalkthroughStepsList from './walkthroughStep/WalkthroughStepList';

const Managements = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/permission`} />

      <Route
        path={`${match.url}/permission`}
        render={(props) => (
          // <Permission>
          <PermissionsList {...props} />
          // </Permission>
        )}
      />

      <Route
        exac
        path={`${match.url}/ai-prompt-type`}
        render={(props) => (
          <Permission>
            <AIPromptTypesList {...props} />
          </Permission>
        )}
      />

      <Route
        exac
        path={`${match.url}/ai-prompt`}
        render={(props) => (
          <Permission>
            <AIPromptsList {...props} />
          </Permission>
        )}
      />

      <Route
        exact
        path={`${match.url}/translation`}
        render={(props) => (
          <Permission>
            <TranslationProjectsList {...props} />
          </Permission>
        )}
      />

      <Route
        exact
        path={`${match.url}/translation/:tab/:projectId/:projectName`}
        render={(props) => <TranslationKeyAndLanguages {...props} />}
      />

      <Route
        exact
        path={`${match.url}/notification`}
        render={(props) => (
          <Permission>
            <NotificationsList {...props} />
          </Permission>
        )}
      />

      <Route
        exact
        path={`${match.url}/walkthrough_category`}
        render={(props) => (
          <Permission>
            <WalkthroughCategorysList {...props} />
          </Permission>
        )}
      />

      <Route
        exact
        path={`${match.url}/walkthrough_step`}
        render={(props) => (
          <Permission>
            <WalkthroughStepsList {...props} />
          </Permission>
        )}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Managements;
