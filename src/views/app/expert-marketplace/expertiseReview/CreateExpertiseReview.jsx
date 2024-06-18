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

const CreateExpertiseReview = ({ onCancel, data, ...props }) => {
  const { status } = useSelector(
    ({ expertiseReview }) => expertiseReview.createExpertiseReviewAction
  );
  const { status: updateStatus } = useSelector(
    ({ expertiseReview }) => expertiseReview.updateExpertiseReviewAction
  );
  const { data: expertises, loading: loadingExpertise } = useSelector(
    ({ marketplace }) => marketplace.expertMarketplaces
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
        gig_id: data.gig?.id,
      });
    }
  }, [data, form]);

  useEffect(() => {
    dispatch(Actions.getExpertMarketplaces());
  }, [dispatch]);

  const onFinish = ({ ...values }) => {
    const payload = {
      ...values,
    };
    if (!isEmpty(data)) {
      dispatch(
        Actions.updateExpertiseReview({
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
        Actions.createExpertiseReview({
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
      title={isEmpty(data) ? 'New Expertise Review' : 'Edit Expertise Review'}
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
          name="expert_name"
          rules={[{"required":true,"message":"This field is required"  }]}
          label={<h6 className="h6-lg">Expert name</h6>}
        >
          <UserSelect placeholder="Choose expert name" />
        </Form.Item> */}

        <Form.Item
          name="gig_id"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Expertise name</h6>}
        >
          <Select
            placeholder="Choose expertise name"
            allowClear
            showSearch
            loading={loadingExpertise}
            optionFilterProp="label"
            options={expertises?.map(
              ({ id: value, expertise_title: label }) => ({
                value,
                label,
              })
            )}
          />
        </Form.Item>

        <h3 className="h3-sm required-mark" style={{ marginBottom: 17 }}>
          {t('Expert review')}
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
          {t('Expertise content')}
        </h6>
        <Form.Item
          required={false}
          style={{ marginBottom: 0 }}
          rules={[{ required: true, message: 'This field is required' }]}
          name="expertise_content_rating"
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
          name="delivery_rating"
        >
          <Rating style={{ marginBottom: 17 }} />
        </Form.Item>

        <h6 className="h6-lg" style={{ marginBottom: 0 }}>
          {t('Results')}
        </h6>
        <Form.Item
          required={false}
          style={{ marginBottom: 0 }}
          rules={[{ required: true, message: 'This field is required' }]}
          name="results_rating"
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
          name="message"
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

export default CreateExpertiseReview;
