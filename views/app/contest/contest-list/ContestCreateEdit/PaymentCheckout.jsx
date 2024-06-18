import { Button } from 'antd';
import React from 'react';

const PaymentCheckout = ({ onFinish }) => {
  return (
    <div
      style={{ minHeight: 'calc(100vh - 300px)' }}
      className="d-flex flex-column"
    >
      <h6 className="fs-20 fw-5 text-black mb-3 mt-4">Payment checkout</h6>

      <div className="d-flex justify-content-end flex-grow-1 align-iteml-end">
        {/* <Button type="ghost mr-3 px-4" size="large">
          Save draft
        </Button> */}
        <Button type="primary px-3" size="large" onClick={() => onFinish()}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default PaymentCheckout;
