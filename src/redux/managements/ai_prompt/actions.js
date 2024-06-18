import {
  CREATE_AI_PROMPT,
  CREATE_AI_PROMPT_FAILED,
  CREATE_AI_PROMPT_SUCCESSFUL,
  DELETE_AI_PROMPT,
  DELETE_AI_PROMPT_FAILED,
  DELETE_AI_PROMPT_SUCCESSFUL,
  GET_AI_PROMPT,
  GET_AI_PROMPT_FAILED,
  GET_AI_PROMPT_SUCCESSFUL,
  UPDATE_AI_PROMPT,
  UPDATE_AI_PROMPT_FAILED,
  UPDATE_AI_PROMPT_SUCCESSFUL,
} from '../../types/managements/ai_prompt';

// get_ai_prompts
export const getAIPrompts = () => {
  return {
    type: GET_AI_PROMPT,
  };
};
export const getAIPromptsSuccessful = (payload) => {
  return {
    type: GET_AI_PROMPT_SUCCESSFUL,
    payload,
  };
};
export const getAIPromptsFailed = (payload) => {
  return {
    type: GET_AI_PROMPT_FAILED,
    payload,
  };
};

// create_ai_prompt
export const createAiPrompt = (payload) => {
  return {
    type: CREATE_AI_PROMPT,
    payload,
  };
};
export const createAiPromptSuccessful = (payload) => {
  return {
    type: CREATE_AI_PROMPT_SUCCESSFUL,
    payload,
  };
};
export const createAiPromptFailed = (payload) => {
  return {
    type: CREATE_AI_PROMPT_FAILED,
    payload,
  };
};

// update_ai_prompt
export const updateAiPrompt = (payload) => {
  return {
    type: UPDATE_AI_PROMPT,
    payload,
  };
};
export const updateAiPromptSuccessful = (payload) => {
  return {
    type: UPDATE_AI_PROMPT_SUCCESSFUL,
    payload,
  };
};
export const updateAiPromptFailed = (payload) => {
  return {
    type: UPDATE_AI_PROMPT_FAILED,
    payload,
  };
};

// delete_ai_prompt
export const deleteAiPrompt = (payload) => {
  return {
    type: DELETE_AI_PROMPT,
    payload,
  };
};
export const deleteAiPromptSuccessful = (payload) => {
  return {
    type: DELETE_AI_PROMPT_SUCCESSFUL,
    payload,
  };
};
export const deleteAiPromptFailed = (payload) => {
  return {
    type: DELETE_AI_PROMPT_FAILED,
    payload,
  };
};
