/* eslint-disable no-unused-vars */
import { Col, Form, Input, Row } from 'antd';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import ImageCrop from '../../../../../components/UploadImage';
import useTranslation from '../../../../../helpers/useTranslation';

const { TextArea } = Input;

const HubbersTeam = ({ form, show }) => {
  const { user: { hubbers_team_profile = {} } = {} } = useSelector(
    ({ users }) => users.singleUser || {},
    shallowEqual
  );
  const [hubbersTeamData, setHubbersTeamData] = useState({});

  const { location } = useSelector(
    ({ users }) => users.singleUser || {},
    shallowEqual
  );

  const { t } = useTranslation();

  // set fields value
  useEffect(() => {
    if (!isEmpty(hubbers_team_profile)) {
      form.setFieldsValue(hubbers_team_profile);
      setHubbersTeamData(hubbers_team_profile);
    } else {
      form.resetFields();
      setHubbersTeamData({});
    }
  }, [hubbers_team_profile]);

  return (
    <div
      className="tab-container"
      aria-label="HubbersTeam"
      style={{ display: !show && 'none', marginBottom: 58 }}
    >
      <h3 style={{ fontWeight: 600, fontSize: '24px', marginBottom: 48 }}>
        {t('Profile')}: {t('Hubbers Team')}
      </h3>

      <Form
        form={form}
        layout="vertical"
        hideRequiredMark
        onValuesChange={(_, { avatar, title, description, ...values }) => {
          setHubbersTeamData((state) => ({
            avatar: state.avatar,
            title: t(title),
            description: t(description),
            values,
          }));
        }}
      >
        <Row>
          <Col sm={16} xs={24}>
            <Row
              className="d-flex align-items-center pr-md-5"
              style={{ flexWrap: 'nowrap' }}
            >
              <Form.Item
                name="avatar"
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <ImageCrop
                  onUrlChange={(avatar) =>
                    setHubbersTeamData((state) => ({ ...state, avatar }))
                  }
                />
              </Form.Item>
              <p
                className="pl-md-5"
                style={{ fontSize: '1.25rem', marginBottom: '1rem' }}
              >
                {t('Add image you want to show to your community.')}
              </p>
            </Row>
            <Row className="mt-5 pr-md-5">
              <Col xs={24} md={12} className="pr-md-2">
                <Form.Item
                  name="first_name"
                  label={t('First Name')}
                  rules={[
                    { required: true, message: 'This field is required' },
                  ]}
                >
                  <Input
                    type="text"
                    className="peofile-input p-2 mt-1"
                    style={{
                      borderBottom: '1px solid #8bc53f',
                      marginBottom: '24px',
                    }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} className="pl-md-2">
                <Form.Item
                  name="last_name"
                  label={t('Last Name')}
                  rules={[
                    { required: true, message: 'This field is required' },
                  ]}
                >
                  <Input
                    type="text"
                    className="peofile-input p-2 mt-1"
                    style={{
                      borderBottom: '1px solid #8bc53f',
                      marginBottom: '24px',
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row className="mt-4 pr-md-5">
              <Col xs={24}>
                <Form.Item
                  name="title"
                  label={t('Title')}
                  rules={[
                    { required: true, message: 'This field is required' },
                  ]}
                >
                  <Input
                    type="text"
                    className="peofile-input p-2 mt-1"
                    style={{
                      borderBottom: '1px solid #8bc53f',
                      marginBottom: '24px',
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row className="mt-4 pr-md-5">
              <Col xs={24}>
                <Form.Item name="description" label={t('Description')}>
                  <TextArea
                    rows={3}
                    autoSize
                    className="peofile-input mt-3 p-2"
                    style={{
                      borderBottom: '1px solid #8bc53f',
                      marginBottom: '24px',
                      minHeight: 100,
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col
            sm={8}
            xs={24}
            className="d-flex justify-content-center align-items-center"
          >
            <div
              className="p-4 text-center w-100"
              style={{
                borderRadius: '12px',
                border: '1px solid  #8bc53f',
                overflow: 'hidden',
                wordBreak: 'break-word',
              }}
            >
              <div
                style={{
                  border: '1px solid  #8bc53f',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  aspectRatio: '1/1',
                  miWwidth: 'fit-content',
                }}
              >
                {hubbersTeamData.avatar && (
                  <img
                    style={{ width: '100%', height: 'auto' }}
                    src={hubbersTeamData.avatar}
                    alt=""
                  />
                )}
              </div>

              <h1 className="mt-4">{`${
                hubbersTeamData?.first_name ? hubbersTeamData?.first_name : ''
              } ${
                hubbersTeamData?.last_name ? hubbersTeamData?.last_name : ''
              }`}</h1>
              <p className="fw-6 mb-1">{t(location)}</p>
              <p className="fw-5 mb-1">{t(hubbersTeamData.title)}</p>
              <p className="text-left">{t(hubbersTeamData.description)}</p>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default HubbersTeam;
