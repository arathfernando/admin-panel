import {
  CREATE_WORKSPACE_CATEGORY,
  CREATE_WORKSPACE_CATEGORY_FAILED,
  CREATE_WORKSPACE_CATEGORY_SUCCESSFUL,
  DELETE_WORKSPACE_CATEGORY,
  DELETE_WORKSPACE_CATEGORY_FAILED,
  DELETE_WORKSPACE_CATEGORY_SUCCESSFUL,
  GET_WORKSPACE_CATEGORIES,
  GET_WORKSPACE_CATEGORIES_FAILED,
  GET_WORKSPACE_CATEGORIES_SUCCESSFUL,
  UPDATE_WORKSPACE_CATEGORY,
  UPDATE_WORKSPACE_CATEGORY_FAILED,
  UPDATE_WORKSPACE_CATEGORY_SUCCESSFUL,
} from '../../types/options/workspace_category';

const INIT_STATE = {
  workspaceCategories: {
    loading: false,
    error: null,
    data: [],
  },
  createWorkspaceCategoryAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  updateWorkspaceCategoryAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  deleteWorkspaceCategoryAction: {
    status: 'idle',
    error: null,
    data: {},
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // ------ get_workspace_categories ------
    case GET_WORKSPACE_CATEGORIES:
      return {
        ...state,
        workspaceCategories: {
          ...state.workspaceCategories,
          loading: true,
          error: null,
        },
      };
    case GET_WORKSPACE_CATEGORIES_SUCCESSFUL:
      return {
        ...state,
        workspaceCategories: {
          loading: false,
          error: null,
          ...action.payload,
          data: action.payload.data?.reverse?.() || [],
        },
      };
    case GET_WORKSPACE_CATEGORIES_FAILED:
      return {
        ...state,
        workspaceCategories: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };
    // ------ create_workspace_category ------
    case CREATE_WORKSPACE_CATEGORY:
      return {
        ...state,
        createWorkspaceCategoryAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_WORKSPACE_CATEGORY_SUCCESSFUL:
      return {
        ...state,
        createWorkspaceCategoryAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_WORKSPACE_CATEGORY_FAILED:
      return {
        ...state,
        createWorkspaceCategoryAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ update_workspace_category ------
    case UPDATE_WORKSPACE_CATEGORY:
      return {
        ...state,
        updateWorkspaceCategoryAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_WORKSPACE_CATEGORY_SUCCESSFUL:
      return {
        ...state,
        updateWorkspaceCategoryAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_WORKSPACE_CATEGORY_FAILED:
      return {
        ...state,
        updateWorkspaceCategoryAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ delete_workspace_category ------
    case DELETE_WORKSPACE_CATEGORY:
      return {
        ...state,
        deleteWorkspaceCategoryAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_WORKSPACE_CATEGORY_SUCCESSFUL:
      return {
        ...state,
        deleteWorkspaceCategoryAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_WORKSPACE_CATEGORY_FAILED:
      return {
        ...state,
        deleteWorkspaceCategoryAction: {
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
