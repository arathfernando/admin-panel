import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row } from 'reactstrap';
import UploadImage from '../../../../components/UploadImage';
import CKEditor5 from '../../../../components/util-components/CkEditor';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';

const { TextArea } = Input;

const CreateContestCategory = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const { hasCreatePermission } = usePermission();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onSubmit = (values) => {
    dispatch(Actions.createContestCategory(values));
    onClose();
  };

  useEffect(() => {
    form.resetFields();
  }, [visible]);

  return (
    <>
      <Button
        type="primary"
        onClick={showDrawer}
        disabled={!hasCreatePermission}
      >
        <PlusOutlined /> Create New ContestCategory
      </Button>
      <Drawer
        title="Create a New Contest Category"
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

export default CreateContestCategory;
