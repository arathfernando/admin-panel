import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Tooltip } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row } from 'reactstrap';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';

const CreateProjectTags = ({ size, buttonContent, tooltip }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const { hasCreatePermission } = usePermission();

  const onClose = () => {
    setVisible(false);
    form.resetFields();
  };

  const onSubmit = (values) => {
    dispatch(Actions.createProductTag(values));
    onClose();
  };

  return (
    <>
      <Tooltip title={tooltip}>
        <Button
          type="primary"
          onClick={showDrawer}
          size={size}
          disabled={!hasCreatePermission}
        >
          <PlusOutlined />
          {buttonContent}
        </Button>
      </Tooltip>
      <Drawer
        title="Create a New ExpertiseCategory"
        width={400}
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
                label="Tag Name"
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <Input placeholder="Please enter Tag Name" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col
              span={24}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}
            >
              <div className="pb-2">
                <Button onClick={onClose} style={{ marginRight: 12 }}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default CreateProjectTags;
