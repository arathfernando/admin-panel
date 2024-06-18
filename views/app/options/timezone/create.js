import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, InputNumber, Select } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row } from 'reactstrap';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';

const { Option } = Select;

const CreateTimezone = () => {
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
    dispatch(Actions.createTimezone(values));
    onClose();
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showDrawer}
        disabled={!hasCreatePermission}
      >
        <PlusOutlined /> Create timezone
      </Button>
      <Drawer
        title="Create a new timezone"
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
          className="px-4 py-2"
        >
          <Row>
            <Col span={24}>
              <Form.Item
                name="timezone_value"
                label="Timezone Value"
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <Input placeholder="Please enter value" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="timezone_abbr"
                label="Timezone Abbr"
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <Input placeholder="Please enter abbr" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="offset"
                label="Offset"
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <InputNumber
                  placeholder="Please enter offset"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="dst"
                label="DST"
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <Select
                  placeholder="Please choose the isDST"
                  style={{ width: '100%' }}
                >
                  <Option value="TRUE">True</Option>
                  <Option value="FALSE">False</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="timezone_text"
                label="Timezone Text"
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <Input placeholder="Please enter text" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="timezone_utc"
                label="Timezone UTC"
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <Input placeholder="Please enter UTC" />
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

export default CreateTimezone;
