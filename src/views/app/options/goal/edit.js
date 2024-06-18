import { EditOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Tooltip } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row } from 'reactstrap';
import UploadImage from '../../../../components/UploadImage';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';

const EditGoal = ({ id, data }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [currentGoalNumber, setCurrentGoalNumber] = useState();
  const [form] = Form.useForm();

  const { hasEditPermission } = usePermission();

  const showDrawer = () => {
    const filterData = data.filter((item) => item.id === id);
    if (filterData.length > 0) {
      form.setFieldsValue({ ...filterData[0] });
    }
    setVisible(true);
    setCurrentGoalNumber(filterData[0]?.goal_number);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onSubmit = ({ goal_number, ...values }) => {
    // don't pass goal_number if it's not changed
    if (goal_number !== currentGoalNumber) {
      // eslint-disable-next-line no-param-reassign
      values.goal_number = goal_number;
    }

    dispatch(
      Actions.updateGoal({
        ...values,
        translate: {
          data: [{ key: values.goal_title }],
          removeKeys: [{ key: values.goal_title }],
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
        title="Edit a goal"
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
          {' '}
          <Row>
            <Col span={24}>
              <Form.Item
                name="goal_title"
                label="Goal Title"
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <Input placeholder="Please enter Goal Title" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="color"
                label="Color"
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <Input placeholder="Please enter Color" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <Input placeholder="Please enter Description" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="goal_number"
                label="Goal Number"
                rules={[
                  { required: true, message: 'This field is required' },
                  {
                    type: 'number',
                    message: 'This is not a valid number',
                  },
                ]}
              >
                <Input placeholder="Please enter Goal Number" type="number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="goal_image"
                label="Goal Image"
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

export default EditGoal;
