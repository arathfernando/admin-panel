import {
  CREATE_AI_PROMPT_TYPE,
  CREATE_AI_PROMPT_TYPE_FAILED,
  CREATE_AI_PROMPT_TYPE_SUCCESSFUL,
  DELETE_AI_PROMPT_TYPE,
  DELETE_AI_PROMPT_TYPE_FAILED,
  DELETE_AI_PROMPT_TYPE_SUCCESSFUL,
  GET_AI_PROMPT_TYPE,
  GET_AI_PROMPT_TYPE_FAILED,
  GET_AI_PROMPT_TYPE_SUCCESSFUL,
  UPDATE_AI_PROMPT_TYPE,
  UPDATE_AI_PROMPT_TYPE_FAILED,
  UPDATE_AI_PROMPT_TYPE_SUCCESSFUL,
} from '../../types/managements/ai_prompt_type';

// get_ai_prompt_types
export const getAIPromptTypes = () => {
  return {
    type: GET_AI_PROMPT_TYPE,
  };
};
export const getAIPromptTypesSuccessful = (payload) => {
  return {
    type: GET_AI_PROMPT_TYPE_SUCCESSFUL,
    payload,
  };
};
export const getAIPromptTypesFailed = (payload) => {
  return {
    type: GET_AI_PROMPT_TYPE_FAILED,
    payload,
  };
};

// create_ai_prompt_type
export const createAIPromptType = (payload) => {
  return {
    type: CREATE_AI_PROMPT_TYPE,
    payload,
  };
};
export const createAIPromptTypeSuccessful = (payload) => {
  return {
    type: CREATE_AI_PROMPT_TYPE_SUCCESSFUL,
    payload,
  };
};
export const createAIPromptTypeFailed = (payload) => {
  return {
    type: CREATE_AI_PROMPT_TYPE_FAILED,
    payload,
  };
};

// update_ai_prompt_type
export const updateAIPromptType = (payload) => {
  return {
    type: UPDATE_AI_PROMPT_TYPE,
    payload,
  };
};
export const updateAIPromptTypeSuccessful = (payload) => {
  return {
    type: UPDATE_AI_PROMPT_TYPE_SUCCESSFUL,
    payload,
  };
};
export const updateAIPromptTypeFailed = (payload) => {
  return {
    type: UPDATE_AI_PROMPT_TYPE_FAILED,
    payload,
  };
};

// delete_ai_prompt_type
export const deleteAIPromptType = (payload) => {
  return {
    type: DELETE_AI_PROMPT_TYPE,
    payload,
  };
};
export const deleteAIPromptTypeSuccessful = (payload) => {
  return {
    type: DELETE_AI_PROMPT_TYPE_SUCCESSFUL,
    payload,
  };
};
export const deleteAIPromptTypeFailed = (payload) => {
  return {
    type: DELETE_AI_PROMPT_TYPE_FAILED,
    payload,
  };
};
