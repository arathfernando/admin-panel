import { Button, Form, Input } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { NotificationManager } from '../../components/common/react-notifications';
import { resetPassword } from '../../redux/actions';

const validateNewPassword = (values) => {
  const { newPassword, newPasswordAgain } = values;
  let error;
  if (newPasswordAgain && newPassword !== newPasswordAgain) {
    error = 'Please check your new password';
  }
  return error ? Promise.reject(error) : Promise.resolve();
};

const ResetPassword = ({ token }) => {
  const { loading } = useSelector(({ authUser }) => authUser);

  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    if (!loading) {
      if (token) {
        if (values.newPassword !== '' && values.newPasswordAgain) {
          dispatch(
            resetPassword({
              new_password: values.newPassword,
              token,
              onSuccess: () => {
                NotificationManager.success(
                  'Please login with your new password.',
                  'Reset Password Success',
                  3000,
                  null,
                  null,
                  ''
                );
                history.push('/user/password-reseted');
              },
            })
          );
        }
      } else {
        NotificationManager.warning(
          'Please check your email url.',
          'Reset Password Error',
          3000,
          null,
          null,
          ''
        );
      }
    }
  };

  return (
    <div
      style={{ maxWidth: 560, width: '100%' }}
      className="custom_styles d-flex flex-column justify-content-center"
    >
      <h6
        className="h6-lg text-center mt-5"
        style={{ marginBottom: 23, maxWidth: 500 }}
      >
        Type your new password with strong characters as numbers, symbols or
        capital letters in order to be stronger
      </h6>
      <Form
        form={form}
        onFinish={onFinish}
        className="custom-form-style"
        layout="vertical"
      >
        <Form.Item
          style={{ marginBottom: 27 }}
          name="newPassword"
          label={<span className="h6-lg">Password</span>}
        >
          <Input placeholder="Type new password" />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: 34 }}
          name="newPasswordAgain"
          label={<span className="h6-lg">Confirm password</span>}
          rules={[
            () => ({
              validator() {
                return validateNewPassword(form.getFieldsValue());
              },
            }),
          ]}
        >
          <Input placeholder="Type confirm password" />
        </Form.Item>

        <div className="d-flex flex-column w-100 align-items-end">
          <Button
            type="primary btn-text-md px-4"
            htmlType="submit"
            style={{ height: 38 }}
            loading={loading}
          >
            <span className="px-4">Reset</span>
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ResetPassword;
