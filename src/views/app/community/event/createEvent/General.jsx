/* eslint-disable camelcase */
import { Button, Divider, Drawer, Form, Input, Select, Switch } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UploadImage from '../../../../../components/UploadImage';
import CKEditor5 from '../../../../../components/util-components/CkEditor';
import GoalSelect from '../../../../../components/util-components/selector/GoalSelect';
import UserSelect from '../../../../../components/util-components/selector/UserSelect';
import useTranslation from '../../../../../helpers/useTranslation';
import useMediaQuery from '../../../../../hooks/useMediaQuery';
import { submitEventGeneral } from '../../../../../redux/actions';

const { Option } = Select;

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
  layout: 'horizontal',
};

const EventGeneral = ({
  open,
  EventSteper,
  EventHeader,
  onNext,
  data,
  setEvent,
}) => {
  const { xs } = useMediaQuery();

  const [form] = Form.useForm();
  const online_event = Form.useWatch('online_event', form);
  const unlimited_seats = Form.useWatch('unlimited_seats', form);

  const { status } = useSelector(({ event }) => event.submitEventGeneralAction);

  const { t } = useTranslation();

  const { communityId, groupId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.id) {
      form.setFieldsValue({
        ...data,
        online_event: data?.online_event === 'YES',
        unlimited_seats: data?.unlimited_seats === 'YES',
        created_by: data?.created_by?.id,
      });
    } else {
      form.resetFields();
    }
  }, [data, form]);

  const onFinish = ({ ...values }) => {
    const payload = {
      ...values,
      id: data.id,
      online_event: values.online_event ? 'YES' : 'NO',
      unlimited_seats: values.unlimited_seats ? 'YES' : 'NO',
      single_day_event: values.single_day_event ? 'YES' : 'NO',
      goals: values.goals?.toString?.(),
    };
    if ((communityId, values.event_type === 'COMMUNITY_EVENT')) {
      payload.community_id = communityId;
    }

    dispatch(
      submitEventGeneral({
        ...payload,
        onSuccess: (event) => {
          if (event?.id) {
            setEvent(event);
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
      zIndex={999}
      bodyStyle={{
        height: '100vh',
        padding: 0,
      }}
    >
      <EventHeader />
      <EventSteper />

      <div className="px-3 px-md-5 mx-1 custom_styles">
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          className="custom-form-style"
          onFinish={onFinish}
        >
          <Form.Item label={t('Cover page')} required>
            <div className="p-2 border rounded-2 d-flex justify-content-center">
              <Form.Item
                name="cover_image"
                rules={[{ required: true, message: 'This field is required' }]}
                noStyle
              >
                <UploadImage
                  aspect={2.4}
                  style={{ aspectRatio: '2.4/1' }}
                  className="w-100"
                >
                  <div className="p-4">
                    <h6 className="fs-16 fw-6 mb-1">
                      <u>{t('Add cover')}</u>
                    </h6>
                    <h6 className="fs-14 mb-1">{t('or drag and drop')}</h6>
                    <h6 className="fs-14 mb-0">
                      {t('Ideal size 851px by 315px')}
                    </h6>
                  </div>
                </UploadImage>
              </Form.Item>
            </div>
          </Form.Item>

          <Form.Item
            name="event_title"
            label={t('Event title')}
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="intro" label={t('Intro')}>
            <CKEditor5 />
          </Form.Item>
          <Form.Item
            name="description"
            label={t('Description')}
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <CKEditor5 />
          </Form.Item>
          <Form.Item
            name="created_by"
            label={t('Created by')}
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <UserSelect />
          </Form.Item>
          <Form.Item
            name="event_type"
            label={t('Type of event')}
            wrapperCol={{ xs: { span: 24 }, sm: { span: 12 } }}
            labelCol={{ span: 24 }}
            initialValue="GLOBAL"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Select>
              <Option value="GLOBAL">{t('Global')}</Option>
              <Option value="COMMUNITY_EVENT" disabled={!communityId}>
                {t('Community event')}
              </Option>
              <Option value="GROUP_EVENT" disabled={!groupId}>
                {t('Group event')}
              </Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="event_webpage"
            label={t('Event webpage')}
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input />
          </Form.Item>

          <Divider className="mt-5" />

          <h6 className="fs-20 fw-6 mb-4">{t('Location')}</h6>

          <div className={`d-flex align-items-center ${xs ? 'w-100' : 'w-50'}`}>
            <h5 className="fs-15 fw-6 mb-3 flex-grow-1">{t('Online event')}</h5>
            <Form.Item name="online_event">
              <Switch checked={online_event} />
            </Form.Item>
            <h5 className="fs-18 fw-6 ml-3 mb-4">{t('Yes')}</h5>
          </div>

          {online_event ? (
            <Form.Item name="meeting_link" label="Meeting link">
              <Input />
            </Form.Item>
          ) : (
            <>
              <Form.Item
                name="address"
                label={t('Address')}
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="city"
                label={t('City')}
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item name="map_link" label={t('Google maps link')}>
                <Input />
              </Form.Item>
            </>
          )}

          <Divider className="mt-5" />

          <h6 className="fs-20 fw-6 mb-4">{t('Seats')}</h6>

          <div className={`d-flex align-items-center ${xs ? 'w-100' : 'w-50'}`}>
            <h5 className="fs-15 fw-6 mb-3 flex-grow-1">
              {t('Unlimited seats')}
            </h5>
            <Form.Item name="unlimited_seats">
              <Switch checked={unlimited_seats} />
            </Form.Item>
            <h5 className="fs-18 fw-6 ml-3 mb-4">{t('Yes')}</h5>
          </div>

          {unlimited_seats || (
            <Form.Item
              name="no_of_seats"
              label={t('Number of seats')}
              wrapperCol={{ sm: { span: 5 } }}
              labelCol={{ span: 24 }}
            >
              <Input type="number" />
            </Form.Item>
          )}

          <Form.Item
            name="goals"
            label={
              <div>
                <h4 className="fs-14 fw-5 text-black mb-3">
                  {t('Sustainable development goals (max 3.)')}
                </h4>
              </div>
            }
            className="mb-4 pb-2"
          >
            <GoalSelect max={3} />
          </Form.Item>

          <Form.Item className="mt-5">
            <Button
              size="large"
              className="float-right px-4"
              type="primary"
              htmlType="submit"
              loading={status === 'submitting'}
            >
              {t('Next')}
            </Button>
            {/* <Button
              type="default"
              size="large"
              className="tet-dark mr-3 float-end border-0"
              onClick={() => {
                form.resetFields();
                setCover_image_preview("");
                onCancel();
              }}
            >
              {t("Cancel")}
            </Button> */}
          </Form.Item>
        </Form>
      </div>
    </Drawer>
  );
};

export default EventGeneral;
