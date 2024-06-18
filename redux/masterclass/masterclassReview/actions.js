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

// get_masterclass_review
export const getMasterclassReviews = () => {
  return {
    type: GET_MASTERCLASS_REVIEW,
  };
};
export const getMasterclassReviewsSuccessful = (payload) => {
  return {
    type: GET_MASTERCLASS_REVIEW_SUCCESSFUL,
    payload,
  };
};
export const getMasterclassReviewsFailed = (payload) => {
  return {
    type: GET_MASTERCLASS_REVIEW_FAILED,
    payload,
  };
};

// create_masterclass_review
export const createMasterclassReview = (payload) => {
  return {
    type: CREATE_MASTERCLASS_REVIEW,
    payload,
  };
};
export const createMasterclassReviewSuccessful = (payload) => {
  return {
    type: CREATE_MASTERCLASS_REVIEW_SUCCESSFUL,
    payload,
  };
};
export const createMasterclassReviewFailed = (payload) => {
  return {
    type: CREATE_MASTERCLASS_REVIEW_FAILED,
    payload,
  };
};

// update_masterclass_review
export const updateMasterclassReview = (payload) => {
  return {
    type: UPDATE_MASTERCLASS_REVIEW,
    payload,
  };
};
export const updateMasterclassReviewSuccessful = (payload) => {
  return {
    type: UPDATE_MASTERCLASS_REVIEW_SUCCESSFUL,
    payload,
  };
};
export const updateMasterclassReviewFailed = (payload) => {
  return {
    type: UPDATE_MASTERCLASS_REVIEW_FAILED,
    payload,
  };
};

// delete_masterclass_review
export const deleteMasterclassReview = (payload) => {
  return {
    type: DELETE_MASTERCLASS_REVIEW,
    payload,
  };
};
export const deleteMasterclassReviewSuccessful = (payload) => {
  return {
    type: DELETE_MASTERCLASS_REVIEW_SUCCESSFUL,
    payload,
  };
};
export const deleteMasterclassReviewFailed = (payload) => {
  return {
    type: DELETE_MASTERCLASS_REVIEW_FAILED,
    payload,
  };
};
