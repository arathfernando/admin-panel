import { EditOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Row, Select, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CommunitySelect from '../../../../components/util-components/selector/CommunitySelect';
import UserSelect from '../../../../components/util-components/selector/UserSelect';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';

const { Option } = Select;

const Edit = ({ id, data }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [currentData, setCurrentData] = useState(null);

  const { hasEditPermission } = usePermission();

  useEffect(() => {
    const editData = data.filter((d) => d.id === id)[0];

    setCurrentData({
      ...editData,
      users: editData.user?.id,
      community_id: editData.community?.id,
      community_role: editData.role,
    });
  }, [data, id]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onSubmit = ({ users, ...values }) => {
    const editData = data.filter((d) => d.id === id)[0];
    dispatch(
      Actions.updateMember({ id: editData?.id, users: [users], ...values })
    );
    form.resetFields();
    onClose();
  };
  return (
    <>
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
          title="View/Edit Community"
          width={500}
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 10 }}
        >
          <Form
            layout="vertical"
            hideRequiredMark
            form={form}
            initialValues={{ ...currentData }}
            onFinish={onSubmit}
            className="px-4 pb-4"
          >
            <Row>
              <Col span={12}>
                <Form.Item
                  name="community_id"
                  label="Community"
                  rules={[
                    { required: true, message: 'This field is required' },
                  ]}
                  className="mr-2"
                >
                  <CommunitySelect />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="users"
                  label="User"
                  rules={[
                    { required: true, message: 'This field is required' },
                  ]}
                  className="mr-2"
                  optionValue="email"
                >
                  <UserSelect disabled />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="community_role"
                  label="Role"
                  rules={[
                    { required: true, message: 'This field is required' },
                  ]}
                  className="mr-2"
                >
                  <Select>
                    <Option value="HOST">HOST</Option>
                    <Option value="MODERATOR">MODERATOR</Option>
                    <Option value="MEMBER">MEMBER</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="invite_status" label="Status">
                  <Select>
                    <Option value="PENDING">PENDING</Option>
                    <Option value="ACCEPTED">ACCEPTED</Option>
                    <Option value="REJECTED">REJECTED</Option>
                  </Select>
                </Form.Item>
              </Col>
              {/* <Col span={12}>
                <Form.Item
                  name="published"
                  valuePropName="checked"
                  label="Published"
                >
                  <Switch />
                </Form.Item>
              </Col> */}
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

export default Edit;
