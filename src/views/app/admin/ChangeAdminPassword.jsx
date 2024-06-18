/* eslint-disable camelcase */
import { Button, Form, Input } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { changeAdminPassword } from '../../../redux/actions';

const validateNewPassword = (values) => {
  const { new_password, confirm_new_password } = values;
  let error;
  if (confirm_new_password && new_password !== confirm_new_password) {
    error = 'Please check your new password';
  }
  return error ? Promise.reject(error) : Promise.resolve();
};

const ChangeAdminPassword = () => {
  const { status } = useSelector(
    (state) => state.admins.changeAdminPasswordAction
  );

  const [form] = Form.useForm();
  const history = useHistory();

  const dispatch = useDispatch();

  const onFinish = ({ confirm_new_password, ...values }) => {
    dispatch(
      changeAdminPassword({
        ...values,
        onSuccess: () => history.push('/app/admin/profile'),
      })
    );
  };

  return (
    <div className="bg-white" style={{ minHeight: '100vh', padding: 56 }}>
      <div className="mx-auto custom_styles" style={{ maxWidth: 664 }}>
        <Form
          hideRequiredMark
          form={form}
          onFinish={onFinish}
          className="custom-form-style"
          layout="vertical"
        >
          <h3 className="h3-lg" style={{ marginBottom: 60 }}>
            Change password
          </h3>

          <Form.Item
            name="current_password"
            requiredMark
            rules={[{ required: true, message: 'This field is required' }]}
            label={<h5 className="h5-lg required-mark">Current password</h5>}
            style={{ marginBottom: 54 }}
          >
            <Input
              placeholder="*********"
              type="password"
              style={{ height: 37 }}
            />
          </Form.Item>

          <Form.Item
            name="new_password"
            requiredMark
            rules={[{ required: true, message: 'This field is required' }]}
            label={<h5 className="h5-lg required-mark">New password</h5>}
            style={{ marginBottom: 54 }}
          >
            <Input
              placeholder="*********"
              type="password"
              style={{ height: 37 }}
            />
          </Form.Item>

          <Form.Item
            name="confirm_new_password"
            requiredMark
            dependencies={['new_password']}
            rules={[
              () => ({
                validator() {
                  return validateNewPassword(form.getFieldsValue());
                },
              }),
            ]}
            label={
              <h5 className="h5-lg required-mark">Confirm new password</h5>
            }
            style={{ marginBottom: 54 }}
          >
            <Input
              placeholder="*********"
              type="password"
              style={{ height: 37 }}
            />
          </Form.Item>

          <div className="d-flex justify-content-end">
            <Button
              type="primary btn-text-md px-4"
              size="large"
              style={{ height: 49 }}
              htmlType="submit"
              loading={status === 'submitting'}
            >
              <span className="px-2">Save changes</span>
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ChangeAdminPassword;
