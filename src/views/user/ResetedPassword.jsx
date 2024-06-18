import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const ResetedPassword = () => {
  return (
    <div
      style={{ maxWidth: 560, width: '100%' }}
      className="custom_styles d-flex flex-column justify-content-center align-items-center"
    >
      <h6 className="h6-lg text-center mt-2" style={{ marginBottom: 19 }}>
        Password reseted
      </h6>
      <p className="p-md text-center mb-4" style={{ maxWidth: 390 }}>
        Your new password has been reseted successfully, you can log in now into
        the admin panel
      </p>
      <div className="d-flex justify-content-center">
        <Link to="/user/login">
          <Button
            type="primary btn-text-md"
            size="large"
            style={{ height: 46 }}
          >
            <span className="px-4">Back to Login</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ResetedPassword;
