import React from 'react';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';

const ForgotResetPassword = () => {
  const token = new URLSearchParams(window.location.search).get('token');

  return <>{token ? <ResetPassword token={token} /> : <ForgotPassword />}</>;
};

export default ForgotResetPassword;
