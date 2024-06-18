import {
  CREATE_PRODUCT_SUBCATEGORY_FAQ,
  CREATE_PRODUCT_SUBCATEGORY_FAQ_FAILED,
  CREATE_PRODUCT_SUBCATEGORY_FAQ_SUCCESSFUL,
  DELETE_PRODUCT_SUBCATEGORY_FAQ,
  DELETE_PRODUCT_SUBCATEGORY_FAQ_FAILED,
  DELETE_PRODUCT_SUBCATEGORY_FAQ_SUCCESSFUL,
  EXCHANGE_PRODUCT_SUBCATEORY_FAQ_ORDER,
  EXCHANGE_PRODUCT_SUBCATEORY_FAQ_ORDER_FAILED,
  EXCHANGE_PRODUCT_SUBCATEORY_FAQ_ORDER_SUCCESSFUL,
  GET_PRODUCT_SUBCATEGORY_FAQ,
  GET_PRODUCT_SUBCATEGORY_FAQ_FAILED,
  GET_PRODUCT_SUBCATEGORY_FAQ_SUCCESSFUL,
  UPDATE_PRODUCT_SUBCATEGORY_FAQ,
  UPDATE_PRODUCT_SUBCATEGORY_FAQ_FAILED,
  UPDATE_PRODUCT_SUBCATEGORY_FAQ_SUCCESSFUL,
} from '../../types/options/product_subcategory_faq';
// get_product_subcategory_faq
export const getProductSubCategoryFAQ = () => {
  return {
    type: GET_PRODUCT_SUBCATEGORY_FAQ,
  };
};
export const getProductSubCategoryFAQSuccessful = (payload) => {
  return {
    type: GET_PRODUCT_SUBCATEGORY_FAQ_SUCCESSFUL,
    payload,
  };
};
export const getProductSubCategoryFAQFailed = (payload) => {
  return {
    type: GET_PRODUCT_SUBCATEGORY_FAQ_FAILED,
    payload,
  };
};

// create_product_subcategory_faq
export const createProductSubcategoryFaq = (payload) => {
  return {
    type: CREATE_PRODUCT_SUBCATEGORY_FAQ,
    payload,
  };
};
export const createProductSubcategoryFaqSuccessful = (payload) => {
  return {
    type: CREATE_PRODUCT_SUBCATEGORY_FAQ_SUCCESSFUL,
    payload,
  };
};
export const createProductSubcategoryFaqFailed = (payload) => {
  return {
    type: CREATE_PRODUCT_SUBCATEGORY_FAQ_FAILED,
    payload,
  };
};

// update_product_subcategory_faq
export const updateProductSubcategoryFaq = (payload) => {
  return {
    type: UPDATE_PRODUCT_SUBCATEGORY_FAQ,
    payload,
  };
};
export const updateProductSubcategoryFaqSuccessful = (payload) => {
  return {
    type: UPDATE_PRODUCT_SUBCATEGORY_FAQ_SUCCESSFUL,
    payload,
  };
};
export const updateProductSubcategoryFaqFailed = (payload) => {
  return {
    type: UPDATE_PRODUCT_SUBCATEGORY_FAQ_FAILED,
    payload,
  };
};

// delete_product_subcategory_faq
export const deleteProductSubcategoryFaq = (payload) => {
  return {
    type: DELETE_PRODUCT_SUBCATEGORY_FAQ,
    payload,
  };
};
export const deleteProductSubcategoryFaqSuccessful = (payload) => {
  return {
    type: DELETE_PRODUCT_SUBCATEGORY_FAQ_SUCCESSFUL,
    payload,
  };
};
export const deleteProductSubcategoryFaqFailed = (payload) => {
  return {
    type: DELETE_PRODUCT_SUBCATEGORY_FAQ_FAILED,
    payload,
  };
};

// exchange_product_subcateory_faq_order
export const exchangeProductSubcateoryFaqOrder = (payload) => {
  return {
    type: EXCHANGE_PRODUCT_SUBCATEORY_FAQ_ORDER,
    payload,
  };
};
export const exchangeProductSubcateoryFaqOrderSuccessful = (payload) => {
  return {
    type: EXCHANGE_PRODUCT_SUBCATEORY_FAQ_ORDER_SUCCESSFUL,
    payload,
  };
};
export const exchangeProductSubcateoryFaqOrderFailed = (payload) => {
  return {
    type: EXCHANGE_PRODUCT_SUBCATEORY_FAQ_ORDER_FAILED,
    payload,
  };
};
