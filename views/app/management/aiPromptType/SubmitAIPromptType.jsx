/* eslint-disable no-template-curly-in-string */
/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Form, Input, Modal, Select } from 'antd';
import { useWatch } from 'antd/lib/form/Form';
import { isEmpty } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../../../redux/actions';

const SubmitAIPromptType = ({ onCancel, data, ...props }) => {
  const { status } = useSelector(
    ({ aiPromptType }) => aiPromptType.createAIPromptTypeAction
  );
  const { status: updateStatus } = useSelector(
    ({ aiPromptType }) => aiPromptType.updateAIPromptTypeAction
  );

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const isSubmitting = useMemo(
    () => status === 'submitting' || updateStatus === 'submitting',
    [status, updateStatus]
  );

  const variable_names = useWatch('variable_names', form);

  // separate variables from input prompts text
  useEffect(() => {
    if (!isEmpty(variable_names)) {
      try {
        form.setFieldValue(
          'variable_names',
          variable_names.reduce((allVr, variable_name) => {
            const variablesWithCurlyBrkt = variable_name?.split?.('}') || [];
            const newVrbls = variablesWithCurlyBrkt
              .map(
                (variableWthCrlyBrkt = '') =>
                  `${variableWthCrlyBrkt}}`.match(/\$\{([^\]])*\}/)?.[0]
              )
              .filter((newVrbl) => newVrbl);

            if (!isEmpty(newVrbls)) {
              newVrbls.map((newVrbl) => allVr.push(newVrbl));
            } else if (variable_name) {
              allVr.push(`\${${variable_name}}`);
            }

            return allVr;
          }, [])
        );
      } catch (error) {
        console.log('error', { error });
      }
    }
  }, [variable_names]);

  // set data
  useEffect(() => {
    if (!isEmpty(data)) {
      form.setFieldsValue({
        ...data,
      });
    }
  }, [data, form]);

  const onFinish = ({ ...values }) => {
    const payload = {
      ...values,
    };
    if (!isEmpty(data)) {
      dispatch(
        Actions.updateAIPromptType({
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
        Actions.createAIPromptType({
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
      title={isEmpty(data) ? 'New AI Prompt Type' : 'Edit AI Prompt Type'}
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
          name="name"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Prompt type name</h6>}
          style={{
            marginBottom: 32,
          }}
        >
          <Input placeholder="Type prompt type name" />
        </Form.Item>

        <Form.Item
          name="variable_names"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Prompt variable names</h6>}
        >
          <Select
            allowClear
            placeholder="Input ${variableName} or paste prompt test it will separate variable names"
            options={[]}
            mode="tags"
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

export default SubmitAIPromptType;
