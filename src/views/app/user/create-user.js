/* eslint-disable camelcase */
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Drawer, Form, Input, Select, Switch } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row } from 'reactstrap';
import AvatarUpload from '../../../components/util-components/Upload/AvatarUpload';
import usePermission from '../../../hooks/usePermission';
import * as Actions from '../../../redux/actions';

const userRoleData = [
  {
    id: 'CREATOR',
    name: 'Creator',
  },
  {
    id: 'EXPERT',
    name: 'Expert',
  },
  {
    id: 'INVESTOR',
    name: 'Hubbers investor',
  },
  {
    id: 'HUBBERS_TEAM',
    name: 'Hubbers Team',
  },
];

const profileTypes = [
  {
    value: 'CREATOR',
    label: 'CREATOR',
  },
  {
    value: 'EXPERT',
    label: 'EXPERT',
  },
  {
    value: 'TEACHER',
    label: 'TEACHER',
  },
  {
    value: 'INVESTOR',
    label: 'INVESTOR',
  },
  {
    value: 'HUBBERS TEAM',
    label: 'HUBBERS_TEAM',
  },
];

const { Option } = Select;

const CreateUserButton = () => {
  const [visible, setVisible] = useState(false);
  const [uploadedImg, setImage] = useState('');

  // const { userRoleData } = useSelector((state) => state.userRole);
  const dispatch = useDispatch();

  const { hasCreatePermission } = usePermission();

  const [form] = Form.useForm();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onChangeAvatar = (imageUrl) => {
    setImage(imageUrl);
  };

  const onSubmit = ({ is_hubber_team, profile_types, ...values }) => {
    const payload = {
      ...values,
      profile_types: profile_types?.toString?.(),
      is_hubber_team: is_hubber_team ? 'TRUE' : 'FALSE',
    };
    if (uploadedImg) {
      payload.avatar = uploadedImg;
    }
    dispatch(Actions.createUser(payload));
    form.resetFields();
    onClose();
  };

  return (
    <>
      <>
        <Button
          type="primary"
          onClick={showDrawer}
          disabled={!hasCreatePermission}
        >
          <PlusOutlined /> Create New User
        </Button>
        <Drawer
          title="Create a New User"
          width={1000}
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <Form
            layout="vertical"
            hideRequiredMark
            onFinish={onSubmit}
            className="px-4 pb-4"
            form={form}
          >
            <Row>
              <Col span={24}>
                <div className="d-flex">
                  <b className="mt-1 mr-2">hubbers team</b>
                  <Form.Item
                    name="is_hubber_team"
                    colon={false}
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  name="first_name"
                  label="First Name"
                  rules={[
                    { required: true, message: 'This field is required' },
                  ]}
                  className="mr-2"
                >
                  <Input placeholder="Please enter First Name" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="last_name"
                  label="Last Name"
                  rules={[
                    { required: true, message: 'This field is required' },
                  ]}
                  className="ml-2"
                >
                  <Input placeholder="Please enter Last Name" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'This field is required' },
                  ]}
                  className="mr-2"
                >
                  <Input placeholder="Please enter email" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    { required: true, message: 'This field is required' },
                  ]}
                  className="ml-2"
                >
                  <Input
                    placeholder="Please enter user Password"
                    type="password"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="role"
                  label="Role"
                  rules={[
                    { required: true, message: 'This field is required' },
                  ]}
                  className="mr-2"
                >
                  <Select
                    // mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Enter Role"
                    defaultValue={[]}
                    onChange={() => {}}
                    optionLabelProp="label"
                  >
                    {userRoleData.map((item) => {
                      return (
                        <Option
                          value={item.id}
                          label={item.name}
                          key={item.id}
                        />
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="profile_types"
                  label="Profile roles"
                  className="ml-2"
                >
                  <Select
                    mode="multiple"
                    placeholder="Please choose the profile roles"
                    optionFilterProp="label"
                    options={profileTypes}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Card title="Avatar">
                <AvatarUpload statusChange={onChangeAvatar} />
              </Card>
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
    </>
  );
};

export default CreateUserButton;
