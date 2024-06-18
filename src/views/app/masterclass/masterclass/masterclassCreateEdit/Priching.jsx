/* eslint-disable camelcase */
import { Button, Drawer, Form, InputNumber, Select } from 'antd';
import { useWatch } from 'antd/lib/form/Form';
import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { submitCoursePricing } from '../../../../../redux/actions';

const CoursePricing = ({
  open,
  CourseSteper,
  CourseHeader,
  onBack,
  onNext,
  courseId,
}) => {
  const { status } = useSelector(
    ({ masterclass }) => masterclass.submitCoursePricingAction
  );
  const course = useSelector(
    ({ masterclass }) => masterclass.course.data,
    shallowEqual
  );

  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const pricing_type = useWatch('pricing_type', form);

  useEffect(() => {
    if (courseId && course?.course_payment) {
      form.setFieldsValue({
        ...course.course_payment,
      });
    } else {
      form.resetFields();
    }
  }, [course, courseId, form]);

  const onFinish = (values) => {
    const payload = { ...values };
    dispatch(
      submitCoursePricing({
        ...payload,
        id: courseId && course.course_payment?.id,
        courseId,
        onSuccess: () => {
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
      width={710}
      zIndex={1001}
      contentWrapperStyle={{ maxWidth: '100vw' }}
      bodyStyle={{
        height: '100vh',
        padding: 0,
      }}
      className="custom_styles"
    >
      <CourseHeader />
      <CourseSteper />
      <div className="px-5 mx-1">
        <Form
          layout="vertical"
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          className="custom-form-style"
          style={{ marginTop: 42 }}
          hideRequiredMark
        >
          <Form.Item
            style={{ marginBottom: 30 }}
            name="pricing_currency"
            rules={[{ required: true, message: 'This field is required' }]}
            label={
              <div>
                <h6 className="h6-lg text-black" style={{ marginBottom: 30 }}>
                  Pricing currency
                </h6>
                <p className="p-sm mb-1 text-grey-light">
                  You have the option to receive payment either in cash or in
                  tokens. Please chose your preferred payment method.
                </p>
              </div>
            }
            initialValue="HBB_TOKEN"
          >
            <Select
              style={{ maxWidth: 344 }}
              options={[
                { value: 'HBB_TOKEN', label: 'HBB Token' },
                { value: 'CASH', label: 'Cash' },
              ]}
            />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: 35 }}
            name="pricing_type"
            rules={[{ required: true, message: 'This field is required' }]}
            label={
              <div>
                <h6 className="h6-lg text-black" style={{ marginBottom: 30 }}>
                  Pricing type
                </h6>
                <p className="p-sm mb-1 text-grey-light">
                  Choose how you want to charge for this new plan.
                </p>
              </div>
            }
            initialValue="ONE_TIME"
          >
            <Select
              style={{ maxWidth: 344 }}
              options={[
                { value: 'ONE_TIME', label: 'One time payment ' },
                { value: 'INSTALLMENT', label: 'Instalments' },
              ]}
            />
          </Form.Item>

          {pricing_type === 'INSTALLMENT' && (
            <Form.Item
              style={{ marginBottom: 30 }}
              name="installment"
              rules={[{ required: true, message: 'This field is required' }]}
              label={
                <div>
                  <h6 className="h6-lg text-black" style={{ marginBottom: 12 }}>
                    Instalments
                  </h6>
                  <p className="p-sm mb-1 text-grey-light">
                    Type how you many instalments you want this course to be
                    paid
                  </p>
                </div>
              }
            >
              <InputNumber
                placeholder="2"
                style={{ maxWidth: 344 }}
                className="w-100"
              />
            </Form.Item>
          )}

          <Form.Item
            style={{ marginBottom: 40 }}
            name="pricing"
            rules={[{ required: true, message: 'This field is required' }]}
            label={
              <div>
                <h6 className="h6-lg text-black" style={{ marginBottom: 12 }}>
                  Pricing
                </h6>
                <p className="p-sm mb-1 text-grey-light">
                  Choose how you much you want to charge for this course
                </p>
              </div>
            }
          >
            <InputNumber
              placeholder="e.g. €250"
              style={{ maxWidth: 344 }}
              className="w-100"
            />
          </Form.Item>

          <div
            className="d-flex align-items-center justify-content-between flex-wrap"
            style={{ gap: 10, marginBottom: 18 }}
          >
            <Button
              type="ghost px-4 btn-txt-light br-3 text-black"
              style={{ height: 31 }}
              onClick={onBack}
            >
              <span className="text-black">Back</span>
            </Button>
            <Button
              type="primary px-4 btn-text-md br-4"
              htmlType="submit"
              style={{ height: 31 }}
              loading={status === 'submitting'}
            >
              <span className="text-white">Next</span>
            </Button>
          </div>
        </Form>
      </div>
    </Drawer>
  );
};

export default CoursePricing;
