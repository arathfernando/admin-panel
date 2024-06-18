import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Permission from '../Permission';
import ActiclesList from './article/ArticleList';
import PostsList from './post/PostList';

const CommunityAll = React.lazy(() => import('./all'));
const CommunityEvent = React.lazy(() => import('./event'));
const CommunityMember = React.lazy(() => import('./member'));
const CommunityTopic = React.lazy(() => import('./topic'));
const CommunityGroup = React.lazy(() => import('./group'));

const Community = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        path={`${match.url}/all/:communityId?`}
        render={(props) => (
          <Permission path="/app/community/all">
            <CommunityAll {...props} />
          </Permission>
        )}
      />
      <Route
        path={`${match.url}/event`}
        render={(props) => (
          <Permission>
            <CommunityEvent {...props} />
          </Permission>
        )}
      />
      <Route
        path={`${match.url}/member`}
        render={(props) => (
          <Permission>
            <CommunityMember {...props} />
          </Permission>
        )}
      />
      <Route
        path={`${match.url}/topic`}
        render={(props) => (
          <Permission>
            <CommunityTopic {...props} />
          </Permission>
        )}
      />
      <Route
        path={`${match.url}/post`}
        render={(props) => (
          <Permission>
            <PostsList {...props} />
          </Permission>
        )}
      />
      <Route
        path={`${match.url}/article`}
        render={(props) => (
          <Permission>
            <ActiclesList {...props} />
          </Permission>
        )}
      />
      <Route
        path={`${match.url}/group`}
        render={(props) => (
          <Permission>
            <CommunityGroup {...props} />
          </Permission>
        )}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Community;
