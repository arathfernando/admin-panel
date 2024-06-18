import {
  CREATE_CONTEST_TEMPLATE,
  CREATE_CONTEST_TEMPLATE_FAILED,
  CREATE_CONTEST_TEMPLATE_SUCCESSFUL,
  DELETE_TEMPLATE,
  DELETE_TEMPLATE_FAILED,
  DELETE_TEMPLATE_SUCCESSFUL,
  GET_CONTEST_TEMPLATES,
  GET_CONTEST_TEMPLATES_FAILED,
  GET_CONTEST_TEMPLATES_SUCCESSFUL,
  RESET_CONTEST_TEMPLATE,
  UPDATE_CONTEST_TEMPLATE,
  UPDATE_CONTEST_TEMPLATE_FAILED,
  UPDATE_CONTEST_TEMPLATE_SUCCESSFUL,
} from '../../types/contest/contestType';

// get_contest_templates
export const getContestTemplates = () => {
  return {
    type: GET_CONTEST_TEMPLATES,
  };
};
export const getContestTemplatesSuccessful = (payload) => {
  return {
    type: GET_CONTEST_TEMPLATES_SUCCESSFUL,
    payload,
  };
};
export const getContestTemplatesFailed = (payload) => {
  return {
    type: GET_CONTEST_TEMPLATES_FAILED,
    payload,
  };
};

// create_contest_template
export const createContestTemplate = (payload) => {
  return {
    type: CREATE_CONTEST_TEMPLATE,
    payload,
  };
};
export const createContestTemplateSuccessful = (payload) => {
  return {
    type: CREATE_CONTEST_TEMPLATE_SUCCESSFUL,
    payload,
  };
};
export const createContestTemplateFailed = (payload) => {
  return {
    type: CREATE_CONTEST_TEMPLATE_FAILED,
    payload,
  };
};
// reset_contest_template
export const resetContestTemplate = (payload) => {
  return {
    type: RESET_CONTEST_TEMPLATE,
    payload,
  };
};

// delete_template
export const deleteTemplate = (payload) => {
  return {
    type: DELETE_TEMPLATE,
    payload,
  };
};
export const deleteTemplateSuccessful = (payload) => {
  return {
    type: DELETE_TEMPLATE_SUCCESSFUL,
    payload,
  };
};
export const deleteTemplateFailed = (payload) => {
  return {
    type: DELETE_TEMPLATE_FAILED,
    payload,
  };
};

// update_contest_template
export const updateContestTwmplate = (payload) => {
  return {
    type: UPDATE_CONTEST_TEMPLATE,
    payload,
  };
};
export const updateContestTwmplateSuccessful = (payload) => {
  return {
    type: UPDATE_CONTEST_TEMPLATE_SUCCESSFUL,
    payload,
  };
};
export const updateContestTwmplateFailed = (payload) => {
  return {
    type: UPDATE_CONTEST_TEMPLATE_FAILED,
    payload,
  };
};
