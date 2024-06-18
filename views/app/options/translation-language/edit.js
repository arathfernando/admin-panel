import { EditOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Tooltip } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row } from 'reactstrap';
import UploadImage from '../../../../components/UploadImage';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';

const EditTranslationLanguage = ({ id, data }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const { hasEditPermission } = usePermission();

  const showDrawer = () => {
    const filterData = data.filter((item) => item.id === id);
    if (filterData.length > 0) {
      form.setFieldsValue({ ...filterData[0] });
    }
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onSubmit = (values) => {
    dispatch(Actions.updateTranslationLanguage({ ...values, id }));
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
        title="Edit a Translation Language"
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
          className="px-4 pb-4 pt-5"
        >
          <Row>
            <Col span={24}>
              <Form.Item
                name="language_code"
                label="Language Code"
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <Input placeholder="Please enter Language Code" />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item
                name="language_name"
                label="Language Name"
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <Input placeholder="Please enter Language Name" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="flag"
                label="Flag"
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <UploadImage onChange={(e) => console.log({ e })} />
              </Form.Item>
            </Col>
          </Row>
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

export default EditTranslationLanguage;
