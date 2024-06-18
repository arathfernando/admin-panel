import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Select, Space, Switch } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row } from 'reactstrap';
import UploadImage from '../../../../components/UploadImage';
import CommunitySelect from '../../../../components/util-components/selector/CommunitySelect';
import TopicSelect from '../../../../components/util-components/selector/TopicSelect';
import UserSelect from '../../../../components/util-components/selector/UserSelect';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';

const { TextArea } = Input;
const { Option } = Select;

const privacyOption = [
  {
    id: 'PRIVATE',
    name: 'Private',
  },
  {
    id: 'PUBLIC',
    name: 'Public',
  },
];

const GroupCreate = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [isGlobal, setIsGlobal] = useState(false);

  const { hasCreatePermission } = usePermission();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    form.resetFields();
    setVisible(false);
  };

  const onSubmit = ({ isGlobal, ...values }) => {
    dispatch(
      Actions.createGroup({
        ...values,
        group_type: isGlobal ? 'GLOBAL' : 'ONLY_COMMUNITY',
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
        <PlusOutlined /> Create New Group
      </Button>
      <Drawer
        title="Create a New Group"
        width={542}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 10 }}
      >
        <Form
          layout="vertical"
          hideRequiredMark
          form={form}
          onFinish={onSubmit}
          className="p-4"
        >
          <Row>
            <Col span={24} className="text-right">
              <Space>
                <Form.Item label="Global" name="isGlobal" className="mb-0">
                  <Switch checked={isGlobal} onChange={setIsGlobal} />
                </Form.Item>
              </Space>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="community_id"
                label="Community Name"
                rules={
                  !isGlobal
                    ? [{ required: true, message: 'This field is required' }]
                    : []
                }
              >
                <CommunitySelect disabled={isGlobal} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="group_name"
                label="Group Name"
                rules={[{ required: true, message: 'This field is required' }]}
                className="mr-2"
              >
                <Input placeholder="Please enter Group Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="privacy"
                label="Privacy Option"
                rules={[{ required: true, message: 'This field is required' }]}
                className="ml-2"
              >
                <Select
                  style={{ width: '100%' }}
                  placeholder="Please choose the Option"
                >
                  {privacyOption &&
                    privacyOption.map((item) => {
                      return (
                        <Option key={item.id} value={item.id}>
                          {item.name}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="created_by"
                label="Created By"
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <UserSelect />
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
            <Col span={24}>
              <Form.Item name="topics" label="Topics">
                <TopicSelect />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item name="invited_members" label="Invited Members">
                <UserSelect mode="multiple" />
              </Form.Item>
            </Col>
          </Row>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            <Form.Item
              name="cover_page"
              label="Image"
              className="mb-0"
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <UploadImage aspect={3} />
            </Form.Item>

            <div className="pb-2 d-flex">
              <Button onClick={onClose} style={{ marginRight: 12 }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </div>
        </Form>
      </Drawer>
    </>
  );
};

export default GroupCreate;
