/* eslint-disable camelcase */
import { EditOutlined } from '@ant-design/icons';
import { Button, Drawer, Form, Input, Switch, Tooltip } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import UploadImage from '../../../../components/UploadImage';
import PartnerSelect from '../../../../components/util-components/selector/PartnerSelect';
import { getRandomInt, slugify } from '../../../../helpers/Utils';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';

const { TextArea } = Input;

const Edit = ({ id, data }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const { hasEditPermission } = usePermission();

  const showDrawer = () => {
    const filterData = data.filter((item) => item.id === id);
    if (filterData.length > 0) {
      form.setFieldsValue({
        ...filterData[0],
        beta_testing: filterData[0].beta_testing === 'YES',
        cobuilding: filterData[0].cobuilding === 'YES',
        published: filterData[0].published === 'YES',
        partner_id: filterData[0].partner?.id,
      });
    }
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onSubmit = ({ published, beta_testing, cobuilding, ...values }) => {
    dispatch(
      Actions.updateModuleType({
        ...values,
        published: published ? 'YES' : 'NO',
        beta_testing: beta_testing ? 'YES' : 'NO',
        cobuilding: cobuilding ? 'YES' : 'NO',
        id,
      })
    );
    onClose();
  };

  return (
    <>
      <Tooltip title="View / Edit">
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={showDrawer}
          size="small"
          disabled={!hasEditPermission}
        />
      </Tooltip>
      <Drawer
        title="Edit a Module Type"
        width={500}
        onClose={onClose}
        visible={visible}
      >
        <Form
          layout="vertical"
          hideRequiredMark
          form={form}
          onFinish={onSubmit}
          className="px-4 py-2"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input
              placeholder="Please enter Name"
              onChange={(e) =>
                form.setFieldsValue({
                  slug: e.target.value
                    ? `${slugify(e.target.value)}-${getRandomInt(
                        100000,
                        999999
                      )}`
                    : '',
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="slug"
            label="Slug"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input disabled placeholder="Please enter slug" />
          </Form.Item>
          <Form.Item
            name="short_description"
            label="Short Description"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <TextArea rows={3} placeholder="Please enter short Description" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <TextArea rows={3} placeholder="Please enter Description" />
          </Form.Item>
          <Form.Item
            name="image"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <UploadImage />
          </Form.Item>
          <Form.Item
            name="partner_id"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <PartnerSelect placeholder="Please select partner" />
          </Form.Item>
          <Form.Item
            name="published"
            valuePropName="checked"
            rules={[{ required: true, message: 'This field is required' }]}
            label="Published"
            colon={false}
            initialValue
          >
            <Switch />
          </Form.Item>
          <Form.Item
            name="cobuilding"
            valuePropName="checked"
            rules={[{ required: true, message: 'This field is required' }]}
            label="CoBuilding"
            initialValue={false}
            colon={false}
          >
            <Switch />
          </Form.Item>
          <Form.Item
            name="beta_testing"
            valuePropName="checked"
            rules={[{ required: true, message: 'This field is required' }]}
            label="BetaTesting"
            initialValue={false}
            colon={false}
          >
            <Switch />
          </Form.Item>
          <div className="text-right">
            <Button onClick={onClose} style={{ marginRight: 12 }}>
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

export default Edit;
