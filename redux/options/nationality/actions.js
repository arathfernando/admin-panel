import {
  CREATE_NATIONALITY,
  CREATE_NATIONALITY_FAILED,
  CREATE_NATIONALITY_SUCCESSFUL,
  DELETE_NATIONALITY,
  DELETE_NATIONALITY_FAILED,
  DELETE_NATIONALITY_SUCCESSFUL,
  GET_NATIONALITY,
  GET_NATIONALITY_FAILED,
  GET_NATIONALITY_SUCCESSFUL,
  UPDATE_NATIONALITY,
  UPDATE_NATIONALITY_FAILED,
  UPDATE_NATIONALITY_SUCCESSFUL,
} from '../../types/options/nationality';

// get_nationality
export const getNationalities = () => {
  return {
    type: GET_NATIONALITY,
  };
};
export const getNationalitiesSuccessful = (payload) => {
  return {
    type: GET_NATIONALITY_SUCCESSFUL,
    payload,
  };
};
export const getNationalitiesFailed = (payload) => {
  return {
    type: GET_NATIONALITY_FAILED,
    payload,
  };
};

// create_nationality
export const createNationality = (payload) => {
  return {
    type: CREATE_NATIONALITY,
    payload,
  };
};
export const createNationalitiesuccessful = (payload) => {
  return {
    type: CREATE_NATIONALITY_SUCCESSFUL,
    payload,
  };
};
export const createNationalityFailed = (payload) => {
  return {
    type: CREATE_NATIONALITY_FAILED,
    payload,
  };
};

// update_nationality
export const updateNationality = (payload) => {
  return {
    type: UPDATE_NATIONALITY,
    payload,
  };
};
export const updateNationalitiesuccessful = (payload) => {
  return {
    type: UPDATE_NATIONALITY_SUCCESSFUL,
    payload,
  };
};
export const updateNationalityFailed = (payload) => {
  return {
    type: UPDATE_NATIONALITY_FAILED,
    payload,
  };
};

// delete_nationality
export const deleteNationality = (payload) => {
  return {
    type: DELETE_NATIONALITY,
    payload,
  };
};
export const deleteNationalitiesuccessful = (payload) => {
  return {
    type: DELETE_NATIONALITY_SUCCESSFUL,
    payload,
  };
};
export const deleteNationalityFailed = (payload) => {
  return {
    type: DELETE_NATIONALITY_FAILED,
    payload,
  };
};
