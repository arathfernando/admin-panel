import {
  CREATE_WORKSPACE_CATEGORY_CARD,
  CREATE_WORKSPACE_CATEGORY_CARD_FAILED,
  CREATE_WORKSPACE_CATEGORY_CARD_SUCCESSFUL,
  DELETE_WORKSPACE_CATEGORY_CARD,
  DELETE_WORKSPACE_CATEGORY_CARD_FAILED,
  DELETE_WORKSPACE_CATEGORY_CARD_SUCCESSFUL,
  GET_WORKSPACE_CATEGORY_CARDS,
  GET_WORKSPACE_CATEGORY_CARDS_FAILED,
  GET_WORKSPACE_CATEGORY_CARDS_SUCCESSFUL,
  UPDATE_WORKSPACE_CATEGORY_CARD,
  UPDATE_WORKSPACE_CATEGORY_CARD_FAILED,
  UPDATE_WORKSPACE_CATEGORY_CARD_SUCCESSFUL,
} from '../../types/options/workspace_category_card';

const INIT_STATE = {
  workspaceCategoryCards: {
    loading: false,
    error: null,
    data: [],
  },
  createWorkspaceCategoryCardAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  updateWorkspaceCategoryCardAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  deleteWorkspaceCategoryCardAction: {
    status: 'idle',
    error: null,
    data: {},
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // ------ get_workspace_category_cards ------
    case GET_WORKSPACE_CATEGORY_CARDS:
      return {
        ...state,
        workspaceCategoryCards: {
          ...state.workspaceCategoryCards,
          loading: true,
          error: null,
        },
      };
    case GET_WORKSPACE_CATEGORY_CARDS_SUCCESSFUL:
      return {
        ...state,
        workspaceCategoryCards: {
          loading: false,
          error: null,
          ...action.payload,
          data: action.payload.data?.reverse?.() || [],
        },
      };
    case GET_WORKSPACE_CATEGORY_CARDS_FAILED:
      return {
        ...state,
        workspaceCategoryCards: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };
    // ------ create_workspace_category_card ------
    case CREATE_WORKSPACE_CATEGORY_CARD:
      return {
        ...state,
        createWorkspaceCategoryCardAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_WORKSPACE_CATEGORY_CARD_SUCCESSFUL:
      return {
        ...state,
        createWorkspaceCategoryCardAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_WORKSPACE_CATEGORY_CARD_FAILED:
      return {
        ...state,
        createWorkspaceCategoryCardAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ update_workspace_category_card ------
    case UPDATE_WORKSPACE_CATEGORY_CARD:
      return {
        ...state,
        updateWorkspaceCategoryCardAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_WORKSPACE_CATEGORY_CARD_SUCCESSFUL:
      return {
        ...state,
        updateWorkspaceCategoryCardAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_WORKSPACE_CATEGORY_CARD_FAILED:
      return {
        ...state,
        updateWorkspaceCategoryCardAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ delete_workspace_category_card ------
    case DELETE_WORKSPACE_CATEGORY_CARD:
      return {
        ...state,
        deleteWorkspaceCategoryCardAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_WORKSPACE_CATEGORY_CARD_SUCCESSFUL:
      return {
        ...state,
        deleteWorkspaceCategoryCardAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_WORKSPACE_CATEGORY_CARD_FAILED:
      return {
        ...state,
        deleteWorkspaceCategoryCardAction: {
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
