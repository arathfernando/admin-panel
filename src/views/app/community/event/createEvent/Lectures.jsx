/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
import {
  Avatar,
  Button,
  DatePicker,
  Divider,
  Drawer,
  Form,
  Input,
  Select,
  Space,
} from 'antd';
import { isArray, isEmpty } from 'lodash';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import CKEditor5 from '../../../../../components/util-components/CkEditor';
import ImgCropS3Upload from '../../../../../components/util-components/ImgCropS3Upload';
import useTranslation from '../../../../../helpers/useTranslation';
import { submitEventLecture } from '../../../../../redux/actions';

const EventLectures = ({
  open,
  EventSteper,
  EventHeader,
  onBack,
  onCreate,
  data,
}) => {
  const [form] = Form.useForm();

  const { status } = useSelector(({ event }) => event.submitEventLectureAction);

  const { t } = useTranslation();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEmpty(data?.event_lecture_timing)) {
      form.setFieldsValue({
        lectures: data?.event_lecture_timing?.map?.((event_lecture_timing) => ({
          ...event_lecture_timing,
          start_time: moment(event_lecture_timing?.start_time),
          end_time: moment(event_lecture_timing?.end_time),
          event_timing_id: event_lecture_timing?.event_timing?.id,
          speaker_id: event_lecture_timing?.event_speakers?.id,
        })),
      });
    } else {
      form.resetFields();
    }
  }, [data, form]);

  const onFinish = ({ lectures }) => {
    const payload = {
      id: data?.event_lecture_timing?.[0]?.id,
      lectures:
        lectures?.map?.(({ end_time, start_time, ...lecture }) => ({
          ...lecture,
          event_id: data.id,
          start_time: moment(start_time)?.format(),
          end_time: moment(end_time)?.format(),
        })) || [],
    };
    dispatch(
      submitEventLecture({
        ...payload,
        onSuccess: (event_lecture_timing) => {
          if (isArray(event_lecture_timing)) {
            form.setFieldsValue({
              lectures: event_lecture_timing?.map?.((event_lecture_timing) => ({
                ...event_lecture_timing,
                start_time: moment(event_lecture_timing?.start_time),
                end_time: moment(event_lecture_timing?.end_time),
              })),
            });
          }
          onCreate();
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
      zIndex={1001}
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
          <h6 className="fs-20 fw-6 mb-4">{t('Lectures')}</h6>
          <Form.List initialValue={[{}]} name="lectures">
            {(fields, { add, remove }) => (
              <div>
                {fields.map(({ key, name, ...restField }, indx) => (
                  <div
                    key={key}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <div className="d-flex justify-content-between flex-column flex-grow-1">
                      <Row>
                        <Col xs={12} md={6}>
                          <Form.Item
                            {...restField}
                            name={[name, 'speaker_id']}
                            label="Speaker"
                            rules={[
                              {
                                required: true,
                                message: 'This field is required',
                              },
                            ]}
                          >
                            <Select
                              options={
                                data.event_speakers?.map?.((data) => ({
                                  value: data.id,
                                  label: (
                                    <Space>
                                      <Avatar size="small" src={data.cover} />
                                      <span>{data.name}</span>
                                    </Space>
                                  ),
                                })) || []
                              }
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={12} md={6}>
                          <Form.Item
                            {...restField}
                            name={[name, 'event_timing_id']}
                            label="Date"
                            rules={[
                              {
                                required: true,
                                message: 'This field is required',
                              },
                            ]}
                          >
                            <Select
                              options={
                                data?.event_timing?.map?.((data) => ({
                                  value: data.id,
                                  label: moment(data.start_date).format(
                                    'MMM Do'
                                  ),
                                })) || []
                              }
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={12} md={6}>
                          <Form.Item
                            {...restField}
                            name={[name, 'title']}
                            label="Title"
                            rules={[
                              {
                                required: true,
                                message: 'This field is required',
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={12} md={6}>
                          <Form.Item
                            {...restField}
                            name={[name, 'location']}
                            label="Location "
                            rules={[
                              {
                                required: true,
                                message: 'This field is required',
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>

                        <Col xs={12} md={6}>
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
                        <Col xs={12} md={6}>
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
                        <Col xs={12}>
                          <div className="d-flex align-items-center">
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
                              className="mr-3"
                            >
                              <ImgCropS3Upload />
                            </Form.Item>
                            <Form.Item
                              className="flex-grow-1"
                              {...restField}
                              name={[name, 'description']}
                              label={t('Description')}
                              rules={[
                                {
                                  required: true,
                                  message: 'This field is required',
                                },
                              ]}
                            >
                              <CKEditor5
                                style={{
                                  resize: 'none',
                                  height: 102,
                                  marginBottom: 8,
                                }}
                              />
                            </Form.Item>
                          </div>
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
                  + {t('Add more lecture')}
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
                {t('Submit')}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Drawer>
  );
};

export default EventLectures;
