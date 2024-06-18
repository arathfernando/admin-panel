/* eslint-disable camelcase */
/* eslint-disable no-redeclare */
/* eslint-disable block-scoped-var */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-named-as-default-member */
import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';

import {
  ADD_COURSE_INSTRUCTOR,
  CREATE_COURSE_STUDENT,
  DELETE_COURSE,
  GET_COURSE,
  GET_COURSE_INSTRUCTORS,
  GET_COURSE_STUDENTS,
  GET_MASTERCLASSES,
  REMOBVE_COURSE_STUDENT,
  REMOVE_COURSE_INSTRUCTOR,
  SUBMIT_COURSE_BASIC,
  SUBMIT_COURSE_INSTUICTORS,
  SUBMIT_COURSE_PRICING,
} from '../types/masterclass/masterclassTypes';

import { axiosPut, del, get, post } from '../../ApiConfig';
import objectToFormData from '../../helpers/objectToFormData';
import {
  addCourseInstructorFailed,
  addCourseInstructorSuccessful,
  createCourseStudentFailed,
  createCourseStudentSuccessful,
  deleteCourseFailed,
  deleteCourseSuccessful,
  getCourseFailed,
  getCourseInstructors,
  getCourseInstructorsFailed,
  getCourseInstructorsSuccessful,
  getCourseStudents,
  getCourseStudentsFailed,
  getCourseStudentsSuccessful,
  getCourseSuccessful,
  getMasterclasses,
  getMasterclassesFailed,
  getMasterclassesSuccessful,
  remobveCourseStudentFailed,
  remobveCourseStudentSuccessful,
  removeCourseInstructorFailed,
  removeCourseInstructorSuccessful,
  submitCourseBasicFailed,
  submitCourseBasicSuccessful,
  submitCoursePricingFailed,
  submitCoursePricingSuccessful,
  submtCourseInstructorsFailed,
  submtCourseInstructorsSuccessful,
} from './actions';

// submit_course_basic
const submitCourseBasicAsync = async ({ id, ...payload }) => {
  if (id) {
    return axiosPut(
      `${`/admin/course`}/${id}`,
      objectToFormData(payload),
      {},
      { notify: true }
    );
  }
  return post(`/admin/course`, objectToFormData(payload), {}, { notify: true });
};

function* SubmitCourseBasic({ payload: { onSuccess, courseId, ...payload } }) {
  try {
    const { id } = yield select(
      ({ masterclass }) => masterclass.courseFormData
    );
    const response = yield call(submitCourseBasicAsync, {
      ...payload,
      id: courseId || id,
    });
    yield put(submitCourseBasicSuccessful(response.data));
    yield put(getMasterclasses(response));
    onSuccess?.(response);
  } catch (error) {
    yield put(submitCourseBasicFailed(error));
  }
}

// submit_course_pricing
const submitCoursePricingAsync = ({ id, course_id, ...payload }) => {
  if (id) {
    return axiosPut(
      `${`/admin/course/course-payment`}/${id}`,
      { ...payload },
      {},
      { notify: true }
    );
  }
  return post(
    `/admin/course/course-payment`,
    { ...payload, course_id },
    {},
    { notify: true }
  );
};
function* SubmitCoursePricing({
  payload: { onSuccess, paymentId, courseId, ...payload },
}) {
  try {
    const { id, course_payment } = yield select(
      ({ masterclass }) => masterclass.courseFormData
    );
    const response = yield call(submitCoursePricingAsync, {
      ...payload,
      course_id: courseId || id,
      id: paymentId || course_payment?.id,
    });
    yield put(
      submitCoursePricingSuccessful({
        course_payment: response.data?.id
          ? response?.data
          : { id: course_payment?.id },
      })
    );
    yield put(getMasterclasses(response));
    onSuccess?.(response);
  } catch (error) {
    yield put(submitCoursePricingFailed(error));
  }
}

// submit_course_instuictors
const submtCourseInstructorsAsync = ({ id, course_id, ...payload }) => {
  if (id) {
    return axiosPut(
      `${`/admin/course/course-instructor`}/${id}`,
      { course_basic: course_id, ...payload },
      {},
      { notify: true }
    );
  }
  return post(
    `/admin/course/course-instructor`,
    { course_id, ...payload },
    {},
    { notify: true }
  );
};
function* SubmtCourseInstructors({
  payload: { onSuccess, courseId, ...payload },
}) {
  try {
    const { id, instructors } = yield select(
      ({ masterclass }) => masterclass.courseFormData
    );
    const response = yield call(submtCourseInstructorsAsync, {
      ...payload,
      course_id: courseId || id,
      id: courseId || id,
    });
    yield put(
      submtCourseInstructorsSuccessful({
        instructors: response?.data?.id
          ? response?.data
          : { id: instructors?.id },
      })
    );
    yield put(getMasterclasses(response));
    onSuccess?.(response);
  } catch (error) {
    yield put(submtCourseInstructorsFailed(error));
  }
}

// get_masterclasses
const getMasterclassesAsync = () => {
  return get(`/admin/course`, { params: { page: 1, limit: 1000 } });
};
function* GetMasterclasses() {
  try {
    const response = yield call(getMasterclassesAsync);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(getMasterclassesSuccessful({ data: response.data }));
    } else {
      throw new Error('GetMasterclasses Response is not success!');
    }
  } catch (error) {
    yield put(getMasterclassesFailed({ error, data: [] }));
  }
}

// get_course
const getCourseAsync = (id) => {
  return get(`/admin/course/${id}`);
};
function* GetCourse({ payload }) {
  try {
    const response = yield call(getCourseAsync, payload);
    yield put(getCourseSuccessful({ ...payload, data: response.data }));
  } catch (error) {
    yield put(getCourseFailed({ ...payload, data: [], error }));
  }
}

// delete_course
const deleteCourseAsync = (id) => {
  return del(`/admin/course/${id}`, {}, { notify: true });
};
// delete_course
function* DeleteCourse({ payload }) {
  try {
    const response = yield call(deleteCourseAsync, payload);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(deleteCourseSuccessful(response.data));
      yield put(getMasterclasses());
    } else {
      throw new Error('DeleteCourse Response is not success!');
    }
  } catch (error) {
    yield put(deleteCourseFailed(error));
  }
}

// get_course_students
const getCourseStudentsAsync = ({ id, search }) => {
  return get(`/admin/course/course-student/${id}`, { params: { search } });
};
function* GetCourseStudents({ payload }) {
  try {
    const response = yield call(getCourseStudentsAsync, payload);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(
        getCourseStudentsSuccessful({ ...payload, data: response.data })
      );
    } else {
      throw new Error('GetCourseStudents Response is not success!');
    }
  } catch (error) {
    yield put(getCourseStudentsFailed({ ...payload, error }));
  }
}

// create_course_student
const createCourseStudentAsync = (payload) => {
  return post('/admin/course/student', payload, {}, { notify: true });
};
function* CreateCourseStudent({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(createCourseStudentAsync, payload);
    if (response.status === 201 && response.statusText === 'Created') {
      yield put(createCourseStudentSuccessful(response.data));
      onSuccess?.(response.data);
      yield put(getCourseStudents({ id: payload?.course_id }));
    } else {
      throw new Error('CreateCourseStudent Response is not success!');
    }
  } catch (error) {
    yield put(createCourseStudentFailed(error));
  }
}

// remobve_course_student
const remobveCourseStudentAsync = ({ id }) => {
  return del(`/admin/course/course-student/${id}`, {}, { notify: true });
};
// remobve_course_student
function* RemobveCourseStudent({ payload: { course_id, ...payload } }) {
  try {
    const response = yield call(remobveCourseStudentAsync, payload);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(remobveCourseStudentSuccessful(response.data));
      yield put(getCourseStudents({ id: course_id }));
    } else {
      throw new Error('RemobveCourseStudent Response is not success!');
    }
  } catch (error) {
    yield put(remobveCourseStudentFailed(error));
  }
}

// get_course_instructors
const getCourseInstructorsAsync = ({ id, search }) => {
  return get(`/admin/course/course-instructor/${id}`, { params: { search } });
};
function* GetCourseInstructors({ payload }) {
  try {
    const response = yield call(getCourseInstructorsAsync, payload);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(
        getCourseInstructorsSuccessful({ ...payload, data: response.data })
      );
    } else {
      throw new Error('GetCourseInstructors Response is not success!');
    }
  } catch (error) {
    yield put(getCourseInstructorsFailed({ ...payload, error }));
  }
}

// add_course_instructor
const addCourseInstructorAsync = (payload) => {
  return post('/admin/course/course-instructor', payload);
};
function* AddCourseInstructor({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(addCourseInstructorAsync, payload);
    if (response.status === 201 && response.statusText === 'Created') {
      yield put(addCourseInstructorSuccessful(response.data));
      onSuccess?.(response.data);
      yield put(getCourseInstructors({ id: payload.course_id }));
    } else {
      throw new Error('AddCourseInstructor Response is not success!');
    }
  } catch (error) {
    yield put(addCourseInstructorFailed(error));
  }
}

// remove_course_instructor
const removeCourseInstructorAsync = ({ id }) => {
  return del(`/admin/course/course-instructor/${id}`);
};
function* RemoveCourseInstructor({ payload: { course_id, ...payload } }) {
  try {
    const response = yield call(removeCourseInstructorAsync, payload);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(
        removeCourseInstructorSuccessful({ ...payload, data: response.data })
      );
      yield put(getCourseInstructors({ id: course_id }));
    } else {
      throw new Error('RemoveCourseInstructor Response is not success!');
    }
  } catch (error) {
    yield put(removeCourseInstructorFailed({ ...payload, error }));
  }
}

// // update_course_instructors
// const updateCourseInstructorsAsync = ({ id, ...payload }) => {
//   return axiosPut(`/admin/course/course-instructor/${id}`, payload);
// };
// function* UpdateCourseInstructors({
//   payload: { onSuccess, course_id, ...payload },
// }) {
//   try {
//     const response = yield call(updateCourseInstructorsAsync, payload);
//     if (response.status === 200 && response.statusText === 'OK') {
//       yield put(updateCourseInstructorsSuccessful(response.data));
//       onSuccess?.(response.data);
//       yield put(getCourseInstructors(course_id));
//     } else {
//       throw new Error('UpdateCourseInstructors Response is not success!');
//     }
//   } catch (error) {
//     yield put(updateCourseInstructorsFailed(error));
//   }
// }

export function* watchMasterclass() {
  yield takeLatest(SUBMIT_COURSE_BASIC, SubmitCourseBasic);
  yield takeLatest(SUBMIT_COURSE_PRICING, SubmitCoursePricing);
  yield takeLatest(SUBMIT_COURSE_INSTUICTORS, SubmtCourseInstructors);
  yield takeLatest(GET_MASTERCLASSES, GetMasterclasses);
  yield takeLatest(GET_COURSE, GetCourse);
  yield takeLatest(DELETE_COURSE, DeleteCourse);
  yield takeLatest(GET_COURSE_STUDENTS, GetCourseStudents);
  yield takeLatest(CREATE_COURSE_STUDENT, CreateCourseStudent);
  yield takeLatest(REMOBVE_COURSE_STUDENT, RemobveCourseStudent);
  yield takeLatest(GET_COURSE_INSTRUCTORS, GetCourseInstructors);
  yield takeLatest(ADD_COURSE_INSTRUCTOR, AddCourseInstructor);
  yield takeLatest(REMOVE_COURSE_INSTRUCTOR, RemoveCourseInstructor);
  // yield takeLatest(UPDATE_COURSE_INSTRUCTORS, UpdateCourseInstructors);
}

export default function* rootSaga() {
  yield all([fork(watchMasterclass)]);
}
