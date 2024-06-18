import {
  CREATE_MARKETPLACE_CATEGORY,
  CREATE_MARKETPLACE_CATEGORY_FAILED,
  CREATE_MARKETPLACE_CATEGORY_SUCCESSFUL,
  DELETE_MARKETPLACE_CATEGORY,
  DELETE_MARKETPLACE_CATEGORY_FAILED,
  DELETE_MARKETPLACE_CATEGORY_SUCCESSFUL,
  GET_MARKETPLACE_CATEGORIES,
  GET_MARKETPLACE_CATEGORIES_FAILED,
  GET_MARKETPLACE_CATEGORIES_SUCCESSFUL,
  UPDATE_MARKETPLACE_CATEGORY,
  UPDATE_MARKETPLACE_CATEGORY_FAILED,
  UPDATE_MARKETPLACE_CATEGORY_SUCCESSFUL,
} from '../../types/options/marketplace_category';

// get_marketplace_categories
export const getMarketplaceCategories = () => {
  return {
    type: GET_MARKETPLACE_CATEGORIES,
  };
};
export const getMarketplaceCategoriesSuccessful = (payload) => {
  return {
    type: GET_MARKETPLACE_CATEGORIES_SUCCESSFUL,
    payload,
  };
};
export const getMarketplaceCategoriesFailed = (payload) => {
  return {
    type: GET_MARKETPLACE_CATEGORIES_FAILED,
    payload,
  };
};

// create_marketplace_category
export const createMarketplaceCategory = (payload) => {
  return {
    type: CREATE_MARKETPLACE_CATEGORY,
    payload,
  };
};
export const createMarketplaceCategorySuccessful = (payload) => {
  return {
    type: CREATE_MARKETPLACE_CATEGORY_SUCCESSFUL,
    payload,
  };
};
export const createMarketplaceCategoryFailed = (payload) => {
  return {
    type: CREATE_MARKETPLACE_CATEGORY_FAILED,
    payload,
  };
};

// update_marketplace_category
export const updateMarketplaceCategory = (payload) => {
  return {
    type: UPDATE_MARKETPLACE_CATEGORY,
    payload,
  };
};
export const updateMarketplaceCategorySuccessful = (payload) => {
  return {
    type: UPDATE_MARKETPLACE_CATEGORY_SUCCESSFUL,
    payload,
  };
};
export const updateMarketplaceCategoryFailed = (payload) => {
  return {
    type: UPDATE_MARKETPLACE_CATEGORY_FAILED,
    payload,
  };
};

// delete_marketplace_category
export const deleteMarketplaceCategory = (payload) => {
  return {
    type: DELETE_MARKETPLACE_CATEGORY,
    payload,
  };
};
export const deleteMarketplaceCategorySuccessful = (payload) => {
  return {
    type: DELETE_MARKETPLACE_CATEGORY_SUCCESSFUL,
    payload,
  };
};
export const deleteMarketplaceCategoryFailed = (payload) => {
  return {
    type: DELETE_MARKETPLACE_CATEGORY_FAILED,
    payload,
  };
};
