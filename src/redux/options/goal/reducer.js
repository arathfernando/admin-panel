import {
  CREATE_GOAL,
  CREATE_GOAL_ERROR,
  CREATE_GOAL_SUCCESS,
  DELETE_GOAL,
  DELETE_GOAL_ERROR,
  DELETE_GOAL_SUCCESS,
  GET_ALL_GOALS,
  GET_ALL_GOALS_ERROR,
  GET_ALL_GOALS_SUCCESS,
  UPDATE_GOAL,
  UPDATE_GOAL_ERROR,
  UPDATE_GOAL_SUCCESS,
} from '../../types/options/goal';

const INIT_STATE = {
  loading: false,
  list: [],
  error: '',
  msg: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ALL_GOALS:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_GOALS_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case GET_ALL_GOALS_ERROR:
      return {
        ...state,
        loading: false,
        list: [],
        error: action.payload,
      };
    case CREATE_GOAL:
      return {
        ...state,
        loading: true,
      };
    case CREATE_GOAL_SUCCESS:
      return {
        ...state,
        loading: false,
        list: [...state.list, action.payload],
      };
    case CREATE_GOAL_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_GOAL:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_GOAL_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload,
      };
    case UPDATE_GOAL_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_GOAL:
      return {
        ...state,
        loading: true,
      };
    case DELETE_GOAL_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload,
      };
    case DELETE_GOAL_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
