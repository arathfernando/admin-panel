import { Button } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import Loading from '../../../../components/util-components/Loading';
import NewRegisteredUsersChart from './NewRegisteredUsersChart';

import { getRegistaredUserCount } from '../../../../redux/actions';

const NewRegisteredUsers = () => {
  const {
    data: {
      total_reqistared_user = 0,
      new_reqistared_user = 0,
      reqistared_users_in_last_seven_days = 0,
    } = {},
    loading: registaredUserCountLoading,
  } = useSelector(({ kpi }) => kpi.registaredUserCount);
  const { loading: userCountChartLoadoing } = useSelector(
    ({ kpi }) => kpi.userCountChart
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRegistaredUserCount());
  }, []);

  return (
    <div style={{ padding: '35px 27px' }} className="position-relative">
      <Loading loading={userCountChartLoadoing || registaredUserCountLoading} />
      <div>
        <div
          className="d-flex align-items-end justify-content-between"
          style={{
            marginBottom: 26,
          }}
        >
          <div className="d-flex align-items-center" style={{ gap: 14 }}>
            <h2 className="h2-sm mb-0">New registered users</h2>
            <div
              className="br-5 mt-1"
              style={{
                background: '#E8F3D9',
                padding: '6px 11px',
                height: 'fit-content',
              }}
            >
              <span className="h6-sm hb-text-primary">
                {new_reqistared_user}
              </span>
            </div>
          </div>

          <Button
            type="ghost btn-text-md bw-2 d-flex align-items-center br-4 px-3"
            style={{ gap: 10, height: 40 }}
          >
            <span>Download report</span>
            <img
              src="/assets/img/icons/download-rounded.svg"
              alt=""
              style={{ height: 15 }}
            />
          </Button>
        </div>

        <Row>
          <Col xs={12} lg={6} xl={4} className="px-2 py-3">
            <div
              className="p-3 h-100"
              style={{ border: '1px solid #E8E8E8', borderRadius: 7 }}
            >
              <div className="p1">
                <h5 className="h5-lg text-black mb-1">New registered users</h5>
                <div className="d-flex justify-content-between">
                  <h3 className="h3-lg hb-text-primary mb-0">
                    {new_reqistared_user}
                  </h3>
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
              </div>
            </div>
          </Col>
          <Col xs={12} lg={6} xl={4} className="px-2 py-3">
            <div
              className="p-3 h-100"
              style={{ border: '1px solid #E8E8E8', borderRadius: 7 }}
            >
              <div className="p1">
                <h5 className="h5-lg text-black mb-1">
                  Total registered users
                </h5>
                <div className="d-flex justify-content-between">
                  <h3 className="h3-lg hb-text-primary mb-0">
                    {total_reqistared_user}
                  </h3>
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
              </div>
            </div>
          </Col>
          <Col xs={12} lg={6} xl={4} className="px-2 py-3">
            <div
              className="p-3 h-100"
              style={{ border: '1px solid #E8E8E8', borderRadius: 7 }}
            >
              <div className="p1">
                <h5 className="h5-lg text-black mb-1">
                  Registered users in last 7 days
                </h5>
                <div className="d-flex justify-content-between">
                  <h3 className="h3-lg hb-text-primary mb-0">
                    {reqistared_users_in_last_seven_days}
                  </h3>
                  <div
                    className="br-5 mt-1"
                    style={{
                      background: 'rgba(239, 33, 31, 0.23)',
                      padding: '0px 6px',
                      height: 'fit-content',
                    }}
                  >
                    <span className="h6-sm" style={{ color: '#CD0A1E' }}>
                      +5%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <NewRegisteredUsersChart />
      </div>
    </div>
  );
};

export default NewRegisteredUsers;
