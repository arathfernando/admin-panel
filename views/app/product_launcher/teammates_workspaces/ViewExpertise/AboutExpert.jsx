import { Button, Divider } from 'antd';
import moment from 'moment';
import React from 'react';
import { Col, Row } from 'reactstrap';
import { rolesObj } from '../../../../../constants/commonData';

const AboutExpert = ({ marketplace }) => {
  return (
    <>
      <div>
        <h3 className="h3-md mb-4 text-black">About the expert</h3>
        <div className="d-flex align-items-center flex-wrap my-3">
          <img
            src={marketplace?.created_by?.general_profile?.avatar}
            alt=""
            style={{
              width: 31,
              height: 31,
              border: '2px solid #8BC53F',
              borderRadius: '50%',
            }}
            className="me-2"
          />
          <h6 className="h6-sm text-black my-1 mr-2">
            {marketplace?.created_by?.general_profile?.first_name}{' '}
            {marketplace?.created_by?.general_profile?.last_name}
          </h6>
          <p className="btn-text-sm text-grey-light my-1 mr-5">
            {rolesObj[marketplace?.created_by?.general_profile?.role]?.label}
          </p>
          <Button
            type="ghost text-black btn-text-md px-5"
            style={{ height: 34 }}
          >
            <span className="text-black ">Contact me</span>
          </Button>
        </div>

        <Row className="w-100">
          <Col xs={12} lg={6}>
            <div className="d-flex my-2 py-1 align-items-center">
              <img
                src="/images/expert-marketplace/location-icon.svg"
                alt=""
                style={{ height: 32 }}
                className="me-3"
              />
              <h5 className="h5-lg text-black mb-0">
                {marketplace?.created_by?.general_profile?.location}
              </h5>
            </div>
          </Col>
          <Col xs={12} lg={6}>
            <div className="d-flex my-2 py-1 align-items-center">
              <img
                src="/images/expert-marketplace/time-icon.svg"
                alt=""
                style={{ height: 32 }}
                className="me-3"
              />
              <h5 className="h5-lg text-black mb-0">1 hour response time</h5>
            </div>
          </Col>
          <Col xs={12} lg={6}>
            <div className="d-flex my-2 py-1 align-items-center">
              <img
                src="/images/expert-marketplace/ion_language.svg"
                alt=""
                style={{ height: 32 }}
                className="me-3"
              />
              <h5 className="h5-lg text-black mb-0">French, English</h5>
            </div>
          </Col>
          <Col xs={12} lg={6}>
            <div className="d-flex my-2 py-1 align-items-center">
              <img
                src="/images/expert-marketplace/bx_user.svg"
                alt=""
                style={{ height: 32 }}
                className="me-3"
              />
              {marketplace?.created_by?.createdAt && (
                <h5 className="h5-lg text-black mb-0">
                  Member since{' '}
                  {moment(marketplace?.created_by?.createdAt).format(
                    'MMM YYYY'
                  )}
                </h5>
              )}
            </div>
          </Col>
        </Row>

        <Divider className="pb-2" />
      </div>
    </>
  );
};

export default AboutExpert;
