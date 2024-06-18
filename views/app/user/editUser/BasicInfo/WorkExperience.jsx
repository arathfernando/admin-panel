import { PlusCircleOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
} from 'antd';
import { useWatch } from 'antd/lib/form/Form';
import TextArea from 'antd/lib/input/TextArea';
import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DeleteModal from '../../../../../components/util-components/DeleteModal';
import Loading from '../../../../../components/util-components/Loading';
import useMediaQuery from '../../../../../hooks/useMediaQuery';
import { updateUserWorkExprience } from '../../../../../redux/actions';
import getTimeDistance from '../../../../../utils/getTimeDistance';

const { RangePicker } = DatePicker;

const SubmitWorkExpreience = ({ open, onCancel, onSaved, data = {} }) => {
  const { work_experience = [] } = useSelector(({ users }) => users.singleUser);
  const {
    status,
    data: { submitType },
  } = useSelector(({ users }) => users.userWorkExprienceAction);

  const { id } = useParams();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const work_experience_value = useWatch('work_experience', form);

  const submitMode = useMemo(() => (isEmpty(data) ? 'create' : 'edit'), [data]);

  const onFinish = () => {
    const payload = {
      submitType: submitMode,
      successMsg:
        submitMode === 'create'
          ? 'Created successfully!'
          : 'Updated successfully!',
      work_experience:
        submitMode === 'create'
          ? // create
            [
              // existings
              ...work_experience,
              // new
              ...work_experience_value.map(
                ({ date, currently_working, ...values }) => ({
                  ...values,
                  start_date: moment(date?.[0]).format('YYYY-MM'),
                  end_date: currently_working
                    ? ''
                    : moment(date?.[1]).format('YYYY-MM'),
                  currently_working: currently_working ? 'TRUE' : 'FALSE',
                })
              ),
            ]
          : // edit
            work_experience.map((value) => {
              const { date, ...work_experience_form_value } =
                work_experience_value?.[0] || {};
              return value.id === data?.id
                ? // edit
                  {
                    ...work_experience_form_value,
                    start_date: moment(work_experience_form_value?.[0]).format(
                      'YYYY-MM'
                    ),
                    end_date: work_experience_form_value?.currently_working
                      ? ''
                      : moment(work_experience_form_value?.[1]).format(
                          'YYYY-MM'
                        ),
                    currently_working:
                      work_experience_form_value?.currently_working
                        ? 'TRUE'
                        : 'FALSE',
                  }
                : // rest
                  value;
            }),
      id,
    };

    dispatch(
      updateUserWorkExprience({
        ...payload,
        onSuccess: onSaved,
      })
    );
  };

  useEffect(() => {
    if (submitMode === 'create') {
      form.setFieldValue('work_experience', [{}]);
    } else {
      form.setFieldValue('work_experience', [
        {
          ...data,
          date: [
            moment(data.start_date, 'YYYY-MM'),
            data.currently_working === 'TRUE'
              ? moment(new Date(), 'YYYY-MM')
              : moment(data.end_date, 'YYYY-MM'),
          ],
        },
      ]);
    }
  }, [data]);

  return (
    <Modal
      width={1097}
      closable={false}
      footer={null}
      open={open}
      onCancel={onCancel}
      bodyStyle={{ padding: '49px 68px' }}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <h3 className="h3-lg hb-text-primary" style={{ marginBottom: 17 }}>
          Experience
        </h3>

        <Form.List name="work_experience">
          {(fields, { add, remove }) => (
            <div style={{ marginBottom: 47 }}>
              {fields.map(({ key, name, ...restField }, indx) => (
                <Fragment key={key}>
                  {indx !== 0 && <Divider className="mt-0" />}
                  <div className="d-flex flex-column">
                    <div
                      className="d-flex align-items-center justify-content-between"
                      style={{ gap: 12 }}
                    >
                      <div className="flex-grow-1">
                        <Form.Item
                          {...restField}
                          name={[name, 'company_name']}
                          label={<span className="h5-sm">Company Name</span>}
                          style={{ maxWidth: 444, marginBottom: 22 }}
                          rules={[
                            {
                              required: true,
                              message: 'This field is required',
                            },
                          ]}
                        >
                          <Input
                            style={{ borderColor: 'black' }}
                            className="p-md br-4"
                            placeholder="Type a company name"
                          />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'job_title']}
                          label={<span className="h5-sm">Your Title</span>}
                          style={{ maxWidth: 444, marginBottom: 22 }}
                          rules={[
                            {
                              required: true,
                              message: 'This field is required',
                            },
                          ]}
                        >
                          <Input
                            style={{ borderColor: 'black' }}
                            className="p-md br-4"
                            placeholder="Type your title at this company"
                          />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'date']}
                          label={<span className="h5-sm">Started & Ended</span>}
                          style={{ maxWidth: 444, marginBottom: 22 }}
                          rules={[
                            {
                              required: true,
                              message: 'This field is required',
                            },
                          ]}
                        >
                          <RangePicker
                            style={{ borderColor: 'black' }}
                            className="p-md br-4"
                            disabled={[
                              false,
                              work_experience_value?.[indx]?.currently_working,
                            ]}
                            picker="month"
                            placeholder={['Start month', 'End month']}
                            allowEmpty={[false, true]}
                            renderExtraFooter={() => (
                              <div className="d-flex align-items-center justify-content-center p-2">
                                <Form.Item
                                  {...restField}
                                  name={[name, 'currently_working']}
                                  valuePropName="checked"
                                  noStyle
                                >
                                  <Checkbox
                                    checked={
                                      work_experience_value?.[indx]
                                        ?.currently_working
                                    }
                                    onClick={() =>
                                      form.setFieldValue(
                                        'work_experience',
                                        work_experience_value.map(
                                          (value = {}, index) =>
                                            index === indx
                                              ? {
                                                  ...value,
                                                  currently_working:
                                                    !value.currently_working,
                                                }
                                              : value
                                        )
                                      )
                                    }
                                  >
                                    I currently work here
                                  </Checkbox>
                                </Form.Item>
                              </div>
                            )}
                          />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, 'currently_working']}
                          valuePropName="checked"
                          style={{ marginBottom: 22 }}
                        >
                          <Checkbox
                            checked={
                              work_experience_value?.[indx]?.currently_working
                            }
                            onClick={() =>
                              form.setFieldValue(
                                'work_experience',
                                work_experience_value.map((value = {}, index) =>
                                  index === indx
                                    ? {
                                        ...value,
                                        currently_working:
                                          !value.currently_working,
                                      }
                                    : value
                                )
                              )
                            }
                          >
                            I currently work here
                          </Checkbox>
                        </Form.Item>
                      </div>
                      {fields.length > 1 && (
                        <Button
                          type="text p-0"
                          size="small"
                          onClick={() => remove(indx)}
                          icon={
                            <img
                              src="/assets/img/icons/delete-bin-line-primary.svg"
                              alt=""
                              height={24}
                              width={24}
                              className="cursor-pointer"
                            />
                          }
                        />
                      )}
                    </div>

                    <Form.Item
                      {...restField}
                      name={[name, 'description']}
                      label={<span className="h5-sm">Description</span>}
                      style={{ maxWidth: 766, marginBottom: 30 }}
                      rules={[
                        { required: true, message: 'This field is required' },
                      ]}
                    >
                      <TextArea
                        style={{ borderColor: 'black', resize: 'unset' }}
                        className="p-md br-4 p-3"
                        placeholder="Skills or technologies you used in this position"
                        rows={8}
                        maxLength={500}
                      />
                    </Form.Item>
                  </div>
                </Fragment>
              ))}
              <div style={{ width: 'fit-content' }}>
                {isEmpty(data) && (
                  <Form.Item>
                    <Button
                      type="text p-md d-flex align-items-center justify-content-center px-0"
                      style={{ gap: 2 }}
                      onClick={() => add({})}
                      block
                      icon={
                        <PlusCircleOutlined
                          className="hb-text-primary"
                          style={{ marginTop: -2 }}
                        />
                      }
                    >
                      Add more experience
                    </Button>
                  </Form.Item>
                )}
              </div>
            </div>
          )}
        </Form.List>

        <div className="d-flex align-items-center" style={{ gap: 4 }}>
          <Button type="text btn-text-md px-3 ml-n3" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="primary btn-text-md px-4"
            htmlType="submit"
            loading={status === 'submitting' && submitType !== 'remove'}
          >
            <span className="px-3">Save</span>
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

const WorkExperience = () => {
  const {
    singleUser: { work_experience = [], isRefetching },
    loading,
    error,
  } = useSelector(({ users }) => users);
  const {
    status,
    data: { submitType },
  } = useSelector(({ users }) => users.userWorkExprienceAction);

  const [openSubmitWorkExperience, setOpenSubmitWorkExperience] =
    useState(false);
  const [editWorkExperienceData, setEditWorkExperienceData] = useState({});

  const [
    openWorkExperienceRemoveWorningWithId,
    setOpenWorkExperienceRemoveWorningWithId,
  ] = useState(0);

  const dispatch = useDispatch();
  const { id } = useParams();
  const { sm } = useMediaQuery();

  const handleRemoveNewWorkExpreince = () => {
    const payload = {
      submitType: 'remove',
      successMsg: 'Removed successfully!',
      work_experience: work_experience.filter(
        (value) => value.id !== openWorkExperienceRemoveWorningWithId
      ),
      id,
    };

    dispatch(
      updateUserWorkExprience({
        ...payload,
        onSuccess: () => setOpenWorkExperienceRemoveWorningWithId(0),
      })
    );
  };

  return (
    <div className="bg-white">
      <div
        className="d-flex flex-column mx-auto"
        style={{ gap: 14, padding: sm ? '24px 45px' : 24, maxWidth: 1000 }}
      >
        <div
          className="d-flex justify-content-between align-items-center flex-wrap"
          style={{ gap: 8 }}
        >
          <h5 className="h5-lg text-black mb-0">Work experience</h5>
          <div className="d-flex justify-content-end flex-grow-1">
            <Button
              type="primary btn-text-md px-4"
              size="large"
              style={{ height: 49 }}
              onClick={() => {
                setOpenSubmitWorkExperience(true);
                setEditWorkExperienceData({});
              }}
              disabled={(loading && !isRefetching) || error}
            >
              <span className="px-1">Add experience</span>
            </Button>
          </div>
        </div>

        <div
          className="d-flex flex-column position-relative"
          style={{ gap: 14, minHeight: loading && !isRefetching && 50 }}
        >
          <Loading loading={loading && !isRefetching} />
          {work_experience.map?.((data = {}, indx) => (
            <Fragment key={data.id}>
              {indx !== 0 && <Divider className="my-0" />}
              <div
                className="d-flex align-items-center justify-content-between"
                style={{ gap: 14 }}
              >
                <div className="d-flex flex-column" style={{ gap: 12 }}>
                  <span className="fs-14 fw-5">{data.company_name}</span>
                  <span className="fs-14 fw-5">{data.job_title}</span>
                  <span className="fs-14 fw-5">
                    {data.start_date &&
                      moment(data.start_date).format('MMM YYYY')}
                    {' - '}
                    {data.currently_working !== 'TRUE'
                      ? moment(data.end_date).format('MMM YYYY')
                      : 'Present'}{' '}
                    {!(data.currently_working !== 'TRUE') &&
                      `(${getTimeDistance(data.start_date, data.end_date)})`}
                  </span>
                  <span className="fs-14 fw-3">{data.description}</span>
                </div>

                <div
                  className="d-flex flex-column flex-shrink-0"
                  style={{ gap: 12 }}
                >
                  <Button
                    type="text p-0"
                    size="small"
                    onClick={() => {
                      setOpenSubmitWorkExperience(true);
                      setEditWorkExperienceData(data);
                    }}
                    icon={
                      <img
                        src="/assets/img/icons/edit-outline-primary.svg"
                        alt=""
                        height={24}
                        width={24}
                        className="cursor-pointer"
                      />
                    }
                  />
                  <Button
                    type="text p-0"
                    size="small"
                    onClick={() =>
                      setOpenWorkExperienceRemoveWorningWithId(data.id)
                    }
                    icon={
                      <img
                        src="/assets/img/icons/delete-bin-line-primary.svg"
                        alt=""
                        height={24}
                        width={24}
                        className="cursor-pointer"
                      />
                    }
                  />
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </div>

      <SubmitWorkExpreience
        open={openSubmitWorkExperience}
        data={editWorkExperienceData}
        onCancel={() => setOpenSubmitWorkExperience(false)}
        onSaved={() => setOpenSubmitWorkExperience(false)}
      />

      <DeleteModal
        name="work experience"
        open={openWorkExperienceRemoveWorningWithId}
        onClose={() => setOpenWorkExperienceRemoveWorningWithId(0)}
        onDelete={handleRemoveNewWorkExpreince}
        loading={status === 'submitting' && submitType === 'remove'}
      />
    </div>
  );
};

export default WorkExperience;
