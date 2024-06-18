import { Button, Form, Select } from 'antd';
import React from 'react';
import { Col, Row } from 'reactstrap';

const KPIDashboard = () => {
  const [form] = Form.useForm();

  return (
    <div style={{ padding: '40px 27px' }}>
      <div
        style={{ marginBottom: 30, gap: 10 }}
        className="d-flex justify-content-between"
      >
        <h2 className="h2-sm mb-0">KPI Dashboard</h2>
        <Form form={form}>
          <Form.Item noStyle>
            <Select
              size="small"
              defaultValue="Today"
              style={{ minWidth: 120, height: 28 }}
            />
          </Form.Item>
        </Form>
      </div>

      <Row className="m-n3">
        <Col xs={12} md={6} lg={3} className="p-3">
          <div
            className="h-100 d-flex flex-column"
            style={{
              border: '1px solid #E8E8E8',
              borderRadius: 5,
              padding: 20,
            }}
          >
            <h6 className="h6-lg text-black mb-3">Users</h6>
            <div className="flex-grow-1 d-flex justify-content-between flex-column">
              <h3 className="h3-lg mb-1 hb-text-primary">4352</h3>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <h6 className="h6-sm text-black mb-0">Total users</h6>
                <div
                  className="br-5 mt-1"
                  style={{
                    background: '#E8F3D9',
                    padding: '0px 6px',
                    height: 'fit-content',
                  }}
                >
                  <span className="h6-sm hb-text-primary">+5%</span>
                </div>
              </div>

              <h3 className="h3-lg mb-1 hb-text-primary">100</h3>
              <h6 className="h6-sm text-black">New users</h6>

              <h3 className="h3-lg mb-1 hb-text-primary">100</h3>
              <h6 className="h6-sm text-black">Active users</h6>

              <Button
                type="text px-0 fs-11 fw-6 hb-text-primary"
                style={{ width: 'fit-content' }}
              >
                View all
              </Button>
            </div>
          </div>
        </Col>

        <Col xs={12} md={6} lg={3} className="p-3">
          <div
            className="h-100 d-flex flex-column"
            style={{
              border: '1px solid #E8E8E8',
              borderRadius: 5,
              padding: 20,
            }}
          >
            <h6 className="h6-lg text-black mb-3">New orders</h6>
            <div className="flex-grow-1 d-flex justify-content-between flex-column">
              <h3 className="h3-lg mb-1 hb-text-primary">4352</h3>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <h6 className="h6-sm text-black mb-0">Contests</h6>
              </div>

              <h3 className="h3-lg mb-1 hb-text-primary">100</h3>
              <h6 className="h6-sm text-black">Sponsorship</h6>

              <h3 className="h3-lg mb-1 hb-text-primary">100</h3>
              <h6 className="h6-sm text-black">Masterclass</h6>

              <h3 className="h3-lg mb-1 hb-text-primary">100</h3>
              <h6 className="h6-sm text-black">Users</h6>

              <Button
                type="text px-0 fs-11 fw-6 hb-text-primary"
                style={{ width: 'fit-content' }}
              >
                View all
              </Button>
            </div>
          </div>
        </Col>

        <Col xs={12} md={6} lg={3} className="p-3">
          <div
            className="h-100 d-flex flex-column"
            style={{
              border: '1px solid #E8E8E8',
              borderRadius: 5,
              padding: 20,
            }}
          >
            <h6 className="h6-lg text-black mb-3">Transactions</h6>
            <div className="flex-grow-1 d-flex justify-content-between flex-column">
              <h3 className="h3-lg mb-1 hb-text-primary">4352</h3>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <h6 className="h6-sm text-black mb-0">EUR</h6>
                <div
                  className="br-5 mt-1"
                  style={{
                    background: '#E8F3D9',
                    padding: '0px 6px',
                    height: 'fit-content',
                  }}
                >
                  <span className="h6-sm hb-text-primary">+5%</span>
                </div>
              </div>

              <h3 className="h3-lg mb-1 hb-text-primary">100</h3>
              <h6 className="h6-sm text-black">HBB</h6>

              <h3 className="h3-lg mb-1 hb-text-primary">100</h3>
              <h6 className="h6-sm text-black">HBS</h6>

              <Button
                type="text px-0 fs-11 fw-6 hb-text-primary"
                style={{ width: 'fit-content' }}
              >
                View all
              </Button>
            </div>
          </div>
        </Col>

        <Col xs={12} md={6} lg={3} className="p-3">
          <div
            className="h-100 d-flex flex-column"
            style={{
              border: '1px solid #E8E8E8',
              borderRadius: 5,
              padding: 20,
            }}
          >
            <h6 className="h6-lg text-black mb-3">Communities</h6>
            <div className="flex-grow-1 d-flex justify-content-between flex-column">
              <h3 className="h3-lg mb-1 hb-text-primary">4352</h3>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <h6 className="h6-sm text-black mb-0">New communities</h6>
                <div
                  className="br-5 mt-1"
                  style={{
                    background: '#E8F3D9',
                    padding: '0px 6px',
                    height: 'fit-content',
                  }}
                >
                  <span className="h6-sm hb-text-primary">+5%</span>
                </div>
              </div>

              <h3 className="h3-lg mb-1 hb-text-primary">100</h3>
              <h6 className="h6-sm text-black">New groups</h6>

              <h3 className="h3-lg mb-1 hb-text-primary">100</h3>
              <h6 className="h6-sm text-black">New topics</h6>

              <h3 className="h3-lg mb-1 hb-text-primary">100</h3>
              <h6 className="h6-sm text-black">New posts</h6>

              <Button
                type="text px-0 fs-11 fw-6 hb-text-primary"
                style={{ width: 'fit-content' }}
              >
                View all
              </Button>
            </div>
          </div>
        </Col>

        <Col xs={6} lg={6} className="p-3">
          <div
            className="h-100 d-flex flex-column"
            style={{
              border: '1px solid #E8E8E8',
              borderRadius: 5,
              padding: 20,
            }}
          >
            <h6 className="h6-lg text-black mb-3">Latest user activities</h6>
            <div className="flex-grow-1 d-flex justify-content-between flex-column">
              <h3 className="h3-lg mb-1 hb-text-primary">4352</h3>
              <div
                className="d-flex align-items-center justify-content-between mb-2"
                style={{ maxWidth: 200 }}
              >
                <h6 className="h6-sm text-black mb-0">Total users</h6>
                <div
                  className="br-5 mt-1"
                  style={{
                    background: '#E8F3D9',
                    padding: '0px 6px',
                    height: 'fit-content',
                  }}
                >
                  <span className="h6-sm hb-text-primary">+5%</span>
                </div>
              </div>

              <h3 className="h3-lg mb-1 hb-text-primary">100</h3>
              <h6 className="h6-sm text-black">New users</h6>

              <h3 className="h3-lg mb-1 hb-text-primary">100</h3>
              <h6 className="h6-sm text-black">Active users</h6>

              <Button
                type="text px-0 fs-11 fw-6 hb-text-primary"
                style={{ width: 'fit-content' }}
              >
                View all
              </Button>
            </div>
          </div>
        </Col>

        <Col xs={6} lg={6} className="p-3">
          <div
            className="h-100 d-flex flex-column"
            style={{
              border: '1px solid #E8E8E8',
              borderRadius: 5,
              padding: 20,
            }}
          >
            <h6 className="h6-lg text-black mb-3">Latest user transactions</h6>
            <div className="flex-grow-1 d-flex justify-content-between flex-column">
              <h3 className="h3-lg mb-1 hb-text-primary">4352</h3>
              <div
                className="d-flex align-items-center justify-content-between mb-2"
                style={{ maxWidth: 200 }}
              >
                <h6 className="h6-sm text-black mb-0">Total users</h6>
                <div
                  className="br-5 mt-1"
                  style={{
                    background: '#E8F3D9',
                    padding: '0px 6px',
                    height: 'fit-content',
                  }}
                >
                  <span className="h6-sm hb-text-primary">+5%</span>
                </div>
              </div>

              <h3 className="h3-lg mb-1 hb-text-primary">100</h3>
              <h6 className="h6-sm text-black">New users</h6>

              <h3 className="h3-lg mb-1 hb-text-primary">100</h3>
              <h6 className="h6-sm text-black">Active users</h6>

              <Button
                type="text px-0 fs-11 fw-6 hb-text-primary"
                style={{ width: 'fit-content' }}
              >
                View all
              </Button>
            </div>
          </div>
        </Col>

        <Col xs={12} className="p-3">
          <div
            className="h-100 d-flex flex-column"
            style={{
              border: '1px solid #E8E8E8',
              borderRadius: 5,
              padding: 20,
            }}
          >
            <h6 className="h6-lg text-black mb-3">Communities activities</h6>
            <div className="flex-grow-1 d-flex justify-content-between flex-column">
              <h3 className="h3-lg mb-1 hb-text-primary">4352</h3>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <h6 className="h6-sm text-black mb-0">Total users</h6>
                <div
                  className="br-5 mt-1"
                  style={{
                    background: '#E8F3D9',
                    padding: '0px 6px',
                    height: 'fit-content',
                  }}
                >
                  <span className="h6-sm hb-text-primary">+5%</span>
                </div>
              </div>

              <h3 className="h3-lg mb-1 hb-text-primary">100</h3>
              <h6 className="h6-sm text-black">New users</h6>

              <h3 className="h3-lg mb-1 hb-text-primary">100</h3>
              <h6 className="h6-sm text-black">Active users</h6>

              <Button
                type="text px-0 fs-11 fw-6 hb-text-primary"
                style={{ width: 'fit-content' }}
              >
                View all
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default KPIDashboard;
