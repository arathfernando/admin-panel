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

const INIT_STATE = {
  productSubCategoryFAQ: {
    loading: false,
    error: null,
    data: [],
  },
  createProductSubcategoryFaqAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  updateProductSubcategoryFaqAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  deleteProductSubcategoryFaqAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  productSubcateoryFaqOrderAction: {
    status: 'idle',
    error: null,
    data: {},
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // ------ get_product_subcategory_faq ------
    case GET_PRODUCT_SUBCATEGORY_FAQ:
      return {
        ...state,
        productSubCategoryFAQ: {
          ...state.productSubCategoryFAQ,
          loading: true,
          error: null,
        },
      };
    case GET_PRODUCT_SUBCATEGORY_FAQ_SUCCESSFUL:
      return {
        ...state,
        productSubCategoryFAQ: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_PRODUCT_SUBCATEGORY_FAQ_FAILED:
      return {
        ...state,
        productSubCategoryFAQ: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };
    // ------ create_product_subcategory_faq ------
    case CREATE_PRODUCT_SUBCATEGORY_FAQ:
      return {
        ...state,
        createProductSubcategoryFaqAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_PRODUCT_SUBCATEGORY_FAQ_SUCCESSFUL:
      return {
        ...state,
        createProductSubcategoryFaqAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_PRODUCT_SUBCATEGORY_FAQ_FAILED:
      return {
        ...state,
        createProductSubcategoryFaqAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ update_product_subcategory_faq ------
    case UPDATE_PRODUCT_SUBCATEGORY_FAQ:
      return {
        ...state,
        updateProductSubcategoryFaqAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_PRODUCT_SUBCATEGORY_FAQ_SUCCESSFUL:
      return {
        ...state,
        updateProductSubcategoryFaqAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_PRODUCT_SUBCATEGORY_FAQ_FAILED:
      return {
        ...state,
        updateProductSubcategoryFaqAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ delete_product_subcategory_faq ------
    case DELETE_PRODUCT_SUBCATEGORY_FAQ:
      return {
        ...state,
        deleteProductSubcategoryFaqAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_PRODUCT_SUBCATEGORY_FAQ_SUCCESSFUL:
      return {
        ...state,
        deleteProductSubcategoryFaqAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_PRODUCT_SUBCATEGORY_FAQ_FAILED:
      return {
        ...state,
        deleteProductSubcategoryFaqAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ exchange_product_subcateory_faq_order ------
    case EXCHANGE_PRODUCT_SUBCATEORY_FAQ_ORDER:
      return {
        ...state,
        productSubcateoryFaqOrderAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case EXCHANGE_PRODUCT_SUBCATEORY_FAQ_ORDER_SUCCESSFUL:
      return {
        ...state,
        productSubcateoryFaqOrderAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case EXCHANGE_PRODUCT_SUBCATEORY_FAQ_ORDER_FAILED:
      return {
        ...state,
        productSubcateoryFaqOrderAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    default:
      return {
        ...state,
      };
  }
};
