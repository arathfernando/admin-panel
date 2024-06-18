import {
  CREATE_NATIONALITY,
  CREATE_NATIONALITY_FAILED,
  CREATE_NATIONALITY_SUCCESSFUL,
  DELETE_NATIONALITY,
  DELETE_NATIONALITY_FAILED,
  DELETE_NATIONALITY_SUCCESSFUL,
  GET_NATIONALITY,
  GET_NATIONALITY_FAILED,
  GET_NATIONALITY_SUCCESSFUL,
  UPDATE_NATIONALITY,
  UPDATE_NATIONALITY_FAILED,
  UPDATE_NATIONALITY_SUCCESSFUL,
} from '../../types/options/nationality';

const INIT_STATE = {
  nationalities: {
    loading: false,
    error: null,
    data: [],
  },
  createNationalityAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  updateNationalityAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  deleteNationalityAction: {
    status: 'idle',
    error: null,
    data: {},
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // ------ get_nationality ------
    case GET_NATIONALITY:
      return {
        ...state,
        nationalities: {
          ...state.nationalities,
          loading: true,
          error: null,
        },
      };
    case GET_NATIONALITY_SUCCESSFUL:
      return {
        ...state,
        nationalities: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_NATIONALITY_FAILED:
      return {
        ...state,
        nationalities: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };
    // ------ create_nationality ------
    case CREATE_NATIONALITY:
      return {
        ...state,
        createNationalityAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_NATIONALITY_SUCCESSFUL:
      return {
        ...state,
        createNationalityAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_NATIONALITY_FAILED:
      return {
        ...state,
        createNationalityAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ update_nationality ------
    case UPDATE_NATIONALITY:
      return {
        ...state,
        updateNationalityAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_NATIONALITY_SUCCESSFUL:
      return {
        ...state,
        updateNationalityAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_NATIONALITY_FAILED:
      return {
        ...state,
        updateNationalityAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ delete_nationality ------
    case DELETE_NATIONALITY:
      return {
        ...state,
        deleteNationalityAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_NATIONALITY_SUCCESSFUL:
      return {
        ...state,
        deleteNationalityAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_NATIONALITY_FAILED:
      return {
        ...state,
        deleteNationalityAction: {
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
