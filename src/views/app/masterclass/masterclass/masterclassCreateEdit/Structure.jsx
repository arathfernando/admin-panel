import { Button, Drawer, Form, Radio } from 'antd';
import React, { useEffect } from 'react';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { submitCourseBasic } from '../../../../../redux/actions';

const CourseStructure = ({
  open,
  CourseSteper,
  CourseHeader,
  onNext,
  onBack,
  form,
  courseId,
}) => {
  const { status } = useSelector(
    ({ masterclass }) => masterclass.submitCourseBasicAction
  );
  const course = useSelector(
    ({ masterclass }) => masterclass.course.data,
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (courseId && course?.course_access_type) {
      form.setFieldsValue({
        ...course,
        goals: course?.goals?.map?.(({ id }) => id),
      });
    } else {
      form.resetFields();
    }
  }, [course, courseId, form]);

  const onFinish = (values) => {
    const payload = { ...values };
    dispatch(
      submitCourseBasic({
        ...payload,
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
      zIndex={1000}
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
        <h5 className="h4-lg text-black" style={{ margin: '42px 0px 30px' }}>
          Choose the access type for your course
        </h5>

        <Form
          layout="vertical"
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          className="custom-form-style"
        >
          <Form.Item
            style={{ marginBottom: 12 }}
            name="course_access_type"
            rules={[{ required: true, message: 'This field is required' }]}
            initialValue="PAID"
          >
            <Radio.Group>
              <Radio value="PAID" style={{ marginBottom: 30 }}>
                <div style={{ paddingLeft: 7 }}>
                  <h6 className="h6-lg" style={{ marginBottom: 2 }}>
                    Paid
                  </h6>
                  <p className="p-sm mb-0">
                    This course is a paid course. Access to all its materials
                    and lessons is available only to those who have made a
                    payment for the course.
                  </p>
                </div>
              </Radio>
              <Radio value="FREE" style={{ marginBottom: 30 }}>
                <div style={{ paddingLeft: 7 }}>
                  <h6 className="h6-lg" style={{ marginBottom: 2 }}>
                    Free
                  </h6>
                  <p className="p-sm mb-0">
                    {` This course is completely free to access! Whether you're a
                    beginner or an expert looking to brush up on your skills,
                    you'll have full access to all of the course materials and
                    lessons without any cost`}
                  </p>
                </div>
              </Radio>
              <Radio value="PRIVATE" style={{ marginBottom: 30 }}>
                <div style={{ paddingLeft: 7 }}>
                  <h6 className="h6-lg" style={{ marginBottom: 2 }}>
                    Private
                  </h6>
                  <p className="p-sm mb-0">
                    This course is private and access is only available to those
                    who have received an invitation or have been manually
                    granted access by the course instructor
                  </p>
                </div>
              </Radio>
            </Radio.Group>
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

export default CourseStructure;
