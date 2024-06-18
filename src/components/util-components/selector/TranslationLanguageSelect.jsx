/* eslint-disable camelcase */
import { Select } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../../redux/actions';

const TranslationLanguageSelect = ({ idValue = true, ...props }) => {
  const dispatch = useDispatch();
  const {
    list: languageList,
    loading,
    error,
  } = useSelector((state) => state.translationLanguage);

  React.useEffect(() => {
    dispatch(Actions.getAllTranslationLanguages());
  }, [dispatch]);

  return (
    <Select
      allowClear
      showSearch
      placeholder="Please choose the language"
      loading={loading}
      status={loading ? 'warning' : error && 'error'}
      optionFilterProp="seach"
      options={languageList?.map?.(
        ({ id: value, language_name, language_key, flag }) => ({
          value: idValue ? value : language_name,
          label: (
            <div className="d-flex align-items-center" style={{ gap: 8 }}>
              <img alt="" src={flag} style={{ width: 18 }} />
              <span>{language_name}</span>
            </div>
          ),
          seach: `${language_key} ${language_name}`,
        })
      )}
      {...props}
    />
  );
};

export default TranslationLanguageSelect;
