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

const INIT_STATE = {
  createProductSubcategoryAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  updateProductSubcategoryAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  deleteProductSubcategoryAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  productSubCategories: {
    loading: false,
    error: null,
    data: [],
  },
  productSubcateoryOrderAction: {
    status: 'idle',
    error: null,
    data: {},
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // ------ get_product_subcategories ------
    case GET_PRODUCT_SUBCATEGORIES:
      return {
        ...state,
        productSubCategories: {
          ...state.productSubCategories,
          loading: true,
          error: null,
        },
      };
    case GET_PRODUCT_SUBCATEGORIES_SUCCESSFUL:
      return {
        ...state,
        productSubCategories: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_PRODUCT_SUBCATEGORIES_FAILED:
      return {
        ...state,
        productSubCategories: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };
    // ------ create_product_subcategory ------
    case CREATE_PRODUCT_SUBCATEGORY:
      return {
        ...state,
        createProductSubcategoryAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_PRODUCT_SUBCATEGORY_SUCCESSFUL:
      return {
        ...state,
        createProductSubcategoryAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_PRODUCT_SUBCATEGORY_FAILED:
      return {
        ...state,
        createProductSubcategoryAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ update_product_subcategory ------
    case UPDATE_PRODUCT_SUBCATEGORY:
      return {
        ...state,
        updateProductSubcategoryAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_PRODUCT_SUBCATEGORY_SUCCESSFUL:
      return {
        ...state,
        updateProductSubcategoryAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_PRODUCT_SUBCATEGORY_FAILED:
      return {
        ...state,
        updateProductSubcategoryAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ delete_product_subcategory ------
    case DELETE_PRODUCT_SUBCATEGORY:
      return {
        ...state,
        deleteProductSubcategoryAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_PRODUCT_SUBCATEGORY_SUCCESSFUL:
      return {
        ...state,
        deleteProductSubcategoryAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_PRODUCT_SUBCATEGORY_FAILED:
      return {
        ...state,
        deleteProductSubcategoryAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ exchange_product_subcateory_order ------
    case EXCHANGE_PRODUCT_SUBCATEORY_ORDER:
      return {
        ...state,
        productSubcateoryOrderAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case EXCHANGE_PRODUCT_SUBCATEORY_ORDER_SUCCESSFUL:
      return {
        ...state,
        productSubcateoryOrderAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case EXCHANGE_PRODUCT_SUBCATEORY_ORDER_FAILED:
      return {
        ...state,
        productSubcateoryOrderAction: {
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
