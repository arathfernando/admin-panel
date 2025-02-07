import React from 'react';
import { Row } from 'reactstrap';
import {
  Colxx,
  Separator
} from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import GoalList from './list';

const Goal = ({ match }) => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="goal.title" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Colxx xxs="12" className="mb-4">
        <div>
          <div className="social-list" style={{ marginTop: 10 }}>
            <GoalList />
          </div>
        </div>
      </Colxx>
    </>
  );
};

export default Goal;
