/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Form, Input, Modal } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { isEmpty } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UploadImage from '../../../../components/UploadImage';
import UserSelect from '../../../../components/util-components/selector/UserSelect';
import * as Actions from '../../../../redux/actions';

const CreateArticle = ({ onCancel, data, ...props }) => {
  const { status } = useSelector(({ article }) => article.createArticleAction);
  const { status: updateStatus } = useSelector(
    ({ article }) => article.updateArticleAction
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
        created_by: data?.created_by?.id,
      });
    }
  }, [data, form]);

  const onFinish = ({ ...values }) => {
    const payload = {
      ...values,
    };
    if (!isEmpty(data)) {
      dispatch(
        Actions.updateArticle({
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
        Actions.createArticle({
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
      title={isEmpty(data) ? 'New Article' : 'Edit Article'}
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
          name="article_title"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<span className="span-lg">Article title</span>}
          style={{
            marginBottom: 30,
          }}
        >
          <Input placeholder="Type your article title" />
        </Form.Item>

        <Form.Item
          name="article_description"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<span className="h6-lg">Article content</span>}
          style={{
            marginBottom: 22,
          }}
        >
          <TextArea rows={5} placeholder="Type your article content" />
        </Form.Item>

        <Form.Item style={{ marginBottom: 30 }} label="Icon" required>
          <div className="p-2 border rounded-2">
            <Form.Item
              name="image"
              style={{ marginBottom: 0 }}
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <UploadImage
                aspect={1}
                center
                style={{ width: '100%', height: 100 }}
              >
                <img
                  src="/assets/img/icons/add-image.svg"
                  className="my-auto mx-1 mb-sm-2"
                  alt="icon"
                />
                <h6 className="fs-16 fw-6 mb-1">
                  <u>Drag or click to add an image</u>
                </h6>
              </UploadImage>
            </Form.Item>
          </div>
        </Form.Item>

        <Form.Item
          name="created_by"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<span className="h6-lg">Created by</span>}
          style={{ marginBottom: 30 }}
        >
          <UserSelect />
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

export default CreateArticle;
