import { EditOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Tooltip } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row } from 'reactstrap';
import UploadImage from '../../../../components/UploadImage';
import { slugify } from '../../../../helpers/Utils';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';

const { TextArea } = Input;

const EditExpertiseCategory = ({ id, data, type }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const { hasEditPermission } = usePermission();

  const [form] = Form.useForm();
  const showDrawer = () => {
    const filterData = data.filter((item) => item.id === id);
    if (filterData.length > 0) {
      form.setFieldsValue({
        name: filterData[0].name,
        description: filterData[0].description,
        icon: filterData[0].icon,
      });
    }
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onSubmit = (values) => {
    if (typeof values.icon === 'string') {
      // eslint-disable-next-line no-param-reassign
      delete values.icon;
    }
    const filterData = data.filter((item) => item.id === id);
    dispatch(
      Actions.updateExpertiseCategory({
        ...values,
        translate: {
          data: [{ key: values.name }, { key: values.description }],
          removeKeys: [
            { key: filterData[0]?.name },
            { key: filterData[0]?.description },
          ],
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
        title="Edit ExpertiseCategory"
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
                name="name"
                label="Name"
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <Input
                  placeholder="Please enter Name"
                  onChange={(e) =>
                    form.setFieldsValue({
                      slug: slugify(`${e.target.value}-${type}`),
                    })
                  }
                />
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
            <Col
              span={24}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}
            >
              <Form.Item name="icon" label="Icon" className="mb-0">
                <UploadImage />
              </Form.Item>
              <div className="pb-2">
                <Button onClick={onClose} style={{ marginRight: 12 }}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default EditExpertiseCategory;
