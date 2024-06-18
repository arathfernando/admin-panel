/* eslint-disable camelcase */
import { Select } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInvestorZones } from '../../../redux/actions';

const ZoneSelect = ({ options, ...props }) => {
  const {
    data: investorZones,
    loading,
    error,
  } = useSelector(({ investorZone }) => investorZone.investorZones);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInvestorZones());
  }, [dispatch]);

  return (
    <Select
      allowClear
      showSearch
      loading={loading}
      status={loading ? 'warning' : error && 'error'}
      filterOption={(input, option) =>
        (
          `${option?.area_name} ${option?.subarea_name}`?.toLocaleLowerCase() ??
          ''
        ).includes(input?.toLocaleLowerCase())
      }
      options={
        options?.(investorZones) ||
        investorZones.map(({ id: value, area_name, subarea_name }) => ({
          value,
          label: `${area_name || ' '} >> ${subarea_name || ''}`,
          area_name,
          subarea_name,
        }))
      }
      {...props}
    />
  );
};

export default ZoneSelect;
