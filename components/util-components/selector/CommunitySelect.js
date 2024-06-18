import { Select } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../../redux/actions';

const CommunitySelect = ({ ...props }) => {
  const dispatch = useDispatch();
  const { community, loading, error } = useSelector(
    (state) => state.communityAll
  );
  React.useEffect(() => {
    dispatch(Actions.getAllCommunity());
  }, [dispatch]);

  return (
    <Select
      allowClear
      showSearch
      loading={loading}
      status={loading ? 'warning' : error && 'error'}
      optionFilterProp="label"
      options={community?.map?.(({ id: value, name: label }) => ({
        value,
        label,
      }))}
      placeholder="Please choose the community"
      {...props}
    />
  );
};

export default CommunitySelect;
