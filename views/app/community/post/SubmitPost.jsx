/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Form, Modal, Select } from 'antd';
import { useWatch } from 'antd/lib/form/Form';
import { isEmpty } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CKEditor5 from '../../../../components/util-components/CkEditor';
import CommunitySelect from '../../../../components/util-components/selector/CommunitySelect';
import GroupSelect from '../../../../components/util-components/selector/GroupSelect';
import TopicSelect from '../../../../components/util-components/selector/TopicSelect';
import UserSelect from '../../../../components/util-components/selector/UserSelect';
import * as Actions from '../../../../redux/actions';

const SubmitPost = ({ onCancel, data, ...props }) => {
  const { status } = useSelector(({ post }) => post.createPostAction);
  const { status: updateStatus } = useSelector(
    ({ post }) => post.updatePostAction
  );

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const post_location = useWatch('post_location', form);

  const isSubmitting = useMemo(
    () => status === 'submitting' || updateStatus === 'submitting',
    [status, updateStatus]
  );

  // set data
  useEffect(() => {
    if (!isEmpty(data)) {
      form.setFieldsValue({
        ...data,
        post_location: data?.community ? 'COMMUNITY' : 'GROUP',
        id: data?.community?.id || data?.group?.id,
        topics: data?.topics?.map?.(({ id }) => id) || [],
        created_by: data?.created_by?.id,
      });
    }
  }, [data, form]);

  const onFinish = ({ ...values }) => {
    const payload = {
      ...values,
      topics: values.topics?.toString?.() || '',
    };
    if (!isEmpty(data)) {
      dispatch(
        Actions.updatePost({
          ...payload,
          id: data?.id,
          onSuccess: () => {
            onCancel();
            form.resetFields({});
          },
        })
      );
    } else {
      dispatch(
        Actions.createPost({
          ...payload,
          is_share: 'FALSE',
          onSuccess: () => {
            onCancel();
            form.resetFields({});
          },
        })
      );
    }
  };

  return (
    <Modal
      footer={null}
      width={710}
      title={isEmpty(data) ? 'New Post' : 'Edit Post'}
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
          name="post_location"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Location</h6>}
          initialValue="COMMUNITY"
        >
          <Select
            onChange={() => form.setFieldValue('id')}
            options={[
              {
                value: 'COMMUNITY',
              },
              {
                value: 'GROUP',
              },
            ]}
            disabled={!isEmpty(data)}
          />
        </Form.Item>

        <Form.Item
          name="id"
          rules={[{ required: true, message: 'This field is required' }]}
          label={
            <h6 className="h6-lg">
              {post_location === 'COMMUNITY' ? 'Community' : 'Group'}
            </h6>
          }
        >
          {post_location === 'COMMUNITY' ? (
            <CommunitySelect disabled={!isEmpty(data)} />
          ) : (
            <GroupSelect disabled={!isEmpty(data)} />
          )}
        </Form.Item>

        <Form.Item
          name="created_by"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Created by</h6>}
        >
          <UserSelect />
        </Form.Item>

        <Form.Item
          name="content"
          rules={[{ required: true, message: 'This field is required' }]}
          style={{
            marginBottom: 32,
          }}
        >
          <CKEditor5 rows={5} />
        </Form.Item>

        <Form.Item name="topics" label={<h6 className="h6-lg">Topics</h6>} st>
          <TopicSelect />
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

export default SubmitPost;
