import { Select } from 'antd';
import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../../redux/actions';

const TagSelect = ({ ...props }) => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector(
    (state) => state.basicType,
    shallowEqual
  );

  React.useEffect(() => {
    dispatch(Actions.getAllBasicType({ page: 1, limit: 1000 }));
  }, [dispatch]);

  return (
    <Select
      allowClear
      showSearch
      options={list?.map?.(({ id: value, name: label }) => ({ value, label }))}
      loading={loading}
      status={loading ? 'warning' : error && 'error'}
      optionFilterProp="label"
      mode="multiple"
      placeholder="Please choose the tag"
      {...props}
    />
  );
};

export default TagSelect;
