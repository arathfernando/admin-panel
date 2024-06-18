/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Form, Input, Modal } from 'antd';
import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ImgCropS3Upload from '../../../../components/util-components/ImgCropS3Upload';
import UserSelect from '../../../../components/util-components/selector/UserSelect';
import * as Actions from '../../../../redux/actions';

const CreateCourseCategory = ({ onCancel, data, ...props }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  // set data
  useEffect(() => {
    if (!isEmpty(data)) {
      form.setFieldsValue({
        ...data,
        created_by: data?.created_by?.id,
      });
    }
  }, [data, form]);

  const onFinish = (values) => {
    onCancel(values);
    form.resetFields();
    if (!isEmpty(data)) {
      dispatch(
        Actions.updateCourseCategory({
          ...values,
          id: data.id,
          translate: {
            data: [{ key: values.name }, { key: values.description }],
            removeKeys: [{ key: data.description }, { key: data.description }],
          },
          onSuccess: () => {
            onCancel();
          },
        })
      );
    } else {
      dispatch(
        Actions.createCourseCategory({
          ...values,
          translate: {
            data: [{ key: values.name }, { key: values.description }],
          },
          onSuccess: () => {
            onCancel();
          },
        })
      );
    }
  };

  return (
    <Modal
      footer={null}
      width={710}
      title="New category"
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
        hideRequiredMark
        className="custom-form-style"
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Category name</h6>}
          className="mb-4 pb-3"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Category description</h6>}
          className="mb-4 pb-3"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="icon"
          label={<h6 className="h6-lg">Category icon</h6>}
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <ImgCropS3Upload
            className="w-100 p-2 border rounded-2"
            style={{ height: 100 }}
            aspect={1}
          >
            <div className="d-flex justify-content-center flex-column">
              <img
                src="/assets/img/icons/add-media.svg"
                className="my-auto mx-1 mb-sm-2"
                alt="icon"
                style={{ height: 22 }}
              />
              <h6 className="fs-12 fw-6 mb-1 hb-text-primary">
                <u>Add Icon</u>
              </h6>
            </div>
          </ImgCropS3Upload>
        </Form.Item>

        <Form.Item
          name="created_by"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Created by</h6>}
          className="mb-4 pb-3"
        >
          <UserSelect placeholder="Type your name" />
        </Form.Item>

        <div className="d-flex justify-content-end mt-5">
          <Button
            type="primary ml-3 px-4"
            size="large"
            htmlType="submit"
            // loading={isSubmitting}
          >
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateCourseCategory;
