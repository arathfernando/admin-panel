import { Select } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../../redux/actions';

const PartnerSelect = ({ ...props }) => {
  const dispatch = useDispatch();
  const { partnerList, loading, error } = useSelector((state) => state.partner);

  React.useEffect(() => {
    dispatch(Actions.getAllPartner());
  }, [dispatch]);

  return (
    <Select
      allowClear
      showSearch
      loading={loading}
      status={loading ? 'warning' : error && 'error'}
      optionFilterProp="label"
      options={partnerList?.map?.(({ id: value, partner_name: label }) => ({
        value,
        label,
      }))}
      {...props}
    />
  );
};

export default PartnerSelect;
