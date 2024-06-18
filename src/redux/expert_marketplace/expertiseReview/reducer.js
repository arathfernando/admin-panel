import {
  CREATE_EXPERTISE_REVIEW,
  CREATE_EXPERTISE_REVIEW_FAILED,
  CREATE_EXPERTISE_REVIEW_SUCCESSFUL,
  DELETE_EXPERTISE_REVIEW,
  DELETE_EXPERTISE_REVIEW_FAILED,
  DELETE_EXPERTISE_REVIEW_SUCCESSFUL,
  GET_EXPERTISE_REVIEW,
  GET_EXPERTISE_REVIEW_FAILED,
  GET_EXPERTISE_REVIEW_SUCCESSFUL,
  UPDATE_EXPERTISE_REVIEW,
  UPDATE_EXPERTISE_REVIEW_FAILED,
  UPDATE_EXPERTISE_REVIEW_SUCCESSFUL,
} from '../../types/expert_marketplace/expertiseReviewTypes';

const INIT_STATE = {
  expertiseReviews: {
    loading: false,
    error: null,
    data: [],
  },
  createExpertiseReviewAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  updateExpertiseReviewAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  deleteExpertiseReviewAction: {
    status: 'idle',
    error: null,
    data: {},
  },
};

export default (state = INIT_STATE, action) => {
  switch (
    action.type // ------ get_expertise_review ------
  ) {
    case GET_EXPERTISE_REVIEW:
      return {
        ...state,
        expertiseReviews: {
          ...state.expertiseReviews,
          loading: true,
          error: null,
        },
      };
    case GET_EXPERTISE_REVIEW_SUCCESSFUL:
      return {
        ...state,
        expertiseReviews: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_EXPERTISE_REVIEW_FAILED:
      return {
        ...state,
        expertiseReviews: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };
    // ------ create_expertise_review ------
    case CREATE_EXPERTISE_REVIEW:
      return {
        ...state,
        createExpertiseReviewAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_EXPERTISE_REVIEW_SUCCESSFUL:
      return {
        ...state,
        createExpertiseReviewAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_EXPERTISE_REVIEW_FAILED:
      return {
        ...state,
        createExpertiseReviewAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ update_expertise_review ------
    case UPDATE_EXPERTISE_REVIEW:
      return {
        ...state,
        updateExpertiseReviewAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_EXPERTISE_REVIEW_SUCCESSFUL:
      return {
        ...state,
        updateExpertiseReviewAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_EXPERTISE_REVIEW_FAILED:
      return {
        ...state,
        updateExpertiseReviewAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ delete_expertise_review ------
    case DELETE_EXPERTISE_REVIEW:
      return {
        ...state,
        deleteExpertiseReviewAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_EXPERTISE_REVIEW_SUCCESSFUL:
      return {
        ...state,
        deleteExpertiseReviewAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_EXPERTISE_REVIEW_FAILED:
      return {
        ...state,
        deleteExpertiseReviewAction: {
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
