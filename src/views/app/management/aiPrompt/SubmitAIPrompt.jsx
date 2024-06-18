/* eslint-disable no-empty */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-key */
/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Form, Modal, Select, Tooltip } from 'antd';
import { useWatch } from 'antd/lib/form/Form';
import TextArea from 'antd/lib/input/TextArea';
import { isEmpty } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { openNotificationWithIcon } from '../../../../ApiConfig';
import * as Actions from '../../../../redux/actions';

export const handleCoppyLink = (variableName = '') => {
  try {
    // eslint-disable-next-line prefer-const
    let promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve(variableName);
      }, 0);
    });
    // eslint-disable-next-line no-undef
    const text = new ClipboardItem({
      'text/plain': promise.then(
        (text) => new Blob([text], { type: 'text/plain' })
      ),
    });
    navigator.clipboard.write([text]);
    openNotificationWithIcon(
      'success',
      `copied variable name: ${variableName}`
    );
  } catch (error) {}
};

const SubmitAIPrompt = ({ onCancel, data, ...props }) => {
  const { data: aiPromptTypes, loading } = useSelector(
    ({ aiPromptType }) => aiPromptType.aiPromptTypes,
    shallowEqual
  );
  const { data: aiPrompts } = useSelector(({ aiPrompt }) => aiPrompt.aiPrompts);
  const { status } = useSelector(
    ({ aiPrompt }) => aiPrompt.createAiPromptAction
  );
  const { status: updateStatus } = useSelector(
    ({ aiPrompt }) => aiPrompt.updateAiPromptAction
  );

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const prompt_type = useWatch('prompt_type', form);

  const isSubmitting = useMemo(
    () => status === 'submitting' || updateStatus === 'submitting',
    [status, updateStatus]
  );

  const selectedPromptType = useMemo(
    () => aiPromptTypes?.find?.(({ id }) => id === prompt_type),
    [aiPromptTypes, prompt_type]
  );

  useEffect(() => {
    dispatch(Actions.getAIPromptTypes());
  }, [dispatch]);

  // set data
  useEffect(() => {
    if (!isEmpty(data)) {
      form.setFieldsValue({
        ...data,
        prompt_type: data?.prompt_type?.id,
      });
    }
  }, [data, form]);

  const onFinish = ({ ...values }) => {
    const payload = {
      ...values,
    };
    if (!isEmpty(data)) {
      dispatch(
        Actions.updateAiPrompt({
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
        Actions.createAiPrompt({
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
      title={isEmpty(data) ? 'New AI Prompt' : 'Edit AI Prompt'}
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
          name="prompt_type"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Prompt type</h6>}
          style={{ marginBottom: 40 }}
        >
          <Select
            optionFilterProp="label"
            showSearch
            loading={loading}
            placeholder="Choose prompt type"
            options={
              aiPromptTypes?.map(({ id: value, name: label }) => ({
                value,
                label,
                disabled: aiPrompts.some(
                  ({ prompt_type }) => prompt_type?.id === value
                ),
              })) || []
            }
          />
        </Form.Item>

        {!isEmpty(selectedPromptType?.variable_names) && (
          <>
            <h6
              className="h6-sm text-grey-light mb-0"
              style={{ marginTop: -25 }}
            >
              Available variables for the {selectedPromptType?.name}:
            </h6>
            <h6
              className="h6-sm text-grey-light fw-8 cursor-pointer"
              style={{ marginBottom: 39, marginTop: 2 }}
            >
              {selectedPromptType?.variable_names?.map?.((variableName) => (
                <Tooltip title="click to coppy">
                  <span onClick={() => handleCoppyLink(variableName)}>
                    {variableName} &nbsp;
                  </span>
                </Tooltip>
              ))}
            </h6>
          </>
        )}

        <Form.Item
          name="prompt_text"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Prompt text</h6>}
          style={{
            marginBottom: 32,
          }}
        >
          <TextArea
            rows={5}
            placeholder="Type your prompt text"
            style={{ resize: 'vertical' }}
            autoSize
          />
        </Form.Item>
        <div className="d-flex justify-content-end">
          <Button
            type="primary ml-3 px-4"
            size="large"
            htmlType="submit"
            loading={isSubmitting}
          >
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default SubmitAIPrompt;
