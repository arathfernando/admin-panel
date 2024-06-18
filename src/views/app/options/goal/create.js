import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row } from 'reactstrap';
import UploadImage from '../../../../components/UploadImage';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';

const CreateGoal = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const { hasCreatePermission } = usePermission();

  const showDrawer = () => {
    form.resetFields();
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onSubmit = (values) => {
    dispatch(
      Actions.createGoal({
        ...values,
        translate: {
          data: [{ key: values.goal_title, text: values.goal_title }],
        },
      })
    );
    onClose();
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showDrawer}
        disabled={!hasCreatePermission}
      >
        <PlusOutlined /> Create Goal
      </Button>
      <Drawer
        title="Create a new goal"
        width={500}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 10 }}
      >
        <Form
          form={form}
          layout="vertical"
          hideRequiredMark
          onFinish={onSubmit}
          className="px-4 pb-4 pt-5"
        >
          <Row>
            <Col span={24}>
              <Form.Item
                name="goal_title"
                label="Goal Title"
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <Input placeholder="Please enter Goal Title" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="color"
                label="Color"
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <Input placeholder="Please enter Color" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <Input placeholder="Please enter Description" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="goal_number"
                label="Goal Number"
                rules={[
                  { required: true, message: 'This field is required' },
                  {
                    type: 'number',
                    message: 'This is not a valid number',
                  },
                ]}
              >
                <Input placeholder="Please enter Goal Number" type="number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="goal_image"
                label="Goal Image"
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <UploadImage
                  onChange={(e) => console.log({ e })}
                  noSelectImageSize
                />
              </Form.Item>
            </Col>
          </Row>
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

export default CreateGoal;
