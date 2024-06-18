/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Checkbox, Form, Modal, Select } from 'antd';
import { isEmpty } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import * as Actions from '../../../../../redux/actions';

const SubmitTranslationLanguage = ({ onCancel, data, ...props }) => {
  const { status } = useSelector(
    ({ transLanguage }) => transLanguage.addTranslationLanguageAction
  );
  const { status: updateStatus } = useSelector(
    ({ transLanguage }) => transLanguage.translateTranslationKeyAction
  );

  const { data: translationLanguages = [] } = useSelector(
    ({ transLanguage }) => transLanguage.translationLanguages,
    shallowEqual
  );
  const { list = [], loading } = useSelector(
    (state) => state.translationLanguage,
    shallowEqual
  );

  const hasOneDefaultLanguageAlready = useMemo(
    () =>
      translationLanguages?.find?.(({ is_default }) => is_default === 'TRUE'),
    [translationLanguages]
  );
  const languageList = useMemo(
    () =>
      list?.map((data) => ({
        ...data,
        disabled: !!translationLanguages.find(
          ({ translation_language }) => translation_language?.id === data.id
        ),
      })),
    [list, translationLanguages]
  );

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { projectId } = useParams();

  const isSubmitting = useMemo(
    () => status === 'submitting' || updateStatus === 'submitting',
    [status, updateStatus]
  );

  // set data
  useEffect(() => {
    if (!isEmpty(data)) {
      form.setFieldsValue({
        ...data,
        is_default: data?.is_default === 'TRUE',
        translation_language_id: data?.translation_language?.id,
      });
    }
  }, [data, form]);

  useEffect(() => {
    dispatch(Actions.getAllTranslationLanguages());
  }, []);

  const onFinish = ({ is_default, ...values }) => {
    const payload = {
      ...values,
      translation_project_id: projectId,
      is_default: is_default ? 'TRUE' : 'FALSE',
    };
    if (!isEmpty(data)) {
      dispatch(
        Actions.translateTranslationKey({
          ...payload,
          id: data?.id,
          onSuccess: () => {
            onCancel();
            form.resetFields();
          },
        })
      );
    } else {
      dispatch(
        Actions.addTranslationLanguage({
          ...payload,
          onSuccess: () => {
            onCancel();
            form.resetFields();
          },
        })
      );
    }
  };

  return (
    <Modal
      footer={null}
      width={710}
      title={
        isEmpty(data) ? 'New Translation Language' : 'Edit Translation Language'
      }
      className="sidecreen-modal-3 custom_styles"
      onCancel={onCancel}
      closeIcon={
        <img
          src="/assets/img/icons/modal-close.svg"
          alt=""
          onClick={onCancel}
        />
      }
      {...props}
    >
      <Form
        layout="vertical"
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        className="custom-form-style"
      >
        <Form.Item
          name="translation_language_id"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Language</h6>}
          style={{
            marginBottom: 18,
          }}
        >
          <Select
            showSearch
            placeholder="choose translation language"
            loading={loading}
            optionFilterProp="seach"
            options={languageList?.map?.(
              ({ id: value, language_name, language_key, flag, disabled }) => ({
                value,
                label: (
                  <div className="d-flex align-items-center" style={{ gap: 8 }}>
                    <img alt="" src={flag} style={{ width: 18 }} />
                    <span>{language_name}</span>
                  </div>
                ),
                seach: `${language_key} ${language_name}`,
                disabled,
              })
            )}
          />
        </Form.Item>

        <Form.Item
          name="is_default"
          style={{
            marginBottom: 32,
          }}
          valuePropName="checked"
        >
          <Checkbox
            disabled={
              hasOneDefaultLanguageAlready && data?.is_default !== 'TRUE'
            }
          >
            Use as a default language
          </Checkbox>
        </Form.Item>

        <div className="d-flex justify-content-end">
          <Button
            type="primary ml-3 px-4"
            size="large"
            htmlType="submit"
            loading={isSubmitting}
          >
            Add
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default SubmitTranslationLanguage;
