/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Form, Input, Modal } from 'antd';
import { isEmpty } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../../../redux/actions';

const CreateNationality = ({ onCancel, data, ...props }) => {
  const { status } = useSelector(
    ({ nationality }) => nationality.createNationalityAction
  );
  const { status: updateStatus } = useSelector(
    ({ nationality }) => nationality.updateNationalityAction
  );

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const isSubmitting = useMemo(
    () => status === 'submitting' || updateStatus === 'submitting',
    [status, updateStatus]
  );

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
        Actions.updateNationality({
          ...payload,
          translate: {
            data: [{ key: values.nationality }],
            removeKeys: [{ key: data.nationality }],
          },
          id: data?.id,
          onSuccess: () => {
            onCancel();
            form.resetFields();
          },
        })
      );
    } else {
      dispatch(
        Actions.createNationality({
          ...payload,
          translate: {
            data: [{ key: values.nationality }],
          },
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
      title={isEmpty(data) ? 'New Nationality' : 'Edit Nationality'}
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
          name="nationality"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Nationality</h6>}
          style={{
            marginBottom: 32,
          }}
        >
          <Input placeholder="Type your nationality" />
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

export default CreateNationality;
