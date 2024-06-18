/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Form, Input, Modal, Radio } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { isEmpty } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UploadImage from '../../../../components/UploadImage';
import * as Actions from '../../../../redux/actions';

const CreateWorkspaceCategory = ({ onCancel, data, ...props }) => {
  const { status } = useSelector(
    ({ workspaceCategory }) => workspaceCategory.createWorkspaceCategoryAction
  );
  const { status: updateStatus } = useSelector(
    ({ workspaceCategory }) => workspaceCategory.updateWorkspaceCategoryAction
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

  const onFinish = ({ label, co_created_with, ...values }) => {
    const payload = {
      ...values,
    };
    if (label) {
      payload.label = label;
    }
    if (co_created_with) {
      payload.co_created_with = co_created_with;
    }
    if (!isEmpty(data)) {
      dispatch(
        Actions.updateWorkspaceCategory({
          ...payload,
          translate: {
            data: [
              { key: values.title },
              { key: values.description },
              { key: values.short_description },
            ],
            removeKeys: [
              { key: data.title },
              { key: data.description },
              { key: data.short_description },
            ],
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
        Actions.createWorkspaceCategory({
          ...payload,
          translate: {
            data: [
              { key: values.title },
              { key: values.description },
              { key: values.short_description },
            ],
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
      title={
        isEmpty(data) ? 'New Workspace Category' : 'Edit Workspace Category'
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
          name="short_description"
          label={<h6 className="h6-lg">Short description</h6>}
          rules={[{ required: true, message: 'This field is required' }]}
          className="mb-4 pb-3"
        >
          <TextArea rows={5} placeholder="Type your short description" />
        </Form.Item>
        <Form.Item label={<h6 className="input-label">Icon</h6>} required>
          <div className="p-2 border rounded-2">
            <Form.Item
              name="icon"
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

        <Form.Item label={<h6 className="input-label">Co-created with</h6>}>
          <div className="p-2 border rounded-2">
            <Form.Item name="co_created_with" noStyle>
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

        <Form.Item name="label">
          <Radio.Group>
            <Radio value="BETA">beta label</Radio>
            <Radio value="CO_CREATING">co-creating label</Radio>
          </Radio.Group>
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

export default CreateWorkspaceCategory;
