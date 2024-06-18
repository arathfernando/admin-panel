import {
  CREATE_POST,
  CREATE_POST_FAILED,
  CREATE_POST_SUCCESSFUL,
  DELETE_POST,
  DELETE_POST_FAILED,
  DELETE_POST_SUCCESSFUL,
  GET_POST,
  GET_POST_FAILED,
  GET_POST_SUCCESSFUL,
  UPDATE_POST,
  UPDATE_POST_FAILED,
  UPDATE_POST_SUCCESSFUL,
} from '../../types/community/post';

const INIT_STATE = {
  posts: {
    loading: false,
    error: null,
    data: [],
  },
  createPostAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  updatePostAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  deletePostAction: {
    status: 'idle',
    error: null,
    data: {},
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // ------ get_post ------
    case GET_POST:
      return {
        ...state,
        posts: {
          ...state.posts,
          loading: true,
          error: null,
        },
      };
    case GET_POST_SUCCESSFUL:
      return {
        ...state,
        posts: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_POST_FAILED:
      return {
        ...state,
        posts: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };
    // ------ create_post ------
    case CREATE_POST:
      return {
        ...state,
        createPostAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_POST_SUCCESSFUL:
      return {
        ...state,
        createPostAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_POST_FAILED:
      return {
        ...state,
        createPostAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ update_post ------
    case UPDATE_POST:
      return {
        ...state,
        updatePostAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_POST_SUCCESSFUL:
      return {
        ...state,
        updatePostAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_POST_FAILED:
      return {
        ...state,
        updatePostAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ delete_post ------
    case DELETE_POST:
      return {
        ...state,
        deletePostAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_POST_SUCCESSFUL:
      return {
        ...state,
        deletePostAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_POST_FAILED:
      return {
        ...state,
        deletePostAction: {
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
