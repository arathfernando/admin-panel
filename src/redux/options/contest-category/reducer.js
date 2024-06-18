import {
  CREATE_CONTEST_CATEGORY,
  CREATE_CONTEST_CATEGORY_ERROR,
  CREATE_CONTEST_CATEGORY_SUCCESS,
  DELETE_CONTEST_CATEGORY,
  DELETE_CONTEST_CATEGORY_ERROR,
  DELETE_CONTEST_CATEGORY_SUCCESS,
  GET_ALL_CONTEST_CATEGORY,
  GET_ALL_CONTEST_CATEGORY_ERROR,
  GET_ALL_CONTEST_CATEGORY_SUCCESS,
  UPDATE_CONTEST_CATEGORY,
  UPDATE_CONTEST_CATEGORY_ERROR,
  UPDATE_CONTEST_CATEGORY_SUCCESS,
} from '../../types/options/contest-category';

const INIT_STATE = {
  loading: false,
  list: [],
  error: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CREATE_CONTEST_CATEGORY:
      return { ...state, loading: true };

    case CREATE_CONTEST_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        list: [...state.list, action.payload],
      };

    case CREATE_CONTEST_CATEGORY_ERROR:
      return { ...state, loading: false, error: action.payload };

    case GET_ALL_CONTEST_CATEGORY:
      return { ...state, loading: true };

    case GET_ALL_CONTEST_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload?.reverse?.() || [],
      };

    case GET_ALL_CONTEST_CATEGORY_ERROR:
      return { ...state, loading: false, error: action.payload };

    case DELETE_CONTEST_CATEGORY:
      return { ...state, loading: true };

    case DELETE_CONTEST_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        list: state.list.filter((item) => item.id !== action.payload.payload),
      };
    case DELETE_CONTEST_CATEGORY_ERROR:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_CONTEST_CATEGORY:
      return { ...state, loading: true };

    case UPDATE_CONTEST_CATEGORY_SUCCESS:
      /* eslint-disable */
      const foundIndex = state.list.findIndex(
        (x) => x.id === action.payload.id
      );
      state.list[foundIndex] = action.payload;
      /* eslint-enable */
      return {
        ...state,
        loading: false,
        list: state.list,
      };

    case UPDATE_CONTEST_CATEGORY_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
