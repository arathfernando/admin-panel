import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Select } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row } from 'reactstrap';
import CommunitySelect from '../../../../components/util-components/selector/CommunitySelect';
import UserSelect from '../../../../components/util-components/selector/UserSelect';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';

const { Option } = Select;

const Create = ({ role }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const { hasCreatePermission } = usePermission();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onSubmit = (values) => {
    dispatch(Actions.createMember({ ...values, message: '' }));
    form.resetFields();
    onClose();
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showDrawer}
        disabled={!hasCreatePermission}
      >
        <PlusOutlined /> Create New Community Member
      </Button>
      <Drawer
        title="Create a New Community Member"
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
          className="px-4 pb-4"
        >
          <Row>
            <Col span={12}>
              <Form.Item
                name="community_id"
                label="Community"
                rules={[{ required: true, message: 'This field is required' }]}
                className="mr-2"
              >
                <CommunitySelect />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="created_by"
                label="Invite by"
                rules={[{ required: true, message: 'This field is required' }]}
                className="ml-2"
              >
                <UserSelect />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="users"
                label="User"
                rules={[{ required: true, message: 'This field is required' }]}
                className="mr-2"
              >
                <UserSelect mode="multiple" optionValue="email" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="community_role"
                label="Role"
                rules={[{ required: true, message: 'This field is required' }]}
                className="ml-2"
              >
                <Select>
                  <Option value="HOST">HOST</Option>
                  <Option value="MODERATOR">MODERATOR</Option>
                  <Option value="MEMBER">MEMBER</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
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

export default Create;
