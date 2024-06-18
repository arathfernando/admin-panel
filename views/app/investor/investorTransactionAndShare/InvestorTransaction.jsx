/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import { Button, Form } from 'antd';
import { isEmpty } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import ZoneSelect from '../../../../components/util-components/selector/ZoneSelect';
import commaInNumber from '../../../../helpers/commaInNumber';
import usePermission from '../../../../hooks/usePermission';
import {
  getAllInvestorUsers,
  getInvestorTransactions,
  getInvestorTransactionsOfUser,
} from '../../../../redux/actions';
import AssignShares from './AssignShares';
import InvestorTransactionsTable from './InvestorTransactionTable';
import UserInvestorTransactionTable from './UserInvestorTransactionTable';

const InvestorTransaction = () => {
  const { extra_data: investorTransactionsExtraData } = useSelector(
    ({ investorTransaction }) => investorTransaction.investorTransactions
  );
  const { extra_data: investorTransactionsOfUserExtraData } = useSelector(
    ({ investorTransaction }) => investorTransaction.investorTransactionsOfUser
  );
  const { data: allInvestorUsers, loading } = useSelector(
    ({ investorTransaction }) => investorTransaction.allInvestorUsers
  );

  const { hasCreatePermission } = usePermission();

  const [openAssignShare, setOpenAssignShare] = useState(false);

  const [form] = Form.useForm();
  const { userId, userName } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const isUserInvestorTransaction = useMemo(() => userId, [userId]);

  const { loading: zoneLoading } = useSelector(
    ({ investorZone }) => investorZone.investorZones
  );

  useEffect(() => {
    dispatch(getAllInvestorUsers());
  }, [dispatch]);

  const handaleSearch = (params) => {
    if (userId) {
      dispatch(getInvestorTransactionsOfUser({ ...params, id: userId }));
    } else {
      dispatch(getInvestorTransactions(params));
    }
  };

  useEffect(() => {
    if (userId) {
      dispatch(
        getInvestorTransactionsOfUser({
          searchKey:
            typeof form.getFieldValue('area') === 'string' &&
            form.getFieldValue('area'),
          id: userId,
        })
      );
    } else {
      dispatch(
        getInvestorTransactions({
          searchKey:
            typeof form.getFieldValue('area') === 'string' &&
            form.getFieldValue('area'),
        })
      );
    }
  }, [dispatch, form, userId]);

  return (
    <>
      <div style={{ padding: '50px 3%', background: 'white' }}>
        <div className="d-flex justify-content-between flex-wrap">
          <div>
            {isUserInvestorTransaction && (
              <Link to="/app/investor/investor-transaction">
                <div className="d-flex align-items-center mt-n2 mb-4">
                  <img
                    src="/assets/img/icons/back.svg"
                    alt=""
                    className="mr-3"
                  />
                  <h6 className="fs-13 fw-6 text-black mb-n1">
                    Back to investor transaction
                  </h6>
                </div>
              </Link>
            )}
            <h2 className="hb-text-primary fs-36 fw-8 mb-4">
              {isUserInvestorTransaction ? userName : 'Investor transaction'}
            </h2>
          </div>
          <Button
            type="primary mb-3"
            onClick={() => setOpenAssignShare(true)}
            disabled={!hasCreatePermission}
          >
            + Assign shares
          </Button>
        </div>

        <Row style={{ margin: -10, marginBottom: 26 }}>
          {isUserInvestorTransaction ? (
            <>
              {!isEmpty(investorTransactionsOfUserExtraData) ? (
                <>
                  <Col xs={12} md={6} lg={4} style={{ padding: 10 }}>
                    <div
                      style={{
                        padding: 30,
                        border: '1px solid #E8E8E8',
                        gap: 4,
                        borderRadius: 7,
                      }}
                      className="d-flex flex-column "
                    >
                      <h6 className="h6-lg text-black mb-0">Number of HBS</h6>
                      <h3 className="h3-lg mb-0 hb-text-primary">
                        {commaInNumber(
                          investorTransactionsOfUserExtraData.number_of_hbs
                        )}
                      </h3>
                    </div>
                  </Col>
                  <Col xs={12} md={6} lg={4} style={{ padding: 10 }}>
                    <div
                      style={{
                        padding: 30,
                        border: '1px solid #E8E8E8',
                        gap: 4,
                        borderRadius: 7,
                      }}
                      className="d-flex flex-column "
                    >
                      <h6 className="h6-lg text-black mb-0">
                        Current value HBS (USD)
                      </h6>
                      <h3 className="h3-lg mb-0 hb-text-primary">
                        {commaInNumber(
                          investorTransactionsOfUserExtraData.current_value_of_share
                        )}
                      </h3>
                    </div>
                  </Col>
                  <Col xs={12} md={6} lg={4} style={{ padding: 10 }}>
                    <div
                      style={{
                        padding: 30,
                        border: '1px solid #E8E8E8',
                        gap: 4,
                        borderRadius: 7,
                      }}
                      className="d-flex flex-column "
                    >
                      <h6 className="h6-lg text-black mb-0">
                        Gain value (USD)
                      </h6>
                      <div
                        className="d-flex justify-content-between align-items-center flex-wrap"
                        style={{ gap: 8 }}
                      >
                        <h3 className="h3-lg mb-0 hb-text-primary">
                          {commaInNumber(
                            investorTransactionsOfUserExtraData.gain_value_usd
                          )}{' '}
                          USD
                        </h3>
                        <div
                          className="br-5"
                          style={{
                            background:
                              investorTransactionsOfUserExtraData.gain_value_usd_percentage >=
                              0
                                ? '#E8F3D9'
                                : 'rgb(255 237 238)',
                            padding: '0px 6px',
                            height: 'fit-content',
                          }}
                        >
                          <span
                            className="h6-sm"
                            style={{
                              color:
                                investorTransactionsOfUserExtraData.gain_value_usd_percentage >=
                                0
                                  ? '#537626'
                                  : '#FF5A5F',
                            }}
                          >
                            {`${
                              investorTransactionsOfUserExtraData.gain_value_usd_percentage >
                              0
                                ? '+'
                                : ''
                            }${commaInNumber(
                              investorTransactionsOfUserExtraData.gain_value_usd_percentage
                            )}%`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Col>
                </>
              ) : null}
            </>
          ) : (
            <>
              {!isEmpty(investorTransactionsExtraData) ? (
                <>
                  <Col xs={12} md={6} lg={4} style={{ padding: 10 }}>
                    <div
                      style={{
                        padding: 30,
                        border: '1px solid #E8E8E8',
                        gap: 4,
                        borderRadius: 7,
                      }}
                      className="d-flex flex-column "
                    >
                      <h6 className="h6-lg text-black mb-0">Number of HBS</h6>
                      <h3 className="h3-lg mb-0 hb-text-primary">
                        {commaInNumber(
                          investorTransactionsExtraData.number_of_hbs
                        )}
                      </h3>
                    </div>
                  </Col>
                  <Col xs={12} md={6} lg={4} style={{ padding: 10 }}>
                    <div
                      style={{
                        padding: 30,
                        border: '1px solid #E8E8E8',
                        gap: 4,
                        borderRadius: 7,
                      }}
                      className="d-flex flex-column "
                    >
                      <h6 className="h6-lg text-black mb-0">
                        Percentage distributed
                      </h6>
                      <h3 className="h3-lg mb-0 hb-text-primary">
                        {commaInNumber(
                          investorTransactionsExtraData.percentage_distributed
                        )}
                        %
                      </h3>
                    </div>
                  </Col>
                  <Col xs={12} md={6} lg={4} style={{ padding: 10 }}>
                    <div
                      style={{
                        padding: 30,
                        border: '1px solid #E8E8E8',
                        gap: 4,
                        borderRadius: 7,
                      }}
                      className="d-flex flex-column "
                    >
                      <h6 className="h6-lg text-black mb-0">
                        Gain value (USD)
                      </h6>
                      <div
                        className="d-flex justify-content-between align-items-center flex-wrap"
                        style={{ gap: 8 }}
                      >
                        <h3 className="h3-lg mb-0 hb-text-primary">
                          {commaInNumber(
                            investorTransactionsExtraData.gain_value_usd
                          )}{' '}
                          USD
                        </h3>
                        <div
                          className="br-5"
                          style={{
                            background:
                              investorTransactionsExtraData.gain_value_usd_percentage >=
                              0
                                ? '#E8F3D9'
                                : 'rgb(255 237 238)',
                            padding: '0px 6px',
                            height: 'fit-content',
                          }}
                        >
                          <span
                            className="h6-sm"
                            style={{
                              color:
                                investorTransactionsExtraData.gain_value_usd_percentage >=
                                0
                                  ? '#537626'
                                  : '#FF5A5F',
                            }}
                          >
                            {`${
                              investorTransactionsExtraData.gain_value_usd_percentage >
                              0
                                ? '+'
                                : ''
                            }${commaInNumber(
                              investorTransactionsExtraData.gain_value_usd_percentage
                            )}%`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Col>
                </>
              ) : null}
            </>
          )}
        </Row>

        <Form
          layout="vertical"
          form={form}
          name="control-hooks"
          className="custom-form-style"
        >
          <Form.Item
            name="area"
            label={<h6 className="h6-lg text-black fw-5 mb-0">Filter by</h6>}
            className="mb-4 pb-3"
          >
            {isUserInvestorTransaction ? (
              <ZoneSelect
                style={{ maxWidth: 459 }}
                placeholder="area / subarea"
                onSelect={(searchKey) => {
                  handaleSearch({ searchKey });
                }}
                options={(data) =>
                  data.map?.(
                    ({ subarea_name: value, area_name, subarea_name }) => ({
                      value,
                      label: subarea_name,
                      area_name,
                      subarea_name,
                    })
                  ) || []
                }
                allowClear
                onClear={() => handaleSearch({})}
                onDeselect={() => handaleSearch({})}
              />
            ) : (
              <ZoneSelect
                style={{ maxWidth: 459 }}
                placeholder="username / area / subarea"
                onSelect={(
                  searchKey,
                  { isUser, value, ...general_profile }
                ) => {
                  if (isUser) {
                    history.push(
                      `/app/investor/investor-transaction/${value}/${
                        general_profile?.first_name || ''
                      } ${general_profile?.last_name || ''}`
                    );
                    setTimeout(() => {
                      form.setFieldValue('area');
                    }, 0);
                  } else {
                    handaleSearch({ searchKey });
                  }
                }}
                loading={loading || zoneLoading}
                options={(data) => [
                  {
                    label: 'Subarea',
                    options: [
                      ...(data.map?.(
                        ({ subarea_name: value, area_name, subarea_name }) => ({
                          value,
                          label: subarea_name,
                          area_name,
                          subarea_name,
                        })
                      ) || []),
                    ],
                  },
                  {
                    label: 'Investor',
                    options: allInvestorUsers.map(({ user }) => ({
                      ...user,
                      ...user?.general_profile,
                      value: user.id,
                      isUser: true,
                      label: `${user?.general_profile?.first_name || ''} ${
                        user?.general_profile?.last_name || ''
                      }`,
                      searchKey: `${user?.general_profile?.first_name || ''} ${
                        user?.general_profile?.last_name || ''
                      } ${user?.email || ''}`,
                    })),
                  },
                ]}
                filterOption={(input, option) =>
                  (
                    `${option?.area_name} ${option?.subarea_name} ${option?.searchKey}`?.toLocaleLowerCase() ??
                    ''
                  ).includes(input?.toLocaleLowerCase())
                }
                allowClear
                onClear={() => handaleSearch({})}
                onDeselect={() => handaleSearch({})}
              />
            )}
          </Form.Item>
        </Form>

        {isUserInvestorTransaction ? (
          <UserInvestorTransactionTable />
        ) : (
          <InvestorTransactionsTable />
        )}
      </div>

      <AssignShares
        open={openAssignShare}
        onCancel={() => setOpenAssignShare(false)}
      />
    </>
  );
};

export default InvestorTransaction;
