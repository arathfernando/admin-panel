import {
  CREATE_JOB_REVIEW,
  CREATE_JOB_REVIEW_FAILED,
  CREATE_JOB_REVIEW_SUCCESSFUL,
  DELETE_JOB_REVIEW,
  DELETE_JOB_REVIEW_FAILED,
  DELETE_JOB_REVIEW_SUCCESSFUL,
  GET_JOB_REVIEW,
  GET_JOB_REVIEW_FAILED,
  GET_JOB_REVIEW_SUCCESSFUL,
  UPDATE_JOB_REVIEW,
  UPDATE_JOB_REVIEW_FAILED,
  UPDATE_JOB_REVIEW_SUCCESSFUL,
} from '../../types/job/jobReviewTypes';

const INIT_STATE = {
  jobReviews: {
    loading: false,
    error: null,
    data: [],
  },
  createJobReviewAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  updateJobReviewAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  deleteJobReviewAction: {
    status: 'idle',
    error: null,
    data: {},
  },
};

export default (state = INIT_STATE, action) => {
  switch (
    action.type // ------ get_job_review ------
  ) {
    case GET_JOB_REVIEW:
      return {
        ...state,
        jobReviews: {
          ...state.jobReviews,
          loading: true,
          error: null,
        },
      };
    case GET_JOB_REVIEW_SUCCESSFUL:
      return {
        ...state,
        jobReviews: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_JOB_REVIEW_FAILED:
      return {
        ...state,
        jobReviews: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };
    // ------ create_job_review ------
    case CREATE_JOB_REVIEW:
      return {
        ...state,
        createJobReviewAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_JOB_REVIEW_SUCCESSFUL:
      return {
        ...state,
        createJobReviewAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_JOB_REVIEW_FAILED:
      return {
        ...state,
        createJobReviewAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ update_job_review ------
    case UPDATE_JOB_REVIEW:
      return {
        ...state,
        updateJobReviewAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_JOB_REVIEW_SUCCESSFUL:
      return {
        ...state,
        updateJobReviewAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_JOB_REVIEW_FAILED:
      return {
        ...state,
        updateJobReviewAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ delete_job_review ------
    case DELETE_JOB_REVIEW:
      return {
        ...state,
        deleteJobReviewAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_JOB_REVIEW_SUCCESSFUL:
      return {
        ...state,
        deleteJobReviewAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_JOB_REVIEW_FAILED:
      return {
        ...state,
        deleteJobReviewAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    default:
      return {
        ...state,
      };
  }
};
