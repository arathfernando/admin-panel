import { Form, Radio } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import LanguageSelect from '../../../../../components/util-components/selector/LanguageSelect';
import SearchLocation from '../../../../../helpers/SearchLocation';
import useTranslation from '../../../../../helpers/useTranslation';

const Teacher = ({ form, show }) => {
  const { user: { teacher_profile = {} } = {} } = useSelector(
    ({ users }) => users.singleUser || {},
    shallowEqual
  );

  const have_geo_preference = Form.useWatch('have_geo_preference', form);

  const { t } = useTranslation();

  // set fields value
  useEffect(() => {
    if (!isEmpty(teacher_profile)) {
      form.setFieldsValue({
        ...teacher_profile,
        language:
          teacher_profile?.language?.map?.(
            (languageId) => languageId && Number(languageId)
          ) || [],
      });
    } else {
      form.resetFields();
    }
  }, [teacher_profile]);

  return (
    <div
      className="tab-container"
      aria-label="Teacher"
      style={{ display: !show && 'none', marginBottom: 58 }}
    >
      <h3 style={{ fontWeight: 600, fontSize: '24px', marginBottom: '13px' }}>
        {t('Profile')}: {t('Teacher')}
      </h3>
      <p className="fs-18 mb-3 mt-1">
        {t('Let us know about your teacher experience')}
      </p>

      <Form form={form} layout="vertical" name="control-hooks">
        <Form.Item
          name="experience_teacher"
          label={t('1. How much experience you have as a teacher')}
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
          name="have_geo_preference"
          label={t('2. Would you have any geographical preference?')}
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
              style={{ marginBottom: 12 }}
            >
              <SearchLocation
                style={{
                  border: '1px solid #404041',
                  boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
                  borderRadius: 4,
                  maxWidth: 380,
                  width: '100%',
                }}
                initialValue={form.getFieldValue('geo_preference')}
                onLocationSelect={(place) =>
                  form.setFieldValue('geo_preference', place.name)
                }
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
                style={{
                  border: '1px solid #404041',
                  boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
                  borderRadius: 4,
                  maxWidth: 380,
                  width: '100%',
                }}
                options={{ types: ['(cities)'] }}
                initialValue={form.getFieldValue('city')}
                onLocationSelect={(place) =>
                  form.setFieldValue('city', place.name)
                }
              />
            </Form.Item>
          </>
        )}

        <Form.Item
          name="language"
          label={t('3. What languages do you speak?')}
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <LanguageSelect
            mode="multiple"
            placeholder={t('Choose your languages')}
          />
        </Form.Item>

        <Form.Item
          name="description"
          label={t('4. Write a description about yourself as a teacher')}
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <TextArea
            rows={5}
            placeholder={t('e.g. How to improve your social media profiles')}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Teacher;
