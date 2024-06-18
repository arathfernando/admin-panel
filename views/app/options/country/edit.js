import { EditOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Select, Tooltip } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row } from 'reactstrap';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';

const { Option } = Select;

const EditCountry = ({ id, data }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const { hasEditPermission } = usePermission();

  const showDrawer = () => {
    const filterData = data.filter((item) => item.id === id);
    if (filterData.length > 0) {
      form.setFieldsValue({
        country_name: filterData[0].country_name,
        short_name: filterData[0].short_name,
        continent: filterData[0].continent,
      });
    }
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onSubmit = (values) => {
    dispatch(Actions.updateCountry({ ...values, id }));
    onClose();
  };

  return (
    <>
      <Tooltip title="View/Edit">
        <Button
          type="primary"
          size="small"
          icon={<EditOutlined />}
          onClick={showDrawer}
          disabled={!hasEditPermission}
        />
      </Tooltip>
      <Drawer
        title="Edit a New Country"
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

export default EditCountry;
