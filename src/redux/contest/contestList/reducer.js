import {
  CREATE_CONTEST_CRITERIA,
  CREATE_CONTEST_CRITERIA_FAILED,
  CREATE_CONTEST_CRITERIA_SUCCESSFUL,
  CREATE_CONTEST_GENERAL,
  CREATE_CONTEST_GENERAL_FAILED,
  CREATE_CONTEST_GENERAL_SUCCESSFUL,
  CREATE_CONTEST_IDENTITY,
  CREATE_CONTEST_IDENTITY_FAILED,
  CREATE_CONTEST_IDENTITY_SUCCESSFUL,
  CREATE_CONTEST_RULES,
  CREATE_CONTEST_RULES_FAILED,
  CREATE_CONTEST_RULES_SUCCESSFUL,
  DELETE_CONTEST,
  DELETE_CONTEST_FAILED,
  DELETE_CONTEST_SUCCESSFUL,
  GET_ACTIVE_CONTESESTS,
  GET_ACTIVE_CONTESESTS_FAILED,
  GET_ACTIVE_CONTESESTS_SUCCESSFUL,
  GET_ALL_CONTESTS,
  GET_ALL_CONTESTS_FAILED,
  GET_ALL_CONTESTS_SUCCESSFUL,
  GET_COMPLETED_CONTESTS,
  GET_COMPLETED_CONTESTS_FAILED,
  GET_COMPLETED_CONTESTS_SUCCESSFUL,
  GET_CONTEST,
  GET_CONTEST_CATEGORIES,
  GET_CONTEST_CATEGORIES_FAILED,
  GET_CONTEST_CATEGORIES_SUCCESSFUL,
  GET_CONTEST_CRITERIA,
  GET_CONTEST_CRITERIA_FAILED,
  GET_CONTEST_CRITERIA_SUCCESSFUL,
  GET_CONTEST_FAILED,
  GET_CONTEST_GENERAL,
  GET_CONTEST_GENERAL_FAILED,
  GET_CONTEST_GENERAL_SUCCESSFUL,
  GET_CONTEST_IDENTITY,
  GET_CONTEST_IDENTITY_FAILED,
  GET_CONTEST_IDENTITY_SUCCESSFUL,
  GET_CONTEST_RULES,
  GET_CONTEST_RULES_FAILED,
  GET_CONTEST_RULES_SUCCESSFUL,
  GET_CONTEST_SUCCESSFUL,
  GET_DRAFTED_CONTESTS,
  GET_DRAFTED_CONTESTS_FAILED,
  GET_DRAFTED_CONTESTS_SUCCESSFUL,
  GET_ONGOING_CONTESTS,
  GET_ONGOING_CONTESTS_FAILED,
  GET_ONGOING_CONTESTS_SUCCESSFUL,
  GET_PENDING_CONTESESTS,
  GET_PENDING_CONTESESTS_FAILED,
  GET_PENDING_CONTESESTS_SUCCESSFUL,
  RESET_CONTEST_CREATE,
  UPDATE_CONTEST_CRITERIA,
  UPDATE_CONTEST_CRITERIA_FAILED,
  UPDATE_CONTEST_CRITERIA_SUCCESSFUL,
  UPDATE_CONTEST_GENERAL,
  UPDATE_CONTEST_GENERAL_FAILED,
  UPDATE_CONTEST_GENERAL_SUCCESSFUL,
  UPDATE_CONTEST_IDENTITY,
  UPDATE_CONTEST_IDENTITY_FAILED,
  UPDATE_CONTEST_IDENTITY_SUCCESSFUL,
  UPDATE_CONTEST_RULES,
  UPDATE_CONTEST_RULES_FAILED,
  UPDATE_CONTEST_RULES_SUCCESSFUL,
} from '../../types/contest/contestType';

const INIT_STATE = {
  contest: {
    loading: false,
    error: null,
    data: {},
  },
  contestGeneralAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  contestGeneral: {
    loading: false,
    error: null,
    data: {},
  },
  contestIdentityAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  contestIdentity: {
    loading: false,
    error: null,
    data: {},
  },
  contestCriteriaAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  contestCriteria: {
    loading: false,
    error: null,
    data: {},
  },
  contestRulesAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  contestRules: {
    loading: false,
    error: null,
    data: {},
  },
  contestData: {
    loading: false,
    error: null,
    data: [],
  },
  contestCategories: {
    loading: false,
    error: null,
    data: [],
  },
  activeContests: {
    loading: false,
    error: null,
    data: [],
  },
  pendingContests: {
    loading: false,
    error: null,
    data: [],
  },
  completedContests: {
    loading: false,
    error: null,
    data: [],
  },
  ongoingContests: {
    loading: false,
    error: null,
    data: [],
  },
  draftedContests: {
    loading: false,
    error: null,
    data: [],
  },
  allContests: {
    loading: false,
    error: null,
    data: [],
  },
  contestDeleteAction: {
    status: 'idle',
    error: null,
    data: {},
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // ------ create_contest_general ------
    case CREATE_CONTEST_GENERAL:
      return {
        ...state,
        contestGeneralAction: {
          status: 'submitting',
          error: null,
          data: action.payload.data,
        },
      };
    case CREATE_CONTEST_GENERAL_SUCCESSFUL:
      return {
        ...state,
        contest: {
          ...state.contest,
          data: {
            ...state.contest.data,
            id: action.payload.data.id,
          },
        },
        contestGeneralAction: {
          status: 'submitted',
          error: null,
          data: action.payload.data,
        },
      };
    case CREATE_CONTEST_GENERAL_FAILED:
      return {
        ...state,
        contestGeneralAction: {
          status: 'failed',
          error: action.payload.data,
          data: {},
        },
      };
    // ------ get_contest_general ------
    case GET_CONTEST_GENERAL:
      return {
        ...state,
        contestGeneral: {
          ...state.contestGeneral,
          loading: true,
          error: null,
        },
      };
    case GET_CONTEST_GENERAL_SUCCESSFUL:
      return {
        ...state,
        contestGeneral: {
          loading: false,
          error: null,
          data: action.payload,
        },
      };
    case GET_CONTEST_GENERAL_FAILED:
      return {
        ...state,
        contestGeneral: {
          loading: false,
          error: action.payload,
          data: {},
        },
      };
    // ------ update_contest_general ------
    case UPDATE_CONTEST_GENERAL:
      return {
        ...state,
        contestGeneralAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_CONTEST_GENERAL_SUCCESSFUL:
      return {
        ...state,
        contestGeneralAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_CONTEST_GENERAL_FAILED:
      return {
        ...state,
        contestGeneralAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ create_contest_identity ------
    case CREATE_CONTEST_IDENTITY:
      return {
        ...state,
        contestIdentityAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_CONTEST_IDENTITY_SUCCESSFUL:
      return {
        ...state,
        contestIdentityAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_CONTEST_IDENTITY_FAILED:
      return {
        ...state,
        contestIdentityAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ get_contest_identity ------
    case GET_CONTEST_IDENTITY:
      return {
        ...state,
        contestIdentity: {
          ...state.contestIdentity,
          loading: true,
          error: null,
        },
      };
    case GET_CONTEST_IDENTITY_SUCCESSFUL:
      return {
        ...state,
        contestIdentity: {
          loading: false,
          error: null,
          data: action.payload,
        },
      };
    case GET_CONTEST_IDENTITY_FAILED:
      return {
        ...state,
        contestIdentity: {
          loading: false,
          error: action.payload,
          data: {},
        },
      };
    // ------ update_contest_identity ------
    case UPDATE_CONTEST_IDENTITY:
      return {
        ...state,
        contestIdentityAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_CONTEST_IDENTITY_SUCCESSFUL:
      return {
        ...state,
        contestIdentityAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_CONTEST_IDENTITY_FAILED:
      return {
        ...state,
        contestIdentityAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ create_contest_criteria ------
    case CREATE_CONTEST_CRITERIA:
      return {
        ...state,
        contestCriteriaAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_CONTEST_CRITERIA_SUCCESSFUL:
      return {
        ...state,
        contestCriteriaAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_CONTEST_CRITERIA_FAILED:
      return {
        ...state,
        contestCriteriaAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ get_contest_criteria ------
    case GET_CONTEST_CRITERIA:
      return {
        ...state,
        contestCriteria: {
          ...state.contestCriteria,
          loading: true,
          error: null,
        },
      };
    case GET_CONTEST_CRITERIA_SUCCESSFUL:
      return {
        ...state,
        contestCriteria: {
          loading: false,
          error: null,
          data: action.payload,
        },
      };
    case GET_CONTEST_CRITERIA_FAILED:
      return {
        ...state,
        contestCriteria: {
          loading: false,
          error: action.payload,
          data: {},
        },
      };
    // ------ update_contest_criteria ------
    case UPDATE_CONTEST_CRITERIA:
      return {
        ...state,
        contestCriteriaAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_CONTEST_CRITERIA_SUCCESSFUL:
      return {
        ...state,
        contestCriteriaAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_CONTEST_CRITERIA_FAILED:
      return {
        ...state,
        contestCriteriaAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ create_contest_rules ------
    case CREATE_CONTEST_RULES:
      return {
        ...state,
        contestRulesAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_CONTEST_RULES_SUCCESSFUL:
      return {
        ...state,
        contestRulesAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_CONTEST_RULES_FAILED:
      return {
        ...state,
        contestRulesAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ get_contest_rules ------
    case GET_CONTEST_RULES:
      return {
        ...state,
        contestRules: {
          ...state.contestRules,
          loading: true,
          error: null,
        },
      };
    case GET_CONTEST_RULES_SUCCESSFUL:
      return {
        ...state,
        contestRules: {
          loading: false,
          error: null,
          data: action.payload,
        },
      };
    case GET_CONTEST_RULES_FAILED:
      return {
        ...state,
        contestRules: {
          loading: false,
          error: action.payload,
          data: {},
        },
      };
    // ------ update_contest_rules ------
    case UPDATE_CONTEST_RULES:
      return {
        ...state,
        contestRulesAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_CONTEST_RULES_SUCCESSFUL:
      return {
        ...state,
        contestRulesAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_CONTEST_RULES_FAILED:
      return {
        ...state,
        contestRulesAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ get_contest ------
    case GET_CONTEST:
      return {
        ...state,
        contestData: {
          ...state.contestData,
          loading: true,
          error: null,
        },
      };
    case GET_CONTEST_SUCCESSFUL:
      return {
        ...state,
        contestData: {
          loading: false,
          error: null,
          data: action.payload,
        },
      };
    case GET_CONTEST_FAILED:
      return {
        ...state,
        contestData: {
          loading: false,
          error: action.payload,
          data: {},
        },
      };
    // reset action states
    case RESET_CONTEST_CREATE:
      return {
        ...state,
        contestData: {
          loading: false,
          error: action.payload,
          data: {},
        },
        contestGeneralAction: {
          ...state.contestGeneralAction,
          status: 'idle',
        },
        contestIdentityAction: {
          ...state.contestGeneralAction,
          status: 'idle',
        },
        contestCriteriaAction: {
          ...state.contestGeneralAction,
          status: 'idle',
        },
        contestRulesAction: {
          ...state.contestGeneralAction,
          status: 'idle',
        },
      };
    // ------ get_contest_categories ------
    case GET_CONTEST_CATEGORIES:
      return {
        ...state,
        contestCategories: {
          ...state.contestCategories,
          loading: true,
          error: null,
        },
      };
    case GET_CONTEST_CATEGORIES_SUCCESSFUL:
      return {
        ...state,
        contestCategories: {
          loading: false,
          error: null,
          data: action.payload.data,
        },
      };
    case GET_CONTEST_CATEGORIES_FAILED:
      return {
        ...state,
        contestCategories: {
          loading: false,
          error: action.payload.data,
          data: [],
        },
      };
    // ------ get_active_contesests ------
    case GET_ACTIVE_CONTESESTS:
      return {
        ...state,
        activeContests: {
          ...state.activeContests,
          loading: true,
          error: null,
        },
      };
    case GET_ACTIVE_CONTESESTS_SUCCESSFUL:
      return {
        ...state,
        activeContests: {
          loading: false,
          error: null,
          data: action.payload,
        },
      };
    case GET_ACTIVE_CONTESESTS_FAILED:
      return {
        ...state,
        activeContests: {
          loading: false,
          error: action.payload,
          data: [],
        },
      };
    // ------ get_pending_contesests ------
    case GET_PENDING_CONTESESTS:
      return {
        ...state,
        pendingContests: {
          ...state.pendingContests,
          loading: true,
          error: null,
        },
      };
    case GET_PENDING_CONTESESTS_SUCCESSFUL:
      return {
        ...state,
        pendingContests: {
          loading: false,
          error: null,
          data: action.payload,
        },
      };
    case GET_PENDING_CONTESESTS_FAILED:
      return {
        ...state,
        pendingContests: {
          loading: false,
          error: action.payload,
          data: [],
        },
      };
    // ------ get_completed_contests ------
    case GET_COMPLETED_CONTESTS:
      return {
        ...state,
        completedContests: {
          ...state.completedContests,
          loading: true,
          error: null,
        },
      };
    case GET_COMPLETED_CONTESTS_SUCCESSFUL:
      return {
        ...state,
        completedContests: {
          loading: false,
          error: null,
          data: action.payload,
        },
      };
    case GET_COMPLETED_CONTESTS_FAILED:
      return {
        ...state,
        completedContests: {
          loading: false,
          error: action.payload,
          data: [],
        },
      };
    // ------ get_ongoing_contests ------
    case GET_ONGOING_CONTESTS:
      return {
        ...state,
        ongoingContests: {
          ...state.ongoingContests,
          loading: true,
          error: null,
        },
      };
    case GET_ONGOING_CONTESTS_SUCCESSFUL:
      return {
        ...state,
        ongoingContests: {
          loading: false,
          error: null,
          data: action.payload,
        },
      };
    case GET_ONGOING_CONTESTS_FAILED:
      return {
        ...state,
        ongoingContests: {
          loading: false,
          error: action.payload,
          data: [],
        },
      };
    // ------ get_drafted_contests ------
    case GET_DRAFTED_CONTESTS:
      return {
        ...state,
        draftedContests: {
          ...state.draftedContests,
          loading: true,
          error: null,
        },
      };
    case GET_DRAFTED_CONTESTS_SUCCESSFUL:
      return {
        ...state,
        draftedContests: {
          loading: false,
          error: null,
          data: action.payload,
        },
      };
    case GET_DRAFTED_CONTESTS_FAILED:
      return {
        ...state,
        draftedContests: {
          loading: false,
          error: action.payload,
          data: [],
        },
      };
    // ------ get_all_contests ------
    case GET_ALL_CONTESTS:
      return {
        ...state,
        allContests: {
          ...state.allContests,
          loading: true,
          error: null,
        },
      };
    case GET_ALL_CONTESTS_SUCCESSFUL:
      return {
        ...state,
        allContests: {
          loading: false,
          error: null,
          data: action.payload || [],
        },
      };
    case GET_ALL_CONTESTS_FAILED:
      return {
        ...state,
        allContests: {
          loading: false,
          error: action.payload,
          data: [],
        },
      };
    // ------ delete_contest ------
    case DELETE_CONTEST:
      return {
        ...state,
        contestDeleteAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_CONTEST_SUCCESSFUL:
      return {
        ...state,
        contestDeleteAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_CONTEST_FAILED:
      return {
        ...state,
        contestDeleteAction: {
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
