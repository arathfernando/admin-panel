/* eslint-disable array-callback-return */
import { PlayCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useMemo, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import usePermission from '../../../../../hooks/usePermission';
import TranslationLanguageTable from './TranslationLanguageTable';

import useDebounce from '../../../../../hooks/useDebounce';
import {
  getTranslationKeys,
  getTranslationLanguages,
  startAutoTranslation,
} from '../../../../../redux/actions';
import SubmitTranslationLanguage from './SubmitTranslationLanguage';

const TranslationLanguagesList = () => {
  const { data: translationLanguages } = useSelector(
    ({ transLanguage }) => transLanguage.translationLanguages
  );

  const { loading: atutoTranslateLoading } = useSelector(
    ({ translationKey }) => translationKey.startAutoTranslationAction,
    shallowEqual
  );

  const loadingAutotranslatingAll = useMemo(
    () => !!Object.values(atutoTranslateLoading).find((loading) => loading),
    [atutoTranslateLoading]
  );

  const dispatch = useDispatch();
  const debounce = useDebounce();

  const [openAddTranslationLanguage, setOpenAddTranslationLanguage] =
    useState(false);

  const { hasCreatePermission, hasSpecificPermission: hasTranslatePermission } =
    usePermission({
      specificPermission: 'translate',
      path: '/app/managements/translation/translation-language',
    });

  return (
    <>
      <div
        style={{ padding: '40px 3%', background: 'white' }}
        className="custom_styles flex-grow-1"
      >
        <div className="d-flex justify-content-between flex-wrap">
          <h2 className="hb-text-primary fs-36 fw-8 mb-4">
            Translation Languages
          </h2>

          <div
            className="d-flex justify-content-between flex-wrap"
            style={{ gap: 12 }}
          >
            <Button
              type="ghost br-5 px-3 d-flex align-items-center justify-content-end mb-3"
              icon={<PlayCircleOutlined />}
              disabled={!hasTranslatePermission || loadingAutotranslatingAll}
              onClick={() => {
                translationLanguages.map(({ id }) => {
                  dispatch(
                    startAutoTranslation({
                      id,
                      fetchAgainAfterComplete: false,
                      onSuccess: () =>
                        debounce(() => {
                          // possibly fetch once at last after auto-translation done for all language
                          dispatch(getTranslationKeys());
                          dispatch(getTranslationLanguages());
                        }, 500),
                    })
                  );
                });
              }}
            >
              Auto-translation all
            </Button>
            <Button
              type="primary mb-3"
              onClick={() => setOpenAddTranslationLanguage(true)}
              disabled={!hasCreatePermission}
            >
              + Add New Language
            </Button>
          </div>
        </div>

        <TranslationLanguageTable />
      </div>

      <SubmitTranslationLanguage
        open={openAddTranslationLanguage}
        onCancel={() => setOpenAddTranslationLanguage(false)}
      />
    </>
  );
};

export default TranslationLanguagesList;
