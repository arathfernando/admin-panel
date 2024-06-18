/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Form, Input, Radio, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import useTranslation from '../../../../../helpers/useTranslation';
import {
  getAllCurrency,
  getAllExpertiseCategory,
  getSkills,
} from '../../../../../redux/actions';

const Expert = ({ form, experties, setexperties, show }) => {
  const { user: { expert_profile = {} } = {} } = useSelector(
    ({ users }) => users.singleUser || {},
    shallowEqual
  );
  const { list: expertiseCategories = [] } = useSelector(
    (state) => state.expertiseCategory,
    shallowEqual
  );
  const { data: skills, loading: loadingSkills } = useSelector(
    ({ skill }) => skill.skills
  );
  const { list: currency = [], loading: currencyLoading } = useSelector(
    (state) => state.currency,
    shallowEqual
  );

  const dispatch = useDispatch();

  const timeAvailability = Form.useWatch('time_availability', form);

  const { t } = useTranslation();

  useEffect(() => {
    setexperties([
      ...expertiseCategories,
      { id: 0, icon: '/assets/img/profile/other.svg', name: 'Other' },
    ]);
  }, [expertiseCategories]);

  const resetExperties = (exps) => {
    setexperties((state) =>
      state.map((exp) => ({
        ...exp,
        // eslint-disable-next-line eqeqeq
        active: !!exps.find((vl) => vl == exp.id),
      }))
    );
  };

  useEffect(() => {
    if (!isEmpty(expert_profile)) {
      form.setFieldsValue(expert_profile);
    } else {
      form.resetFields();
    }
  }, [expert_profile]);

  useEffect(() => {
    if (!isEmpty(expert_profile)) {
      resetExperties(expert_profile?.expertise || []);
    }
  }, [expert_profile, expertiseCategories]);

  // get basic data
  useEffect(() => {
    dispatch(getAllExpertiseCategory());
    dispatch(getSkills());
    dispatch(getAllCurrency());
  }, []);

  return (
    <div
      className="tab-container"
      aria-label="Expert"
      style={{ display: !show && 'none', marginBottom: 58 }}
    >
      <h3 style={{ fontWeight: 600, fontSize: '24px', marginBottom: '13px' }}>
        {t('Profile')}: {t('Expert')}
      </h3>

      <Form form={form} layout="vertical" name="control-hooks">
        <Form.Item
          name="profile_tagline"
          label={
            <span className="h4-sm text-black">{t('Profile tagline')}</span>
          }
          style={{ marginBottom: 25 }}
        >
          <Input
            style={{
              border: '1px solid #D1D5DB',
              boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
              borderRadius: 6,
              maxWidth: 778,
            }}
            placeholder={t('e.g. How to improve your social media profiles')}
          />
        </Form.Item>
        <Form.Item
          name="description"
          label={<span className="h4-sm text-black">{t('Description')}</span>}
          style={{ marginBottom: 25 }}
        >
          <TextArea
            style={{
              border: '1px solid #D1D5DB',
              boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
              borderRadius: 6,
              maxWidth: 778,
              resize: 'none',
            }}
            rows={5}
          />
        </Form.Item>
        <Form.Item
          label={t('1. Choose categories where you can bring your expertise')}
          className="form-requred"
        >
          <Row className="mt-3 mb-4">
            {experties.map((data) => (
              <Col xs={6} sm={4} lg={3} className="p-2" key={data.id}>
                <div
                  className="d-flex flex-column align-items-center justify-content-between py-3 w-100"
                  style={{
                    cursor: 'pointer',
                    height: '145px',
                    background: '#ffffff',
                    border: '1px solid #dbdbdb',
                    borderRadius: '4px',
                    outline: data.active && '3px solid #8bc53f',
                  }}
                  onClick={() =>
                    setexperties((crntState) =>
                      crntState.map((state) => ({
                        ...state,
                        active:
                          state.id === data.id ? !data.active : state.active,
                      }))
                    )
                  }
                >
                  <img src={data.icon} height={74} width={74} alt="icon" />
                  <span className="fw-14 text-center">{t(data.name)}</span>
                </div>
              </Col>
            ))}
          </Row>
        </Form.Item>

        {/* experties other */}
        {experties.find((data) => data.name === 'Other')?.active && (
          <>
            <Form.Item
              name="extra_expertise"
              label={t('Please type the expertises that wasn’t listed above')}
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <Input
              // placeholder="Type your portfolio link"
              />
            </Form.Item>
          </>
        )}

        <Form.Item
          name="skills"
          label={t('2. Choose skills that match your expertise')}
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Select
            mode="multiple"
            loading={loadingSkills}
            allowClear
            showSearch
            optionFilterProp="label"
            options={skills?.map?.(({ id: value, skill }) => ({
              value,
              label: t(skill),
            }))}
          />
        </Form.Item>

        <Form.Item
          label={t('3. Choose the estimate you charge per hour')}
          className="form-requred"
        >
          <div className="d-flex">
            <Form.Item
              name="rate_currency"
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <Select
                style={{ minWidth: 100 }}
                showSearch
                placeholder="Currency"
                optionFilterProp="label"
                loading={currencyLoading}
                options={currency.map(({ id: value, name, symbol }) => ({
                  value,
                  label: `${t(name) || ''} ${symbol}`,
                }))}
              />
            </Form.Item>

            <Form.Item
              name="charge_per_hour"
              rules={[
                { required: true, message: 'This field is required' },
                {
                  type: 'number',
                  message: 'This is not a valid number',
                },
              ]}
              style={{ maxWidth: '81px' }}
              className="ml-3"
            >
              <Input type="number" />
            </Form.Item>

            <p className="mt-2 ml-2 text-nowrap"> /{t('per hour')}</p>
          </div>
        </Form.Item>

        <Form.Item
          name="time_availability"
          label={t('4. Choose your time availability')}
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Radio.Group>
            <Radio className="mb-2" value="FULL_TIME">
              {t('Full-time (40h/week)')}
            </Radio>
            <Radio className="mb-2" value="PART_TIME">
              {t('Part-time (20h/week)')}
            </Radio>
            <Radio value="SPECIFIC_HOURS_A_WEEK">
              {t('Specific hours per week')}
            </Radio>
          </Radio.Group>
        </Form.Item>

        {timeAvailability === 'SPECIFIC_HOURS_A_WEEK' && (
          <Form.Item
            label={t('Specify the hours you will be available per week')}
            className="form-requred"
          >
            <Row>
              <Col xs={24} sm={20} md={18} lg={16} xl={14} className="d-flex">
                <Form.Item
                  name="hour_per_week"
                  rules={[
                    { required: true, message: 'This field is required' },
                    {
                      type: 'number',
                      message: 'This is not a valid number',
                    },
                  ]}
                  style={{ maxWidth: '70px' }}
                >
                  <Input type="number" />
                </Form.Item>
                <p className="mt-1 ml-2"> {t('hours/per week')}</p>
              </Col>
            </Row>
          </Form.Item>
        )}

        <Form.Item
          name="want_to_earn_hbb"
          label={t('5. Will you consider putting your expertise to earn HBB')}
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Radio.Group>
            <Radio value="YES">{t('Yes')}</Radio>
            <Radio value="NO">{t('No')}</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="portfolio_link"
          style={{ marginBottom: 42 }}
          label={t('6. Portfolio')}
        >
          <Input placeholder={t('Type your portfolio link if you have one')} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Expert;
