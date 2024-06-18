/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-key */
import { Button, Drawer, Form, Input } from 'antd';
import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import UserSelect from '../../../../../components/util-components/selector/UserSelect';
import { submtCourseInstructors } from '../../../../../redux/actions';

const CourseInstructors = ({
  open,
  CourseSteper,
  CourseHeader,
  onBack,
  onNext,
  courseId,
}) => {
  const { status } = useSelector(
    ({ masterclass }) => masterclass.submtCourseInstructorsAction
  );
  const course = useSelector(
    ({ masterclass }) => masterclass.course.data,
    shallowEqual
  );

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (courseId && course?.instructors) {
      form.setFieldsValue({
        instructors: course.instructors?.[0]?.instructor_id,
        instructor_title: course.instructors?.[0]?.instructor_title,
      });
    } else {
      form.resetFields();
    }
  }, [course, courseId, form]);

  const onFinish = (values) => {
    const payload = { ...values };
    dispatch(
      submtCourseInstructors({
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
        <h5 className="h5-lg text-black" style={{ margin: '42px 0px 2px' }}>
          Instructors
        </h5>
        <p className="p-sm text-grey-light" style={{ marginBottom: 42 }}>
          In a course, members will see your Moderators and Hosts ans
          Instructors. They will still have separate Moderator or Host
          permissions, but you will have the added ability to assign instuctors
          to Lessons.
        </p>

        <Form
          layout="vertical"
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          className="custom-form-style"
          hideRequiredMark
        >
          <Form.Item
            style={{ marginBottom: 31 }}
            name="instructor_title"
            label={
              <div>
                <p className="p-sm mb-1 text-grey-light">
                  {`You can rename your Course's Instructors here.`}
                </p>
              </div>
            }
          >
            <Input placeholder="Public" />
          </Form.Item>

          <h6 className="h6-lg text-black" style={{ marginBottom: 15 }}>
            Add instructor
          </h6>
          <p className="p-sm text-grey-light" style={{ marginBottom: 22 }}>
            You can add new instructors to your course here by linking their
            Hubbers profile.
          </p>

          <Form.List initialValue={['']} name="instructor_id">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, indx) => (
                  <div
                    className="d-flex justify-content-between align-items-end"
                    style={{ gap: 24 }}
                  >
                    <Form.Item
                      style={{ marginBottom: 22, flexGrow: 1 }}
                      {...field}
                      rules={[
                        { required: true, message: 'This field is required' },
                      ]}
                      label={
                        <h6
                          className="h6-sm text-black"
                          style={{ marginBottom: 5 }}
                        >
                          Instructor {indx + 1}
                        </h6>
                      }
                    >
                      <UserSelect placeholder="@JohnMalik" />
                    </Form.Item>

                    {fields?.length > 1 && (
                      <img
                        src="/assets/img/icons/delete-outline.svg"
                        alt=""
                        style={{ height: 23, marginBottom: 28 }}
                        className="cursor-pointer"
                        onClick={() => remove(indx)}
                      />
                    )}
                  </div>
                ))}
                <Button
                  type="text px-0"
                  className="h6-sm hb-text-primary"
                  style={{ marginBottom: 31 }}
                  onClick={() => add('')}
                >
                  + Add new instructor
                </Button>
              </>
            )}
          </Form.List>

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

export default CourseInstructors;
