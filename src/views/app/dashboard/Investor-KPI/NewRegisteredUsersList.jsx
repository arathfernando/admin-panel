import { Form, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getActiveUsers,
  getRegisteredUsers,
  getUnregistaredUsers,
  getViewAllUsers,
} from '../../../../redux/actions';
import NewRegisteredUsersTable from './NewRegisteredUsersTable';

const NewRegisteredUsersList = () => {
  const viewAllUsers = useSelector(({ kpi }) => kpi.viewAllUsers);
  const registeredUsers = useSelector(({ kpi }) => kpi.registeredUsers);
  const activeUsers = useSelector(({ kpi }) => kpi.activeUsers);
  // const unregistaredUsers = useSelector(({ kpi }) => kpi.unregistaredUsers);

  const [activeTabKey, setActiveTabKey] = useState('view_all');
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const getUserData = (params = {}) => {
    switch (activeTabKey) {
      case 'view_all':
        dispatch(getViewAllUsers(params));
        break;
      case 'registered':
        dispatch(getRegisteredUsers(params));
        break;
      case 'active_users':
        dispatch(getActiveUsers(params));
        break;
      case 'unregistered':
        dispatch(getUnregistaredUsers(params));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    getUserData({ startDate: form.getFieldValue('startDate') });
  }, [activeTabKey]);

  return (
    <div style={{ padding: 27, background: 'white', borderRadius: 10 }}>
      <Tabs
        className="tab-style-2"
        onChange={setActiveTabKey}
        activeKey={activeTabKey}
        items={[
          {
            label: 'View all',
            key: 'view_all',
            children: (
              <NewRegisteredUsersTable
                form={form}
                data={viewAllUsers}
                getUserData={getUserData}
              />
            ),
          },
          {
            label: 'Registered',
            key: 'registered',
            children: (
              <NewRegisteredUsersTable
                form={form}
                data={registeredUsers}
                getUserData={getUserData}
              />
            ),
          },
          {
            label: 'Active users',
            key: 'active_users',
            children: (
              <NewRegisteredUsersTable
                form={form}
                data={activeUsers}
                getUserData={getUserData}
              />
            ),
          },
          // {
          //   label: 'Unregistered',
          //   key: 'unregistered',
          //   children: (
          //     <NewRegisteredUsersTable
          //       form={form}
          //       data={unregistaredUsers}
          //       getUserData={getUserData}
          //       type="unregistered"
          //     />
          //   ),
          // },
        ]}
      />
    </div>
  );
};

export default NewRegisteredUsersList;
