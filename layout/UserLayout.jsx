import React, { useEffect } from 'react';

const UserLayout = ({ children }) => {
  useEffect(() => {
    document.body.classList.add('background');
    document.body.classList.add('no-footer');

    return () => {
      document.body.classList.remove('background');
      document.body.classList.remove('no-footer');
    };
  }, []);

  return (
    <>
      <div className="h-100 w-100 d-flex justify-content-center align-items-center">
        <div className="user-laout-wrapper">
          <img
            className="user-layout-top-left-icon"
            src="/assets/img/layout/user-layout-top-left-icon.svg"
            alt=""
          />
          <div className="user-laout">
            <img
              alt=""
              src="/assets/logos/hubbers-logo.svg"
              style={{ marginBottom: 25, height: 57, width: 174 }}
            />
            {children}
          </div>
          <img
            className="user-layout-botton-right-icon"
            src="/assets/img/layout/user-layout-botton-right-icon.svg"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default UserLayout;
