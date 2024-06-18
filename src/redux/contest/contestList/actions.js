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

// create_contest_general
export const createContestGeneral = (payload) => {
  return {
    type: CREATE_CONTEST_GENERAL,
    payload,
  };
};
export const createContestGeneralSuccessful = (payload) => {
  return {
    type: CREATE_CONTEST_GENERAL_SUCCESSFUL,
    payload,
  };
};
export const createContestGeneralFailed = (payload) => {
  return {
    type: CREATE_CONTEST_GENERAL_FAILED,
    payload,
  };
};

// get_contest_general
export const getContestGeneral = (payload) => {
  return {
    type: GET_CONTEST_GENERAL,
    payload,
  };
};
export const getContestGeneralSuccessful = (payload) => {
  return {
    type: GET_CONTEST_GENERAL_SUCCESSFUL,
    payload,
  };
};
export const getContestGeneralFailed = (payload) => {
  return {
    type: GET_CONTEST_GENERAL_FAILED,
    payload,
  };
};
// update_contest_general
export const updateContestGeneral = (payload) => {
  return {
    type: UPDATE_CONTEST_GENERAL,
    payload,
  };
};
export const updateContestGeneralSuccessful = (payload) => {
  return {
    type: UPDATE_CONTEST_GENERAL_SUCCESSFUL,
    payload,
  };
};
export const updateContestGeneralFailed = (payload) => {
  return {
    type: UPDATE_CONTEST_GENERAL_FAILED,
    payload,
  };
};

// create_contest_identity
export const createContestIdentity = (payload) => {
  return {
    type: CREATE_CONTEST_IDENTITY,
    payload,
  };
};
export const createContestIdentitySuccessful = (payload) => {
  return {
    type: CREATE_CONTEST_IDENTITY_SUCCESSFUL,
    payload,
  };
};
export const createContestIdentityFailed = (payload) => {
  return {
    type: CREATE_CONTEST_IDENTITY_FAILED,
    payload,
  };
};
// get_contest_identity
export const getContestIdentity = (payload) => {
  return {
    type: GET_CONTEST_IDENTITY,
    payload,
  };
};
export const getContestIdentitySuccessful = (payload) => {
  return {
    type: GET_CONTEST_IDENTITY_SUCCESSFUL,
    payload,
  };
};
export const getContestIdentityFailed = (payload) => {
  return {
    type: GET_CONTEST_IDENTITY_FAILED,
    payload,
  };
};
// update_contest_identity
export const updateContestIdentity = (payload) => {
  return {
    type: UPDATE_CONTEST_IDENTITY,
    payload,
  };
};
export const updateContestIdentitySuccessful = (payload) => {
  return {
    type: UPDATE_CONTEST_IDENTITY_SUCCESSFUL,
    payload,
  };
};
export const updateContestIdentityFailed = (payload) => {
  return {
    type: UPDATE_CONTEST_IDENTITY_FAILED,
    payload,
  };
};

// create_contest_criteria
export const createContestCriteria = (payload) => {
  return {
    type: CREATE_CONTEST_CRITERIA,
    payload,
  };
};
export const createContestCriteriaSuccessful = (payload) => {
  return {
    type: CREATE_CONTEST_CRITERIA_SUCCESSFUL,
    payload,
  };
};
export const createContestCriteriaFailed = (payload) => {
  return {
    type: CREATE_CONTEST_CRITERIA_FAILED,
    payload,
  };
};
// get_contest_criteria
export const getContestCriteria = (payload) => {
  return {
    type: GET_CONTEST_CRITERIA,
    payload,
  };
};
export const getContestCriteriaSuccessful = (payload) => {
  return {
    type: GET_CONTEST_CRITERIA_SUCCESSFUL,
    payload,
  };
};
export const getContestCriteriaFailed = (payload) => {
  return {
    type: GET_CONTEST_CRITERIA_FAILED,
    payload,
  };
};
// update_contest_criteria
export const updateContestCriteria = (payload) => {
  return {
    type: UPDATE_CONTEST_CRITERIA,
    payload,
  };
};
export const updateContestCriteriaSuccessful = (payload) => {
  return {
    type: UPDATE_CONTEST_CRITERIA_SUCCESSFUL,
    payload,
  };
};
export const updateContestCriteriaFailed = (payload) => {
  return {
    type: UPDATE_CONTEST_CRITERIA_FAILED,
    payload,
  };
};

// create_contest_rules
export const createContestRules = (payload) => {
  return {
    type: CREATE_CONTEST_RULES,
    payload,
  };
};
export const createContestRulesSuccessful = (payload) => {
  return {
    type: CREATE_CONTEST_RULES_SUCCESSFUL,
    payload,
  };
};
export const createContestRulesFailed = (payload) => {
  return {
    type: CREATE_CONTEST_RULES_FAILED,
    payload,
  };
};
// get_contest_rules
export const getContestRules = (payload) => {
  return {
    type: GET_CONTEST_RULES,
    payload,
  };
};
export const getContestRulesSuccessful = (payload) => {
  return {
    type: GET_CONTEST_RULES_SUCCESSFUL,
    payload,
  };
};
export const getContestRulesFailed = (payload) => {
  return {
    type: GET_CONTEST_RULES_FAILED,
    payload,
  };
};
// update_contest_rules
export const updateContestRules = (payload) => {
  return {
    type: UPDATE_CONTEST_RULES,
    payload,
  };
};
export const updateContestRulesSuccessful = (payload) => {
  return {
    type: UPDATE_CONTEST_RULES_SUCCESSFUL,
    payload,
  };
};
export const updateContestRulesFailed = (payload) => {
  return {
    type: UPDATE_CONTEST_RULES_FAILED,
    payload,
  };
};
// get_contest
export const getContest = (payload) => {
  return {
    type: GET_CONTEST,
    payload,
  };
};
export const getContestRevissionsuccessful = (payload) => {
  return {
    type: GET_CONTEST_SUCCESSFUL,
    payload,
  };
};
export const getContestFailed = (payload) => {
  return {
    type: GET_CONTEST_FAILED,
    payload,
  };
};

// reset
export const resetContestCreate = () => {
  return {
    type: RESET_CONTEST_CREATE,
  };
};

// get_contest_categories
export const getContestCategies = () => {
  return {
    type: GET_CONTEST_CATEGORIES,
  };
};
export const getContestCategiesSuccessful = (payload) => {
  return {
    type: GET_CONTEST_CATEGORIES_SUCCESSFUL,
    payload,
  };
};
export const getContestCategiesFailed = (payload) => {
  return {
    type: GET_CONTEST_CATEGORIES_FAILED,
    payload,
  };
};

// get_active_contesests
export const getActiveContestss = () => {
  return {
    type: GET_ACTIVE_CONTESESTS,
  };
};
export const getActiveContestssSuccessful = (payload) => {
  return {
    type: GET_ACTIVE_CONTESESTS_SUCCESSFUL,
    payload,
  };
};
export const getActiveContestssFailed = (payload) => {
  return {
    type: GET_ACTIVE_CONTESESTS_FAILED,
    payload,
  };
};
// get_pending_contesests
export const getPendingContestss = () => {
  return {
    type: GET_PENDING_CONTESESTS,
  };
};
export const getPendingContestssSuccessful = (payload) => {
  return {
    type: GET_PENDING_CONTESESTS_SUCCESSFUL,
    payload,
  };
};
export const getPendingContestssFailed = (payload) => {
  return {
    type: GET_PENDING_CONTESESTS_FAILED,
    payload,
  };
};
export const getCompletedContests = (payload) => {
  return {
    type: GET_COMPLETED_CONTESTS,
    payload,
  };
};
export const getCompletedContestsSuccessful = (payload) => {
  return {
    type: GET_COMPLETED_CONTESTS_SUCCESSFUL,
    payload,
  };
};
export const getCompletedContestsFailed = (payload) => {
  return {
    type: GET_COMPLETED_CONTESTS_FAILED,
    payload,
  };
};
// get_ongoing_contests
export const getOngoingContests = (payload) => {
  return {
    type: GET_ONGOING_CONTESTS,
    payload,
  };
};
export const getOngoingContestsSuccessful = (payload) => {
  return {
    type: GET_ONGOING_CONTESTS_SUCCESSFUL,
    payload,
  };
};
export const getOngoingContestsFailed = (payload) => {
  return {
    type: GET_ONGOING_CONTESTS_FAILED,
    payload,
  };
};
// get_drafted_contests
export const getDraftedContests = (payload) => {
  return {
    type: GET_DRAFTED_CONTESTS,
    payload,
  };
};
export const getDraftedContestsSuccessful = (payload) => {
  return {
    type: GET_DRAFTED_CONTESTS_SUCCESSFUL,
    payload,
  };
};
export const getDraftedContestsFailed = (payload) => {
  return {
    type: GET_DRAFTED_CONTESTS_FAILED,
    payload,
  };
};
// get_all_contests
export const getAllContests = (payload) => {
  return {
    type: GET_ALL_CONTESTS,
    payload,
  };
};
export const getAllContestsSuccessful = (payload) => {
  return {
    type: GET_ALL_CONTESTS_SUCCESSFUL,
    payload,
  };
};
export const getAllContestsFailed = (payload) => {
  return {
    type: GET_ALL_CONTESTS_FAILED,
    payload,
  };
};

// delete_contest
export const deleteContest = (payload) => {
  return {
    type: DELETE_CONTEST,
    payload,
  };
};
export const deleteContestSuccessful = (payload) => {
  return {
    type: DELETE_CONTEST_SUCCESSFUL,
    payload,
  };
};
export const deleteContestFailed = (payload) => {
  return {
    type: DELETE_CONTEST_FAILED,
    payload,
  };
};
