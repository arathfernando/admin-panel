import {
  CREATE_SKILL,
  CREATE_SKILL_FAILED,
  CREATE_SKILL_SUCCESSFUL,
  DELETE_SKILL,
  DELETE_SKILL_FAILED,
  DELETE_SKILL_SUCCESSFUL,
  GET_SKILL,
  GET_SKILL_FAILED,
  GET_SKILL_SUCCESSFUL,
  UPDATE_SKILL,
  UPDATE_SKILL_FAILED,
  UPDATE_SKILL_SUCCESSFUL,
} from '../../types/options/skill';

const INIT_STATE = {
  skills: {
    loading: false,
    error: null,
    data: [],
  },
  createSkillAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  updateSkillAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  deleteSkillAction: {
    status: 'idle',
    error: null,
    data: {},
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // ------ get_skill ------
    case GET_SKILL:
      return {
        ...state,
        skills: {
          ...state.skills,
          loading: true,
          error: null,
        },
      };
    case GET_SKILL_SUCCESSFUL:
      return {
        ...state,
        skills: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_SKILL_FAILED:
      return {
        ...state,
        skills: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };
    // ------ create_skill ------
    case CREATE_SKILL:
      return {
        ...state,
        createSkillAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_SKILL_SUCCESSFUL:
      return {
        ...state,
        createSkillAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_SKILL_FAILED:
      return {
        ...state,
        createSkillAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ update_skill ------
    case UPDATE_SKILL:
      return {
        ...state,
        updateSkillAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_SKILL_SUCCESSFUL:
      return {
        ...state,
        updateSkillAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_SKILL_FAILED:
      return {
        ...state,
        updateSkillAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ delete_skill ------
    case DELETE_SKILL:
      return {
        ...state,
        deleteSkillAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_SKILL_SUCCESSFUL:
      return {
        ...state,
        deleteSkillAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_SKILL_FAILED:
      return {
        ...state,
        deleteSkillAction: {
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
