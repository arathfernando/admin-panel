import {
  CREATE_COUNTRY,
  CREATE_COUNTRY_ERROR,
  CREATE_COUNTRY_SUCCESS,
  DELETE_COUNTRY,
  DELETE_COUNTRY_ERROR,
  DELETE_COUNTRY_SUCCESS,
  GET_ALL_COUNTRY,
  GET_ALL_COUNTRY_ERROR,
  GET_ALL_COUNTRY_SUCCESS,
  GET_SINGLE_COUNTRY,
  GET_SINGLE_COUNTRY_ERROR,
  GET_SINGLE_COUNTRY_SUCCESS,
  UPDATE_COUNTRY,
  UPDATE_COUNTRY_ERROR,
  UPDATE_COUNTRY_SUCCESS,
} from '../../types/options/country';

const INIT_STATE = {
  loading: false,
  list: [],
  singleCountry: null,
  error: '',
  msg: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ALL_COUNTRY:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_COUNTRY_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload?.reverse?.() || [],
      };
    case GET_ALL_COUNTRY_ERROR:
      return {
        ...state,
        loading: false,
        list: [],
        error: action.payload,
      };
    case GET_SINGLE_COUNTRY:
      return {
        ...state,
        loading: true,
      };
    case GET_SINGLE_COUNTRY_SUCCESS:
      return {
        ...state,
        loading: false,
        singleCountry: action.payload,
      };
    case GET_SINGLE_COUNTRY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_COUNTRY:
      return {
        ...state,
        loading: true,
      };
    case CREATE_COUNTRY_SUCCESS:
      return {
        ...state,
        loading: false,
        list: [...state.list, action.payload],
      };
    case CREATE_COUNTRY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_COUNTRY:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_COUNTRY_SUCCESS:
      return {
        ...state,
        loading: false,
        mag: action.payload,
      };
    case UPDATE_COUNTRY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_COUNTRY:
      return {
        ...state,
        loading: true,
      };
    case DELETE_COUNTRY_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload,
      };
    case DELETE_COUNTRY_ERROR:
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
