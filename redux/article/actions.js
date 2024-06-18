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

// get_article
export const getArticles = () => {
  return {
    type: GET_ARTICLE,
  };
};
export const getArticlesSuccessful = (payload) => {
  return {
    type: GET_ARTICLE_SUCCESSFUL,
    payload,
  };
};
export const getArticlesFailed = (payload) => {
  return {
    type: GET_ARTICLE_FAILED,
    payload,
  };
};

// create_article
export const createArticle = (payload) => {
  return {
    type: CREATE_ARTICLE,
    payload,
  };
};
export const createArticleSuccessful = (payload) => {
  return {
    type: CREATE_ARTICLE_SUCCESSFUL,
    payload,
  };
};
export const createArticleFailed = (payload) => {
  return {
    type: CREATE_ARTICLE_FAILED,
    payload,
  };
};

// update_article
export const updateArticle = (payload) => {
  return {
    type: UPDATE_ARTICLE,
    payload,
  };
};
export const updateArticleSuccessful = (payload) => {
  return {
    type: UPDATE_ARTICLE_SUCCESSFUL,
    payload,
  };
};
export const updateArticleFailed = (payload) => {
  return {
    type: UPDATE_ARTICLE_FAILED,
    payload,
  };
};

// delete_article
export const deleteArticle = (payload) => {
  return {
    type: DELETE_ARTICLE,
    payload,
  };
};
export const deleteArticleSuccessful = (payload) => {
  return {
    type: DELETE_ARTICLE_SUCCESSFUL,
    payload,
  };
};
export const deleteArticleFailed = (payload) => {
  return {
    type: DELETE_ARTICLE_FAILED,
    payload,
  };
};
