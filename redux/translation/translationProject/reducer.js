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

const INIT_STATE = {
  translationProjects: {
    loading: false,
    error: null,
    data: [],
  },
  createTranslationProjectAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  updateTranslationProjectAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  deleteTranslationProjectAction: {
    status: 'idle',
    error: null,
    data: {},
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // ------ get_translation_projects ------
    case GET_TRANSLATION_PROJECT:
      return {
        ...state,
        translationProjects: {
          ...state.translationProjects,
          loading: true,
          error: null,
        },
      };
    case GET_TRANSLATION_PROJECT_SUCCESSFUL:
      return {
        ...state,
        translationProjects: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_TRANSLATION_PROJECT_FAILED:
      return {
        ...state,
        translationProjects: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };
    // ------ create_translation_project ------
    case CREATE_TRANSLATION_PROJECT:
      return {
        ...state,
        createTranslationProjectAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_TRANSLATION_PROJECT_SUCCESSFUL:
      return {
        ...state,
        createTranslationProjectAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_TRANSLATION_PROJECT_FAILED:
      return {
        ...state,
        createTranslationProjectAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ update_translation_project ------
    case UPDATE_TRANSLATION_PROJECT:
      return {
        ...state,
        updateTranslationProjectAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_TRANSLATION_PROJECT_SUCCESSFUL:
      return {
        ...state,
        updateTranslationProjectAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_TRANSLATION_PROJECT_FAILED:
      return {
        ...state,
        updateTranslationProjectAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ delete_translation_project ------
    case DELETE_TRANSLATION_PROJECT:
      return {
        ...state,
        deleteTranslationProjectAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_TRANSLATION_PROJECT_SUCCESSFUL:
      return {
        ...state,
        deleteTranslationProjectAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_TRANSLATION_PROJECT_FAILED:
      return {
        ...state,
        deleteTranslationProjectAction: {
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
