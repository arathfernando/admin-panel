import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, Form, Input } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Actions from '../../../../redux/actions';

const { TextArea } = Input;

const CreateTeam = () => {
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
    dispatch(Actions.createTeam(values));
    onClose();
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        <PlusOutlined /> Create New Team
      </Button>
      <Drawer
        title="Create a New Team"
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
            label="Team Name"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input placeholder="Please enter Team Name" />
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

export default CreateTeam;
