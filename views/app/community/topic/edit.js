/* eslint-disable react/react-in-jsx-scope */
import { EditOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Select, Tooltip } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row } from 'reactstrap';
import CKEditor5 from '../../../../components/util-components/CkEditor';
import UserSelect from '../../../../components/util-components/selector/UserSelect';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions'; /* eslint-disable camelcase */

const EditTopic = ({ id, data }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const { hasEditPermission } = usePermission();

  const showDrawer = () => {
    const filterData = data.filter((item) => item.id === id);
    if (filterData.length > 0) {
      form.setFieldsValue({
        ...filterData[0],
        created_by: filterData[0]?.created_by?.id,
      });
    }
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onSubmit = ({ images, ...values }) => {
    const payload = {
      ...values,
      id,
    };
    dispatch(Actions.updateTopic(payload));
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
        title="View/Edit Topic"
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
          className="p-4"
        >
          <Form.Item
            name="created_by"
            rules={[{ required: true, message: 'This field is required' }]}
            label={<h6 className="h6-lg">Created by</h6>}
          >
            <UserSelect placeholder="Choose created by" />
          </Form.Item>

          <Form.Item
            name="status"
            rules={[{ required: true, message: 'This field is required' }]}
            label={<h6 className="h6-lg">Topic status</h6>}
          >
            <Select
              placeholder="Choose topic status"
              options={[
                {
                  value: 'PENDING',
                },
                {
                  value: 'ACCEPTED',
                },
                {
                  value: 'REJECTED',
                },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="name"
            rules={[{ required: true, message: 'This field is required' }]}
            label={<h6 className="h6-lg">Name</h6>}
            style={{
              marginBottom: 32,
            }}
          >
            <Input placeholder="Type your name" />
          </Form.Item>

          <Form.Item
            name="description"
            rules={[{ required: true, message: 'This field is required' }]}
            label={<h6 className="h6-lg">Description</h6>}
            style={{
              marginBottom: 32,
            }}
          >
            <CKEditor5 rows={5} placeholder="Type your description" />
          </Form.Item>

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

export default EditTopic;
