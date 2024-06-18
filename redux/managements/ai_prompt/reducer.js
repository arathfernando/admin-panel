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

const INIT_STATE = {
  aiPrompts: {
    loading: false,
    error: null,
    data: [],
  },
  createAiPromptAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  updateAiPromptAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  deleteAiPromptAction: {
    status: 'idle',
    error: null,
    data: {},
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // ------ get_ai_prompts ------
    case GET_AI_PROMPT:
      return {
        ...state,
        aiPrompts: {
          ...state.aiPrompts,
          loading: true,
          error: null,
        },
      };
    case GET_AI_PROMPT_SUCCESSFUL:
      return {
        ...state,
        aiPrompts: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_AI_PROMPT_FAILED:
      return {
        ...state,
        aiPrompts: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };
    // ------ create_ai_prompt ------
    case CREATE_AI_PROMPT:
      return {
        ...state,
        createAiPromptAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_AI_PROMPT_SUCCESSFUL:
      return {
        ...state,
        createAiPromptAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_AI_PROMPT_FAILED:
      return {
        ...state,
        createAiPromptAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ update_ai_prompt ------
    case UPDATE_AI_PROMPT:
      return {
        ...state,
        updateAiPromptAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_AI_PROMPT_SUCCESSFUL:
      return {
        ...state,
        updateAiPromptAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_AI_PROMPT_FAILED:
      return {
        ...state,
        updateAiPromptAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ delete_ai_prompt ------
    case DELETE_AI_PROMPT:
      return {
        ...state,
        deleteAiPromptAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_AI_PROMPT_SUCCESSFUL:
      return {
        ...state,
        deleteAiPromptAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_AI_PROMPT_FAILED:
      return {
        ...state,
        deleteAiPromptAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    default:
      return {
        ...state,
      };
  }
};
