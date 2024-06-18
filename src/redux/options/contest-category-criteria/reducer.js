import {
  CREATE_CONTEST_CATEGORY_CRITERIA,
  CREATE_CONTEST_CATEGORY_CRITERIA_FAILED,
  CREATE_CONTEST_CATEGORY_CRITERIA_SUCCESSFUL,
  DELETE_CONTEST_CATEGORY_CRITERIA,
  DELETE_CONTEST_CATEGORY_CRITERIA_FAILED,
  DELETE_CONTEST_CATEGORY_CRITERIA_SUCCESSFUL,
  GET_CONTEST_CATEGORY_CRITERIA,
  GET_CONTEST_CATEGORY_CRITERIA_FAILED,
  GET_CONTEST_CATEGORY_CRITERIA_SUCCESSFUL,
  UPDATE_CONTEST_CATEGORY_CRITERIA,
  UPDATE_CONTEST_CATEGORY_CRITERIA_FAILED,
  UPDATE_CONTEST_CATEGORY_CRITERIA_SUCCESSFUL,
} from '../../types/options/contest-category-criteria';

const INIT_STATE = {
  contestCategoryCriterias: {
    loading: false,
    error: null,
    data: [],
  },
  createContestCategoryCriteriaAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  updateContestCategoryCriteriaAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  deleteContestCategoryCriteriaAction: {
    status: 'idle',
    error: null,
    data: {},
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // ------ get_contest_category_criterias ------
    case GET_CONTEST_CATEGORY_CRITERIA:
      return {
        ...state,
        contestCategoryCriterias: {
          ...state.contestCategoryCriterias,
          loading: true,
          error: null,
        },
      };
    case GET_CONTEST_CATEGORY_CRITERIA_SUCCESSFUL:
      return {
        ...state,
        contestCategoryCriterias: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_CONTEST_CATEGORY_CRITERIA_FAILED:
      return {
        ...state,
        contestCategoryCriterias: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };
    // ------ create_contest_category_criteria ------
    case CREATE_CONTEST_CATEGORY_CRITERIA:
      return {
        ...state,
        createContestCategoryCriteriaAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_CONTEST_CATEGORY_CRITERIA_SUCCESSFUL:
      return {
        ...state,
        createContestCategoryCriteriaAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_CONTEST_CATEGORY_CRITERIA_FAILED:
      return {
        ...state,
        createContestCategoryCriteriaAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ update_contest_category_criteria ------
    case UPDATE_CONTEST_CATEGORY_CRITERIA:
      return {
        ...state,
        updateContestCategoryCriteriaAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_CONTEST_CATEGORY_CRITERIA_SUCCESSFUL:
      return {
        ...state,
        updateContestCategoryCriteriaAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_CONTEST_CATEGORY_CRITERIA_FAILED:
      return {
        ...state,
        updateContestCategoryCriteriaAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ delete_contest_category_criteria ------
    case DELETE_CONTEST_CATEGORY_CRITERIA:
      return {
        ...state,
        deleteContestCategoryCriteriaAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_CONTEST_CATEGORY_CRITERIA_SUCCESSFUL:
      return {
        ...state,
        deleteContestCategoryCriteriaAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_CONTEST_CATEGORY_CRITERIA_FAILED:
      return {
        ...state,
        deleteContestCategoryCriteriaAction: {
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
