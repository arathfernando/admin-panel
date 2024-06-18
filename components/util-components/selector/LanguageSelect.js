/* eslint-disable camelcase */
import { Select } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../../redux/actions';

const LanguageSelect = ({ idValue = true, ...props }) => {
  const dispatch = useDispatch();
  const {
    list: languageList,
    loading,
    error,
  } = useSelector((state) => state.language);

  React.useEffect(() => {
    dispatch(Actions.getAllLanguage({ page: 1, limit: 1000 }));
  }, [dispatch]);

  return (
    <Select
      allowClear
      showSearch
      placeholder="Please choose the language"
      loading={loading}
      status={loading ? 'warning' : error && 'error'}
      optionFilterProp="label"
      options={languageList?.map?.(
        ({ id: value, language_name: label, language_name }) => ({
          value: idValue ? value : language_name,
          label,
        })
      )}
      {...props}
    />
  );
};

export default LanguageSelect;
