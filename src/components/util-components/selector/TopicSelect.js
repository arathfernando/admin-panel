import { Select } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../../redux/actions';

const TopicSelect = ({ ...props }) => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.topic);

  React.useEffect(() => {
    dispatch(Actions.getAllTopics({ page: 1, limit: 1000 }));
  }, [dispatch]);

  return (
    <Select
      allowClear
      showSearch
      loading={loading}
      status={loading ? 'warning' : error && 'error'}
      optionFilterProp="label"
      mode="multiple"
      placeholder="Please choose the topic"
      options={list?.map?.(({ id: value, name: label }) => ({ value, label }))}
      {...props}
    />
  );
};

export default TopicSelect;
