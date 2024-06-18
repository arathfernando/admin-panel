import {
  DELETE_WALKTHROUGH_CATEGORY,
  DELETE_WALKTHROUGH_CATEGORY_FAILED,
  DELETE_WALKTHROUGH_CATEGORY_SUCCESSFUL,
  GET_WALKTHROUGH_CATEGORY,
  GET_WALKTHROUGH_CATEGORY_FAILED,
  GET_WALKTHROUGH_CATEGORY_SUCCESSFUL,
  SUBMIT_WALKTHROUGH_CATEGORY,
  SUBMIT_WALKTHROUGH_CATEGORY_FAILED,
  SUBMIT_WALKTHROUGH_CATEGORY_SUCCESSFUL,
} from '../../types/managements/walkthrough_category';

// get_walkthrough_categorys
export const getWalkthroughCategorys = () => {
  return {
    type: GET_WALKTHROUGH_CATEGORY,
  };
};
export const getWalkthroughCategorysSuccessful = (payload) => {
  return {
    type: GET_WALKTHROUGH_CATEGORY_SUCCESSFUL,
    payload,
  };
};
export const getWalkthroughCategorysFailed = (payload) => {
  return {
    type: GET_WALKTHROUGH_CATEGORY_FAILED,
    payload,
  };
};

// submit_walkthrough_category
export const submitWalkthroughCategory = (payload) => {
  return {
    type: SUBMIT_WALKTHROUGH_CATEGORY,
    payload,
  };
};
export const submitWalkthroughCategorySuccessful = (payload) => {
  return {
    type: SUBMIT_WALKTHROUGH_CATEGORY_SUCCESSFUL,
    payload,
  };
};
export const submitWalkthroughCategoryFailed = (payload) => {
  return {
    type: SUBMIT_WALKTHROUGH_CATEGORY_FAILED,
    payload,
  };
};

// delete_walkthrough_category
export const deleteWalkthroughCategory = (payload) => {
  return {
    type: DELETE_WALKTHROUGH_CATEGORY,
    payload,
  };
};
export const deleteWalkthroughCategorySuccessful = (payload) => {
  return {
    type: DELETE_WALKTHROUGH_CATEGORY_SUCCESSFUL,
    payload,
  };
};
export const deleteWalkthroughCategoryFailed = (payload) => {
  return {
    type: DELETE_WALKTHROUGH_CATEGORY_FAILED,
    payload,
  };
};
