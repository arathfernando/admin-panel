import { Select } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../../redux/actions';

const CountrySelect = ({ ...props }) => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.country);

  React.useEffect(() => {
    dispatch(Actions.getAllCountry());
  }, [dispatch]);

  return (
    <Select
      allowClear
      showSearch
      placeholder="Please choose the country"
      loading={loading}
      status={loading ? 'warning' : error && 'error'}
      optionFilterProp="label"
      options={list?.map?.(({ id: value, country_name: label }) => ({
        value,
        label,
      }))}
      {...props}
    />
  );
};

export default CountrySelect;
