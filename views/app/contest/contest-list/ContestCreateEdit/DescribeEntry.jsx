/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-key */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import { Button, Checkbox, DatePicker, Form, Input, Radio, Select } from 'antd';
import { useWatch } from 'antd/lib/form/Form';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';

import UserSelect from '../../../../../components/util-components/selector/UserSelect';

import UploadImage from '../../../../../components/UploadImage';
import InputRange from '../../../../../components/util-components/InputRange';
import CountrySelect from '../../../../../components/util-components/selector/CountrySelect';
import GoalSelect from '../../../../../components/util-components/selector/GoalSelect';
import useTranslation from '../../../../../helpers/useTranslation';
import useBasicTypesByBasicTypeCategory from '../../../../../hooks/useBasicTypesByBasicTypeCategory';
import {
  createContestGeneral,
  getAllSocial,
  getContestCategies,
  updateContestGeneral,
} from '../../../../../redux/actions';

const { Option } = Select;

const DescribeEntry = ({ setCurrentTab, contestId, setcreated_by }) => {
  const industry = useBasicTypesByBasicTypeCategory({ name: 'industry' });
  const tech = useBasicTypesByBasicTypeCategory({ name: 'tech' });
  const contest = useSelector(
    ({ contest }) => contest.contestData.data,
    shallowEqual
  );
  const { socialList: socials } = useSelector((state) => state.social);
  const contestCategories = useSelector(
    ({ contest }) => contest.contestCategories.data
  );
  const [goals, setGoals] = useState([]);

  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const created_by = useWatch('created_by', form);

  const everyone_can_participate = useWatch('everyone_can_participate', form);
  const no_of_participants = useWatch('no_of_participants', form);
  const no_of_judges = useWatch('no_of_judges', form);
  const launch_globally = useWatch('launch_globally', form);

  const { status } = useSelector(({ contest }) => contest.contestGeneralAction);

  const { t } = useTranslation();

  useEffect(() => {
    created_by && setcreated_by(created_by);
  }, [created_by, setcreated_by]);

  useEffect(() => {
    status === 'submitted' && setCurrentTab(2);
  }, [setCurrentTab, status]);

  useEffect(() => {
    let contestGeneralFormData = {};
    const {
      contest_start_date,
      contest_end_date,
      social_links,
      goals,
      tech,
      industry,
      created_by,
      no_of_participants,
      contest_category,
      ...contestGeneral
    } = contest;

    contestGeneralFormData = {
      ...contestGeneral,
      industry: industry?.map?.((industry) => industry.id) || [],
      tech: tech?.map?.((tech) => tech.id) || [],
      everyone_can_participate:
        contestGeneral.everyone_can_participate === 'TRUE',
      contest_type_id: contest_category?.id,
      created_by: created_by?.id,
    };
    if (!no_of_participants) {
      contestGeneralFormData.no_of_participants = no_of_participants;
    }
    if (
      contest.contest_start_date &&
      moment(contest.contest_start_date).isValid()
    ) {
      contestGeneralFormData.contest_start_date = moment(
        contest.contest_start_date
      );
    }
    if (
      contest.contest_end_date &&
      moment(contest.contest_end_date).isValid()
    ) {
      contestGeneralFormData.contest_end_date = moment(
        contest.contest_end_date
      );
    }
    if (social_links) {
      try {
        contestGeneralFormData.social_links = JSON.parse(social_links);
      } catch (error) {
        console.log('social_links persre error', { error });
      }
    }
    setGoals(goals?.map((goal) => goal.id) || []);
    form.setFieldsValue({
      ...contestGeneralFormData,
    });
  }, [contest, form]);

  const isCreated = useMemo(() => contest.id, [contest]);

  useEffect(() => {
    dispatch(getContestCategies());
    dispatch(getAllSocial());
  }, [dispatch]);

  const onFinish = ({
    everyone_can_participate,
    contest_start_date,
    contest_end_date,
    contest_cover,
    tech,
    industry,
    social_links,
    contest_type_id,
    ...values
  }) => {
    const payload = {
      everyone_can_participate: everyone_can_participate ? 'TRUE' : 'FALSE',
      contest_start_date:
        contest_start_date && moment(contest_start_date).format(),
      contest_end_date: contest_end_date && moment(contest_end_date).format(),
      ...values,
    };
    if (contest_cover && typeof contest_cover !== 'string') {
      payload.contest_cover = contest_cover;
    }
    if (contest_type_id) {
      payload.contest_type_id = contest_type_id;
    }

    if (goals?.length) {
      payload.goals = goals.reduce(
        (prevVal, crntVal) => `${prevVal ? `${prevVal},` : ''}${crntVal}`,
        ''
      );
    }
    if (tech?.length) {
      payload.tech = tech.reduce(
        (prevVal, crntVal) => `${prevVal ? `${prevVal},` : ''}${crntVal}`,
        ''
      );
    }
    if (industry?.length) {
      payload.industry = industry.reduce(
        (prevVal, crntVal) => `${prevVal ? `${prevVal},` : ''}${crntVal}`,
        ''
      );
    }

    payload.social_links = JSON.stringify(social_links || []);

    if (isCreated) {
      dispatch(
        updateContestGeneral({ id: contestId || contest.id, ...payload })
      );
    } else {
      dispatch(createContestGeneral(payload));
    }
  };

  return (
    <Form
      layout="vertical"
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      className="custom-form-style"
    >
      <div>
        <h6 className="fs-20 fw-5 text-black mb-3 mt-4">
          {t('Describe your contest')}
        </h6>
        {/* <h6 className="fs-12 fw-3 text-grey-light mb-4">
          {t("Write basic about your project here")}
        </h6> */}
        <Form.Item
          name="title"
          label={<h6 className="input-label">Title</h6>}
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Input placeholder="e.g. Hubbers contest 1" />
        </Form.Item>

        {!isCreated && (
          <Form.Item
            name="created_by"
            label={<h6 className="input-label">Created By</h6>}
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <UserSelect />
          </Form.Item>
        )}

        <Form.Item
          name="contest_type_id"
          label={<h6 className="input-label">Contest Type</h6>}
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Select
            showSearch
            optionFilterProp="label"
            options={
              contestCategories.map?.(({ id: value, title: label }) => ({
                value,
                label,
              })) || []
            }
          />
        </Form.Item>

        <Form.Item
          name="contest_state"
          label={<h6 className="input-label">Contest State</h6>}
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Select>
            {[
              'COMPLETED',
              'DRAFTED',
              'ONGOING',
              // 'ACTIVE',
              'PENDING',
            ].map((contestState) => (
              <Option key={contestState} value={contestState}>
                {contestState}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="industry"
          label={<h6 className="input-label">Industry</h6>}
        >
          <Select mode="multiple">
            {industry.basicTypes.map((baicType) => (
              <Option key={baicType.id} value={baicType.id}>
                {t(baicType.name)}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label={
            <h6 className="input-label">
              Sustainable development goals (max 3.)
            </h6>
          }
        >
          <div className="p-2">
            <GoalSelect
              max={3}
              value={goals}
              onChange={(goals) => setGoals(goals)}
            />
          </div>
        </Form.Item>

        <Form.Item name="tech" label={<h6 className="input-label">Tech</h6>}>
          <Select mode="multiple">
            {tech.basicTypes.map((baicType) => (
              <Option key={baicType.id} value={baicType.id}>
                {baicType.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="launch_globally"
          label={
            <h6 className="input-label">Do you want to launch globally</h6>
          }
          rules={[{ required: true, message: 'This field is required' }]}
          initialValue="YES"
        >
          <Radio.Group>
            <Radio value="YES">Yes</Radio>
            <Radio value="NO">No</Radio>
          </Radio.Group>
        </Form.Item>

        {launch_globally === 'NO' && (
          <Form.Item
            name="country_contest"
            label={
              <h6 className="input-label">
                If no, please chose your area or country of contest
              </h6>
            }
          >
            <CountrySelect placeholder="e.g. Hubbers contest 1" />
          </Form.Item>
        )}

        <Form.Item
          label={
            <h6 className="input-label">
              How many designers can participate in the contest?
            </h6>
          }
        >
          <Row>
            <Col xs={12} md={8}>
              <Form.Item name="no_of_participants" noStyle initialValue={10}>
                <div className="d-flex align-items-center">
                  <InputRange
                    min={1}
                    max={20}
                    className="flex-grow-1"
                    defaultValue={11}
                    {...(everyone_can_participate ? { disabled: true } : {})}
                    // readOnly={everyone_can_participate}
                  />
                  <div
                    style={{ background: '#F1F1F1', height: 41, width: 44 }}
                    className="ml-3 fs-14 fw-5 text-black d-flex align-items-center justify-content-center"
                  >
                    {no_of_participants}
                  </div>
                </div>
              </Form.Item>
            </Col>
            <Col xs={12} md={4}>
              <Form.Item name="everyone_can_participate" noStyle>
                <Checkbox
                  checked={everyone_can_participate}
                  onClick={() =>
                    form.setFieldValue(
                      'everyone_can_participate',
                      !everyone_can_participate
                    )
                  }
                >
                  <h6 className="fs-13 fw-3 text-black text-nowrap mt-3 mt-lg-0 mr-0 mr-lg-4">
                    Everyone can participate
                  </h6>
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          label={
            <h6 className="input-label">Experience and talents of designers</h6>
          }
        >
          <div className="d-flex flex-wrap align-items-center">
            <h6 className="fs-13 fw-3 text-black mt-3 mt-lg-0 mr-0 mr-lg-4">
              How many Hubbers points would you like to attribute?
            </h6>
            <Form.Item
              noStyle
              name="hubbers_point_attribute"
              label={
                <h6 className="input-label">
                  Experience and talents of designers
                </h6>
              }
            >
              <Input type="number" style={{ maxWidth: 100 }} />
            </Form.Item>
          </div>
        </Form.Item>

        <Row>
          <Col xs={12} md={8}>
            <Form.Item
              name="no_of_judges"
              label={
                <h6 className="input-label">
                  How many judges will participate?
                </h6>
              }
              initialValue={5}
            >
              <div className="d-flex align-items-center">
                <InputRange
                  min={1}
                  max={10}
                  className="flex-grow-1"
                  defaultValue={6}
                />
                <div
                  style={{ background: '#F1F1F1', height: 41, width: 44 }}
                  className="ml-3 fs-14 fw-5 text-black d-flex align-items-center justify-content-center"
                >
                  {no_of_judges}
                </div>
              </div>
            </Form.Item>
          </Col>
        </Row>

        <h6 className="input-label mb-4">
          If you don’t have enough judges, you can choose experienced ones from
          our community.
        </h6>

        <Row>
          <Col xs={12} lg={8}>
            <div className="d-flex justify-content-between align-items-cente">
              <p className="fs-13 fw-3 text-black mb-4">
                Number of extra judges needed
              </p>
              <Form.Item name="no_of_extra_judges">
                <Input type="number" style={{ maxWidth: 100 }} />
              </Form.Item>
            </div>
          </Col>
        </Row>

        <Form.Item
          label={
            <h6 className="input-label mb-2">
              How many revisions do you want to allow designers to provide (up
              to 3).
            </h6>
          }
        >
          <Row>
            <Col xs={12} md={6}>
              <Form.Item noStyle name="no_of_revisions" rules={[{ max: 3 }]}>
                <Input type="number" className="w-00" max={3} />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          label={
            <h6 className="input-label">Upload an image for the contest</h6>
          }
        >
          <div className="p-2 border rounded-2">
            <Form.Item name="contest_cover" noStyle>
              <UploadImage aspect={1.5} center>
                <img
                  src="/assets/img/icons/add-image.svg"
                  className="my-auto mx-1 mb-sm-2"
                  alt="icon"
                />
                <h6 className="fs-16 fw-6 mb-1">
                  <u>Add image</u>
                </h6>
              </UploadImage>
            </Form.Item>
          </div>
        </Form.Item>

        <Row>
          <Col xs={12} md={6} lg={4}>
            <Form.Item
              rules={[{ required: true, message: 'This field is required' }]}
              name="contest_start_date"
              label={<h6 className="input-label">Start date</h6>}
            >
              <DatePicker className="w-100" format="DD-MM-YYYY" />
            </Form.Item>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <Form.Item
              rules={[{ required: true, message: 'This field is required' }]}
              name="contest_end_date"
              label={<h6 className="input-label">End date</h6>}
            >
              <DatePicker className="w-100" format="DD-MM-YYYY" />
            </Form.Item>
          </Col>
        </Row>

        <h6 className="input-label my-3">Social links</h6>

        <Form.List initialValue={[{}]} name="social_links">
          {(fields, { add, remove }) => (
            <div>
              {fields.map(({ key, name, ...restField }, indx) => (
                <div
                  key={key}
                  className="d-flex justify-content-between align-items-center"
                  style={{ gap: 12 }}
                >
                  <div className="d-flex justify-content-between flex-column flex-grow-1">
                    <Row className="mx-n1">
                      <Col xs={4} className="px-1">
                        <Form.Item {...restField} name={[name, 'social_media']}>
                          <Select
                            placeholder={t('Twitter')}
                            options={socials?.map?.(
                              ({ id: value, name: label }) => ({
                                value,
                                label,
                              })
                            )}
                            optionFilterProp="label"
                            showSearch
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={8} className="ps-2 pe-1">
                        <Form.Item {...restField} name={[name, 'link']}>
                          <Input
                            placeholder={t('www.twitter.com/user123')}
                            style={{
                              height: 33,
                            }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                  {fields.length > 1 && (
                    <img
                      className="cursor-pointer"
                      src="/assets/img/icons/delete-outline.svg"
                      alt=""
                      style={{ height: 24, marginBottom: 32 }}
                      onClick={() => remove(indx)}
                    />
                  )}
                </div>
              ))}
              <div className="mt-n4">
                <Button
                  type="text h6-sm ms-n3 hb-text-primary"
                  onClick={() => add({})}
                >
                  {t('Add links')}
                </Button>
              </div>
            </div>
          )}
        </Form.List>

        <div className="d-flex justify-content-end my-4">
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
  );
};

export default DescribeEntry;
