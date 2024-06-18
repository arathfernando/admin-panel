import { Tabs } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Container } from 'reactstrap';
import BasicInfo from './BasicInfo';
import Interests from './Interests';

import { getSingleUser } from '../../../../redux/actions';
import RoleInfo from './RoleInfo';

const EditUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // get user data
  useEffect(() => {
    if (id) {
      dispatch(getSingleUser({ id }));
    }
  }, [id]);

  return (
    <Container>
      <Tabs
        type="card"
        className="tab-style-1 mb-2"
        items={[
          {
            label: <span className="px-1 py-2">Basic info</span>,
            key: 'basic_info',
            children: <BasicInfo />,
            style: {
              background: '#f8f8f8',
            },
          },
          {
            label: <span className="px-1 py-2">Role info</span>,
            key: 'role_info',
            children: <RoleInfo />,
          },
          {
            label: <span className="px-1 py-2">Interests</span>,
            key: 'interests',
            children: <Interests />,
          },
        ]}
      />
    </Container>
  );
};

export default EditUser;
