/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Form, Input, Modal, Select } from 'antd';
import { useWatch } from 'antd/lib/form/Form';
import TextArea from 'antd/lib/input/TextArea';
import { isEmpty } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../../../redux/actions';

const SubmitWalkthroughStep = ({ onCancel, data, ...props }) => {
  const { status } = useSelector(
    ({ walkthroughStep }) => walkthroughStep.createWalkthroughStepAction
  );
  const { status: updateStatus } = useSelector(
    ({ walkthroughStep }) => walkthroughStep.updateWalkthroughStepAction
  );

  const { data: walkthroughCategorys, loading } = useSelector(
    ({ walkthroughCategory }) => walkthroughCategory.walkthroughCategorys,
    shallowEqual
  );

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const walkthrough_category_id = useWatch('walkthrough_category_id', form);
  const walkthrough_type = useWatch('walkthrough_type', form);

  const walkthroughCategoryStepsOptions = useMemo(
    () =>
      walkthroughCategorys
        .find(({ id }) => id === walkthrough_category_id)
        ?.step.map((value) => ({ value, label: value })) || [],
    [walkthroughCategorys, walkthrough_category_id]
  );

  const isSubmitting = useMemo(
    () => status === 'submitting' || updateStatus === 'submitting',
    [status, updateStatus]
  );

  // set data
  useEffect(() => {
    if (!isEmpty(data)) {
      form.setFieldsValue({
        ...data,
        walkthrough_category_id: data.walkthrough_category?.id,
      });
    }
  }, [data, form]);

  useEffect(() => {
    dispatch(Actions.getWalkthroughCategorys());
  }, [dispatch]);

  const onFinish = ({ ...values }) => {
    const payload = {
      ...values,
    };
    if (!isEmpty(data)) {
      dispatch(
        Actions.updateWalkthroughStep({
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
        Actions.createWalkthroughStep({
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
      title={isEmpty(data) ? 'New Walkthrough Step' : 'Edit Walkthrough Step'}
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
          name="walkthrough_category_id"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Category</h6>}
        >
          <Select
            placeholder="Choose category"
            optionFilterProp="label"
            showSearch
            loading={loading}
            options={walkthroughCategorys.map(
              ({ id: value, category_name: label }) => ({ value, label })
            )}
            onChange={() => {
              form.setFieldValue('step_name');
              form.setFieldValue('walkthrough_type');
            }}
          />
        </Form.Item>

        <Form.Item
          name="step_name"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Step</h6>}
        >
          <Select
            placeholder="Choose step"
            loading={loading}
            options={walkthroughCategoryStepsOptions}
            onChange={(value) => {
              if (value) {
                //auto select possible type
                form.setFieldValue(
                  'walkthrough_type',
                  value.toUpperCase().includes('START')
                    ? 'START_TOUR'
                    : value.toUpperCase().includes('END')
                    ? 'END_TOUR'
                    : 'TOUR_STEP'
                );
              }
            }}
          />
        </Form.Item>

        <Form.Item
          name="walkthrough_type"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Type</h6>}
        >
          <Select
            placeholder="Choose type"
            options={['START_TOUR', 'TOUR_STEP', 'END_TOUR'].map((value) => ({
              value,
            }))}
          />
        </Form.Item>

        <Form.Item
          name="title"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Title</h6>}
          style={{
            marginBottom: 32,
          }}
        >
          <Input placeholder="Type title" />
        </Form.Item>

        {walkthrough_type !== 'END_TOUR' && (
          <Form.Item
            name="content"
            rules={[{ required: true, message: 'This field is required' }]}
            label={<h6 className="h6-lg">Content</h6>}
            style={{
              marginBottom: 32,
            }}
          >
            <TextArea rows={5} placeholder="Type content" />
          </Form.Item>
        )}

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

export default SubmitWalkthroughStep;
