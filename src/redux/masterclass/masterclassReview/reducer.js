import {
  CREATE_MASTERCLASS_REVIEW,
  CREATE_MASTERCLASS_REVIEW_FAILED,
  CREATE_MASTERCLASS_REVIEW_SUCCESSFUL,
  DELETE_MASTERCLASS_REVIEW,
  DELETE_MASTERCLASS_REVIEW_FAILED,
  DELETE_MASTERCLASS_REVIEW_SUCCESSFUL,
  GET_MASTERCLASS_REVIEW,
  GET_MASTERCLASS_REVIEW_FAILED,
  GET_MASTERCLASS_REVIEW_SUCCESSFUL,
  UPDATE_MASTERCLASS_REVIEW,
  UPDATE_MASTERCLASS_REVIEW_FAILED,
  UPDATE_MASTERCLASS_REVIEW_SUCCESSFUL,
} from '../../types/masterclass/masterclassReviewTypes';

const INIT_STATE = {
  masterclassReviews: {
    loading: false,
    error: null,
    data: [],
  },
  createMasterclassReviewAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  updateMasterclassReviewAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  deleteMasterclassReviewAction: {
    status: 'idle',
    error: null,
    data: {},
  },
};

export default (state = INIT_STATE, action) => {
  switch (
    action.type // ------ get_masterclass_review ------
  ) {
    case GET_MASTERCLASS_REVIEW:
      return {
        ...state,
        masterclassReviews: {
          ...state.masterclassReviews,
          loading: true,
          error: null,
        },
      };
    case GET_MASTERCLASS_REVIEW_SUCCESSFUL:
      return {
        ...state,
        masterclassReviews: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_MASTERCLASS_REVIEW_FAILED:
      return {
        ...state,
        masterclassReviews: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };
    // ------ create_masterclass_review ------
    case CREATE_MASTERCLASS_REVIEW:
      return {
        ...state,
        createMasterclassReviewAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_MASTERCLASS_REVIEW_SUCCESSFUL:
      return {
        ...state,
        createMasterclassReviewAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_MASTERCLASS_REVIEW_FAILED:
      return {
        ...state,
        createMasterclassReviewAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ update_masterclass_review ------
    case UPDATE_MASTERCLASS_REVIEW:
      return {
        ...state,
        updateMasterclassReviewAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_MASTERCLASS_REVIEW_SUCCESSFUL:
      return {
        ...state,
        updateMasterclassReviewAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_MASTERCLASS_REVIEW_FAILED:
      return {
        ...state,
        updateMasterclassReviewAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ delete_masterclass_review ------
    case DELETE_MASTERCLASS_REVIEW:
      return {
        ...state,
        deleteMasterclassReviewAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_MASTERCLASS_REVIEW_SUCCESSFUL:
      return {
        ...state,
        deleteMasterclassReviewAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_MASTERCLASS_REVIEW_FAILED:
      return {
        ...state,
        deleteMasterclassReviewAction: {
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
