/* eslint-disable no-param-reassign */
import { EditOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Tooltip } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row } from 'reactstrap';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';

const { TextArea } = Input;

const EditBasicTypeCategory = ({ id, data }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const showDrawer = () => {
    const filterData = data.filter((item) => item.id === id);
    if (filterData.length > 0) {
      form.setFieldsValue({
        name: filterData[0].name,
        display_name: filterData[0].display_name,
        description: filterData[0].description,
      });
    }
    setVisible(true);
  };

  const { hasEditPermission } = usePermission();

  const onClose = () => {
    setVisible(false);
  };

  const onSubmit = (values) => {
    dispatch(
      Actions.updateBasicTypeCategory({
        id,
        values,
        translate: {
          data: [{ key: values.name }, { key: values?.description }],
          removeKeys: [{ key: data.name }, { key: data?.description }],
        },
      })
    );
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
        title="Edit a New BasicTypeCategory"
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
                label=" Display Name"
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

export default EditBasicTypeCategory;
