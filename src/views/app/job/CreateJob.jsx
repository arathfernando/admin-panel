/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import { useWatch } from 'antd/lib/form/Form';
import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CKEditor5 from '../../../components/util-components/CkEditor';
import FileS3UploadMultiple from '../../../components/util-components/FileS3UploadMultiple';
import UserSelect from '../../../components/util-components/selector/UserSelect';
import useTranslation from '../../../helpers/useTranslation';
import * as Actions from '../../../redux/actions';

const CreateJob = ({ onCancel, data, ...props }) => {
  const { data: skillslist, loading } = useSelector(
    ({ skill }) => skill.skills
  );
  const { status } = useSelector(({ job }) => job.createJobAction);
  const { status: updateStatus } = useSelector(
    ({ job }) => job.updateJobAction
  );

  const { t } = useTranslation();

  const [form] = Form.useForm();
  const skillsValue = useWatch('skills', form);
  const dispatch = useDispatch();

  const isSubmitting = useMemo(
    () => status === 'submitting' || updateStatus === 'submitting',
    [status, updateStatus]
  );

  // set data
  useEffect(() => {
    if (!isEmpty(data)) {
      form.setFieldsValue({
        ...data,
        skills: data?.skills?.map?.(({ id }) => id),
        created_by: data?.created_by?.id,
        end_date: moment(data?.end_date, 'YYYY-MM-DD'),
      });
    }
  }, [data, form]);

  // fetch skills
  useEffect(() => {
    dispatch(Actions.getSkills());
  }, [dispatch]);

  const onFinish = ({ end_date, ...values }) => {
    const payload = {
      ...values,
      end_date: moment(end_date).format(),
    };
    if (!isEmpty(data)) {
      dispatch(
        Actions.updateJob({
          ...payload,
          id: data?.id,
          onSuccess: () => {
            onCancel();
            form.resetFields({});
          },
        })
      );
    } else {
      dispatch(
        Actions.createJob({
          ...payload,
          onSuccess: () => {
            onCancel();
            form.resetFields({});
          },
        })
      );
    }
  };

  return (
    <Modal
      footer={null}
      width={710}
      title={isEmpty(data) ? 'New Job' : 'Edit Job'}
      className="sidecreen-modal-3 custom_styles"
      onCancel={onCancel}
      closeIcon={
        <img
          src="/assets/img/icons/modal-close.svg"
          alt=""
          onClick={onCancel}
        />
      }
      {...props}
    >
      <Form
        layout="vertical"
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        className="custom-form-style"
      >
        <Form.Item
          name="created_by"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Created by</h6>}
          className="mb-4 pb-3"
        >
          <UserSelect />
        </Form.Item>

        <Form.Item
          name="status"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">status</h6>}
          className="mb-4 pb-3"
          initialValue="OPEN"
        >
          <Select
            placeholder="Type your status"
            options={[
              {
                value: 'OPEN',
              },
              {
                value: 'IN_PROGRESS',
              },
              {
                value: 'COMPLETED',
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="job_name"
          rules={[{ required: true, message: 'This field is required' }]}
          label={
            <span className="mt-1" style={{ marginBottom: 7 }}>
              {t('Your project name')}
            </span>
          }
          style={{ marginBottom: 58 }}
        >
          <Input placeholder={t('e.g. Project 1')} />
        </Form.Item>

        <Form.Item
          name="job_description"
          rules={[{ required: true, message: 'This field is required' }]}
          label={
            <span className="mt-1" style={{ marginBottom: 7 }}>
              {t('Describe your idea')}
            </span>
          }
          style={{ marginBottom: 46 }}
        >
          <CKEditor5
            rows={4}
            placeholder={t('e.g. How to improve your social media profiles')}
          />
        </Form.Item>

        <Form.Item name="attachments" style={{ marginBottom: 44 }}>
          <FileS3UploadMultiple listType="text">
            <Button
              type="ghost btn-text-md br-4 px-5 mb-3"
              size="large"
              style={{ height: 52 }}
            >
              {t('Attach files')}
            </Button>
          </FileS3UploadMultiple>
        </Form.Item>

        <Form.Item
          name="skills"
          label={
            <span className="mt-1" style={{ marginBottom: 7 }}>
              {t('Skills required')}
            </span>
          }
          style={{ marginBottom: 58 }}
        >
          <Select
            allowClear
            showSearch
            optionFilterProp="label"
            loading={loading}
            mode="multiple"
            options={skillslist.map(({ id: value, skill: label }) => ({
              value,
              label,
            }))}
            placeholder={t('e.g. Project 1')}
          />
        </Form.Item>

        {skillsValue && (
          <>
            <Form.Item
              name="price"
              rules={[
                { required: true, message: 'This field is required' },
                {
                  type: 'number',
                  message: 'This is not a valid number',
                },
              ]}
              label={
                <span className="mt-1" style={{ marginBottom: 7 }}>
                  {t('What is your budget for this project?')}
                </span>
              }
              style={{ marginBottom: 44 }}
            >
              <Input
                type="number"
                placeholder={200}
                prefix={<span style={{ color: '#6B7280' }}>€</span>}
                suffix={<span style={{ color: '#6B7280' }}>EUR</span>}
                className="br-6"
              />
            </Form.Item>
            <Form.Item
              name="end_date"
              rules={[{ required: true, message: 'This field is required' }]}
              label={
                <span className="mt-1" style={{ marginBottom: 7 }}>
                  {t('When should it be done?')}
                </span>
              }
              style={{ marginBottom: 44 }}
            >
              <DatePicker placeholder="11/04/2023" className="w-100 br-6" />
            </Form.Item>
          </>
        )}

        <div className="d-flex justify-content-end mt-5">
          <Button
            type="primary ml-3 px-4"
            size="large"
            htmlType="submit"
            loading={isSubmitting}
          >
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateJob;
