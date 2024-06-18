/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Form, Input, Modal } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { isEmpty } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createNotification,
  updateNotification,
} from '../../../../redux/actions';

const SubmitNotification = ({ onCancel, data, ...props }) => {
  const { status } = useSelector(
    ({ notification }) => notification.createNotificationAction
  );
  const { status: updateStatus } = useSelector(
    ({ notification }) => notification.updateNotificationAction
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
        updateNotification({
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
        createNotification({
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
      title={isEmpty(data) ? 'New Notification' : 'Edit Notification'}
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
          name="notification_type"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Notification type</h6>}
          style={{
            marginBottom: 32,
          }}
        >
          <Input placeholder="Type notification type" />
        </Form.Item>

        <Form.Item
          name="notification_title"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Notification title</h6>}
          style={{
            marginBottom: 32,
          }}
        >
          <Input placeholder="Type notification title" />
        </Form.Item>
        <Form.Item
          name="notification_content"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Notification content</h6>}
          style={{
            marginBottom: 32,
          }}
        >
          <TextArea rows={5} placeholder="Type notification content" />
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

export default SubmitNotification;
