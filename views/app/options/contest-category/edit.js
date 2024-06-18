/* eslint-disable no-param-reassign */
import { EditOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Tooltip } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row } from 'reactstrap';
import UploadImage from '../../../../components/UploadImage';
import CKEditor5 from '../../../../components/util-components/CkEditor';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';

const { TextArea } = Input;

const EditContestCategory = ({ id, data }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const { hasEditPermission } = usePermission();

  const showDrawer = () => {
    const filterData = data.filter((item) => item.id === id);
    if (filterData.length > 0) {
      form.setFieldsValue({
        title: filterData[0].title,
        image: filterData[0].image,
        description: filterData[0].description,
        contest_standard_rule: filterData[0].contest_standard_rule,
      });
    }
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
    form.resetFields({});
  };

  const onSubmit = (values) => {
    dispatch(Actions.updateContestCategory({ ...values, id }));
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
        title="Edit a Contest Category"
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
          className="px-4 pb-4"
        >
          <Row>
            <Col span={24}>
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <Input placeholder="Please enter Title" />
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

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="contest_standard_rule"
                rules={[{ required: true, message: 'This field is required' }]}
                label="Standard rules"
              >
                <CKEditor5 rows={5} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="image" label="Image" className="mb-0">
            <UploadImage />
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

export default EditContestCategory;
