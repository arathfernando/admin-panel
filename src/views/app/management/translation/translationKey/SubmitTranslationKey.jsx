/* eslint-disable no-nested-ternary */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Form, Input, Modal, Select } from 'antd';
import { isEmpty } from 'lodash';
import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import * as Actions from '../../../../../redux/actions';

const SubmitTranslationKey = ({ onCancel, data, ...props }) => {
  const { status } = useSelector(
    ({ translationKey }) => translationKey.createTranslationKeyAction
  );
  const { status: updateStatus } = useSelector(
    ({ translationKey }) => translationKey.updateTranslationKeyAction
  );
  const {
    data: translationKeys,
    translationNamespace = [],
    loading,
  } = useSelector(({ translationKey }) => translationKey.translationKeys);

  const namespaceInptRef = useRef();

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
        translation_key: [data?.translation_key || ''],
        namespace: data?.namespace ? [data.namespace] : [],
      });
    }
  }, [data, form]);

  const onFinish = ({ namespace, ...values }) => {
    const payload = {
      ...values,
      namespace: namespace?.[0] || '',
      translation_project_id: projectId,
    };
    if (!isEmpty(data)) {
      dispatch(
        Actions.updateTranslationKey({
          ...payload,
          id: data?.id,
          translation_key: values.translation_key?.[0],
          onSuccess: () => {
            onCancel();
            form.resetFields();
          },
        })
      );
    } else {
      dispatch(
        Actions.createTranslationKey({
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
      title={isEmpty(data) ? 'New Translation Key' : 'Edit Translation Key'}
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
        className="custom-form-style"
        onFinish={onFinish}
      >
        <h6 className="h6-lg">Translation Key{isEmpty(data) && 's'}</h6>
        <Form.List initialValue={['']} name="translation_key">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, indx) => (
                <div
                  className="d-flex justify-content-between align-items-center"
                  style={{ gap: 24 }}
                >
                  <Form.Item
                    style={{ marginBottom: 28, flexGrow: 1 }}
                    {...field}
                    rules={[
                      ({ getFieldValue }) => ({
                        validator() {
                          return !getFieldValue('translation_key')?.[indx]
                            ? Promise.reject('Please input translation key')
                            : translationKeys?.find?.(
                                ({ translation_key }) =>
                                  translation_key?.[0] ===
                                  getFieldValue('translation_key')?.[indx]
                              ) && isEmpty(data)
                            ? Promise.reject('key already exist')
                            : Promise.resolve();
                        },
                      }),
                    ]}
                  >
                    <Input
                      placeholder="Type new key"
                      autoFocus
                      readOnly={!isEmpty(data)}
                      onPressEnter={() => add('')}
                    />
                  </Form.Item>

                  {fields?.length > 1 && (
                    <img
                      src="/assets/img/icons/delete-outline.svg"
                      alt=""
                      style={{ height: 22, marginBottom: 34 }}
                      className="cursor-pointer"
                      onClick={() => remove(indx)}
                    />
                  )}
                </div>
              ))}
              {isEmpty(data) && (
                <Button
                  type="text px-1 mt-n3 mb-4"
                  className="h6-sm hb-text-primary"
                  onClick={() => add('')}
                >
                  + Add new translation key
                </Button>
              )}
            </>
          )}
        </Form.List>

        <Form.Item
          name="namespace"
          label={<h6 className="h6-lg">Namespace</h6>}
          style={{
            marginBottom: 32,
          }}
        >
          <Select
            ref={namespaceInptRef}
            placeholder="Type namespace"
            mode="tags"
            showSearch
            allowClear
            optionFilterProp="label"
            options={translationNamespace
              .filter((value) => value)
              .map((value) => ({
                value,
                label: value,
              }))}
            loading={loading}
            onSelect={(value) => {
              form.setFieldValue('namespace', [value]);
              namespaceInptRef.current.blur();
            }}
            notFoundContent={<span>Type & create a new namespace</span>}
          />
        </Form.Item>
        <div className="d-flex justify-content-end">
          <Button
            type="primary ml-3 px-4"
            size="large"
            loading={isSubmitting}
            onClick={() => form.submit()}
          >
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default SubmitTranslationKey;
