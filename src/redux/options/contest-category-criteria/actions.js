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

// get_contest_category_criterias
export const getContestCategoryCriterias = () => {
  return {
    type: GET_CONTEST_CATEGORY_CRITERIA,
  };
};
export const getContestCategoryCriteriasSuccessful = (payload) => {
  return {
    type: GET_CONTEST_CATEGORY_CRITERIA_SUCCESSFUL,
    payload,
  };
};
export const getContestCategoryCriteriasFailed = (payload) => {
  return {
    type: GET_CONTEST_CATEGORY_CRITERIA_FAILED,
    payload,
  };
};

// create_contest_category_criteria
export const createContestCategoryCriteria = (payload) => {
  return {
    type: CREATE_CONTEST_CATEGORY_CRITERIA,
    payload,
  };
};
export const createContestCategoryCriteriaSuccessful = (payload) => {
  return {
    type: CREATE_CONTEST_CATEGORY_CRITERIA_SUCCESSFUL,
    payload,
  };
};
export const createContestCategoryCriteriaFailed = (payload) => {
  return {
    type: CREATE_CONTEST_CATEGORY_CRITERIA_FAILED,
    payload,
  };
};

// update_contest_category_criteria
export const updateContestCategoryCriteria = (payload) => {
  return {
    type: UPDATE_CONTEST_CATEGORY_CRITERIA,
    payload,
  };
};
export const updateContestCategoryCriteriaSuccessful = (payload) => {
  return {
    type: UPDATE_CONTEST_CATEGORY_CRITERIA_SUCCESSFUL,
    payload,
  };
};
export const updateContestCategoryCriteriaFailed = (payload) => {
  return {
    type: UPDATE_CONTEST_CATEGORY_CRITERIA_FAILED,
    payload,
  };
};

// delete_contest_category_criteria
export const deleteContestCategoryCriteria = (payload) => {
  return {
    type: DELETE_CONTEST_CATEGORY_CRITERIA,
    payload,
  };
};
export const deleteContestCategoryCriteriaSuccessful = (payload) => {
  return {
    type: DELETE_CONTEST_CATEGORY_CRITERIA_SUCCESSFUL,
    payload,
  };
};
export const deleteContestCategoryCriteriaFailed = (payload) => {
  return {
    type: DELETE_CONTEST_CATEGORY_CRITERIA_FAILED,
    payload,
  };
};
