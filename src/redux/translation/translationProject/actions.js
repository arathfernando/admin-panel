import {
  CREATE_TRANSLATION_PROJECT,
  CREATE_TRANSLATION_PROJECT_FAILED,
  CREATE_TRANSLATION_PROJECT_SUCCESSFUL,
  DELETE_TRANSLATION_PROJECT,
  DELETE_TRANSLATION_PROJECT_FAILED,
  DELETE_TRANSLATION_PROJECT_SUCCESSFUL,
  GET_TRANSLATION_PROJECT,
  GET_TRANSLATION_PROJECT_FAILED,
  GET_TRANSLATION_PROJECT_SUCCESSFUL,
  UPDATE_TRANSLATION_PROJECT,
  UPDATE_TRANSLATION_PROJECT_FAILED,
  UPDATE_TRANSLATION_PROJECT_SUCCESSFUL,
} from '../../types/translation/translation_project';

// get_translation_projects
export const getTranslationProjects = () => {
  return {
    type: GET_TRANSLATION_PROJECT,
  };
};
export const getTranslationProjectsSuccessful = (payload) => {
  return {
    type: GET_TRANSLATION_PROJECT_SUCCESSFUL,
    payload,
  };
};
export const getTranslationProjectsFailed = (payload) => {
  return {
    type: GET_TRANSLATION_PROJECT_FAILED,
    payload,
  };
};

// create_translation_project
export const createTranslationProject = (payload) => {
  return {
    type: CREATE_TRANSLATION_PROJECT,
    payload,
  };
};
export const createTranslationProjectSuccessful = (payload) => {
  return {
    type: CREATE_TRANSLATION_PROJECT_SUCCESSFUL,
    payload,
  };
};
export const createTranslationProjectFailed = (payload) => {
  return {
    type: CREATE_TRANSLATION_PROJECT_FAILED,
    payload,
  };
};

// update_translation_project
export const updateTranslationProject = (payload) => {
  return {
    type: UPDATE_TRANSLATION_PROJECT,
    payload,
  };
};
export const updateTranslationProjectSuccessful = (payload) => {
  return {
    type: UPDATE_TRANSLATION_PROJECT_SUCCESSFUL,
    payload,
  };
};
export const updateTranslationProjectFailed = (payload) => {
  return {
    type: UPDATE_TRANSLATION_PROJECT_FAILED,
    payload,
  };
};

// delete_translation_project
export const deleteTranslationProject = (payload) => {
  return {
    type: DELETE_TRANSLATION_PROJECT,
    payload,
  };
};
export const deleteTranslationProjectSuccessful = (payload) => {
  return {
    type: DELETE_TRANSLATION_PROJECT_SUCCESSFUL,
    payload,
  };
};
export const deleteTranslationProjectFailed = (payload) => {
  return {
    type: DELETE_TRANSLATION_PROJECT_FAILED,
    payload,
  };
};
