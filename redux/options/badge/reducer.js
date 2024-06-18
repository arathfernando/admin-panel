import {
  CREATE_BADGE,
  CREATE_BADGE_FAILED,
  CREATE_BADGE_SUCCESSFUL,
  DELETE_BADGE,
  DELETE_BADGE_FAILED,
  DELETE_BADGE_SUCCESSFUL,
  GET_BADGE,
  GET_BADGE_FAILED,
  GET_BADGE_SUCCESSFUL,
  UPDATE_BADGE,
  UPDATE_BADGE_FAILED,
  UPDATE_BADGE_SUCCESSFUL,
} from '../../types/options/badge';

const INIT_STATE = {
  badges: {
    loading: false,
    error: null,
    data: [],
  },
  createBadgeAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  updateBadgeAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  deleteBadgeAction: {
    status: 'idle',
    error: null,
    data: {},
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // ------ get_badge ------
    case GET_BADGE:
      return {
        ...state,
        badges: {
          ...state.badges,
          loading: true,
          error: null,
        },
      };
    case GET_BADGE_SUCCESSFUL:
      return {
        ...state,
        badges: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_BADGE_FAILED:
      return {
        ...state,
        badges: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };
    // ------ create_badge ------
    case CREATE_BADGE:
      return {
        ...state,
        createBadgeAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_BADGE_SUCCESSFUL:
      return {
        ...state,
        createBadgeAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_BADGE_FAILED:
      return {
        ...state,
        createBadgeAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ update_badge ------
    case UPDATE_BADGE:
      return {
        ...state,
        updateBadgeAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_BADGE_SUCCESSFUL:
      return {
        ...state,
        updateBadgeAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_BADGE_FAILED:
      return {
        ...state,
        updateBadgeAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ delete_badge ------
    case DELETE_BADGE:
      return {
        ...state,
        deleteBadgeAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_BADGE_SUCCESSFUL:
      return {
        ...state,
        deleteBadgeAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_BADGE_FAILED:
      return {
        ...state,
        deleteBadgeAction: {
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
