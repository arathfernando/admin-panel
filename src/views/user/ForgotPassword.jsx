import { Button, Form, Input } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { NotificationManager } from '../../components/common/react-notifications';
import { forgotPassword } from '../../redux/actions';

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your password';
  } else if (value.length < 4) {
    error = 'Value must be longer than 3 characters';
  }
  return error ? Promise.reject(error) : Promise.resolve();
};

const ForgotPassword = () => {
  const { forgotUserMail, loading, error } = useSelector(
    ({ authUser }) => authUser
  );

  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      NotificationManager.warning(
        error,
        'Forgot Password Error',
        3000,
        null,
        null,
        ''
      );
    } else if (!loading && forgotUserMail === 'success')
      NotificationManager.success(
        'Please check your email.',
        'Forgot Password Success',
        3000,
        null,
        null,
        ''
      );
  }, [error, forgotUserMail, loading]);

  const onFinish = (values) => {
    if (!loading) {
      if (values.email !== '') {
        dispatch(forgotPassword(values, history));
      }
    }
  };

  return (
    <div
      style={{ maxWidth: 560, width: '100%' }}
      className="custom_styles d-flex flex-column justify-content-center"
    >
      <h6
        className="h6-lg text-center mx-auto"
        style={{ marginBottom: 22, maxWidth: 290 }}
      >
        Please use your email to reset your password
      </h6>
      <Form
        form={form}
        onFinish={onFinish}
        className="custom-form-style"
        layout="vertical"
      >
        <Form.Item
          style={{ marginBottom: 34 }}
          name="email"
          label={<span className="h6-lg">Email</span>}
          rules={[
            () => ({
              validator(_, value) {
                return validateEmail(value);
              },
            }),
          ]}
        >
          <Input type="email" placeholder="Type your email" />
        </Form.Item>

        <div className="d-flex flex-column w-100 align-items-end">
          <Button
            type="primary btn-text-md px-4"
            htmlType="submit"
            style={{ height: 38 }}
            loading={loading}
          >
            <span className="px-4">Send</span>
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ForgotPassword;
