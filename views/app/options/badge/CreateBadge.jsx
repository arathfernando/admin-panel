/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Form, Input, InputNumber, Modal } from 'antd';
import { isEmpty } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UploadImage from '../../../../components/UploadImage';
import * as Actions from '../../../../redux/actions';

const CreateBadge = ({ onCancel, data, ...props }) => {
  const { status } = useSelector(({ badge }) => badge.createBadgeAction);
  const { status: updateStatus } = useSelector(
    ({ badge }) => badge.updateBadgeAction
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
        Actions.updateBadge({
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
        Actions.createBadge({
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
      title={isEmpty(data) ? 'New Badge' : 'Edit Badge'}
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
          name="badge_name"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Badge name</h6>}
          style={{
            marginBottom: 32,
          }}
        >
          <Input placeholder="Type your badge name" />
        </Form.Item>

        <Form.Item
          name="badge_category"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Badge category</h6>}
          style={{
            marginBottom: 32,
          }}
        >
          <Input placeholder="Type your badge category" />
        </Form.Item>

        <Form.Item
          name="level"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Level</h6>}
          style={{
            marginBottom: 32,
          }}
        >
          <InputNumber className="w-100" placeholder="Type your level" />
        </Form.Item>

        <Form.Item
          name="hbb_points"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">HBB points</h6>}
          style={{
            marginBottom: 32,
          }}
        >
          <InputNumber className="w-100" placeholder="Type your hbb points" />
        </Form.Item>

        <Form.Item
          required
          label={<h6 className="input-label">Badge image</h6>}
        >
          <div className="p-2 border rounded-2">
            <Form.Item
              name="badge_image"
              style={{ marginBottom: 0 }}
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <UploadImage aspect={1} center>
                <img
                  src="/assets/img/icons/add-image.svg"
                  className="my-auto mx-1 mb-sm-2"
                  alt="icon"
                />
                <h6 className="fs-16 fw-6 mb-1">
                  <u>Add image</u>
                </h6>
              </UploadImage>
            </Form.Item>
          </div>
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

export default CreateBadge;
