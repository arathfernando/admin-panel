import React from 'react';
import { Row } from 'reactstrap';
import {
  Colxx,
  Separator,
} from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import ContestCategoryList from './list';

const ContestCategory = ({ match }) => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="contest-category.title" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Colxx xxs="12" className="mb-4">
        <div>
          <div className="contestCategory-list" style={{ marginTop: 10 }}>
            <ContestCategoryList />
          </div>
        </div>
      </Colxx>
    </>
  );
};

export default ContestCategory;
