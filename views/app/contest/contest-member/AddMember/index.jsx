import { Button, Form, Modal, Select } from 'antd';
import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import UserSelect from '../../../../../components/util-components/selector/UserSelect';
import {
  addContestMember,
  addContestMemberReset,
  getAllContests,
} from '../../../../../redux/actions';

const { Option } = Select;

const AddMember = ({ onCancel, ...props }) => {
  const allContests = useSelector(({ contest }) => contest.allContests.data);
  const { status } = useSelector(
    ({ contestMember }) => contestMember.addMemberAction
  );

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'submitted') {
      form.resetFields();
      dispatch(addContestMemberReset());
      onCancel();
    }
  }, [dispatch, form, onCancel, status]);

  useEffect(() => {
    dispatch(getAllContests());
  }, [dispatch]);

  const onFinish = (values) => {
    dispatch(addContestMember(values));
  };

  return (
    <Modal
      footer={null}
      width={800}
      zIndex={999}
      title="Add new member"
      className="sidecreen-modal-3 create-contest-container contest-container"
      onCancel={onCancel}
      {...props}
    >
      <Form
        layout="vertical"
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        className="custom-form-style"
      >
        <Form.Item
          name="contest_id"
          label={<h6 className="input-label">Choose contest</h6>}
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Select>
            {allContests.map((contest) => (
              <Option key={contest.id} value={contest.id}>
                {contest.title}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="email"
          label={<h6 className="input-label">Add member name or e-mail</h6>}
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <UserSelect optionValue="email" />
        </Form.Item>
        <Form.Item
          name="role"
          label={
            <h6 className="input-label">
              Choose the role between a judge or a contestant
            </h6>
          }
          rules={[{ required: true, message: 'This field is required' }]}
          initialValue="CONTESTANT"
        >
          <Select>
            <Option value="CONTESTANT">Contestant</Option>
            <Option value="JUDGE">Judge</Option>
          </Select>
        </Form.Item>

        <div className="d-flex justify-content-end mt-5">
          <Button
            type="ghost px-4 br-4"
            size="large"
            onClick={() => onCancel()}
          >
            Cancel
          </Button>
          <Button
            type="primary ml-3 px-4"
            size="large"
            htmlType="submit"
            loading={status === 'submitting'}
          >
            Add member
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddMember;
