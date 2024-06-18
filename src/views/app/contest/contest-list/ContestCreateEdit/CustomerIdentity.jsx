/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-unknown-property */
/* eslint-disable camelcase */
import { Avatar, Button, Form, Input, Radio, Select, Space } from 'antd';
import { useWatch } from 'antd/lib/form/Form';
import { isEmpty } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import UploadImage from '../../../../../components/UploadImage';
import useTranslation from '../../../../../helpers/useTranslation';
import {
  createContestIdentity,
  getAllPartner,
  updateContestIdentity,
} from '../../../../../redux/actions';
import InviteCoOganiser from './InviteCoOganiser';

const CustomerIdentity = ({ setCurrentTab, contestId, created_by }) => {
  const contest = useSelector(
    ({ contest }) => contest.contestData.data,
    shallowEqual
  );

  const { partnerList: partners, loading } = useSelector(
    (state) => state.partner
  );
  const { status } = useSelector(
    ({ contest }) => contest.contestIdentityAction
  );

  const [openInviteCoOganiser, setOpenInviteCoOganiser] = useState(false);

  const [oganigersData, setOrganigersData] = useState([]);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const contest_for_company = useWatch('contest_for_company', form);
  const have_partner = useWatch('have_partner', form);

  useEffect(() => {
    status === 'submitted' && setCurrentTab(3);
  }, [setCurrentTab, status]);

  useEffect(() => {
    dispatch(getAllPartner());
  }, [dispatch]);

  useEffect(() => {
    if (contestId) {
      form.setFieldsValue({
        ...contest.contest_customer_info,
        partners: contest.contest_customer_info?.partners?.map((partner) =>
          Number(partner?.[0]?.id || partner?.id)
        ),
        have_partner: isEmpty(contest.contest_customer_info?.partners)
          ? 'NO'
          : 'YES',
        company_website:
          contest.contest_customer_info?.company_website?.replace(
            'http://',
            ''
          ),
      });

      setTimeout(() => {
        setOrganigersData(
          contest?.co_organize_by?.map?.(({ created_by }) => created_by) || []
        );
      }, 0);
    } else {
      form.resetFields();
    }
  }, [contest, form]);

  const isCreated = useMemo(() => contest.contest_customer_info?.id, [contest]);

  const onFinish = ({
    everyone_can_participate,
    company_website,
    company_logo,
    http,
    partners,
    have_partner,
    ...values
  }) => {
    const payload = {
      contest_coorganizer: oganigersData
        ?.map((user) => user?.email)
        .toLocaleString(),
      company_website: company_website && `${http}${company_website}`,
      ...values,
    };
    if (company_logo && typeof company_logo !== 'string') {
      payload.company_logo = company_logo;
    }
    if (partners) {
      payload.partners = partners?.toString?.() || '';
    }
    if (!isCreated) {
      payload.contest_id = contestId || contest.id;
    }
    if (isCreated) {
      dispatch(
        updateContestIdentity({
          id: contestId || contest.id,
          ...payload,
        })
      );
    } else {
      dispatch(
        createContestIdentity({
          ...payload,
          created_by: created_by || contest?.created_by?.id,
        })
      );
    }
  };

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        className="custom-form-style"
      >
        <div>
          <h6 className="fs-20 fw-5 text-black mb-3 mt-4">Customer identity</h6>
          {/* <h6 className="fs-12 fw-3 text-grey-light mb-4">
            Write basic information about your project here
          </h6> */}

          <Form.Item
            name="contest_for_company"
            label={
              <h6 className="input-label">
                Do you organize this contest for your company?
              </h6>
            }
            rules={[{ required: true }]}
            initialValue="YES"
            valuePropName="checked"
          >
            <Radio.Group
              className="d-flex align-items-center flex-wrap"
              onClick={() =>
                form.setFieldValue('contest_for_company', !contest_for_company)
              }
            >
              <Radio value="YES">
                <p className="my-auto">Yes</p>
              </Radio>
              <Radio value="NO">No</Radio>
              <h6 className="fs-13 fw-3 text-black mt-3 ml-0 ml-lg-4 text-nowrap">
                If yes, please add your company details
              </h6>
            </Radio.Group>
          </Form.Item>

          {contest_for_company === 'YES' && (
            <>
              <Form.Item
                name="company_name"
                label={<h6 className="input-label">Company name</h6>}
                rules={[{ required: contest_for_company === 'YES' }]}
              >
                <Input placeholder="e.g. Hubbers contest 1" />
              </Form.Item>

              <h6 className="input-label mb-3">Company address</h6>

              <Form.Item name="company_address" label="Address">
                <Input placeholder="Input" />
              </Form.Item>

              <Row>
                <Col xs={12} md={6}>
                  <Form.Item
                    name="country"
                    label="Country/region"
                    rules={[{ required: contest_for_company === 'YES' }]}
                  >
                    {/* <Select placeholder={t("Input")} /> */}
                    <Input placeholder="Input" />
                  </Form.Item>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Item
                    name="state"
                    label="State/territory"
                    rules={[{ required: contest_for_company === 'YES' }]}
                  >
                    {/* <Select placeholder={t("Input")} /> */}
                    <Input placeholder="Input" />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col xs={12} md={6}>
                  <Form.Item
                    name="postcode"
                    label="Postcode"
                    rules={[{ required: contest_for_company === 'YES' }]}
                  >
                    <Input placeholder="Input" />
                  </Form.Item>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Item
                    name="city"
                    label="City"
                    rules={[{ required: contest_for_company === 'YES' }]}
                  >
                    <Input placeholder="Input" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="company_website"
                label={
                  <h6
                    className="input-label"
                    rules={[{ required: contest_for_company === 'YES' }]}
                  >
                    Company website
                  </h6>
                }
              >
                <Input
                  addonBefore={
                    <Form.Item noStyle name="http" initialValue="https://">
                      <Select
                        defaultValue=""
                        options={[
                          { value: 'https://', label: 'https://' },
                          { value: 'http://', label: 'http://' },
                        ]}
                      />
                    </Form.Item>
                  }
                />
              </Form.Item>

              <Form.Item
                label={<h6 className="input-label">Logo of the company</h6>}
                required
              >
                <div className="p-2 border rounded-2 d-flex align-items-center justify-content-center">
                  <Form.Item
                    name="company_logo"
                    style={{ marginBottom: 0 }}
                    rules={[{ required: contest_for_company === 'YES' }]}
                  >
                    <UploadImage aspect={1} />
                  </Form.Item>
                </div>
              </Form.Item>

              <Form.Item
                name="right_to_organize_contest"
                label={
                  <h6 className="input-label">
                    Do you have the right to organize contest on behalf of your
                    company?
                  </h6>
                }
                rules={[{ required: true }]}
                initialValue="YES"
                valuePropName="checked"
              >
                <Radio.Group>
                  <Radio value="YES">Yes</Radio>
                  <Radio value="NO">No</Radio>
                </Radio.Group>
              </Form.Item>
            </>
          )}

          <h6 className="fs-14 fw-5 text-black mb-4">
            Do you want to add some co-organizer to help you follow up this
            product competition?
          </h6>

          {oganigersData?.map?.((user) => (
            <div className="mb-3" key={user.id}>
              <Space>
                <Avatar size="small" src={user.general_profile?.avatar} />
                <span>
                  {` ${user.general_profile?.first_name}`}{' '}
                  {user.general_profile?.last_name}
                </span>
              </Space>
            </div>
          ))}

          <h6
            className="fs-14 fw-5 hb-text-primary mb-4 pb-3"
            role="button"
            onClick={() => setOpenInviteCoOganiser(true)}
          >
            {isEmpty(oganigersData)
              ? `+ ${t('Add co-organizer')}`
              : `+ ${t('Add more co-organizer')}`}
          </h6>

          <Form.Item
            name="have_partner"
            label={
              <h6 className="input-label">
                {t('Do you want to add a sponsor to the contest?')}
              </h6>
            }
            style={{ marginBottom: 40 }}
            initialValue="NO"
            valuePropName="checked"
          >
            <Radio.Group>
              <Radio value="YES">{t('Yes')}</Radio>
              <Radio value="NO">{t('No')}</Radio>
            </Radio.Group>
          </Form.Item>

          {have_partner === 'YES' && (
            <Form.Item
              name="partners"
              label={
                <h6 className="input-label">
                  {t('Search for Hubbers sponsors')}
                </h6>
              }
            >
              <Select
                loading={loading}
                options={partners?.map?.(
                  ({ id: value, partner_name: label }) => ({ value, label })
                )}
                placeholder="DT China"
                mode="multiple"
                optionFilterProp="label"
              />
            </Form.Item>
          )}

          <div className="d-flex justify-content-end mt-4">
            {/* <Button type="ghost mr-3 px-4" size="large">
              Save draft
            </Button> */}
            <Button
              type="primary px-3"
              size="large"
              htmlType="submit"
              loading={status === 'submitting'}
            >
              Next
            </Button>
          </div>
        </div>
      </Form>

      {openInviteCoOganiser && (
        <InviteCoOganiser
          open
          oganigersData={oganigersData}
          setOrganigersData={setOrganigersData}
          onCancel={() => setOpenInviteCoOganiser(false)}
        />
      )}
    </>
  );
};

export default CustomerIdentity;
