import { Button, Drawer } from 'antd';
import React from 'react';

const CourseDone = ({
  open,
  CourseSteper,
  CourseHeader,
  onBackToDashboard,
  onBackToCourses,
}) => {
  return (
    <Drawer
      open={open}
      footer={null}
      closable={false}
      width={710}
      zIndex={1004}
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
        <div className="d-flex align-items-center flex-column">
          <h5
            className="h5-lg text-black text-center mb-3"
            style={{ maxWidth: 372, marginTop: 42 }}
          >
            How to build a brand has been created and it’s under review!
          </h5>
          <p
            className="p-sm text-grey-light text-center"
            style={{ marginBottom: 22, maxWidth: 522 }}
          >
            Your new course has been created, but our moderators will review it
            soon. Don’t worry, meanwhile you can invite new members and let them
            know about you new course.
          </p>
          <Button
            type="primary w-100 btn-text-md br-4"
            style={{ height: 31, marginBottom: 19, maxWidth: 244 }}
            onClick={onBackToDashboard}
          >
            <span className="text-white">Back to dashboard</span>
          </Button>
          <Button
            type="ghost btn-txt-light br-3 text-black w-100"
            style={{ height: 31, maxWidth: 244, marginBottom: 19 }}
            onClick={onBackToDashboard}
          >
            <span className="text-black">Invite members</span>
          </Button>
          <Button
            type="text fw-13 fw-4 w-100"
            style={{ height: 31, maxWidth: 244, marginBottom: 19 }}
            onClick={onBackToCourses}
          >
            <span className="text-black">
              <u>Back to courses</u>
            </span>
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default CourseDone;
