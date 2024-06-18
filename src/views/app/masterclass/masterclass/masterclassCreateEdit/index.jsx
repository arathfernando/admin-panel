/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable camelcase */
import { Divider, Form } from 'antd';
import { useWatch } from 'antd/lib/form/Form';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCourse, resetCourseFormdata } from '../../../../../redux/actions';

import Steper from '../../../../../components/util-components/Steper';
import CourseBasic from './Basic';

import CourseDone from './Done';
import CourseInstructors from './Instructors';
import CoursePayment from './Priching';
import CourseStructure from './Structure';

const CourseCreateEdit = ({ open, onClose, courseId }) => {
  const [currentTabKey, setCurrentTabKey] = useState('');

  const [accessTypeForm] = Form.useForm();
  const course_access_type = useWatch('course_access_type', accessTypeForm);

  const dispatch = useDispatch();

  useEffect(() => {
    if (open) {
      setCurrentTabKey('Basic');
    } else {
      setCurrentTabKey('');
    }
  }, [open]);

  useEffect(() => {
    // clear previously saved redux state initially
    dispatch(resetCourseFormdata());
  }, [dispatch]);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    courseId && dispatch(getCourse(courseId));
  }, [courseId, dispatch]);

  const CourseHeader = () => (
    // <Affix offsetTop={1} style={{ background: 'white' }}>
    <>
      <div
        className="d-flex align-items-center justify-content-between px-5 mx-1 pt-4 pt-3"
        style={{ gap: 10, paddingBottom: 14, background: 'white' }}
      >
        <h5 className="h5-sm text-black mb-0">New course</h5>
        <img
          src="/assets/img/icons/modal-close.svg"
          alt=""
          style={{ height: 20 }}
          className="cursor-pointer"
          onClick={onClose}
        />
      </div>
      <Divider className="my-0" style={{ borderTop: '1px solid #C4C4C4' }} />
    </>
    // </Affix>
  );

  const items = useMemo(
    () => [
      {
        title: 'Basic',
        key: 'Basic',
      },
      {
        title: 'Structure',
        key: 'Structure',
      },
      ...(course_access_type === 'PAID'
        ? [
            {
              title: 'Pricing',
              key: 'Pricing',
            },
          ]
        : []),
      {
        title: 'Instructors',
        key: 'Instructors',
      },
      {
        title: 'Done',
        key: 'Done',
      },
    ],
    [course_access_type]
  );

  const CourseSteper = useCallback(
    () => (
      <div className="overflow-auto scrollbar-hidden px-5 px-md-4">
        <Steper
          style={{ marginTop: 53 }}
          items={items}
          currentKey={currentTabKey}
          onStepChange={(key) => setCurrentTabKey(key)}
        />
      </div>
    ),
    [currentTabKey, items]
  );

  return (
    <>
      <CourseBasic
        open={currentTabKey === 'Basic'}
        CourseSteper={CourseSteper}
        CourseHeader={CourseHeader}
        onNext={() => setCurrentTabKey('Structure')}
        courseId={courseId}
      />
      <CourseStructure
        form={accessTypeForm}
        open={currentTabKey === 'Structure'}
        CourseSteper={CourseSteper}
        CourseHeader={CourseHeader}
        onBack={() => setCurrentTabKey('Basic')}
        onNext={() =>
          setCurrentTabKey(
            course_access_type === 'PAID' ? 'Pricing' : 'Instructors'
          )
        }
        courseId={courseId}
      />
      <CoursePayment
        open={currentTabKey === 'Pricing'}
        CourseSteper={CourseSteper}
        CourseHeader={CourseHeader}
        onBack={() => setCurrentTabKey('Structure')}
        onNext={() => setCurrentTabKey('Instructors')}
        courseId={courseId}
      />
      <CourseInstructors
        open={currentTabKey === 'Instructors'}
        CourseSteper={CourseSteper}
        CourseHeader={CourseHeader}
        onBack={() =>
          setCurrentTabKey(
            course_access_type === 'PAID' ? 'Pricing' : 'Structure'
          )
        }
        onNext={() => setCurrentTabKey('Done')}
        courseId={courseId}
      />
      <CourseDone
        open={currentTabKey === 'Done'}
        CourseSteper={CourseSteper}
        CourseHeader={CourseHeader}
        onBackToDashboard={() => onClose()}
        onBackToCourses={() => onClose()}
      />
    </>
  );
};

export default CourseCreateEdit;
