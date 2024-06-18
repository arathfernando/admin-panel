import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row } from 'reactstrap';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';

const { TextArea } = Input;

const CreateBasicTypeCategory = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const { hasCreatePermission } = usePermission();

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
    form.resetFields();
  };

  const onSubmit = (values) => {
    dispatch(
      Actions.createBasicTypeCategory({
        ...values,
        translate: {
          data: [{ key: values.name }, { key: values?.description }],
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
        <PlusOutlined /> Create New BasicTypeCategory
      </Button>
      <Drawer
        title="Create a New BasicTypeCategory"
        width={500}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 10 }}
      >
        <Form
          layout="vertical"
          hideRequiredMark
          form={form}
          onFinish={onSubmit}
          className="px-4 py-2"
        >
          <Row>
            <Col span={24}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <Input placeholder="Please enter Name" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="display_name"
                label="Display Name"
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <Input placeholder="Please enter Display Name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="description" label="Description">
                <TextArea rows={3} placeholder="Please enter Description" />
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

export default CreateBasicTypeCategory;
