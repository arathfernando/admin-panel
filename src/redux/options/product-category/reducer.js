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

const INIT_STATE = {
  productCategories: {
    loading: false,
    error: null,
    data: [],
  },
  createProductCategoryAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  updateProductCategoryAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  deleteProductCategoryAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  productCateoryOrderAction: {
    status: 'idle',
    error: null,
    data: {},
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // ------ get_product_categories ------
    case GET_PRODUCT_CATEGORIES:
      return {
        ...state,
        productCategories: {
          ...state.productCategories,
          loading: true,
          error: null,
        },
      };
    case GET_PRODUCT_CATEGORIES_SUCCESSFUL:
      return {
        ...state,
        productCategories: {
          loading: false,
          error: null,
          ...action.payload,
          data: action.payload.data?.reverse?.() || [],
        },
      };
    case GET_PRODUCT_CATEGORIES_FAILED:
      return {
        ...state,
        productCategories: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };
    // ------ create_product_category ------
    case CREATE_PRODUCT_CATEGORY:
      return {
        ...state,
        createProductCategoryAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_PRODUCT_CATEGORY_SUCCESSFUL:
      return {
        ...state,
        createProductCategoryAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_PRODUCT_CATEGORY_FAILED:
      return {
        ...state,
        createProductCategoryAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ update_product_category ------
    case UPDATE_PRODUCT_CATEGORY:
      return {
        ...state,
        updateProductCategoryAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_PRODUCT_CATEGORY_SUCCESSFUL:
      return {
        ...state,
        updateProductCategoryAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_PRODUCT_CATEGORY_FAILED:
      return {
        ...state,
        updateProductCategoryAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ delete_product_category ------
    case DELETE_PRODUCT_CATEGORY:
      return {
        ...state,
        deleteProductCategoryAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_PRODUCT_CATEGORY_SUCCESSFUL:
      return {
        ...state,
        deleteProductCategoryAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_PRODUCT_CATEGORY_FAILED:
      return {
        ...state,
        deleteProductCategoryAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ exchange_product_cateory_order ------
    case EXCHANGE_PRODUCT_CATEORY_ORDER:
      return {
        ...state,
        productCateoryOrderAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case EXCHANGE_PRODUCT_CATEORY_ORDER_SUCCESSFUL:
      return {
        ...state,
        productCateoryOrderAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case EXCHANGE_PRODUCT_CATEORY_ORDER_FAILED:
      return {
        ...state,
        productCateoryOrderAction: {
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
