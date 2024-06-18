import {
  DELETE_WALKTHROUGH_CATEGORY,
  DELETE_WALKTHROUGH_CATEGORY_FAILED,
  DELETE_WALKTHROUGH_CATEGORY_SUCCESSFUL,
  GET_WALKTHROUGH_CATEGORY,
  GET_WALKTHROUGH_CATEGORY_FAILED,
  GET_WALKTHROUGH_CATEGORY_SUCCESSFUL,
  SUBMIT_WALKTHROUGH_CATEGORY,
  SUBMIT_WALKTHROUGH_CATEGORY_FAILED,
  SUBMIT_WALKTHROUGH_CATEGORY_SUCCESSFUL,
} from '../../types/managements/walkthrough_category';

const INIT_STATE = {
  walkthroughCategorys: {
    loading: false,
    error: null,
    data: [],
  },
  submitWalkthroughCategoryAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  deleteWalkthroughCategoryAction: {
    status: 'idle',
    error: null,
    data: {},
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    //------ get_walkthrough_categorys ------
    case GET_WALKTHROUGH_CATEGORY:
      return {
        ...state,
        walkthroughCategorys: {
          ...state.walkthroughCategorys,
          loading: true,
          error: null,
        },
      };
    case GET_WALKTHROUGH_CATEGORY_SUCCESSFUL:
      return {
        ...state,
        walkthroughCategorys: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_WALKTHROUGH_CATEGORY_FAILED:
      return {
        ...state,
        walkthroughCategorys: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };
    //------ submit_walkthrough_category ------
    case SUBMIT_WALKTHROUGH_CATEGORY:
      return {
        ...state,
        submitWalkthroughCategoryAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case SUBMIT_WALKTHROUGH_CATEGORY_SUCCESSFUL:
      return {
        ...state,
        submitWalkthroughCategoryAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case SUBMIT_WALKTHROUGH_CATEGORY_FAILED:
      return {
        ...state,
        submitWalkthroughCategoryAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    //------ delete_walkthrough_category ------
    case DELETE_WALKTHROUGH_CATEGORY:
      return {
        ...state,
        deleteWalkthroughCategoryAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_WALKTHROUGH_CATEGORY_SUCCESSFUL:
      return {
        ...state,
        deleteWalkthroughCategoryAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_WALKTHROUGH_CATEGORY_FAILED:
      return {
        ...state,
        deleteWalkthroughCategoryAction: {
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
