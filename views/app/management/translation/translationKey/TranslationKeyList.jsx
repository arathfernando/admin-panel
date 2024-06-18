/* eslint-disable camelcase */
import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import usePermission from '../../../../../hooks/usePermission';
import TranslationKeyTable from './TranslationKeyTable';

import useDebounce from '../../../../../hooks/useDebounce';
import SubmitTranslationKey from './SubmitTranslationKey';

const TranslationKeysList = () => {
  const { data: translationKeys = [] } = useSelector(
    ({ translationKey }) => translationKey.translationKeys
  );

  const [openCreateTranslationKey, setOpenCreateTranslationKey] =
    useState(false);

  const [form] = Form.useForm();
  const [searchTranslationKey, setSearchTranslationKey] = useState('');

  const debounce = useDebounce();

  const { hasCreatePermission } = usePermission({
    path: '/app/managements/translation/translation-key',
  });

  return (
    <>
      <div
        style={{ padding: '40px 3%', background: 'white' }}
        className="custom_styles flex-grow-1"
      >
        <div
          className="d-flex justify-content-between flex-wrap align-items-start mb-2"
          style={{ gap: 12 }}
        >
          <div>
            <h2 className="hb-text-primary fs-36 fw-8 mb-1">
              Translation Keys
            </h2>
            <p className="p-sm mb-0 hb-text-primary">
              {translationKeys.length ? (
                <>{translationKeys.length} translation keys</>
              ) : null}
            </p>
          </div>
          <Form
            form={form}
            className="custom-form-style flex-grow-1 d-flex justify-content-center"
          >
            <Form.Item name="searchtranslationkey" noStyle>
              <Input
                placeholder="Search translation keys"
                style={{ maxWidth: 400 }}
                className="flex-grow-1"
                onChange={({ target }) => {
                  debounce(() => {
                    setSearchTranslationKey(target.value);
                  }, 250);
                }}
              />
            </Form.Item>
          </Form>
          <Button
            type="primary mb-3"
            onClick={() => setOpenCreateTranslationKey(true)}
            disabled={!hasCreatePermission}
          >
            + Create Translation Key
          </Button>
        </div>

        <TranslationKeyTable searchtranslationkey={searchTranslationKey} />
      </div>

      <SubmitTranslationKey
        open={openCreateTranslationKey}
        onCancel={() => setOpenCreateTranslationKey(false)}
      />
    </>
  );
};

export default TranslationKeysList;
