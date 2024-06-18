import { Pagination } from 'antd';
import React from 'react';

const HBsPagination = ({
  total,
  current,
  hideOnSinglePage = false,
  defaultPageSize = 12,
  onChange = () => null,
  className,
  ...rest
}) => {
  return (
    <Pagination
      className={`pagination-stryle-1${className ? ` ${className}` : ''}`}
      prevIcon={
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginTop: -2 }}
        >
          <path
            d="M14.6 6L16 7.4L11.4 12L16 16.6L14.6 18L8.6 12L14.6 6Z"
            fill="#000000"
          />
        </svg>
      }
      nextIcon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          style={{ marginTop: -2 }}
        >
          <path
            d="M9.4 18L8 16.6L12.6 12L8 7.4L9.4 6L15.4 12L9.4 18Z"
            fill="black"
          />
        </svg>
      }
      total={total || 0}
      current={current}
      hideOnSinglePage={hideOnSinglePage}
      defaultPageSize={defaultPageSize}
      onChange={(page = 1, limit) => {
        onChange(page, limit);
      }}
      {...rest}
    />
  );
};

export default HBsPagination;
