/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Form, Input, InputNumber, Modal, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { isEmpty } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../../../redux/actions';

const CreateWorkspaceCategoryCard = ({ onCancel, data, ...props }) => {
  const { status } = useSelector(
    ({ workspaceCategoryCard }) =>
      workspaceCategoryCard.createWorkspaceCategoryCardAction
  );
  const { status: updateStatus } = useSelector(
    ({ workspaceCategoryCard }) =>
      workspaceCategoryCard.updateWorkspaceCategoryCardAction
  );

  const { data: workspaceCategories, loading } = useSelector(
    ({ workspaceCategory }) => workspaceCategory.workspaceCategories
  );

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Actions.getWorkspaceCategories());
  }, [dispatch]);

  const isSubmitting = useMemo(
    () => status === 'submitting' || updateStatus === 'submitting',
    [status, updateStatus]
  );

  // set data
  useEffect(() => {
    if (!isEmpty(data)) {
      form.setFieldsValue({
        ...data,
        workspace_category_id: data?.workspace_type?.id,
      });
    }
  }, [data, form]);

  const onFinish = ({ ...values }) => {
    const payload = {
      ...values,
    };
    if (!isEmpty(data)) {
      dispatch(
        Actions.updateWorkspaceCategoryCard({
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
        Actions.createWorkspaceCategoryCard({
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
          ? 'New Workspace Category Card'
          : 'Edit Workspace Category Card'
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
          name="workspace_category_id"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Workspace category</h6>}
          className="mb-4 pb-3"
        >
          <Select
            placeholder="Type choose workspace category"
            showSearch
            loading={loading}
            optionFilterProp="label"
            options={workspaceCategories?.map?.(
              ({ id: value, title: label }) => ({ value, label })
            )}
          />
        </Form.Item>

        <Form.Item
          name="title"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Title</h6>}
          className="mb-4 pb-3"
        >
          <Input placeholder="Type your title" />
        </Form.Item>

        <Form.Item
          name="description"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Description</h6>}
          className="mb-4 pb-3"
        >
          <TextArea rows={5} placeholder="Type your description" />
        </Form.Item>

        <Form.Item
          name="order"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Order</h6>}
          className="mb-4 pb-3"
        >
          <InputNumber className="w-100" placeholder="Type your order" />
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

export default CreateWorkspaceCategoryCard;
