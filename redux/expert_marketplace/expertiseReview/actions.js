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

// get_expertise_review
export const getExpertiseReviews = () => {
  return {
    type: GET_EXPERTISE_REVIEW,
  };
};
export const getExpertiseReviewsSuccessful = (payload) => {
  return {
    type: GET_EXPERTISE_REVIEW_SUCCESSFUL,
    payload,
  };
};
export const getExpertiseReviewsFailed = (payload) => {
  return {
    type: GET_EXPERTISE_REVIEW_FAILED,
    payload,
  };
};

// create_expertise_review
export const createExpertiseReview = (payload) => {
  return {
    type: CREATE_EXPERTISE_REVIEW,
    payload,
  };
};
export const createExpertiseReviewSuccessful = (payload) => {
  return {
    type: CREATE_EXPERTISE_REVIEW_SUCCESSFUL,
    payload,
  };
};
export const createExpertiseReviewFailed = (payload) => {
  return {
    type: CREATE_EXPERTISE_REVIEW_FAILED,
    payload,
  };
};

// update_expertise_review
export const updateExpertiseReview = (payload) => {
  return {
    type: UPDATE_EXPERTISE_REVIEW,
    payload,
  };
};
export const updateExpertiseReviewSuccessful = (payload) => {
  return {
    type: UPDATE_EXPERTISE_REVIEW_SUCCESSFUL,
    payload,
  };
};
export const updateExpertiseReviewFailed = (payload) => {
  return {
    type: UPDATE_EXPERTISE_REVIEW_FAILED,
    payload,
  };
};

// delete_expertise_review
export const deleteExpertiseReview = (payload) => {
  return {
    type: DELETE_EXPERTISE_REVIEW,
    payload,
  };
};
export const deleteExpertiseReviewSuccessful = (payload) => {
  return {
    type: DELETE_EXPERTISE_REVIEW_SUCCESSFUL,
    payload,
  };
};
export const deleteExpertiseReviewFailed = (payload) => {
  return {
    type: DELETE_EXPERTISE_REVIEW_FAILED,
    payload,
  };
};
