import {
  ADD_CONTEST_MEMBER,
  ADD_CONTEST_MEMBER_FAILED,
  ADD_CONTEST_MEMBER_RESET,
  ADD_CONTEST_MEMBER_SUCCESSFUL,
  CONTEST_CONTESTANT_PERMISSION,
  CONTEST_CONTESTANT_PERMISSION_FAILED,
  CONTEST_CONTESTANT_PERMISSION_SUCCESSFUL,
  GET_CONTEST_ACCEPTED_CONTESTANTS,
  GET_CONTEST_ACCEPTED_CONTESTANTS_FAILED,
  GET_CONTEST_ACCEPTED_CONTESTANTS_SUCCESSFUL,
  GET_CONTEST_ACCEPTED_JUDGES,
  GET_CONTEST_ACCEPTED_JUDGES_FAILED,
  GET_CONTEST_ACCEPTED_JUDGES_SUCCESSFUL,
  GET_CONTEST_PENDING_CONTESTANTS,
  GET_CONTEST_PENDING_CONTESTANTS_FAILED,
  GET_CONTEST_PENDING_CONTESTANTS_SUCCESSFUL,
  GET_CONTEST_PENDING_JUDGES,
  GET_CONTEST_PENDING_JUDGES_FAILED,
  GET_CONTEST_PENDING_JUDGES_SUCCESSFUL,
  REMOVE_COTESTANT_OR_JUDGE,
  REMOVE_COTESTANT_OR_JUDGE_FAILED,
  REMOVE_COTESTANT_OR_JUDGE_SUCCESSFUL,
} from '../../types/contest/contestType';

const INIT_STATE = {
  addMemberAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  contestPendingContestants: {
    loading: false,
    error: null,
    data: [],
  },
  contestAcceptedContestants: {
    loading: false,
    error: null,
    data: [],
  },
  contestPendingJudges: {
    loading: false,
    error: null,
    data: [],
  },
  contestAcceptedJudges: {
    loading: false,
    error: null,
    data: [],
  },
  contestContestantPermissionAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  removeCotestantOrJudgeAction: {
    status: "idle",
    error: null,
    data: {}
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // ------ get_contest_pending_contestants ------
    case GET_CONTEST_PENDING_CONTESTANTS:
      return {
        ...state,
        contestPendingContestants: {
          ...state.contestPendingContestants,
          id: action.payload.id,
          loading: true,
          error: null,
        },
      };
    case GET_CONTEST_PENDING_CONTESTANTS_SUCCESSFUL:
      return {
        ...state,
        contestPendingContestants: {
          ...state.contestPendingContestants,
          loading: false,
          error: null,
          data: action.payload,
        },
      };
    case GET_CONTEST_PENDING_CONTESTANTS_FAILED:
      return {
        ...state,
        contestPendingContestants: {
          ...state.contestPendingContestants,
          loading: false,
          error: action.payload,
          data: [],
        },
      };
    // ------ get_contest_accepted_contestants ------
    case GET_CONTEST_ACCEPTED_CONTESTANTS:
      return {
        ...state,
        contestAcceptedContestants: {
          ...state.contestAcceptedContestants,
          id: action.payload.id,
          loading: true,
          error: null,
        },
      };
    case GET_CONTEST_ACCEPTED_CONTESTANTS_SUCCESSFUL:
      return {
        ...state,
        contestAcceptedContestants: {
          ...state.contestAcceptedContestants,
          loading: false,
          error: null,
          data: action.payload,
        },
      };
    case GET_CONTEST_ACCEPTED_CONTESTANTS_FAILED:
      return {
        ...state,
        contestAcceptedContestants: {
          ...state.contestAcceptedContestants,
          loading: false,
          error: action.payload,
          data: [],
        },
      };
    // ------ add_contest_member ------
    case ADD_CONTEST_MEMBER:
      return {
        ...state,
        addMemberAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case ADD_CONTEST_MEMBER_SUCCESSFUL:
      return {
        ...state,
        addMemberAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case ADD_CONTEST_MEMBER_FAILED:
      return {
        ...state,
        addMemberAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ add_contest_member_reset_state ------
    case ADD_CONTEST_MEMBER_RESET:
      return {
        ...state,
        addMemberAction: {
          status: 'idle',
          data: {},
          error: null,
        },
      };
    // ------ get_contest_pending_judges ------
    case GET_CONTEST_PENDING_JUDGES:
      return {
        ...state,
        contestPendingJudges: {
          ...state.contestPendingJudges,
          id: action.payload.id,
          loading: true,
          error: null,
        },
      };
    case GET_CONTEST_PENDING_JUDGES_SUCCESSFUL:
      return {
        ...state,
        contestPendingJudges: {
          loading: false,
          error: null,
          data: action.payload,
        },
      };
    case GET_CONTEST_PENDING_JUDGES_FAILED:
      return {
        ...state,
        contestPendingJudges: {
          loading: false,
          error: action.payload,
          data: [],
        },
      };
    // ------ get_contest_accepted_judges ------
    case GET_CONTEST_ACCEPTED_JUDGES:
      return {
        ...state,
        contestAcceptedJudges: {
          ...state.contestAcceptedJudges,
          id: action.payload.id,
          loading: true,
          error: null,
        },
      };
    case GET_CONTEST_ACCEPTED_JUDGES_SUCCESSFUL:
      return {
        ...state,
        contestAcceptedJudges: {
          loading: false,
          error: null,
          data: action.payload,
        },
      };
    case GET_CONTEST_ACCEPTED_JUDGES_FAILED:
      return {
        ...state,
        contestAcceptedJudges: {
          loading: false,
          error: action.payload,
          data: [],
        },
      };
    // ------ contest_contestant_permission ------
    case CONTEST_CONTESTANT_PERMISSION:
      return {
        ...state,
        contestContestantPermissionAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case CONTEST_CONTESTANT_PERMISSION_SUCCESSFUL:
      return {
        ...state,
        contestContestantPermissionAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case CONTEST_CONTESTANT_PERMISSION_FAILED:
      return {
        ...state,
        contestContestantPermissionAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    //------ remove_cotestant_or_judge ------
    case REMOVE_COTESTANT_OR_JUDGE:
      return {
        ...state,
        removeCotestantOrJudgeAction: {
          status: 'submitting',
          error: null,
          data: action.payload
        }
      }
    case REMOVE_COTESTANT_OR_JUDGE_SUCCESSFUL:
      return {
        ...state,
        removeCotestantOrJudgeAction: {
          status: 'submitted',
          error: null,
          data: action.payload
        }
      }
    case REMOVE_COTESTANT_OR_JUDGE_FAILED:
      return {
        ...state,
        removeCotestantOrJudgeAction: {
          status: 'failed',
          error: action.payload,
          data: {}
        }
      }
    default:
      return {
        ...state,
      };
  }
};
