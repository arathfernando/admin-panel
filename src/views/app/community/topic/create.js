/* eslint-disable camelcase */
import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, Form, Input, Select } from 'antd';
import { useWatch } from 'antd/lib/form/Form';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Row } from 'reactstrap';
import CKEditor5 from '../../../../components/util-components/CkEditor';
import CommunitySelect from '../../../../components/util-components/selector/CommunitySelect';
import GroupSelect from '../../../../components/util-components/selector/GroupSelect';
import UserSelect from '../../../../components/util-components/selector/UserSelect';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';

const CreateTopic = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const { hasCreatePermission } = usePermission();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
    form.resetFields({});
  };

  const onSubmit = ({ images, ...values }) => {
    const payload = {
      ...values,
    };
    dispatch(Actions.createTopic(payload));
    onClose();
  };

  const topic_location = useWatch('topic_location', form);

  return (
    <>
      <Button
        type="primary"
        onClick={showDrawer}
        disabled={!hasCreatePermission}
      >
        <PlusOutlined /> Create New Topic
      </Button>
      <Drawer
        title="Create a New Topic"
        width={500}
        onClose={onClose}
        open={visible}
        bodyStyle={{ paddingBottom: 10 }}
      >
        <Form
          form={form}
          layout="vertical"
          hideRequiredMark
          onFinish={onSubmit}
          className="p-4"
        >
          <Form.Item
            name="created_by"
            rules={[{ required: true, message: 'This field is required' }]}
            label={<h6 className="h6-lg">Created by</h6>}
          >
            <UserSelect placeholder="Choose created by" />
          </Form.Item>

          <Form.Item
            name="topic_location"
            rules={[{ required: true, message: 'This field is required' }]}
            label={<h6 className="h6-lg">Topic location</h6>}
            initialValue="COMMUNITY"
          >
            <Select
              placeholder="Choose topic location"
              options={[
                {
                  value: 'COMMUNITY',
                },
                {
                  value: 'GROUP',
                },
              ]}
            />
          </Form.Item>

          {topic_location === 'COMMUNITY' && (
            <Form.Item
              name="id"
              rules={[{ required: true, message: 'This field is required' }]}
              label={<h6 className="h6-lg">Community</h6>}
            >
              <CommunitySelect />
            </Form.Item>
          )}

          {topic_location === 'GROUP' && (
            <Form.Item
              name="id"
              rules={[{ required: true, message: 'This field is required' }]}
              label={<h6 className="h6-lg">Group</h6>}
            >
              <GroupSelect />
            </Form.Item>
          )}

          <Form.Item
            name="name"
            rules={[{ required: true, message: 'This field is required' }]}
            label={<h6 className="h6-lg">Name</h6>}
            style={{
              marginBottom: 32,
            }}
          >
            <Input placeholder="Type your name" />
          </Form.Item>

          <Form.Item
            name="description"
            rules={[{ required: true, message: 'This field is required' }]}
            label={<h6 className="h6-lg">Description</h6>}
            style={{
              marginBottom: 32,
            }}
          >
            <CKEditor5 rows={5} placeholder="Type your description" />
          </Form.Item>

          <Row>
            <Col span={24} className="text-right">
              <Button onClick={onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default CreateTopic;
