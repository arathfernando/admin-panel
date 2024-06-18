import { Col, Form, Input, Radio, Row, Select } from 'antd';
import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import SearchLocation from '../../../../../helpers/SearchLocation';
import useTranslation from '../../../../../helpers/useTranslation';
import { getAllCurrency } from '../../../../../redux/actions';

const Investor = ({ form, show }) => {
  const { user: { investor_profile = {} } = {} } = useSelector(
    ({ users }) => users.singleUser || {},
    shallowEqual
  );
  const { list: currency = [], loading: currencyLoading } = useSelector(
    (state) => state.currency,
    shallowEqual
  );

  const dispatch = useDispatch();

  const agree_to_invest = Form.useWatch('agree_to_invest', form);
  const have_geo_preference = Form.useWatch('have_geo_preference', form);

  const { t } = useTranslation();

  // set fields value
  useEffect(() => {
    if (!isEmpty(investor_profile)) {
      form.setFieldsValue(investor_profile);
    } else {
      form.resetFields();
    }
  }, [investor_profile]);

  // get basic data
  useEffect(() => {
    dispatch(getAllCurrency());
  }, []);

  return (
    <div
      className="tab-container"
      aria-label="Investor"
      style={{ display: !show && 'none', marginBottom: 58 }}
    >
      <h3 style={{ fontWeight: 600, fontSize: '24px', marginBottom: '13px' }}>
        {t('Profile')}: {t('Investor')}
      </h3>
      <p className="fs-18 mb-3 mt-1">
        {t('Let us know how is your expectatives as investor')}
      </p>

      <Form form={form} layout="vertical" name="control-hooks">
        <Form.Item
          name="experience_investor"
          label={t('1. How much experience you have as investor')}
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Radio.Group>
            <Radio className="mb-2" value="ZERO_TWO">
              0-2 {t('years')}
            </Radio>
            <Radio className="mb-2" value="THREE_SIX">
              3-6 {t('years')}
            </Radio>
            <Radio value="PLUS_SEVEN">{t('More than 7 years')}</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="agree_to_invest"
          label={t(
            '2. Would you consider contributing financially to a project found at Hubbers that matches your interest?'
          )}
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Radio.Group>
            <Radio value="YES">{t('Yes')}</Radio>
            <Radio value="NO">{t('No')}</Radio>
          </Radio.Group>
        </Form.Item>

        {agree_to_invest === 'YES' && (
          <Form.Item
            label={t(
              'Up to which amount would you consider investing in projects that match your interest?'
            )}
          >
            <Row>
              <Col xs={24} sm={20} md={18} lg={16} xl={14} className="d-flex">
                <Form.Item
                  name="investment_currency"
                  rules={[
                    { required: true, message: 'This field is required' },
                  ]}
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
                  name="investment_amount"
                  rules={[
                    { required: true, message: 'This field is required' },
                    {
                      type: 'number',
                      message: 'This is not a valid number',
                    },
                  ]}
                  className="flex-grow-1 ml-3"
                >
                  <Input type="number" />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
        )}

        <Form.Item
          name="have_geo_preference"
          label={t('3. Would you have any geographical preference?')}
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Radio.Group>
            <Radio value="YES">{t('Yes')}</Radio>
            <Radio value="NO">{t('No')}</Radio>
          </Radio.Group>
        </Form.Item>

        {have_geo_preference === 'YES' && (
          <>
            <Form.Item
              name="geo_preference"
              label={t('What is your geographic preference?')}
              rules={[{ required: true, message: 'This field is required' }]}
              labelCol={{ md: 12 }}
              wrapperCol={{ md: 12 }}
            >
              <SearchLocation
                initialValue={form.getFieldValue('geo_preference')}
                onLocationSelect={(place) =>
                  form.setFieldValue('geo_preference', place.name)
                }
                className="w-100 mt-2 br-6"
                style={{
                  border: '1px solid #d1d5db',
                  minHeight: 36,
                  padding: '4px 11px',
                }}
              />
            </Form.Item>

            <Form.Item
              name="city"
              label={t('Choose the city')}
              rules={[{ required: true, message: 'This field is required' }]}
              labelCol={{ md: 12 }}
              wrapperCol={{ md: 12 }}
            >
              <SearchLocation
                initialValue={form.getFieldValue('city')}
                options={{ types: ['(cities)'] }}
                onLocationSelect={(place) =>
                  form.setFieldValue('city', place.name)
                }
                className="w-100 mt-2 br-6"
                style={{
                  border: '1px solid #d1d5db',
                  minHeight: 36,
                  padding: '4px 11px',
                }}
              />
            </Form.Item>
          </>
        )}
      </Form>
    </div>
  );
};

export default Investor;
