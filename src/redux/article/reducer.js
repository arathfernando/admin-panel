import {
  CREATE_ARTICLE,
  CREATE_ARTICLE_FAILED,
  CREATE_ARTICLE_SUCCESSFUL,
  DELETE_ARTICLE,
  DELETE_ARTICLE_FAILED,
  DELETE_ARTICLE_SUCCESSFUL,
  GET_ARTICLE,
  GET_ARTICLE_FAILED,
  GET_ARTICLE_SUCCESSFUL,
  UPDATE_ARTICLE,
  UPDATE_ARTICLE_FAILED,
  UPDATE_ARTICLE_SUCCESSFUL,
} from '../types/article';

const INIT_STATE = {
  articles: {
    loading: false,
    error: null,
    data: [],
  },
  createArticleAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  updateArticleAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  deleteArticleAction: {
    status: 'idle',
    error: null,
    data: {},
  },
};

export default (state = INIT_STATE, action) => {
  switch (
    action.type // ------ get_article ------
  ) {
    case GET_ARTICLE:
      return {
        ...state,
        articles: {
          ...state.articles,
          loading: true,
          error: null,
        },
      };
    case GET_ARTICLE_SUCCESSFUL:
      return {
        ...state,
        articles: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_ARTICLE_FAILED:
      return {
        ...state,
        articles: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };
    // ------ create_article ------
    case CREATE_ARTICLE:
      return {
        ...state,
        createArticleAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_ARTICLE_SUCCESSFUL:
      return {
        ...state,
        createArticleAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_ARTICLE_FAILED:
      return {
        ...state,
        createArticleAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ update_article ------
    case UPDATE_ARTICLE:
      return {
        ...state,
        updateArticleAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_ARTICLE_SUCCESSFUL:
      return {
        ...state,
        updateArticleAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_ARTICLE_FAILED:
      return {
        ...state,
        updateArticleAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ delete_article ------
    case DELETE_ARTICLE:
      return {
        ...state,
        deleteArticleAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_ARTICLE_SUCCESSFUL:
      return {
        ...state,
        deleteArticleAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_ARTICLE_FAILED:
      return {
        ...state,
        deleteArticleAction: {
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
