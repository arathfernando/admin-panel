/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Form, Input, Radio } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import useTranslation from '../../../../../helpers/useTranslation';
import { getAllExpertiseCategory } from '../../../../../redux/actions';

const Creator = ({ form, experties, setexperties, show }) => {
  const { user: { creator_profile = {} } = {} } = useSelector(
    ({ users }) => users.singleUser || {},
    shallowEqual
  );
  const { list: expertiseCategories = [] } = useSelector(
    (state) => state.expertiseCategory,
    shallowEqual
  );

  const launching_new_product = Form.useWatch('launching_new_product', form);

  const { t } = useTranslation();
  const dispatch = useDispatch();

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
    if (!isEmpty(creator_profile)) {
      form.setFieldsValue(creator_profile);
    } else {
      form.resetFields();
    }
  }, [creator_profile]);

  useEffect(() => {
    if (!isEmpty(creator_profile)) {
      resetExperties(creator_profile?.expertise || []);
    }
  }, [creator_profile, expertiseCategories]);

  useEffect(() => {
    dispatch(getAllExpertiseCategory());
  }, []);

  return (
    <div
      className="tab-container"
      aria-label="Creator"
      style={{ display: !show && 'none', marginBottom: 58 }}
    >
      <h3 style={{ fontWeight: 600, fontSize: '24px', marginBottom: '13px' }}>
        {t('Profile')}: {t('Creator')}
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
          name="launching_new_product"
          label={t(
            'Are you thinking of launching or are you in the process of launching a new product?'
          )}
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Radio.Group>
            <Radio value="YES">{t('Yes')}</Radio>
            <Radio value="NO">{t('No')}</Radio>
          </Radio.Group>
        </Form.Item>

        {/* launching a new product yes */}
        {launching_new_product === 'YES' && (
          <>
            <Form.Item
              name="when_launching_product"
              label={t('When are you estimating to launch your product?')}
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <Radio.Group>
                <Radio className="mb-2" value="NOW">
                  {t('Less than month')}
                </Radio>
                <Radio className="mb-2" value="IN_ONE_THREE_MONTHS">
                  {t('1-3 months')}
                </Radio>
                <Radio className="mb-2" value="AFTER_SIX_MONTHS">
                  {t('After 6 months')}
                </Radio>
                <Radio value="NO_ESTIMATIVE ">{t('No estimative')}</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="have_team"
              label={t('Do you have a co-founder/ team working with you?')}
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <Radio.Group>
                <Radio value="YES">{t('Yes')}</Radio>
                <Radio value="NO">{t('No')}</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label={t(
                'Select the expertises below that suits better the team you are looking for to help you to accelerate your launch'
              )}
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
                              state.id === data.id
                                ? !data.active
                                : state.active,
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
          </>
        )}

        {/* experties other */}
        {launching_new_product === 'YES' &&
          experties?.find((data) => data.name === 'Other')?.active && (
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
              <Form.Item
                name="project_description"
                label={t('Briefly describe about your project')}
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <TextArea />
              </Form.Item>
            </>
          )}

        <Form.Item
          name="built_product"
          label={t('2. Have you ever built a product?')}
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Radio.Group>
            <Radio value="YES">{t('Yes')}</Radio>
            <Radio value="NO">{t('No')}</Radio>
            <Radio className="mt-2" value="I AM AN ASPIRING CREATOR">
              {t('I am an aspiring creator')}
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="portfolio_link"
          label={t('Share your creative portfolio')}
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Input placeholder={t('Type your portfolio link')} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Creator;
