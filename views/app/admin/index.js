import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Row } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import { getPermissions } from '../../../redux/actions';
import AdminList from './list';

const Admins = ({ match }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPermissions());
  }, [dispatch]);
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="admins.title" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Colxx xxs="12" className="mb-4">
        <div>
          <div style={{ marginTop: 10 }}>
            <AdminList />
          </div>
        </div>
      </Colxx>
    </>
  );
};

export default Admins;
