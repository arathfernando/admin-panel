/* eslint-disable jsx-a11y/label-has-associated-control */
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Switch } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row } from 'reactstrap';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';

const CreateCurrency = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const { hasCreatePermission } = usePermission();

  const showDrawer = () => {
    setVisible(true);
    form.resetFields();
    form.setFieldsValue({ isCrypto: false });
  };

  const onClose = () => {
    setVisible(false);
  };

  const onSubmit = (values) => {
    dispatch(
      Actions.createCurrency({
        ...values,
        translate: {
          data: [{ key: values.name }],
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
        <PlusOutlined /> Create New Currency
      </Button>
      <Drawer
        title="Create a New Currency"
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
            <Col span={24} className="text-right">
              <label className="pt-1 pr-3">IsCrypto</label>
              <Form.Item name="is_crypto" className="d-inline-block mb-0">
                <Switch />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="name"
                label="Currency Name"
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <Input placeholder="Please enter Currency Name" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="name_plural"
                label="Currency Name Plural"
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <Input placeholder="Please enter Currency Name Plural" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="symbol"
                label="Currency Symbol"
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <Input placeholder="Please enter Currency Symbol" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="symbol_native"
                label="Currency Symbol Native"
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <Input placeholder="Please enter Symbol Native" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="currency_code"
                label="Currency Code"
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <Input placeholder="Please enter Currency Code" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="decimal_digit"
                label="Decimal Digits"
                rules={[
                  { required: true, message: 'This field is required' },
                  {
                    type: 'number',
                    message: 'This is not a valid number',
                  },
                ]}
              >
                <Input
                  type="number"
                  placeholder="Please enter Decimal Digits"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="rounding"
                label="Rounding"
                rules={[
                  { required: true, message: 'This field is required' },
                  {
                    type: 'number',
                    message: 'This is not a valid number',
                  },
                ]}
              >
                <Input
                  type="number"
                  placeholder="Please enter Currency Rounding"
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

export default CreateCurrency;
