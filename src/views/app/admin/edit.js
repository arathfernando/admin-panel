/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import { EditOutlined } from '@ant-design/icons';
import {
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  Select,
  Tooltip,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UploadImage from '../../../components/UploadImage';
import countries from '../../../constants/countries';
import usePermission from '../../../hooks/usePermission';
import * as Actions from '../../../redux/actions';

const AdminEdit = ({ id, data }) => {
  const { data: permissions, loading } = useSelector(
    ({ permission }) => permission.permissions
  );
  const [url, setUrl] = useState('');

  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const { hasEditPermission } = usePermission();

  useEffect(() => {
    const filterData = data.filter((item) => item.id === id);
    if (filterData.length > 0) {
      setUrl(filterData[0].profile_image);
    }
  }, [data, id]);

  const showDrawer = () => {
    const filterData = data.filter((item) => item.id === id);
    if (filterData.length > 0) {
      form.setFieldsValue({
        first_name: filterData[0].first_name,
        last_name: filterData[0].last_name,
        email: filterData[0].email,
        status: filterData[0].status,
        profile_image: filterData[0].profile_image,
        country_code: filterData[0].country_code,
        mobile_number: filterData[0].mobile_number,
        admin_role: filterData[0].admin_role?.map(({ id }) => id),
      });
    }
    setVisible(true);
  };

  const onClose = () => {
    form.resetFields();
    setVisible(false);
  };

  const onSubmit = ({ admin_role, ...values }) => {
    dispatch(
      Actions.updateAdmin({
        adminData: { ...values, admin_role: admin_role.toString() },
        id,
      })
    );
    onClose();
  };

  return (
    <>
      <Tooltip title="View / Edit">
        <Button
          disabled={!hasEditPermission}
          type="primary"
          icon={<EditOutlined />}
          onClick={showDrawer}
          size="small"
        />
      </Tooltip>
      <Drawer
        title="Create a New Admin"
        width={500}
        onClose={onClose}
        visible={visible}
      >
        <Form
          form={form}
          layout="vertical"
          hideRequiredMark
          onFinish={onSubmit}
          className="px-4 py-2"
        >
          <Form.Item
            name="first_name"
            label="First Name"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input placeholder="Please enter First Name" />
          </Form.Item>
          <Form.Item
            name="last_name"
            label="Last Name"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input placeholder="Please enter Last Name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: 'This field is required',
              },
              { type: 'email', message: 'This is not a valid email' },
            ]}
          >
            <Input placeholder="Please enter Email" type="email" />
          </Form.Item>

          <Form.Item
            name="mobile_number"
            label="Mobile Number"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <InputNumber
              className="w-100"
              controls={false}
              placeholder="Please enter Mobile Number"
              addonBefore={
                <Form.Item
                  noStyle
                  name="country_code"
                  rules={[
                    { required: true, message: 'This field is required' },
                  ]}
                >
                  <Select
                    style={{ minWidth: 100 }}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="+1"
                    options={countries.map(({ label, phone }) => ({
                      value: `+${phone}`,
                      label: `+${phone}`,
                      search: `+${phone} ${label}`,
                    }))}
                    showSearch
                    optionFilterProp="search"
                  />
                </Form.Item>
              }
            />
          </Form.Item>

          <Form.Item
            name="admin_role"
            label="Admin Role"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Select
              mode="multiple"
              placeholder="Please choose the Admin Role"
              options={permissions.map(({ id: value, role_name: label }) => ({
                label,
                value,
              }))}
              optionFilterProp="label"
              loading={loading}
            />
          </Form.Item>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            <Form.Item
              name="profile_image"
              label="Avatar"
              className="mb-0"
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <UploadImage value={url} />
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

export default AdminEdit;
