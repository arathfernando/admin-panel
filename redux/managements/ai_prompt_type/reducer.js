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

const INIT_STATE = {
  aiPromptTypes: {
    loading: false,
    error: null,
    data: [],
  },
  createAIPromptTypeAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  updateAIPromptTypeAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  deleteAIPromptTypeAction: {
    status: 'idle',
    error: null,
    data: {},
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // ------ get_ai_prompt_types ------
    case GET_AI_PROMPT_TYPE:
      return {
        ...state,
        aiPromptTypes: {
          ...state.aiPromptTypes,
          loading: true,
          error: null,
        },
      };
    case GET_AI_PROMPT_TYPE_SUCCESSFUL:
      return {
        ...state,
        aiPromptTypes: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_AI_PROMPT_TYPE_FAILED:
      return {
        ...state,
        aiPromptTypes: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };
    // ------ create_ai_prompt_type ------
    case CREATE_AI_PROMPT_TYPE:
      return {
        ...state,
        createAIPromptTypeAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_AI_PROMPT_TYPE_SUCCESSFUL:
      return {
        ...state,
        createAIPromptTypeAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_AI_PROMPT_TYPE_FAILED:
      return {
        ...state,
        createAIPromptTypeAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ update_ai_prompt_type ------
    case UPDATE_AI_PROMPT_TYPE:
      return {
        ...state,
        updateAIPromptTypeAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_AI_PROMPT_TYPE_SUCCESSFUL:
      return {
        ...state,
        updateAIPromptTypeAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_AI_PROMPT_TYPE_FAILED:
      return {
        ...state,
        updateAIPromptTypeAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ delete_ai_prompt_type ------
    case DELETE_AI_PROMPT_TYPE:
      return {
        ...state,
        deleteAIPromptTypeAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_AI_PROMPT_TYPE_SUCCESSFUL:
      return {
        ...state,
        deleteAIPromptTypeAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_AI_PROMPT_TYPE_FAILED:
      return {
        ...state,
        deleteAIPromptTypeAction: {
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
