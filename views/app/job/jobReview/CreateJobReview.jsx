/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Form, Input, Modal } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { isEmpty } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../../../../components/util-components/Rating';
import UserSelect from '../../../../components/util-components/selector/UserSelect';
import useTranslation from '../../../../helpers/useTranslation';
import * as Actions from '../../../../redux/actions';

const CreateJobReview = ({ onCancel, data, ...props }) => {
  const { status } = useSelector(
    ({ jobReview }) => jobReview.createJobReviewAction
  );
  const { status: updateStatus } = useSelector(
    ({ jobReview }) => jobReview.updateJobReviewAction
  );
  // const { data: jobs, loading: loadingJob } = useSelector(
  //   ({ job }) => job.jobs
  // );

  const { t } = useTranslation();

  const [form] = Form.useForm();
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
        created_by: data.created_by?.id,
        expertise_user_id: data?.expertise_user_id?.id,
      });
    }
  }, [data, form]);

  useEffect(() => {
    // dispatch(Actions.getJobs());
  }, [dispatch]);

  const onFinish = ({ ...values }) => {
    const payload = {
      ...values,
    };
    if (!isEmpty(data)) {
      dispatch(
        Actions.updateJobReview({
          ...payload,
          id: data?.id,
          onSuccess: () => {
            onCancel();
            form.resetFields();
          },
        })
      );
    } else {
      dispatch(
        Actions.createJobReview({
          ...payload,
          onSuccess: () => {
            onCancel();
            form.resetFields();
          },
        })
      );
    }
  };

  return (
    <Modal
      footer={null}
      width={710}
      title={isEmpty(data) ? 'New Job Review' : 'Edit Job Review'}
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
          name="expertise_user_id"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Expert name</h6>}
        >
          <UserSelect placeholder="Choose expert name" />
        </Form.Item>

        {/* <Form.Item
          name="job_name"
          rules={[{"required":true,"message":"This field is required"  }]}
          label={<h6 className="h6-lg">Job name</h6>}
        >
          <Select
            placeholder="Choose job name"
            allowClear
            showSearch
            loading={loadingJob}
            optionFilterProp="label"
            options={jobs?.map(({ id: value, job_name: label }) => ({
              value,
              label,
            }))}
          />
        </Form.Item> */}

        <h3 className="h3-sm required-mark" style={{ marginBottom: 17 }}>
          {t('Project review')}
        </h3>

        <h6 className="h6-lg mb-0">{t('Overall rating')}</h6>
        <Form.Item
          required={false}
          style={{ marginBottom: 0 }}
          rules={[{ required: true, message: 'This field is required' }]}
          name="over_all_rating"
        >
          <Rating style={{ marginBottom: 17 }} />
        </Form.Item>

        <h6 className="h6-lg" style={{ marginBottom: 0 }}>
          {t('Expert content')}
        </h6>
        <Form.Item
          required={false}
          style={{ marginBottom: 0 }}
          rules={[{ required: true, message: 'This field is required' }]}
          name="expertise_content"
        >
          <Rating style={{ marginBottom: 17 }} />
        </Form.Item>

        <h6 className="h6-lg" style={{ marginBottom: 0 }}>
          {t('Delivery')}
        </h6>
        <Form.Item
          required={false}
          style={{ marginBottom: 0 }}
          rules={[{ required: true, message: 'This field is required' }]}
          name="delivery"
        >
          <Rating style={{ marginBottom: 17 }} />
        </Form.Item>

        <h6 className="h6-lg">{t('Results')}</h6>
        <Form.Item
          required={false}
          rules={[{ required: true, message: 'This field is required' }]}
          name="results"
        >
          <Rating style={{ marginBottom: 17 }} />
        </Form.Item>

        <Form.Item
          name="title"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Title</h6>}
          yle={{
            marginBottom: 32,
          }}
        >
          <Input placeholder="Type your title" />
        </Form.Item>

        <Form.Item
          name="comment"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Comment</h6>}
          yle={{
            marginBottom: 32,
          }}
        >
          <TextArea rows={5} placeholder="Type your comment" />
        </Form.Item>

        <Form.Item
          name="created_by"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Created by</h6>}
        >
          <UserSelect />
        </Form.Item>
        <div className="d-flex justify-content-end">
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

export default CreateJobReview;
