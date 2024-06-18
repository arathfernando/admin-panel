import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, Form, Input } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Actions from '../../../../redux/actions';

const { TextArea } = Input;

const CreateTeamMemberRole = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    form.resetFields();
    setVisible(false);
  };

  const onSubmit = (values) => {
    dispatch(Actions.createTeamMemberRole(values));
    onClose();
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        <PlusOutlined /> Create New Member Role
      </Button>
      <Drawer
        title="Create a New Member Role"
        width={500}
        onClose={onClose}
        visible={visible}
      >
        <Form
          layout="vertical"
          hideRequiredMark
          form={form}
          onFinish={onSubmit}
          className="px-4 py-2"
        >
          <Form.Item
            name="name"
            label="Role Name"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input placeholder="Please enter Role Name" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <TextArea rows={3} placeholder="Please enter Description" />
          </Form.Item>
          <div className="text-right">
            <Button onClick={onClose} style={{ marginRight: 12 }}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Drawer>
    </>
  );
};

export default CreateTeamMemberRole;
