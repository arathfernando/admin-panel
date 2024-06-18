import { Select } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../../redux/actions';

const GroupSelect = ({ ...props }) => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.group);

  React.useEffect(() => {
    dispatch(Actions.getAllGroups({ page: 1, limit: 1000 }));
  }, [dispatch]);

  return (
    <Select
      showSearch
      allowClear
      loading={loading}
      status={loading ? 'warning' : error && 'error'}
      optionFilterProp="label"
      options={list?.map?.(({ id: value, group_name: label }) => ({
        value,
        label,
      }))}
      placeholder="Please choose the group"
      {...props}
    />
  );
};

export default GroupSelect;
