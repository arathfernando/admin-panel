import { EditOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Switch, Tooltip } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row } from 'reactstrap';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';

const EditCurrency = ({ id, data }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [isCrypto, setIsCrypto] = useState(false);
  const [form] = Form.useForm();

  const { hasEditPermission } = usePermission();

  const showDrawer = () => {
    const filterData = data.filter((item) => item.id === id);
    if (filterData.length > 0) {
      if (filterData[0].is_crypto === 'TRUE') {
        setIsCrypto(true);
      }
      form.setFieldsValue({ ...filterData[0] });
    }
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onSubmit = (values) => {
    const filterData = data.filter((item) => item.id === id);
    dispatch(
      Actions.updateCurrency({
        ...values,
        id,
        translate: {
          data: [{ key: values.name }],
          removeKeys: [{ key: filterData.name }],
        },
      })
    );
    onClose();
  };

  const handleCrypto = () => {
    setIsCrypto(!isCrypto);
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
        title="Edit a New Currency"
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
              <Form.Item name="is_crypto" label="IsCrypto">
                <Switch checked={isCrypto} onChange={handleCrypto} />
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

export default EditCurrency;
