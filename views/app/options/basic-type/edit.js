/* eslint-disable no-param-reassign */
import { EditOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Select, Tooltip } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row } from 'reactstrap';
import UploadImage from '../../../../components/UploadImage';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';

const { Option } = Select;
const { TextArea } = Input;

const EditBasicType = ({ id, data, category }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const { hasEditPermission } = usePermission();

  const showDrawer = () => {
    const filterData = data.filter((item) => item.id === id);
    if (filterData.length > 0) {
      form.setFieldsValue({
        name: filterData[0].name,
        category: filterData[0].category?.id,
        description: filterData[0].description,
        image: filterData[0].image,
      });
    }
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onSubmit = (values) => {
    dispatch(
      Actions.updateBasicType({
        ...values,
        translate: {
          data: [{ key: values.name }, { key: values?.description }],
          removeKeys: [{ key: data.name }, { key: data?.description }],
        },
        id,
      })
    );
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
        title="Edit a Basic Type"
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
                name="name"
                label="Name"
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <Input placeholder="Please enter Name" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="category"
                label="BasicType Category"
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <Select style={{ width: '100%' }} placeholder="Type Category">
                  {category?.map((item) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.display_name}
                      </Option>
                    );
                  })}
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
          <Form.Item name="image" label="Avatar" className="mb-0">
            <UploadImage style={{ width: 'fit-content' }} />
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

export default EditBasicType;
