import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Select } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row } from 'reactstrap';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';

const { Option } = Select;

const CreateCountry = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const { hasCreatePermission } = usePermission();

  const onClose = () => {
    setVisible(false);
  };

  const onSubmit = (values) => {
    dispatch(Actions.createCountry(values));
    onClose();
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showDrawer}
        disabled={!hasCreatePermission}
      >
        <PlusOutlined /> Create New Country
      </Button>
      <Drawer
        title="Create a New Country"
        width={500}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 10 }}
      >
        <Form
          layout="vertical"
          hideRequiredMark
          onFinish={onSubmit}
          className="px-4 pb-4"
        >
          <Row>
            <Col span={24}>
              <Form.Item
                name="country_name"
                label="Country Name"
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <Input placeholder="Please enter Country Name" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="short_name"
                label="Country Short Name"
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <Input placeholder="Please enter Country Short Name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="continent"
                label="Continent"
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <Select placeholder="Please choose the Continent">
                  <Option value="Wherever">Wherever</Option>
                  <Option value="Asia">Asia</Option>
                  <Option value="Europe">Europe</Option>
                  <Option value="Africa">Africa</Option>
                  <Option value="North America">North America</Option>
                  <Option value="South America">South America</Option>
                  <Option value="Oceania">Oceania</Option>
                  <Option value="Antarctica">Antarctica</Option>
                </Select>
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

export default CreateCountry;
