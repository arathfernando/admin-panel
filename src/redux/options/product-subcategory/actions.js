import {
  CREATE_PRODUCT_SUBCATEGORY,
  CREATE_PRODUCT_SUBCATEGORY_FAILED,
  CREATE_PRODUCT_SUBCATEGORY_SUCCESSFUL,
  DELETE_PRODUCT_SUBCATEGORY,
  DELETE_PRODUCT_SUBCATEGORY_FAILED,
  DELETE_PRODUCT_SUBCATEGORY_SUCCESSFUL,
  EXCHANGE_PRODUCT_SUBCATEORY_ORDER,
  EXCHANGE_PRODUCT_SUBCATEORY_ORDER_FAILED,
  EXCHANGE_PRODUCT_SUBCATEORY_ORDER_SUCCESSFUL,
  GET_PRODUCT_SUBCATEGORIES,
  GET_PRODUCT_SUBCATEGORIES_FAILED,
  GET_PRODUCT_SUBCATEGORIES_SUCCESSFUL,
  UPDATE_PRODUCT_SUBCATEGORY,
  UPDATE_PRODUCT_SUBCATEGORY_FAILED,
  UPDATE_PRODUCT_SUBCATEGORY_SUCCESSFUL,
} from '../../types/options/product-subcategory';

// get_product_subcategories
export const getProductSubCategories = () => {
  return {
    type: GET_PRODUCT_SUBCATEGORIES,
  };
};
export const getProductSubCategoriesSuccessful = (payload) => {
  return {
    type: GET_PRODUCT_SUBCATEGORIES_SUCCESSFUL,
    payload,
  };
};
export const getProductSubCategoriesFailed = (payload) => {
  return {
    type: GET_PRODUCT_SUBCATEGORIES_FAILED,
    payload,
  };
};

// create_product_subcategory
export const createProductSubcategory = (payload) => {
  return {
    type: CREATE_PRODUCT_SUBCATEGORY,
    payload,
  };
};
export const createProductSubcategorySuccessful = (payload) => {
  return {
    type: CREATE_PRODUCT_SUBCATEGORY_SUCCESSFUL,
    payload,
  };
};
export const createProductSubcategoryFailed = (payload) => {
  return {
    type: CREATE_PRODUCT_SUBCATEGORY_FAILED,
    payload,
  };
};

// update_product_subcategory
export const updateProductSubcategory = (payload) => {
  return {
    type: UPDATE_PRODUCT_SUBCATEGORY,
    payload,
  };
};
export const updateProductSubcategorySuccessful = (payload) => {
  return {
    type: UPDATE_PRODUCT_SUBCATEGORY_SUCCESSFUL,
    payload,
  };
};
export const updateProductSubcategoryFailed = (payload) => {
  return {
    type: UPDATE_PRODUCT_SUBCATEGORY_FAILED,
    payload,
  };
};

// delete_product_subcategory
export const deleteProductSubcategory = (payload) => {
  return {
    type: DELETE_PRODUCT_SUBCATEGORY,
    payload,
  };
};
export const deleteProductSubcategorySuccessful = (payload) => {
  return {
    type: DELETE_PRODUCT_SUBCATEGORY_SUCCESSFUL,
    payload,
  };
};
export const deleteProductSubcategoryFailed = (payload) => {
  return {
    type: DELETE_PRODUCT_SUBCATEGORY_FAILED,
    payload,
  };
};

// exchange_product_subcateory_order
export const exchangeProductSubcateoryOrder = (payload) => {
  return {
    type: EXCHANGE_PRODUCT_SUBCATEORY_ORDER,
    payload,
  };
};
export const exchangeProductSubcateoryOrderSuccessful = (payload) => {
  return {
    type: EXCHANGE_PRODUCT_SUBCATEORY_ORDER_SUCCESSFUL,
    payload,
  };
};
export const exchangeProductSubcateoryOrderFailed = (payload) => {
  return {
    type: EXCHANGE_PRODUCT_SUBCATEORY_ORDER_FAILED,
    payload,
  };
};
