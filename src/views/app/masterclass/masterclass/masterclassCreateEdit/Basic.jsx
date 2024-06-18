/* eslint-disable camelcase */
import { Button, DatePicker, Drawer, Form, Input, Select } from 'antd';
import { useWatch } from 'antd/lib/form/Form';
import moment from 'moment';
import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import UploadImage from '../../../../../components/UploadImage';
import CKEditor5 from '../../../../../components/util-components/CkEditor';
import GoalSelect from '../../../../../components/util-components/selector/GoalSelect';
import LanguageSelect from '../../../../../components/util-components/selector/LanguageSelect';
import UserSelect from '../../../../../components/util-components/selector/UserSelect';
import arrayToCommaSeparateString from '../../../../../helpers/arrayToCommaSeparateString';
import useTranslation from '../../../../../helpers/useTranslation';
import {
  getCourseCategorys,
  submitCourseBasic,
} from '../../../../../redux/actions';

const CourseBasic = ({
  open,
  CourseSteper,
  CourseHeader,
  onNext,
  courseId,
}) => {
  const { list: courseCategory } = useSelector((state) => state.courseCategory);
  const { status } = useSelector(
    ({ masterclass }) => masterclass.submitCourseBasicAction
  );
  const course = useSelector(
    ({ masterclass }) => masterclass.course.data,
    shallowEqual
  );

  const [form] = Form.useForm();

  const course_title = useWatch('course_title', form);
  const course_catch_line = useWatch('course_catch_line', form);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onFinish = ({ goals, start_date, end_date, ...values }) => {
    const payload = { ...values, goals: arrayToCommaSeparateString(goals) };
    if (start_date) {
      payload.start_date = moment(start_date).format();
    }
    if (end_date) {
      payload.end_date = moment(end_date).format();
    }
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

  useEffect(() => {
    dispatch(getCourseCategorys());
  }, [dispatch]);

  useEffect(() => {
    if (courseId && course?.id) {
      form.setFieldsValue({
        ...course,
        goals: course?.goals?.map?.(({ id }) => id),
        created_by: course?.created_by?.id,
        start_date: moment(course?.start_date).isValid()
          ? moment(course?.start_date, 'YYYY/MM/DD')
          : undefined,
        end_date: moment(course?.end_date).isValid()
          ? moment(course?.end_date, 'YYYY/MM/DD')
          : undefined,
      });
    } else {
      form.resetFields();
    }
  }, [course, courseId, form]);

  return (
    <Drawer
      open={open}
      footer={null}
      closable={false}
      width={710}
      zIndex={999}
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
          Create a course
        </h5>
        <p className="p-sm text-grey-light" style={{ marginBottom: 42 }}>
          Write basic information about your course here
        </p>

        <Form
          layout="vertical"
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          className="custom-form-style"
        >
          <Form.Item
            style={{ marginBottom: 11 }}
            name="course_title"
            rules={[{ required: true, message: 'This field is required' }]}
            label={<span className="h6-lg text-black">Course title</span>}
          >
            <Input
              placeholder="e.g. How to improve your social media profiles"
              maxLength={50}
            />
          </Form.Item>
          <p
            className="p-sm text-black text-right"
            style={{ marginBottom: 16 }}
          >
            {50 - (course_title?.length || 0)}
          </p>

          <Form.Item
            style={{ marginBottom: 48 }}
            name="course_description"
            rules={[{ required: true, message: 'This field is required' }]}
            label={<span className="h6-lg text-black">Course description</span>}
          >
            <CKEditor5
              rows={6}
              placeholder="e.g. How to improve your social media profiles"
            />
          </Form.Item>

          <Row className="mx-n3">
            <Col xs={12} md={6} className="px-3">
              <Form.Item
                name="start_date"
                label={<p className="fs-16 fw-6 mb-0">{t('Start date')} *</p>}
                style={{ marginBottom: 61 }}
                rules={[{ required: true, message: 'This field is required' }]}
                required={false}
              >
                <DatePicker
                  suffixIcon={
                    <img
                      src="/assets/img/icons/date.svg"
                      alt=""
                      style={{ height: 31 }}
                      className="cursor-pointer mr-2"
                    />
                  }
                  placeholder=" "
                  size="large"
                  className="br-4 w-100 suffix-start"
                  style={{
                    background: '#FFFEFE',
                    border: '1px solid #E7E7E7',
                    height: 61,
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={12} md={6} className="px-3">
              <Form.Item
                name="end_date"
                label={<p className="fs-16 fw-6 mb-0">{t('End date')} *</p>}
                style={{ marginBottom: 61 }}
                rules={[{ required: true, message: 'This field is required' }]}
                required={false}
              >
                <DatePicker
                  suffixIcon={
                    <img
                      src="/assets/img/icons/date.svg"
                      alt=""
                      style={{ height: 31 }}
                      className="cursor-pointer mr-2"
                    />
                  }
                  placeholder=" "
                  size="large"
                  className="br-4 w-100 suffix-start"
                  style={{
                    background: '#FFFEFE',
                    border: '1px solid #E7E7E7',
                    height: 61,
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            style={{ marginBottom: 40 }}
            name="course_category"
            rules={[{ required: true, message: 'This field is required' }]}
            label={<span className="h6-lg text-black">Course category</span>}
          >
            <Select
              options={courseCategory.map?.((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: 40 }}
            name="created_by"
            rules={[{ required: true, message: 'This field is required' }]}
            label={<span className="h6-lg text-black">Created by</span>}
          >
            <UserSelect />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: 40 }}
            name="status"
            rules={[{ required: true, message: 'This field is required' }]}
            label={<span className="h6-lg text-black">Status</span>}
            initialValue="ACTIVE"
          >
            <Select
              options={[
                {
                  value: 'PENDING',
                  label: 'PENDING',
                },
                {
                  value: 'ACTIVE',
                  label: 'ACTIVE',
                },
                {
                  value: 'DELETED',
                  label: 'REJECTED',
                },
              ]}
            />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: 11 }}
            name="course_catch_line"
            rules={[{ required: true, message: 'This field is required' }]}
            label={<span className="h6-lg text-black">Course catchline</span>}
          >
            <Input
              placeholder="e.g. How to improve your social media profiles"
              maxLength={100}
            />
          </Form.Item>
          <p
            className="p-sm text-black text-right"
            style={{ marginBottom: 16 }}
          >
            {100 - (course_catch_line?.length || 0)}
          </p>

          <Form.Item
            style={{ marginBottom: 30 }}
            name="course_requirements"
            rules={[{ required: true, message: 'This field is required' }]}
            label={
              <span className="h6-lg text-black">
                {t('Course requirements')}
              </span>
            }
          >
            <CKEditor5
              rows={6}
              placeholder="e.g. How to improve your social media profiles"
            />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: 31 }}
            name="what_you_will_learn"
            rules={[{ required: true, message: 'This field is required' }]}
            label={
              <span className="h6-lg text-black">
                {t('What you will learn')}
              </span>
            }
          >
            <CKEditor5
              rows={6}
              placeholder="e.g. How to improve your social media profiles"
            />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: 41 }}
            name="language"
            rules={[{ required: true, message: 'This field is required' }]}
            label={<span className="h6-lg text-black">Course language</span>}
          >
            <LanguageSelect />
          </Form.Item>

          <h6 className="h6-lg text-black">
            Sustainable development goals (max 3.)
          </h6>
          <Form.Item
            style={{ marginBottom: 0 }}
            name="goals"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <GoalSelect max={3} />
          </Form.Item>
          <div style={{ marginBottom: 30 }} />

          <Form.Item
            style={{ marginBottom: 63 }}
            label={
              <span className="h6-lg text-black">
                Upload an image for your class
              </span>
            }
            required
          >
            <div className="p-2 border rounded-2 d-flex justify-content-center">
              <Form.Item
                name="course_image"
                aspect={1.5}
                noStyle
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <UploadImage className="d-flex justify-content-center">
                  <img
                    src="/assets/img/icons/add-media.svg"
                    className="my-auto mx-1 mb-sm-2"
                    alt="icon"
                    style={{ height: 22 }}
                  />
                  <h6 className="fs-12 fw-6 mb-1 hb-text-primary">
                    <u>Add media</u>
                  </h6>
                </UploadImage>
              </Form.Item>
            </div>
          </Form.Item>

          <div
            className="d-flex align-items-center justify-content-end"
            style={{ marginBottom: 18 }}
          >
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

export default CourseBasic;
