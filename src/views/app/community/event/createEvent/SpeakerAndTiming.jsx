/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import {
  Row as AntdRow,
  Button,
  DatePicker,
  Divider,
  Drawer,
  Form,
  Input,
} from 'antd';
import { isArray, isEmpty } from 'lodash';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import CKEditor5 from '../../../../../components/util-components/CkEditor';
import ImgCropS3Upload from '../../../../../components/util-components/ImgCropS3Upload';
import useTranslation from '../../../../../helpers/useTranslation';
import { submitEventSpeackersTiming } from '../../../../../redux/actions';

const EventSpeakerAndTiming = ({
  open,
  EventSteper,
  EventHeader,
  onNext,
  onBack,
  data,
  setTiming,
  setSpeakers,
}) => {
  const [form] = Form.useForm();

  const { status } = useSelector(
    ({ event }) => event.submitEventSpeackersTimingAction
  );

  const { t } = useTranslation();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEmpty(data?.event_speakers) || !isEmpty(data?.event_timing)) {
      form.setFieldsValue({
        event_speakers: data?.event_speakers || [],
        event_timing: data?.event_timing?.map((event_timing) => ({
          ...event_timing,
          start_date: moment(event_timing?.start_date),
          start_time: moment(event_timing?.start_time),
          end_time: moment(event_timing?.end_time),
        })),
      });
    } else {
      form.resetFields();
    }
  }, [data.event_speakers, data.event_timing, form]);

  const onFinish = ({ event_timing, event_speakers }) => {
    const payload = {
      speakerId: data?.event_speakers?.[0]?.id,
      timingId: data?.event_timing?.[0]?.id,
      event_speakers:
        event_speakers?.map?.((event_speaker) => ({
          ...event_speaker,
          event_id: data.id,
        })) || [],
      event_timing:
        event_timing?.map?.((event_timing) => ({
          ...event_timing,
          event_id: data.id,
        })) || [],
    };

    dispatch(
      submitEventSpeackersTiming({
        ...payload,
        onSuccess: (res) => {
          if (isArray(res?.event_speakers)) {
            setSpeakers(res?.event_speakers);
          }
          if (isArray(res?.event_timing)) {
            setTiming(res?.event_timing);
          }
          onNext();
        },
      })
    );
  };

  return (
    <Drawer
      open={open}
      footer={null}
      closable={false}
      width={810}
      zIndex={1000}
      contentWrapperStyle={{ maxWidth: '100vw' }}
      bodyStyle={{
        height: '100vh',
        padding: 0,
      }}
    >
      <EventHeader />
      <EventSteper />

      <div className="px-3 px-md-5 mx-1 custom_styles">
        <Form
          form={form}
          name="control-hooks"
          className="custom-form-style"
          layout="vertical"
          onFinish={onFinish}
        >
          <h6 className="fs-20 fw-6 mb-4">{t('Speakers')}</h6>
          <Form.List
            initialValue={[{ name: null, role: null, bio: null, cover: null }]}
            name="event_speakers"
          >
            {(fields, { add, remove }) => (
              <div>
                {fields.map(({ key, name, ...restField }, indx) => (
                  <div
                    key={key}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <div className="d-flex justify-content-between flex-column flex-grow-1">
                      <AntdRow>
                        <Form.Item
                          {...restField}
                          name={[name, 'name']}
                          label={t('Name')}
                          rules={[
                            {
                              required: true,
                              message: 'This field is required',
                            },
                          ]}
                          className="flex-grow-1 mr-2"
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'role']}
                          rules={[
                            {
                              required: true,
                              message: 'This field is required',
                            },
                          ]}
                          label={t('Role')}
                          className="flex-grow-1 ml-2"
                        >
                          <Input />
                        </Form.Item>
                      </AntdRow>
                      <AntdRow>
                        <Form.Item
                          {...restField}
                          name={[name, 'cover']}
                          label={t('Cover')}
                          rules={[
                            {
                              required: true,
                              message: 'This field is required',
                            },
                          ]}
                          className="mr-2"
                        >
                          <ImgCropS3Upload />
                        </Form.Item>
                        <Form.Item
                          className="flex-grow-1"
                          {...restField}
                          name={[name, 'bio']}
                          label={t('Bio')}
                          rules={[
                            {
                              required: true,
                              message: 'This field is required',
                            },
                          ]}
                        >
                          <CKEditor5 style={{ resize: 'none', height: 104 }} />
                        </Form.Item>
                      </AntdRow>
                      <Divider className="mt-0 mb-3" />
                    </div>
                    {fields.length > 1 && (
                      <img
                        src="/assets/img/icons/modal-close.svg"
                        onClick={() => remove(indx)}
                        className="icon-lg mt-1 ml-4 cursor-pointer"
                      />
                    )}
                  </div>
                ))}

                <Button
                  type="ghost"
                  size="large"
                  className="px-4"
                  onClick={() => add({})}
                >
                  + {t('Add more speakers')}
                </Button>
              </div>
            )}
          </Form.List>
          <Divider className="mt-5" />

          <h6 className="fs-20 fw-6 mb-4">{t('Date/time')}</h6>
          <Form.List initialValue={[{}]} name="event_timing">
            {(fields, { add, remove }) => (
              <div>
                {fields.map(({ key, name, ...restField }, indx) => (
                  <div
                    key={key}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <div className="d-flex justify-content-between flex-column flex-grow-1">
                      <Row>
                        <Col xs={12} md={4}>
                          <Form.Item
                            {...restField}
                            name={[name, 'start_date']}
                            label={t('Date')}
                            rules={[
                              {
                                required: true,
                                message: 'This field is required',
                              },
                            ]}
                          >
                            <DatePicker picker="date" className="w-100" />
                          </Form.Item>
                        </Col>
                        <Col xs={12} md={4}>
                          <Form.Item
                            {...restField}
                            name={[name, 'start_time']}
                            label={t('Start time')}
                            rules={[
                              {
                                required: true,
                                message: 'This field is required',
                              },
                            ]}
                          >
                            <DatePicker
                              format="h:mm a"
                              picker="time"
                              className="w-100"
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={12} md={4}>
                          <Form.Item
                            {...restField}
                            name={[name, 'end_time']}
                            label={t('End time')}
                            rules={[
                              {
                                required: true,
                                message: 'This field is required',
                              },
                            ]}
                          >
                            <DatePicker
                              format="h:mm a"
                              picker="time"
                              className="w-100"
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Divider className="mt-0 mb-3" />
                    </div>
                    {fields.length > 1 && (
                      <img
                        src="/assets/img/icons/modal-close.svg"
                        onClick={() => remove(indx)}
                        className="icon-lg mt-1 ml-4 flex-shrink-0 cursor-pointer"
                      />
                    )}
                  </div>
                ))}

                <Button
                  type="ghost"
                  size="large"
                  className="px-4"
                  onClick={() => add({})}
                >
                  + {t('Add more date')}
                </Button>
              </div>
            )}
          </Form.List>
          <Form.Item className="mt-5">
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ gap: 8 }}
            >
              <Button
                size="large"
                className="px-4 br-4"
                type="ghost"
                onClick={onBack}
              >
                {t('Back')}
              </Button>
              <Button
                size="large"
                className="px-4"
                type="primary"
                htmlType="submit"
                loading={status === 'submitting'}
              >
                {t('Next')}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Drawer>
  );
};

export default EventSpeakerAndTiming;
