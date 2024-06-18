import {
  CREATE_PRODUCT_INNOVATION_CATEGORY,
  CREATE_PRODUCT_INNOVATION_CATEGORY_FAILED,
  CREATE_PRODUCT_INNOVATION_CATEGORY_SUCCESSFUL,
  DELETE_PRODUCT_INNOVATION_CATEGORY,
  DELETE_PRODUCT_INNOVATION_CATEGORY_FAILED,
  DELETE_PRODUCT_INNOVATION_CATEGORY_SUCCESSFUL,
  GET_PRODUCT_SUBCATEGORIES,
  GET_PRODUCT_SUBCATEGORIES_FAILED,
  GET_PRODUCT_SUBCATEGORIES_SUCCESSFUL,
  UPDATE_PRODUCT_INNOVATION_CATEGORY,
  UPDATE_PRODUCT_INNOVATION_CATEGORY_FAILED,
  UPDATE_PRODUCT_INNOVATION_CATEGORY_SUCCESSFUL,
} from '../../types/options/product_innovation_category';

// get_product_innovation_categories
export const getProductInnovationCategories = () => {
  return {
    type: GET_PRODUCT_SUBCATEGORIES,
  };
};
export const getProductInnovationCategoriesSuccessful = (payload) => {
  return {
    type: GET_PRODUCT_SUBCATEGORIES_SUCCESSFUL,
    payload,
  };
};
export const getProductInnovationCategoriesFailed = (payload) => {
  return {
    type: GET_PRODUCT_SUBCATEGORIES_FAILED,
    payload,
  };
};

// create_product_innovation_category
export const createProductInnovationCategory = (payload) => {
  return {
    type: CREATE_PRODUCT_INNOVATION_CATEGORY,
    payload,
  };
};
export const createProductInnovationCategorySuccessful = (payload) => {
  return {
    type: CREATE_PRODUCT_INNOVATION_CATEGORY_SUCCESSFUL,
    payload,
  };
};
export const createProductInnovationCategoryFailed = (payload) => {
  return {
    type: CREATE_PRODUCT_INNOVATION_CATEGORY_FAILED,
    payload,
  };
};

// update_product_innovation_category
export const updateProductInnovationCategory = (payload) => {
  return {
    type: UPDATE_PRODUCT_INNOVATION_CATEGORY,
    payload,
  };
};
export const updateProductInnovationCategorySuccessful = (payload) => {
  return {
    type: UPDATE_PRODUCT_INNOVATION_CATEGORY_SUCCESSFUL,
    payload,
  };
};
export const updateProductInnovationCategoryFailed = (payload) => {
  return {
    type: UPDATE_PRODUCT_INNOVATION_CATEGORY_FAILED,
    payload,
  };
};

// delete_product_innovation_category
export const deleteProductInnovationCategory = (payload) => {
  return {
    type: DELETE_PRODUCT_INNOVATION_CATEGORY,
    payload,
  };
};
export const deleteProductInnovationCategorySuccessful = (payload) => {
  return {
    type: DELETE_PRODUCT_INNOVATION_CATEGORY_SUCCESSFUL,
    payload,
  };
};
export const deleteProductInnovationCategoryFailed = (payload) => {
  return {
    type: DELETE_PRODUCT_INNOVATION_CATEGORY_FAILED,
    payload,
  };
};
