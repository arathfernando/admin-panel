import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, DatePicker, Divider, Form, Input, Modal } from 'antd';
import { useWatch } from 'antd/lib/form/Form';
import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DeleteModal from '../../../../../components/util-components/DeleteModal';
import Loading from '../../../../../components/util-components/Loading';
import useMediaQuery from '../../../../../hooks/useMediaQuery';
import { updateUserEducation } from '../../../../../redux/actions';

const SubmitEducation = ({ open, onCancel, onSaved, data = {} }) => {
  const { education = [] } = useSelector(({ users }) => users.singleUser);
  const {
    status,
    data: { submitType },
  } = useSelector(({ users }) => users.userEducationAction);

  const { id } = useParams();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const education_value = useWatch('education', form);

  const submitMode = useMemo(() => (isEmpty(data) ? 'create' : 'edit'), [data]);

  useEffect(() => {
    if (submitMode === 'create') {
      form.setFieldValue('education', [{}]);
    } else {
      form.setFieldValue('education', [
        {
          ...data,
          graduation_year: moment(data.graduation_year, 'YYYY'),
        },
      ]);
    }
  }, [data]);

  const onFinish = () => {
    const payload = {
      submitType: submitMode,
      successMsg:
        submitMode === 'create'
          ? 'Created successfully!'
          : 'Updated successfully!',
      education:
        submitMode === 'create'
          ? // create
            [
              // existings
              ...education,
              // new
              ...education_value.map(({ graduation_year, ...values }) => ({
                ...values,
                graduation_year: moment(graduation_year).format('YYYY'),
              })),
            ]
          : // edit
            education.map((value) => {
              const { graduation_year, ...education_form_value } =
                education_value?.[0] || {};
              return value.id === data?.id
                ? // edit
                  {
                    ...education_form_value,
                    graduation_year: moment(graduation_year).format('YYYY'),
                  }
                : // rest
                  value;
            }),
      id,
    };

    dispatch(
      updateUserEducation({
        ...payload,
        onSuccess: onSaved,
      })
    );
  };

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
          Education
        </h3>

        <Form.List name="education">
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
                          name={[name, 'institute_name']}
                          label={<span className="h5-sm">Institute name</span>}
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
                          name={[name, 'degree']}
                          label={<span className="h5-sm">Degree</span>}
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
                          name={[name, 'graduation_year']}
                          label={<span className="h5-sm">Graduation year</span>}
                          style={{ maxWidth: 444, marginBottom: 22 }}
                          rules={[
                            {
                              required: true,
                              message: 'This field is required',
                            },
                          ]}
                        >
                          <DatePicker
                            style={{ borderColor: 'black' }}
                            className="p-md br-4"
                            picker="year"
                            placeholder="Select year"
                          />
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
                  </div>
                </Fragment>
              ))}
              <p className="p-sm mb-4">
                {`Enter "self taught" if you have no formal education`}
              </p>
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
                      Add more education
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

const Education = () => {
  const {
    singleUser: { education = [], isRefetching },
    loading,
    error,
  } = useSelector(({ users }) => users);
  const {
    status,
    data: { submitType },
  } = useSelector(({ users }) => users.userEducationAction);

  const [openSubmitEducation, setOpenSubmitEducation] = useState(false);
  const [editEducationData, setEditEducationData] = useState({});

  const [
    openEducationRemoveWorningWithId,
    setOpenEducationRemoveWorningWithId,
  ] = useState(0);

  const dispatch = useDispatch();
  const { id } = useParams();
  const { sm } = useMediaQuery();

  const handleRemoveNewWorkExpreince = () => {
    const payload = {
      submitType: 'remove',
      successMsg: 'Removed successfully!',
      education: education.filter(
        (value) => value.id !== openEducationRemoveWorningWithId
      ),
      id,
    };

    dispatch(
      updateUserEducation({
        ...payload,
        onSuccess: () => setOpenEducationRemoveWorningWithId(0),
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
          <h5 className="h5-lg text-black mb-0">Education</h5>
          <div className="d-flex justify-content-end flex-grow-1">
            <Button
              type="primary btn-text-md px-4"
              size="large"
              style={{ height: 49 }}
              onClick={() => {
                setOpenSubmitEducation(true);
                setEditEducationData({});
              }}
              disabled={(loading && !isRefetching) || error}
            >
              <span className="px-1">Add education</span>
            </Button>
          </div>
        </div>

        <div
          className="d-flex flex-column position-relative"
          style={{ gap: 14, minHeight: loading && !isRefetching && 50 }}
        >
          <Loading loading={loading && !isRefetching} />
          {education.map?.((data = {}, indx) => (
            <Fragment key={data.id}>
              {indx !== 0 && <Divider className="my-0" />}
              <div
                className="d-flex align-items-center justify-content-between"
                style={{ gap: 14 }}
              >
                <div className="d-flex flex-column" style={{ gap: 12 }}>
                  <span className="fs-14 fw-5">{data.institute_name}</span>
                  <span className="fs-14 fw-5">{data.degree}</span>
                  <span className="fs-14 fw-5">
                    {moment(data.graduation_year).format('YYYY')}
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
                      setOpenSubmitEducation(true);
                      setEditEducationData(data);
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
                    onClick={() => setOpenEducationRemoveWorningWithId(data.id)}
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

      <SubmitEducation
        open={openSubmitEducation}
        data={editEducationData}
        onCancel={() => setOpenSubmitEducation(false)}
        onSaved={() => setOpenSubmitEducation(false)}
      />

      <DeleteModal
        name="education"
        open={openEducationRemoveWorningWithId}
        onClose={() => setOpenEducationRemoveWorningWithId(0)}
        onDelete={handleRemoveNewWorkExpreince}
        loading={status === 'submitting' && submitType === 'remove'}
      />
    </div>
  );
};

export default Education;
