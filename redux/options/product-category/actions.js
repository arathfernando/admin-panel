import {
  CREATE_PRODUCT_CATEGORY,
  CREATE_PRODUCT_CATEGORY_FAILED,
  CREATE_PRODUCT_CATEGORY_SUCCESSFUL,
  DELETE_PRODUCT_CATEGORY,
  DELETE_PRODUCT_CATEGORY_FAILED,
  DELETE_PRODUCT_CATEGORY_SUCCESSFUL,
  EXCHANGE_PRODUCT_CATEORY_ORDER,
  EXCHANGE_PRODUCT_CATEORY_ORDER_FAILED,
  EXCHANGE_PRODUCT_CATEORY_ORDER_SUCCESSFUL,
  GET_PRODUCT_CATEGORIES,
  GET_PRODUCT_CATEGORIES_FAILED,
  GET_PRODUCT_CATEGORIES_SUCCESSFUL,
  UPDATE_PRODUCT_CATEGORY,
  UPDATE_PRODUCT_CATEGORY_FAILED,
  UPDATE_PRODUCT_CATEGORY_SUCCESSFUL,
} from '../../types/options/product-category';

// get_product_categories
export const getProductCategories = () => {
  return {
    type: GET_PRODUCT_CATEGORIES,
  };
};
export const getProductCategoriesSuccessful = (payload) => {
  return {
    type: GET_PRODUCT_CATEGORIES_SUCCESSFUL,
    payload,
  };
};
export const getProductCategoriesFailed = (payload) => {
  return {
    type: GET_PRODUCT_CATEGORIES_FAILED,
    payload,
  };
};

// create_product_category
export const createProductCategory = (payload) => {
  return {
    type: CREATE_PRODUCT_CATEGORY,
    payload,
  };
};
export const createProductCategorySuccessful = (payload) => {
  return {
    type: CREATE_PRODUCT_CATEGORY_SUCCESSFUL,
    payload,
  };
};
export const createProductCategoryFailed = (payload) => {
  return {
    type: CREATE_PRODUCT_CATEGORY_FAILED,
    payload,
  };
};

// update_product_category
export const updateProductCategory = (payload) => {
  return {
    type: UPDATE_PRODUCT_CATEGORY,
    payload,
  };
};
export const updateProductCategorySuccessful = (payload) => {
  return {
    type: UPDATE_PRODUCT_CATEGORY_SUCCESSFUL,
    payload,
  };
};
export const updateProductCategoryFailed = (payload) => {
  return {
    type: UPDATE_PRODUCT_CATEGORY_FAILED,
    payload,
  };
};

// delete_product_category
export const deleteProductCategory = (payload) => {
  return {
    type: DELETE_PRODUCT_CATEGORY,
    payload,
  };
};
export const deleteProductCategorySuccessful = (payload) => {
  return {
    type: DELETE_PRODUCT_CATEGORY_SUCCESSFUL,
    payload,
  };
};
export const deleteProductCategoryFailed = (payload) => {
  return {
    type: DELETE_PRODUCT_CATEGORY_FAILED,
    payload,
  };
};

// exchange_product_cateory_order
export const exchangeProductCateoryOrder = (payload) => {
  return {
    type: EXCHANGE_PRODUCT_CATEORY_ORDER,
    payload,
  };
};
export const exchangeProductCateoryOrderSuccessful = (payload) => {
  return {
    type: EXCHANGE_PRODUCT_CATEORY_ORDER_SUCCESSFUL,
    payload,
  };
};
export const exchangeProductCateoryOrderFailed = (payload) => {
  return {
    type: EXCHANGE_PRODUCT_CATEORY_ORDER_FAILED,
    payload,
  };
};
