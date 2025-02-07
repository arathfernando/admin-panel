import {
  CREATE_HUBBERS_TEAM,
  CREATE_HUBBERS_TEAM_ERROR,
  CREATE_HUBBERS_TEAM_SUCCESS,
  DELETE_HUBBERS_TEAM,
  DELETE_HUBBERS_TEAM_ERROR,
  DELETE_HUBBERS_TEAM_SUCCESS,
  GET_ALL_HUBBERS_TEAM,
  GET_ALL_HUBBERS_TEAM_ERROR,
  GET_ALL_HUBBERS_TEAM_SUCCESS,
  ORDER_HUBBERS_TEAM,
  ORDER_HUBBERS_TEAM_ERROR,
  ORDER_HUBBERS_TEAM_SUCCESS,
  UPDATE_HUBBERS_TEAM,
  UPDATE_HUBBERS_TEAM_ERROR,
  UPDATE_HUBBERS_TEAM_SUCCESS,
} from '../types/hubbers-team';

const INIT_STATE = {
  loading: false,
  memberList: [],
  newMember: null,
  updateMember: null,
  error: '',
  orderAction: {
    status: 'idle',
    error: null,
    data: {},
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ALL_HUBBERS_TEAM:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_HUBBERS_TEAM_SUCCESS:
      return {
        ...state,
        loading: false,
        memberList: action.payload,
      };
    case GET_ALL_HUBBERS_TEAM_ERROR:
      return {
        ...state,
        loading: false,
        memberList: [],
        error: action.payload,
      };
    case CREATE_HUBBERS_TEAM:
      return {
        ...state,
        loading: true,
      };
    case CREATE_HUBBERS_TEAM_SUCCESS:
      return {
        ...state,
        loading: false,
        newMember: action.payload,
      };
    case CREATE_HUBBERS_TEAM_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_HUBBERS_TEAM:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_HUBBERS_TEAM_SUCCESS:
      return {
        ...state,
        loading: false,
        updateMember: action.payload,
      };
    case UPDATE_HUBBERS_TEAM_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_HUBBERS_TEAM:
      return {
        ...state,
        loading: true,
      };
    case DELETE_HUBBERS_TEAM_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_HUBBERS_TEAM_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ORDER_HUBBERS_TEAM:
      return {
        ...state,
        orderAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case ORDER_HUBBERS_TEAM_SUCCESS:
      return {
        ...state,
        orderAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case ORDER_HUBBERS_TEAM_ERROR:
      return {
        ...state,
        orderAction: {
          status: 'submitted',
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
