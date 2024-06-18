import {
  CREATE_PRODUCT_TECH_CATEGORY,
  CREATE_PRODUCT_TECH_CATEGORY_FAILED,
  CREATE_PRODUCT_TECH_CATEGORY_SUCCESSFUL,
  DELETE_PRODUCT_TECH_CATEGORY,
  DELETE_PRODUCT_TECH_CATEGORY_FAILED,
  DELETE_PRODUCT_TECH_CATEGORY_SUCCESSFUL,
  GET_PRODUCT_SUBCATEGORIES,
  GET_PRODUCT_SUBCATEGORIES_FAILED,
  GET_PRODUCT_SUBCATEGORIES_SUCCESSFUL,
  UPDATE_PRODUCT_TECH_CATEGORY,
  UPDATE_PRODUCT_TECH_CATEGORY_FAILED,
  UPDATE_PRODUCT_TECH_CATEGORY_SUCCESSFUL,
} from '../../types/options/product_tech_category';

// get_product_tech_categories
export const getProductTechCategories = () => {
  return {
    type: GET_PRODUCT_SUBCATEGORIES,
  };
};
export const getProductTechCategoriesSuccessful = (payload) => {
  return {
    type: GET_PRODUCT_SUBCATEGORIES_SUCCESSFUL,
    payload,
  };
};
export const getProductTechCategoriesFailed = (payload) => {
  return {
    type: GET_PRODUCT_SUBCATEGORIES_FAILED,
    payload,
  };
};

// create_product_tech_category
export const createProductTechCategory = (payload) => {
  return {
    type: CREATE_PRODUCT_TECH_CATEGORY,
    payload,
  };
};
export const createProductTechCategorySuccessful = (payload) => {
  return {
    type: CREATE_PRODUCT_TECH_CATEGORY_SUCCESSFUL,
    payload,
  };
};
export const createProductTechCategoryFailed = (payload) => {
  return {
    type: CREATE_PRODUCT_TECH_CATEGORY_FAILED,
    payload,
  };
};

// update_product_tech_category
export const updateProductTechCategory = (payload) => {
  return {
    type: UPDATE_PRODUCT_TECH_CATEGORY,
    payload,
  };
};
export const updateProductTechCategorySuccessful = (payload) => {
  return {
    type: UPDATE_PRODUCT_TECH_CATEGORY_SUCCESSFUL,
    payload,
  };
};
export const updateProductTechCategoryFailed = (payload) => {
  return {
    type: UPDATE_PRODUCT_TECH_CATEGORY_FAILED,
    payload,
  };
};

// delete_product_tech_category
export const deleteProductTechCategory = (payload) => {
  return {
    type: DELETE_PRODUCT_TECH_CATEGORY,
    payload,
  };
};
export const deleteProductTechCategorySuccessful = (payload) => {
  return {
    type: DELETE_PRODUCT_TECH_CATEGORY_SUCCESSFUL,
    payload,
  };
};
export const deleteProductTechCategoryFailed = (payload) => {
  return {
    type: DELETE_PRODUCT_TECH_CATEGORY_FAILED,
    payload,
  };
};
