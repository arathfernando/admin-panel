/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useSelector } from 'react-redux';

const NoPermissions = () => {
  const { loading, error } = useSelector(({ admins }) => admins.currentAdmin);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <h1>Checking permission...</h1>
      </div>
    );
  }
  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <h1>Something is wrong...</h1>
      </div>
    );
  }
  return (
    <div className="d-flex justify-content-center align-items-center">
      <h1>you don't have the permission to access this page</h1>
    </div>
  );
};

export default NoPermissions;
