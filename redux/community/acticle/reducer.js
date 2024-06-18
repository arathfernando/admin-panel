import {
  CREATE_ACTICLE,
  CREATE_ACTICLE_FAILED,
  CREATE_ACTICLE_SUCCESSFUL,
  DELETE_ACTICLE,
  DELETE_ACTICLE_FAILED,
  DELETE_ACTICLE_SUCCESSFUL,
  GET_ACTICLE,
  GET_ACTICLE_FAILED,
  GET_ACTICLE_SUCCESSFUL,
  UPDATE_ACTICLE,
  UPDATE_ACTICLE_FAILED,
  UPDATE_ACTICLE_SUCCESSFUL,
} from '../../types/community/acticle';

const INIT_STATE = {
  acticles: {
    loading: false,
    error: null,
    data: [],
  },
  createActicleAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  updateActicleAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  deleteActicleAction: {
    status: 'idle',
    error: null,
    data: {},
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // ------ get_acticle ------
    case GET_ACTICLE:
      return {
        ...state,
        acticles: {
          ...state.acticles,
          loading: true,
          error: null,
        },
      };
    case GET_ACTICLE_SUCCESSFUL:
      return {
        ...state,
        acticles: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_ACTICLE_FAILED:
      return {
        ...state,
        acticles: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };
    // ------ create_acticle ------
    case CREATE_ACTICLE:
      return {
        ...state,
        createActicleAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_ACTICLE_SUCCESSFUL:
      return {
        ...state,
        createActicleAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_ACTICLE_FAILED:
      return {
        ...state,
        createActicleAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ update_acticle ------
    case UPDATE_ACTICLE:
      return {
        ...state,
        updateActicleAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_ACTICLE_SUCCESSFUL:
      return {
        ...state,
        updateActicleAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_ACTICLE_FAILED:
      return {
        ...state,
        updateActicleAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ delete_acticle ------
    case DELETE_ACTICLE:
      return {
        ...state,
        deleteActicleAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_ACTICLE_SUCCESSFUL:
      return {
        ...state,
        deleteActicleAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_ACTICLE_FAILED:
      return {
        ...state,
        deleteActicleAction: {
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
