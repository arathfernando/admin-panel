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

// get_post
export const getPosts = (payload) => {
  return {
    type: GET_POST,
    payload,
  };
};
export const getPostsSuccessful = (payload) => {
  return {
    type: GET_POST_SUCCESSFUL,
    payload,
  };
};
export const getPostsFailed = (payload) => {
  return {
    type: GET_POST_FAILED,
    payload,
  };
};

// create_post
export const createPost = (payload) => {
  return {
    type: CREATE_POST,
    payload,
  };
};
export const createPostSuccessful = (payload) => {
  return {
    type: CREATE_POST_SUCCESSFUL,
    payload,
  };
};
export const createPostFailed = (payload) => {
  return {
    type: CREATE_POST_FAILED,
    payload,
  };
};

// update_post
export const updatePost = (payload) => {
  return {
    type: UPDATE_POST,
    payload,
  };
};
export const updatePostSuccessful = (payload) => {
  return {
    type: UPDATE_POST_SUCCESSFUL,
    payload,
  };
};
export const updatePostFailed = (payload) => {
  return {
    type: UPDATE_POST_FAILED,
    payload,
  };
};

// delete_post
export const deletePost = (payload) => {
  return {
    type: DELETE_POST,
    payload,
  };
};
export const deletePostSuccessful = (payload) => {
  return {
    type: DELETE_POST_SUCCESSFUL,
    payload,
  };
};
export const deletePostFailed = (payload) => {
  return {
    type: DELETE_POST_FAILED,
    payload,
  };
};
