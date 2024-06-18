import {
  ADD_COURSE_INSTRUCTOR,
  ADD_COURSE_INSTRUCTOR_FAILED,
  ADD_COURSE_INSTRUCTOR_SUCCESSFUL,
  CREATE_COURSE_STUDENT,
  CREATE_COURSE_STUDENT_FAILED,
  CREATE_COURSE_STUDENT_SUCCESSFUL,
  DELETE_COURSE,
  DELETE_COURSE_FAILED,
  DELETE_COURSE_SUCCESSFUL,
  GET_COURSE,
  GET_COURSE_FAILED,
  GET_COURSE_INSTRUCTORS,
  GET_COURSE_INSTRUCTORS_FAILED,
  GET_COURSE_INSTRUCTORS_SUCCESSFUL,
  GET_COURSE_STUDENTS,
  GET_COURSE_STUDENTS_FAILED,
  GET_COURSE_STUDENTS_SUCCESSFUL,
  GET_COURSE_SUCCESSFUL,
  GET_MASTERCLASSES,
  GET_MASTERCLASSES_FAILED,
  GET_MASTERCLASSES_SUCCESSFUL,
  REMOBVE_COURSE_STUDENT,
  REMOBVE_COURSE_STUDENT_FAILED,
  REMOBVE_COURSE_STUDENT_SUCCESSFUL,
  REMOVE_COURSE_INSTRUCTOR,
  REMOVE_COURSE_INSTRUCTOR_FAILED,
  REMOVE_COURSE_INSTRUCTOR_SUCCESSFUL,
  RESET_COURSE_FORM_DATA,
  SUBMIT_COURSE_BASIC,
  SUBMIT_COURSE_BASIC_FAILED,
  SUBMIT_COURSE_BASIC_SUCCESSFUL,
  SUBMIT_COURSE_INSTUICTORS,
  SUBMIT_COURSE_INSTUICTORS_FAILED,
  SUBMIT_COURSE_INSTUICTORS_SUCCESSFUL,
  SUBMIT_COURSE_PRICING,
  SUBMIT_COURSE_PRICING_FAILED,
  SUBMIT_COURSE_PRICING_SUCCESSFUL,
} from '../types/masterclass/masterclassTypes';

// submit_course_basic
export const submitCourseBasic = (payload) => {
  return {
    type: SUBMIT_COURSE_BASIC,
    payload,
  };
};
export const submitCourseBasicSuccessful = (payload) => {
  return {
    type: SUBMIT_COURSE_BASIC_SUCCESSFUL,
    payload,
  };
};
export const submitCourseBasicFailed = (payload) => {
  return {
    type: SUBMIT_COURSE_BASIC_FAILED,
    payload,
  };
};

// submit_course_pricing
export const submitCoursePricing = (payload) => {
  return {
    type: SUBMIT_COURSE_PRICING,
    payload,
  };
};
export const submitCoursePricingSuccessful = (payload) => {
  return {
    type: SUBMIT_COURSE_PRICING_SUCCESSFUL,
    payload,
  };
};
export const submitCoursePricingFailed = (payload) => {
  return {
    type: SUBMIT_COURSE_PRICING_FAILED,
    payload,
  };
};

// submit_course_instuictors
export const submtCourseInstructors = (payload) => {
  return {
    type: SUBMIT_COURSE_INSTUICTORS,
    payload,
  };
};
export const submtCourseInstructorsSuccessful = (payload) => {
  return {
    type: SUBMIT_COURSE_INSTUICTORS_SUCCESSFUL,
    payload,
  };
};
export const submtCourseInstructorsFailed = (payload) => {
  return {
    type: SUBMIT_COURSE_INSTUICTORS_FAILED,
    payload,
  };
};

// reset_course_form_data
export const resetCourseFormdata = (payload) => {
  return {
    type: RESET_COURSE_FORM_DATA,
    payload,
  };
};

// get_masterclasses
export const getMasterclasses = () => {
  return {
    type: GET_MASTERCLASSES,
  };
};
export const getMasterclassesSuccessful = (payload) => {
  return {
    type: GET_MASTERCLASSES_SUCCESSFUL,
    payload,
  };
};
export const getMasterclassesFailed = (payload) => {
  return {
    type: GET_MASTERCLASSES_FAILED,
    payload,
  };
};

// get_course
export const getCourse = (payload) => {
  return {
    type: GET_COURSE,
    payload,
  };
};
export const getCourseSuccessful = (payload) => {
  return {
    type: GET_COURSE_SUCCESSFUL,
    payload,
  };
};
export const getCourseFailed = (payload) => {
  return {
    type: GET_COURSE_FAILED,
    payload,
  };
};

// delete_course
export const deleteCourse = (payload) => {
  return {
    type: DELETE_COURSE,
    payload,
  };
};
export const deleteCourseSuccessful = (payload) => {
  return {
    type: DELETE_COURSE_SUCCESSFUL,
    payload,
  };
};
export const deleteCourseFailed = (payload) => {
  return {
    type: DELETE_COURSE_FAILED,
    payload,
  };
};

// get_course_students
export const getCourseStudents = (payload) => {
  return {
    type: GET_COURSE_STUDENTS,
    payload,
  };
};
export const getCourseStudentsSuccessful = (payload) => {
  return {
    type: GET_COURSE_STUDENTS_SUCCESSFUL,
    payload,
  };
};
export const getCourseStudentsFailed = (payload) => {
  return {
    type: GET_COURSE_STUDENTS_FAILED,
    payload,
  };
};

// create_course_student
export const createCourseStudent = (payload) => {
  return {
    type: CREATE_COURSE_STUDENT,
    payload,
  };
};
export const createCourseStudentSuccessful = (payload) => {
  return {
    type: CREATE_COURSE_STUDENT_SUCCESSFUL,
    payload,
  };
};
export const createCourseStudentFailed = (payload) => {
  return {
    type: CREATE_COURSE_STUDENT_FAILED,
    payload,
  };
};

// remobve_course_student
export const remobveCourseStudent = (payload) => {
  return {
    type: REMOBVE_COURSE_STUDENT,
    payload,
  };
};
export const remobveCourseStudentSuccessful = (payload) => {
  return {
    type: REMOBVE_COURSE_STUDENT_SUCCESSFUL,
    payload,
  };
};
export const remobveCourseStudentFailed = (payload) => {
  return {
    type: REMOBVE_COURSE_STUDENT_FAILED,
    payload,
  };
};

// get_course_instructors
export const getCourseInstructors = (payload) => {
  return {
    type: GET_COURSE_INSTRUCTORS,
    payload,
  };
};
export const getCourseInstructorsSuccessful = (payload) => {
  return {
    type: GET_COURSE_INSTRUCTORS_SUCCESSFUL,
    payload,
  };
};
export const getCourseInstructorsFailed = (payload) => {
  return {
    type: GET_COURSE_INSTRUCTORS_FAILED,
    payload,
  };
};

// add_course_instructor
export const addCourseInstructor = (payload) => {
  return {
    type: ADD_COURSE_INSTRUCTOR,
    payload,
  };
};
export const addCourseInstructorSuccessful = (payload) => {
  return {
    type: ADD_COURSE_INSTRUCTOR_SUCCESSFUL,
    payload,
  };
};
export const addCourseInstructorFailed = (payload) => {
  return {
    type: ADD_COURSE_INSTRUCTOR_FAILED,
    payload,
  };
};

// remove_course_instructor
export const removeCourseInstructor = (payload) => {
  return {
    type: REMOVE_COURSE_INSTRUCTOR,
    payload,
  };
};
export const removeCourseInstructorSuccessful = (payload) => {
  return {
    type: REMOVE_COURSE_INSTRUCTOR_SUCCESSFUL,
    payload,
  };
};
export const removeCourseInstructorFailed = (payload) => {
  return {
    type: REMOVE_COURSE_INSTRUCTOR_FAILED,
    payload,
  };
};

// update_course_instructors
// export const updateCourseInstructors = (payload) => {
//   return {
//     type: UPDATE_COURSE_INSTRUCTORS,
//     payload,
//   };
// };
// export const updateCourseInstructorsSuccessful = (payload) => {
//   return {
//     type: UPDATE_COURSE_INSTRUCTORS_SUCCESSFUL,
//     payload,
//   };
// };
// export const updateCourseInstructorsFailed = (payload) => {
//   return {
//     type: UPDATE_COURSE_INSTRUCTORS_FAILED,
//     payload,
//   };
// };
