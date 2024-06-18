/* eslint-disable no-shadow */
/* eslint-disable react/jsx-key */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Affix, Button, Divider, Drawer, Form, Input, Radio } from 'antd';
import { useWatch } from 'antd/lib/form/Form';
import { isEmpty } from 'lodash';
import React, { useEffect, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UserSelect from '../../../../components/util-components/selector/UserSelect';
import {
  addCourseInstructor,
  createCourseStudent,
} from '../../../../redux/actions';

const AddUser = ({ open, onClose, type, data, ...props }) => {
  const { status: studentAddstatus } = useSelector(
    ({ masterclass }) => masterclass.createCourseStudentAction
  );
  const { status: addCourseInstructorStatus } = useSelector(
    ({ masterclass }) => masterclass.addCourseInstructorAction
  );
  const [form] = Form.useForm();
  const userType = useWatch('userType', form);
  const dispatch = useDispatch();

  const isSubmitting = useMemo(
    () =>
      studentAddstatus === 'submitting' ||
      addCourseInstructorStatus === 'submitting',
    [studentAddstatus, addCourseInstructorStatus]
  );

  const { masterclassId } = useParams();

  // set form data initially when updating
  useEffect(() => {
    if (!isEmpty(data)) {
      const { from_which_date, zone, ...formData } = data;
      form.setFieldsValue({
        ...formData,
      });
    }
  }, [data, form]);

  const onFinish = ({ userType, ...values }) => {
    if (userType === 'student') {
      dispatch(
        createCourseStudent({
          ...values,
          course_id: Number(masterclassId),
          onSuccess: () => {
            onClose();
            form.resetFields();
          },
        })
      );
    } else {
      dispatch(
        addCourseInstructor({
          ...values,
          course_id: masterclassId,
          onSuccess: () => {
            onClose();
            form.resetFields();
          },
        })
      );
    }
  };

  return (
    <Drawer
      open={open}
      footer={null}
      closable={false}
      width={710}
      contentWrapperStyle={{ maxWidth: '100vw' }}
      bodyStyle={{
        height: '100vh',
        padding: '32px 0px',
      }}
      className="custom_styles"
      onClose={onClose}
      {...props}
    >
      <Affix offsetTop={1} style={{ background: 'white' }}>
        <div
          className="d-flex align-items-center justify-content-between px-5 mx-1 pt-4 pt-3"
          style={{ gap: 10, paddingBottom: 14, background: 'white' }}
        >
          <h5 className="h5-sm text-black mb-0">Add new user</h5>
          <img
            src="/assets/img/icons/modal-close.svg"
            alt=""
            style={{ height: 20 }}
            className="cursor-pointer"
            onClick={onClose}
          />
        </div>
        <Divider
          className="mt-0"
          style={{ borderTop: '1px solid #C4C4C4', marginBottom: 41 }}
        />
      </Affix>
      <div className="px-5">
        <Form
          layout="vertical"
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          className="custom-form-style"
          hideRequiredMark
        >
          <Form.Item
            name="userType"
            label={
              <h6 className="h6-lg mb-4 text-black">
                What role do you want to add?
              </h6>
            }
            className="mb-3"
            initialValue="student"
          >
            <Radio.Group>
              <Radio value="student" className="mb-1 mr-4">
                <span className="btn-txt-light pr4">Student</span>
              </Radio>
              <Radio value="instructor" className="mb-1">
                <span className="btn-txt-light pr4">Instructor</span>
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Divider
            style={{ borderTop: '1px solid #C4C4C4', marginBottom: 23 }}
          />

          {userType === 'student' ? (
            <>
              <h4 className="h4-lg text-black" style={{ marginBottom: 32 }}>
                Add a student
              </h4>
              <Form.Item
                style={{ marginBottom: 87 }}
                name="created_by"
                label={<span className="h6-lg text-black">Username</span>}
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <UserSelect placeholder="e.g. How to improve your social media profiles" />
              </Form.Item>
            </>
          ) : (
            <>
              <h5 className="h5-lg text-black mb-0">Instructors</h5>
              <p className="p-sm text-grey-light" style={{ marginBottom: 42 }}>
                In a course, members will see your Moderators and Hosts ans
                Instructors. They will still have separate Moderator or Host
                permissions, but you will have the added ability to assign
                instuctors to Lessons.
              </p>

              <Form
                layout="vertical"
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                className="custom-form-style"
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
                  rules={[
                    { required: true, message: 'This field is required' },
                  ]}
                >
                  <Input placeholder="teacher, professor, instructor..." />
                </Form.Item>

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
                            label={
                              <h6
                                className="h6-sm.text-black"
                                style={{ marginBottom: 15 }}
                              >
                                Instructor {indx + 1}
                              </h6>
                            }
                            rules={[
                              {
                                required: true,
                                message: 'This field is required',
                              },
                            ]}
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
              </Form>
            </>
          )}

          <div className="d-flex justify-content-end mt-5" style={{ gap: 15 }}>
            <Button
              type="ghost px-4 btn-text-md br-4"
              size="large"
              style={{ height: 44 }}
              onClick={onClose}
            >
              <span className="text-black">Cancel</span>
            </Button>
            <Button
              type="primary px-4 btn-text-md"
              size="large"
              style={{ height: 44 }}
              htmlType="submit"
              loading={isSubmitting}
            >
              Save changes
            </Button>
          </div>
        </Form>
      </div>
    </Drawer>
  );
};

export default AddUser;
