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

export const getContestPendingContestants = (payload) => {
  return {
    type: GET_CONTEST_PENDING_CONTESTANTS,
    payload,
  };
};
export const getContestPendingContestantsSuccessful = (payload) => {
  return {
    type: GET_CONTEST_PENDING_CONTESTANTS_SUCCESSFUL,
    payload,
  };
};
export const getContestPendingContestantsFailed = (payload) => {
  return {
    type: GET_CONTEST_PENDING_CONTESTANTS_FAILED,
    payload,
  };
};
// get_contest_accepted_contestants
export const getContestAcceptedContestants = (payload) => {
  return {
    type: GET_CONTEST_ACCEPTED_CONTESTANTS,
    payload,
  };
};
export const getContestAcceptedContestantsSuccessful = (payload) => {
  return {
    type: GET_CONTEST_ACCEPTED_CONTESTANTS_SUCCESSFUL,
    payload,
  };
};
export const getContestAcceptedContestantsFailed = (payload) => {
  return {
    type: GET_CONTEST_ACCEPTED_CONTESTANTS_FAILED,
    payload,
  };
};
export const getContestPendingJudges = (payload) => {
  return {
    type: GET_CONTEST_PENDING_JUDGES,
    payload,
  };
};
export const getContestPendingJudgesSuccessful = (payload) => {
  return {
    type: GET_CONTEST_PENDING_JUDGES_SUCCESSFUL,
    payload,
  };
};
export const getContestPendingJudgesFailed = (payload) => {
  return {
    type: GET_CONTEST_PENDING_JUDGES_FAILED,
    payload,
  };
};
// get_contest_accepted_judges
export const getContestAcceptedJudges = (payload) => {
  return {
    type: GET_CONTEST_ACCEPTED_JUDGES,
    payload,
  };
};
export const getContestAcceptedJudgesSuccessful = (payload) => {
  return {
    type: GET_CONTEST_ACCEPTED_JUDGES_SUCCESSFUL,
    payload,
  };
};
export const getContestAcceptedJudgesFailed = (payload) => {
  return {
    type: GET_CONTEST_ACCEPTED_JUDGES_FAILED,
    payload,
  };
};

// add_contest_member
export const addContestMember = (payload) => {
  return {
    type: ADD_CONTEST_MEMBER,
    payload,
  };
};
export const addContestMemberSuccessful = (payload) => {
  return {
    type: ADD_CONTEST_MEMBER_SUCCESSFUL,
    payload,
  };
};
export const addContestMemberFailed = (payload) => {
  return {
    type: ADD_CONTEST_MEMBER_FAILED,
    payload,
  };
};
// add_contest_member_reset
export const addContestMemberReset = (payload) => {
  return {
    type: ADD_CONTEST_MEMBER_RESET,
    payload,
  };
};

// contest_contestant_permission
export const contestContestantPermission = (payload) => {
  return {
    type: CONTEST_CONTESTANT_PERMISSION,
    payload,
  };
};
export const contestContestantPermissionSuccessful = (payload) => {
  return {
    type: CONTEST_CONTESTANT_PERMISSION_SUCCESSFUL,
    payload,
  };
};
export const contestContestantPermissionFailed = (payload) => {
  return {
    type: CONTEST_CONTESTANT_PERMISSION_FAILED,
    payload,
  };
};

// remove_cotestant_or_judge
export const removeCotestantOrJudge = (payload) => {
  return {
    type: REMOVE_COTESTANT_OR_JUDGE,
    payload,
  };
};
export const removeCotestantOrJudgeSuccessful = (payload) => {
  return {
    type: REMOVE_COTESTANT_OR_JUDGE_SUCCESSFUL,
    payload,
  };
};
export const removeCotestantOrJudgeFailed = (payload) => {
  return {
    type: REMOVE_COTESTANT_OR_JUDGE_FAILED,
    payload,
  };
};