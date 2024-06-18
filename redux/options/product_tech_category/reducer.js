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

const INIT_STATE = {
  productTechCategories: {
    loading: false,
    error: null,
    data: [],
  },
  createProductTechCategoryAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  updateProductTechCategoryAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  deleteProductTechCategoryAction: {
    status: 'idle',
    error: null,
    data: {},
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // ------ get_product_tech_categories ------
    case GET_PRODUCT_SUBCATEGORIES:
      return {
        ...state,
        productTechCategories: {
          ...state.productTechCategories,
          loading: true,
          error: null,
        },
      };
    case GET_PRODUCT_SUBCATEGORIES_SUCCESSFUL:
      return {
        ...state,
        productTechCategories: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_PRODUCT_SUBCATEGORIES_FAILED:
      return {
        ...state,
        productTechCategories: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };
    // ------ create_product_tech_category ------
    case CREATE_PRODUCT_TECH_CATEGORY:
      return {
        ...state,
        createProductTechCategoryAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_PRODUCT_TECH_CATEGORY_SUCCESSFUL:
      return {
        ...state,
        createProductTechCategoryAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_PRODUCT_TECH_CATEGORY_FAILED:
      return {
        ...state,
        createProductTechCategoryAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ update_product_tech_category ------
    case UPDATE_PRODUCT_TECH_CATEGORY:
      return {
        ...state,
        updateProductTechCategoryAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_PRODUCT_TECH_CATEGORY_SUCCESSFUL:
      return {
        ...state,
        updateProductTechCategoryAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_PRODUCT_TECH_CATEGORY_FAILED:
      return {
        ...state,
        updateProductTechCategoryAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ delete_product_tech_category ------
    case DELETE_PRODUCT_TECH_CATEGORY:
      return {
        ...state,
        deleteProductTechCategoryAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_PRODUCT_TECH_CATEGORY_SUCCESSFUL:
      return {
        ...state,
        deleteProductTechCategoryAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_PRODUCT_TECH_CATEGORY_FAILED:
      return {
        ...state,
        deleteProductTechCategoryAction: {
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
