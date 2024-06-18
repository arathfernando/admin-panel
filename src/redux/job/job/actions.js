import {
  CREATE_JOB,
  CREATE_JOB_FAILED,
  CREATE_JOB_SUCCESSFUL,
  DELETE_JOB,
  DELETE_JOB_FAILED,
  DELETE_JOB_SUCCESSFUL,
  GET_JOB,
  GET_JOB_FAILED,
  GET_JOB_SUCCESSFUL,
  UPDATE_JOB,
  UPDATE_JOB_FAILED,
  UPDATE_JOB_SUCCESSFUL,
} from '../../types/job/job';

// get_job
export const getJobs = () => {
  return {
    type: GET_JOB,
  };
};
export const getJobsSuccessful = (payload) => {
  return {
    type: GET_JOB_SUCCESSFUL,
    payload,
  };
};
export const getJobsFailed = (payload) => {
  return {
    type: GET_JOB_FAILED,
    payload,
  };
};

// create_job
export const createJob = (payload) => {
  return {
    type: CREATE_JOB,
    payload,
  };
};
export const createJobSuccessful = (payload) => {
  return {
    type: CREATE_JOB_SUCCESSFUL,
    payload,
  };
};
export const createJobFailed = (payload) => {
  return {
    type: CREATE_JOB_FAILED,
    payload,
  };
};

// update_job
export const updateJob = (payload) => {
  return {
    type: UPDATE_JOB,
    payload,
  };
};
export const updateJobSuccessful = (payload) => {
  return {
    type: UPDATE_JOB_SUCCESSFUL,
    payload,
  };
};
export const updateJobFailed = (payload) => {
  return {
    type: UPDATE_JOB_FAILED,
    payload,
  };
};

// delete_job
export const deleteJob = (payload) => {
  return {
    type: DELETE_JOB,
    payload,
  };
};
export const deleteJobSuccessful = (payload) => {
  return {
    type: DELETE_JOB_SUCCESSFUL,
    payload,
  };
};
export const deleteJobFailed = (payload) => {
  return {
    type: DELETE_JOB_FAILED,
    payload,
  };
};
