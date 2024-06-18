/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Form, Input, Modal } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { isEmpty } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../../../redux/actions';

const CreateProductInnovationCategory = ({ onCancel, data, ...props }) => {
  const { status } = useSelector(
    ({ productInnovationCategory }) =>
      productInnovationCategory.createProductInnovationCategoryAction
  );
  const { status: updateStatus } = useSelector(
    ({ productInnovationCategory }) =>
      productInnovationCategory.updateProductInnovationCategoryAction
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
        Actions.updateProductInnovationCategory({
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
        Actions.createProductInnovationCategory({
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
        isEmpty(data)
          ? 'New Product Innovation Category'
          : 'Edit Product Innovation Category'
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
        hideRequiredMark
        className="custom-form-style"
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Name</h6>}
          className="mb-4 pb-3"
        >
          <Input placeholder="Type your name" />
        </Form.Item>

        <Form.Item
          name="description"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Description</h6>}
          className="mb-4 pb-3"
        >
          <TextArea rows={5} placeholder="Type your description " />
        </Form.Item>
        <div className="d-flex justify-content-end mt-5">
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

export default CreateProductInnovationCategory;
