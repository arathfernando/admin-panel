import {
  CREATE_ACTICLE,
  CREATE_ACTICLE_FAILED,
  CREATE_ACTICLE_SUCCESSFUL,
  DELETE_ACTICLE,
  DELETE_ACTICLE_FAILED,
  DELETE_ACTICLE_SUCCESSFUL,
  GET_ACTICLE,
  GET_ACTICLE_FAILED,
  GET_ACTICLE_SUCCESSFUL,
  UPDATE_ACTICLE,
  UPDATE_ACTICLE_FAILED,
  UPDATE_ACTICLE_SUCCESSFUL,
} from '../../types/community/acticle';

// get_acticle
export const getActicles = (payload) => {
  return {
    type: GET_ACTICLE,
    payload,
  };
};
export const getActiclesSuccessful = (payload) => {
  return {
    type: GET_ACTICLE_SUCCESSFUL,
    payload,
  };
};
export const getActiclesFailed = (payload) => {
  return {
    type: GET_ACTICLE_FAILED,
    payload,
  };
};

// create_acticle
export const createActicle = (payload) => {
  return {
    type: CREATE_ACTICLE,
    payload,
  };
};
export const createActicleSuccessful = (payload) => {
  return {
    type: CREATE_ACTICLE_SUCCESSFUL,
    payload,
  };
};
export const createActicleFailed = (payload) => {
  return {
    type: CREATE_ACTICLE_FAILED,
    payload,
  };
};

// update_acticle
export const updateActicle = (payload) => {
  return {
    type: UPDATE_ACTICLE,
    payload,
  };
};
export const updateActicleSuccessful = (payload) => {
  return {
    type: UPDATE_ACTICLE_SUCCESSFUL,
    payload,
  };
};
export const updateActicleFailed = (payload) => {
  return {
    type: UPDATE_ACTICLE_FAILED,
    payload,
  };
};

// delete_acticle
export const deleteActicle = (payload) => {
  return {
    type: DELETE_ACTICLE,
    payload,
  };
};
export const deleteActicleSuccessful = (payload) => {
  return {
    type: DELETE_ACTICLE_SUCCESSFUL,
    payload,
  };
};
export const deleteActicleFailed = (payload) => {
  return {
    type: DELETE_ACTICLE_FAILED,
    payload,
  };
};
