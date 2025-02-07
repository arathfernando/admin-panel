import {
  CREATE_CURRENCY,
  CREATE_CURRENCY_ERROR,
  CREATE_CURRENCY_SUCCESS,
  DELETE_CURRENCY,
  DELETE_CURRENCY_ERROR,
  DELETE_CURRENCY_SUCCESS,
  GET_ALL_CURRENCY,
  GET_ALL_CURRENCY_ERROR,
  GET_ALL_CURRENCY_SUCCESS,
  GET_SINGLE_CURRENCY,
  GET_SINGLE_CURRENCY_ERROR,
  GET_SINGLE_CURRENCY_SUCCESS,
  UPDATE_CURRENCY,
  UPDATE_CURRENCY_ERROR,
  UPDATE_CURRENCY_SUCCESS,
} from '../../types/options/currency';

const INIT_STATE = {
  loading: false,
  list: [],
  singleCurrency: null,
  error: '',
  msg: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ALL_CURRENCY:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_CURRENCY_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload?.reverse?.() || [],
      };
    case GET_ALL_CURRENCY_ERROR:
      return {
        ...state,
        loading: false,
        list: [],
        error: action.payload,
      };
    case GET_SINGLE_CURRENCY:
      return {
        ...state,
        loading: true,
      };
    case GET_SINGLE_CURRENCY_SUCCESS:
      return {
        ...state,
        loading: false,
        singleCurrency: action.payload,
      };
    case GET_SINGLE_CURRENCY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_CURRENCY:
      return {
        ...state,
        loading: true,
      };
    case CREATE_CURRENCY_SUCCESS:
      return {
        ...state,
        loading: false,
        list: [...state.list, action.payload],
      };
    case CREATE_CURRENCY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_CURRENCY:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_CURRENCY_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload,
      };
    case UPDATE_CURRENCY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_CURRENCY:
      return {
        ...state,
        loading: true,
      };
    case DELETE_CURRENCY_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload,
      };
    case DELETE_CURRENCY_ERROR:
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
