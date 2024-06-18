import {
  CREATE_JOB_REVIEW,
  CREATE_JOB_REVIEW_FAILED,
  CREATE_JOB_REVIEW_SUCCESSFUL,
  DELETE_JOB_REVIEW,
  DELETE_JOB_REVIEW_FAILED,
  DELETE_JOB_REVIEW_SUCCESSFUL,
  GET_JOB_REVIEW,
  GET_JOB_REVIEW_FAILED,
  GET_JOB_REVIEW_SUCCESSFUL,
  UPDATE_JOB_REVIEW,
  UPDATE_JOB_REVIEW_FAILED,
  UPDATE_JOB_REVIEW_SUCCESSFUL,
} from '../../types/job/jobReviewTypes';

// get_job_review
export const getJobReviews = () => {
  return {
    type: GET_JOB_REVIEW,
  };
};
export const getJobReviewsSuccessful = (payload) => {
  return {
    type: GET_JOB_REVIEW_SUCCESSFUL,
    payload,
  };
};
export const getJobReviewsFailed = (payload) => {
  return {
    type: GET_JOB_REVIEW_FAILED,
    payload,
  };
};

// create_job_review
export const createJobReview = (payload) => {
  return {
    type: CREATE_JOB_REVIEW,
    payload,
  };
};
export const createJobReviewSuccessful = (payload) => {
  return {
    type: CREATE_JOB_REVIEW_SUCCESSFUL,
    payload,
  };
};
export const createJobReviewFailed = (payload) => {
  return {
    type: CREATE_JOB_REVIEW_FAILED,
    payload,
  };
};

// update_job_review
export const updateJobReview = (payload) => {
  return {
    type: UPDATE_JOB_REVIEW,
    payload,
  };
};
export const updateJobReviewSuccessful = (payload) => {
  return {
    type: UPDATE_JOB_REVIEW_SUCCESSFUL,
    payload,
  };
};
export const updateJobReviewFailed = (payload) => {
  return {
    type: UPDATE_JOB_REVIEW_FAILED,
    payload,
  };
};

// delete_job_review
export const deleteJobReview = (payload) => {
  return {
    type: DELETE_JOB_REVIEW,
    payload,
  };
};
export const deleteJobReviewSuccessful = (payload) => {
  return {
    type: DELETE_JOB_REVIEW_SUCCESSFUL,
    payload,
  };
};
export const deleteJobReviewFailed = (payload) => {
  return {
    type: DELETE_JOB_REVIEW_FAILED,
    payload,
  };
};
