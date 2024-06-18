import {
  CREATE_COURSE_CATEGORY,
  CREATE_COURSE_CATEGORY_ERROR,
  CREATE_COURSE_CATEGORY_SUCCESS,
  DELETE_COURSE_CATEGORY,
  DELETE_COURSE_CATEGORY_ERROR,
  DELETE_COURSE_CATEGORY_SUCCESS,
  GET_COURSE_CATEGORYS,
  GET_COURSE_CATEGORYS_ERROR,
  GET_COURSE_CATEGORYS_SUCCESS,
  UPDATE_COURSE_CATEGORY,
  UPDATE_COURSE_CATEGORY_ERROR,
  UPDATE_COURSE_CATEGORY_SUCCESS,
} from '../../types/options/course';

const INIT_STATE = {
  loading: false,
  list: [],
  error: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CREATE_COURSE_CATEGORY:
      return { ...state, loading: true };

    case CREATE_COURSE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        list: [...state.list, action.payload],
      };

    case CREATE_COURSE_CATEGORY_ERROR:
      return { ...state, loading: false, error: action.payload };

    case GET_COURSE_CATEGORYS:
      return { ...state, loading: true };

    case GET_COURSE_CATEGORYS_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload?.reverse?.() || [],
      };

    case GET_COURSE_CATEGORYS_ERROR:
      return { ...state, loading: false, error: action.payload };

    case DELETE_COURSE_CATEGORY:
      return { ...state, loading: true };

    case DELETE_COURSE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        list: state.list.filter((item) => item.id !== action.payload.payload),
      };
    case DELETE_COURSE_CATEGORY_ERROR:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_COURSE_CATEGORY:
      return { ...state, loading: true };

    case UPDATE_COURSE_CATEGORY_SUCCESS:
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

    case UPDATE_COURSE_CATEGORY_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
