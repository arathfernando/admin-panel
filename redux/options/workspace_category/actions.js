import {
  CREATE_WORKSPACE_CATEGORY,
  CREATE_WORKSPACE_CATEGORY_FAILED,
  CREATE_WORKSPACE_CATEGORY_SUCCESSFUL,
  DELETE_WORKSPACE_CATEGORY,
  DELETE_WORKSPACE_CATEGORY_FAILED,
  DELETE_WORKSPACE_CATEGORY_SUCCESSFUL,
  GET_WORKSPACE_CATEGORIES,
  GET_WORKSPACE_CATEGORIES_FAILED,
  GET_WORKSPACE_CATEGORIES_SUCCESSFUL,
  UPDATE_WORKSPACE_CATEGORY,
  UPDATE_WORKSPACE_CATEGORY_FAILED,
  UPDATE_WORKSPACE_CATEGORY_SUCCESSFUL,
} from '../../types/options/workspace_category';

// get_workspace_categories
export const getWorkspaceCategories = () => {
  return {
    type: GET_WORKSPACE_CATEGORIES,
  };
};
export const getWorkspaceCategoriesSuccessful = (payload) => {
  return {
    type: GET_WORKSPACE_CATEGORIES_SUCCESSFUL,
    payload,
  };
};
export const getWorkspaceCategoriesFailed = (payload) => {
  return {
    type: GET_WORKSPACE_CATEGORIES_FAILED,
    payload,
  };
};

// create_workspace_category
export const createWorkspaceCategory = (payload) => {
  return {
    type: CREATE_WORKSPACE_CATEGORY,
    payload,
  };
};
export const createWorkspaceCategorySuccessful = (payload) => {
  return {
    type: CREATE_WORKSPACE_CATEGORY_SUCCESSFUL,
    payload,
  };
};
export const createWorkspaceCategoryFailed = (payload) => {
  return {
    type: CREATE_WORKSPACE_CATEGORY_FAILED,
    payload,
  };
};

// update_workspace_category
export const updateWorkspaceCategory = (payload) => {
  return {
    type: UPDATE_WORKSPACE_CATEGORY,
    payload,
  };
};
export const updateWorkspaceCategorySuccessful = (payload) => {
  return {
    type: UPDATE_WORKSPACE_CATEGORY_SUCCESSFUL,
    payload,
  };
};
export const updateWorkspaceCategoryFailed = (payload) => {
  return {
    type: UPDATE_WORKSPACE_CATEGORY_FAILED,
    payload,
  };
};

// delete_workspace_category
export const deleteWorkspaceCategory = (payload) => {
  return {
    type: DELETE_WORKSPACE_CATEGORY,
    payload,
  };
};
export const deleteWorkspaceCategorySuccessful = (payload) => {
  return {
    type: DELETE_WORKSPACE_CATEGORY_SUCCESSFUL,
    payload,
  };
};
export const deleteWorkspaceCategoryFailed = (payload) => {
  return {
    type: DELETE_WORKSPACE_CATEGORY_FAILED,
    payload,
  };
};
