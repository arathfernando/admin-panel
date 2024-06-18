/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Form, Input, Modal, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { isEmpty } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../../../../components/util-components/Rating';
import UserSelect from '../../../../components/util-components/selector/UserSelect';
import useTranslation from '../../../../helpers/useTranslation';
import * as Actions from '../../../../redux/actions';

const CreateMasterclassReview = ({ onCancel, data, ...props }) => {
  const { status } = useSelector(
    ({ masterclassReview }) => masterclassReview.createMasterclassReviewAction
  );
  const { status: updateStatus } = useSelector(
    ({ masterclassReview }) => masterclassReview.updateMasterclassReviewAction
  );
  const { data: masterclasses, loading: loadingMasterclass } = useSelector(
    ({ masterclass }) => masterclass.masterclasses
  );

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
        course_id: data?.course_basic?.id,
        over_all_rating: Number(data.over_all_rating || 0),
        lesson_activity: Number(data.lesson_activity || 0),
        lesson_content: Number(data.lesson_content || 0),
        teacher_quality: Number(data.teacher_quality || 0),
      });
    }
  }, [data, form]);

  useEffect(() => {
    dispatch(Actions.getMasterclasses());
  }, [dispatch]);

  const onFinish = ({ ...values }) => {
    const payload = {
      ...values,
    };
    if (!isEmpty(data)) {
      dispatch(
        Actions.updateMasterclassReview({
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
        Actions.createMasterclassReview({
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
      title={
        isEmpty(data) ? 'New Masterclass Review' : 'Edit Masterclass Review'
      }
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
        {/* <Form.Item
          name="teacher_name"
          rules={[{"required":true,"message":"This field is required"  }]}
          label={<h6 className="h6-lg">Teacher name</h6>}
        >
          <UserSelect placeholder="Choose teacher name" />
        </Form.Item> */}

        <Form.Item
          name="course_id"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Masterclass name</h6>}
        >
          <Select
            placeholder="Choose masterclass name"
            allowClear
            showSearch
            loading={loadingMasterclass}
            optionFilterProp="label"
            options={masterclasses?.map(
              ({ id: value, course_title: label }) => ({ value, label })
            )}
          />
        </Form.Item>

        <h3 className="h3-sm required-mark" style={{ marginBottom: 17 }}>
          {t('Teacher review')}
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
          {t('Lesson content')}
        </h6>
        <Form.Item
          required={false}
          style={{ marginBottom: 0 }}
          rules={[{ required: true, message: 'This field is required' }]}
          name="lesson_content"
        >
          <Rating style={{ marginBottom: 17 }} />
        </Form.Item>

        <h6 className="h6-lg" style={{ marginBottom: 0 }}>
          {t('Lesson activities')}
        </h6>
        <Form.Item
          required={false}
          style={{ marginBottom: 0 }}
          rules={[{ required: true, message: 'This field is required' }]}
          name="lesson_activity"
        >
          <Rating style={{ marginBottom: 17 }} />
        </Form.Item>

        <h6 className="h6-lg" style={{ marginBottom: 0 }}>
          {t('Teacher quality')}
        </h6>
        <Form.Item
          required={false}
          rules={[{ required: true, message: 'This field is required' }]}
          name="teacher_quality"
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

export default CreateMasterclassReview;
