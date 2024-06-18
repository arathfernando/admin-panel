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

const INIT_STATE = {
  submitCourseBasicAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  submitCoursePricingAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  submtCourseInstructorsAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  courseFormData: {},
  masterclasses: {
    loading: false,
    error: null,
    data: [],
  },
  course: {
    loading: false,
    error: null,
    data: [],
  },
  deleteCourseAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  courseStudents: {
    loading: false,
    error: null,
    data: [],
  },
  createCourseStudentAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  remobveCourseStudentAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  courseInstructors: {
    loading: false,
    error: null,
    data: [],
  },
  addCourseInstructorAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  removeCourseInstructor: {
    loading: false,
    error: null,
    data: [],
  },
  updateCourseInstructorsAction: {
    status: 'idle',
    error: null,
    data: {},
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // ------ submit_course_basic ------
    case SUBMIT_COURSE_BASIC:
      return {
        ...state,
        submitCourseBasicAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case SUBMIT_COURSE_BASIC_SUCCESSFUL:
      return {
        ...state,
        submitCourseBasicAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },

        courseFormData: { ...state.courseFormData, ...action.payload },
      };
    case SUBMIT_COURSE_BASIC_FAILED:
      return {
        ...state,
        submitCourseBasicAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ submit_course_pricing ------
    case SUBMIT_COURSE_PRICING:
      return {
        ...state,
        submitCoursePricingAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case SUBMIT_COURSE_PRICING_SUCCESSFUL:
      return {
        ...state,
        submitCoursePricingAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },

        courseFormData: { ...state.courseFormData, ...action.payload },
      };
    case SUBMIT_COURSE_PRICING_FAILED:
      return {
        ...state,
        submitCoursePricingAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ submit_course_instuictors ------
    case SUBMIT_COURSE_INSTUICTORS:
      return {
        ...state,
        submtCourseInstructorsAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case SUBMIT_COURSE_INSTUICTORS_SUCCESSFUL:
      return {
        ...state,
        submtCourseInstructorsAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },

        courseFormData: { ...state.courseFormData, ...action.payload },
      };
    case SUBMIT_COURSE_INSTUICTORS_FAILED:
      return {
        ...state,
        submtCourseInstructorsAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ reset_course_form_data ------
    case RESET_COURSE_FORM_DATA:
      return {
        ...state,
        courseFormData: {},
      };
    // ------ get_masterclasses ------
    case GET_MASTERCLASSES:
      return {
        ...state,
        masterclasses: {
          ...state.masterclasses,
          loading: true,
          error: null,
        },
      };
    case GET_MASTERCLASSES_SUCCESSFUL:
      return {
        ...state,
        masterclasses: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_MASTERCLASSES_FAILED:
      return {
        ...state,
        masterclasses: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };

    // ------ get_course ------
    case GET_COURSE:
      return {
        ...state,
        course: {
          ...state.course,
          loading: true,
          error: null,
        },
      };
    case GET_COURSE_SUCCESSFUL:
      return {
        ...state,
        course: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_COURSE_FAILED:
      return {
        ...state,
        course: {
          loading: false,
          ...action.payload,
        },
      };
    // ------ delete_course ------
    case DELETE_COURSE:
      return {
        ...state,
        deleteCourseAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_COURSE_SUCCESSFUL:
      return {
        ...state,
        deleteCourseAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_COURSE_FAILED:
      return {
        ...state,
        deleteCourseAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ get_course_students ------
    case GET_COURSE_STUDENTS:
      return {
        ...state,
        courseStudents: {
          ...state.courseStudents,
          loading: true,
          error: null,
        },
      };
    case GET_COURSE_STUDENTS_SUCCESSFUL:
      return {
        ...state,
        courseStudents: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_COURSE_STUDENTS_FAILED:
      return {
        ...state,
        courseStudents: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };
    // ------ create_course_student ------
    case CREATE_COURSE_STUDENT:
      return {
        ...state,
        createCourseStudentAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_COURSE_STUDENT_SUCCESSFUL:
      return {
        ...state,
        createCourseStudentAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_COURSE_STUDENT_FAILED:
      return {
        ...state,
        createCourseStudentAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ remobve_course_student ------
    case REMOBVE_COURSE_STUDENT:
      return {
        ...state,
        remobveCourseStudentAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case REMOBVE_COURSE_STUDENT_SUCCESSFUL:
      return {
        ...state,
        remobveCourseStudentAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case REMOBVE_COURSE_STUDENT_FAILED:
      return {
        ...state,
        remobveCourseStudentAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ get_course_instructors ------
    case GET_COURSE_INSTRUCTORS:
      return {
        ...state,
        courseInstructors: {
          ...state.courseInstructors,
          loading: true,
          error: null,
        },
      };
    case GET_COURSE_INSTRUCTORS_SUCCESSFUL:
      return {
        ...state,
        courseInstructors: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_COURSE_INSTRUCTORS_FAILED:
      return {
        ...state,
        courseInstructors: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };
    // ------ add_course_instructor ------
    case ADD_COURSE_INSTRUCTOR:
      return {
        ...state,
        addCourseInstructorAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case ADD_COURSE_INSTRUCTOR_SUCCESSFUL:
      return {
        ...state,
        addCourseInstructorAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case ADD_COURSE_INSTRUCTOR_FAILED:
      return {
        ...state,
        addCourseInstructorAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ remove_course_instructor ------
    case REMOVE_COURSE_INSTRUCTOR:
      return {
        ...state,
        removeCourseInstructor: {
          ...state.removeCourseInstructor,
          loading: true,
          error: null,
        },
      };
    case REMOVE_COURSE_INSTRUCTOR_SUCCESSFUL:
      return {
        ...state,
        removeCourseInstructor: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case REMOVE_COURSE_INSTRUCTOR_FAILED:
      return {
        ...state,
        removeCourseInstructor: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };
    // ------ update_course_instructors ------
    // case UPDATE_COURSE_INSTRUCTORS:
    //   return {
    //     ...state,
    //     updateCourseInstructorsAction: {
    //       status: 'submitting',
    //       error: null,
    //       data: action.payload,
    //     },
    //   };
    // case UPDATE_COURSE_INSTRUCTORS_SUCCESSFUL:
    //   return {
    //     ...state,
    //     updateCourseInstructorsAction: {
    //       status: 'submitted',
    //       error: null,
    //       data: action.payload,
    //     },
    //   };
    // case UPDATE_COURSE_INSTRUCTORS_FAILED:
    //   return {
    //     ...state,
    //     updateCourseInstructorsAction: {
    //       status: 'failed',
    //       error: action.payload,
    //       data: {},
    //     },
    //   };
    default:
      return {
        ...state,
      };
  }
};
