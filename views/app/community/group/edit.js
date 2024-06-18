import { EditOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Select, Space, Switch } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row } from 'reactstrap';
import UploadImage from '../../../../components/UploadImage';
import TopicSelect from '../../../../components/util-components/selector/TopicSelect';
import UserSelect from '../../../../components/util-components/selector/UserSelect';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';

const { Option } = Select;
const { TextArea } = Input;

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
const status = ['PENDING', 'ACCEPTED', 'REJECTED'];

const GroupEdit = ({ id, data }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [isGlobal, setIsGlobal] = useState(false);

  const { hasEditPermission } = usePermission();

  const showDrawer = () => {
    const filterData = data.filter((item) => item.id === id);
    if (filterData.length > 0) {
      const { group_type, community, created_by, topics } = filterData[0];
      form.setFieldsValue({
        ...filterData[0],
        isGlobal: group_type === 'GLOBAL',
        community_id: community?.id,
        created_by: created_by?.id,
        topics: topics?.map((topic) => topic.id),
      });
      setIsGlobal(group_type === 'GLOBAL');

      console.log(filterData[0]);
    }
    setVisible(true);
  };

  const onClose = () => {
    form.resetFields();
    setVisible(false);
  };

  // eslint-disable-next-line no-shadow
  const onSubmit = ({ isGlobal, ...values }) => {
    dispatch(
      Actions.updateGroup({
        ...values,
        id,
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
        icon={<EditOutlined />}
        size="small"
        disabled={!hasEditPermission}
      />
      <Drawer
        title="Update a Group"
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
          {/* <Row>
            <Col span={24}>
              <Form.Item
                name="community_id"
                label="Community Name"
                rules={
                  !isGlobal
                    ? [{"required":true,"message":"This field is required"  }]
                    : []
                }
              >
                <CommunitySelect disabled={isGlobal} />
              </Form.Item>
            </Col>
          </Row> */}
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
            <Col span={12}>
              <Form.Item
                name="created_by"
                label="Created By"
                rules={[{ required: true, message: 'This field is required' }]}
                className="mr-2"
              >
                <UserSelect />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="status" label="Status" className="ml-2">
                <Select>
                  {status.map((value) => (
                    <Option key={value} value={value} label={value} />
                  ))}
                </Select>
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
            <div className="pb-2">
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

export default GroupEdit;
