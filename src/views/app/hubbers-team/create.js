/* eslint-disable camelcase */
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
} from 'antd';
import { useWatch } from 'antd/lib/form/Form';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import UserSelect from '../../../components/util-components/selector/UserSelect';
import usePermission from '../../../hooks/usePermission';
import * as Actions from '../../../redux/actions';

const { TextArea } = Input;
const { Option } = Select;

const MemberCreate = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const { hasCreatePermission } = usePermission();

  const join_date = useWatch('join_date', form);

  const showDrawer = () => {
    form.resetFields();
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onSubmit = ({ termination_date, ...values }) => {
    let v = { ...values };
    if (termination_date) {
      v = { ...v, is_terminated: 'YES' };
      v.termination_date = termination_date;
    } else {
      v = { ...v, is_terminated: 'NO' };
    }
    dispatch(
      Actions.createHubbersTeam({
        ...v,
        translate: {
          data: [{ key: values.title }, { key: values.description }],
        },
      })
    );
    onClose();
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showDrawer}
        disabled={!hasCreatePermission}
      >
        <PlusOutlined /> Create team member
      </Button>
      <Drawer
        title="Create a team member"
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
          <Row>
            <Col span={12}>
              <Form.Item
                name="user_id"
                label="User"
                rules={[{ required: true, message: 'This field is required' }]}
                className="mr-2"
              >
                <UserSelect />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="is_published"
                label="Published"
                rules={[{ required: true, message: 'This field is required' }]}
                className="ml-2"
              >
                <Select placeholder="Please choose the Published">
                  <Option value="YES">Published</Option>
                  <Option value="NO">Not Published</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: 'This field is required' }]}
                className="mr-2"
              >
                <Input placeholder="Please enter the Title" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="description" label="Description">
            <TextArea rows={3} placeholder="Please enter the Description" />
          </Form.Item>
          <Row>
            <Col span={12}>
              <Form.Item
                name="join_date"
                label="Join Date"
                className="mr-2"
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="termination_date"
                label="Terminate Date"
                className="ml-2"
                dependencies={['join_date']}
                rules={[
                  () => ({
                    validator(rule, value) {
                      if (!value || value > join_date) {
                        return Promise.resolve();
                      }
                      if (!join_date) {
                        /* eslint-disable */
                        return Promise.reject(
                          'Please choose a Join date first'
                        );
                      }
                      /* eslint-disable */
                      return Promise.reject(
                        `Terminate date can't be before date of Join date`
                      );
                    },
                  }),
                ]}
              >
                <DatePicker
                  style={{ width: '100%' }}
                  disabledDate={(currectDate) =>
                    currectDate && currectDate.valueOf() < Date.now()
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <div
            style={{
              paddingTop: '24px',
              textAlign: 'right',
              width: '100%',
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
  );
};

export default MemberCreate;
