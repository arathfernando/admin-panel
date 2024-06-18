/* eslint-disable camelcase */
import { Avatar, Select, Space } from 'antd';
import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../../redux/actions';

const UserSelect = ({ optionValue, ...props }) => {
  const dispatch = useDispatch();
  const {
    users: userList,
    loading,
    error,
  } = useSelector((state) => state.users, shallowEqual);

  React.useEffect(() => {
    dispatch(Actions.getAllUsers({ page: 1, limit: 1000 }));
  }, []);

  return (
    <Select
      allowClear
      showSearch
      optionFilterProp="searchKey"
      loading={loading}
      status={loading ? 'warning' : error && 'error'}
      options={userList.map(({ general_profile, ...data }) => ({
        value: data[optionValue || 'id'],
        label: (
          <Space>
            <div className="position-relative">
              <Avatar size="small" src={general_profile?.avatar} />
            </div>
            <span>
              {general_profile?.first_name} {general_profile?.last_name}
            </span>
          </Space>
        ),
        searchKey: `${general_profile?.first_name || ''} ${
          general_profile?.last_name || ''
        } ${data?.email || ''}`,
      }))}
      placeholder="Please choose the user"
      {...props}
    />
  );
};

export default UserSelect;
