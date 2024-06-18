/* eslint-disable no-shadow */
import { Button, Form, Input } from 'antd';
import { useWatch } from 'antd/lib/form/Form';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { NotificationManager } from '../../components/common/react-notifications';
import { adminRoot } from '../../constants/defaultValues';
import firebase from '../../helpers/Firebase';
import { setCurrentUser, setSession } from '../../helpers/Utils';
import { loginUser } from '../../redux/actions';
import PhoneVarification from './PhoneVarification';

const validatePassword = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your password';
  } else if (value.length < 4) {
    error = 'Value must be longer than 3 characters';
  }
  return error ? Promise.reject(error) : Promise.resolve();
};

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your email address';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error ? Promise.reject(error) : Promise.resolve();
};

const Login = () => {
  const { loading, error } = useSelector(({ authUser }) => authUser);

  const [authUser, setAuthUser] = useState(null);

  const { state } = useLocation();
  const [form] = Form.useForm();
  const history = useHistory();
  const email = useWatch('email', form);
  const password = useWatch('password', form);
  const dispatch = useDispatch();

  const varifyPhone = new URLSearchParams(window.location.search).get(
    'varify-phone'
  );

  useEffect(() => {
    if (error) {
      NotificationManager.warning(error, 'Login Error', 3000, null, null, '');
    }
  }, [error]);

  const initialValues = { email, password };

  const onFinish = (values) => {
    if (!loading) {
      if (values.email !== '' && values.password !== '') {
        dispatch(
          loginUser(
            {
              ...values,
              onSuccess: (authUser) => {
                if (authUser.user.country_code && authUser.user.mobile_number) {
                  history.push(
                    `/user/login?varify-phone=${authUser.user.country_code}${authUser.user.mobile_number}`
                  );
                  setAuthUser(authUser);
                } else {
                  setSession(authUser.accessToken, authUser.refreshToken);
                  setCurrentUser(authUser.user);
                  setTimeout(() => {
                    history.push(state?.redirectUrl || adminRoot, {
                      redirectUrl: null,
                    });
                  }, 0);
                }
              },
            },
            history,
            state?.redirectUrl
          )
        );
      }
    }
  };

  return (
    <div
      style={{ maxWidth: 560, width: '100%' }}
      className="custom_styles d-flex flex-column justify-content-center"
    >
      {varifyPhone && authUser ? (
        <>
          <h6 className="h6-lg text-center" style={{ marginBottom: 15 }}>
            Please verify use your phone number to login.
          </h6>
          <h3 className="h3-md" style={{ marginBottom: 22 }}>
            Verify Phone
          </h3>
          <PhoneVarification auth={firebase.auth} authUser={authUser} />
        </>
      ) : (
        <>
          <h6 className="h6-lg text-center" style={{ marginBottom: 15 }}>
            Please use your credentials to login.
          </h6>
          <h3 className="h3-md" style={{ marginBottom: 22 }}>
            Login
          </h3>
          <Form
            form={form}
            onFinish={onFinish}
            className="custom-form-style"
            layout="vertical"
            initialValues={initialValues}
          >
            <Form.Item
              style={{ marginBottom: 22 }}
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
            <Form.Item
              style={{ marginBottom: 22 }}
              name="password"
              label={<span className="h6-lg">Password</span>}
              rules={[
                () => ({
                  validator(_, value) {
                    return validatePassword(value);
                  },
                }),
              ]}
            >
              <Input type="password" placeholder="Type your password" />
            </Form.Item>

            <div className="d-flex flex-column w-100 align-items-end">
              <Link to="/user/forgot-password">
                <h6 className="h6-lg" style={{ marginBottom: 22 }}>
                  Forgot password?
                </h6>
              </Link>

              <Button
                type="primary btn-text-md px-4"
                htmlType="submit"
                style={{ height: 38 }}
                loading={loading}
              >
                <span className="px-4">Login</span>
              </Button>
            </div>
          </Form>
        </>
      )}
    </div>
  );
};

export default Login;
