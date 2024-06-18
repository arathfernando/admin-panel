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

const INIT_STATE = {
  productInnovationCategories: {
    loading: false,
    error: null,
    data: [],
  },
  createProductInnovationCategoryAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  updateProductInnovationCategoryAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  deleteProductInnovationCategoryAction: {
    status: 'idle',
    error: null,
    data: {},
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // ------ get_product_innovation_categories ------
    case GET_PRODUCT_SUBCATEGORIES:
      return {
        ...state,
        productInnovationCategories: {
          ...state.productInnovationCategories,
          loading: true,
          error: null,
        },
      };
    case GET_PRODUCT_SUBCATEGORIES_SUCCESSFUL:
      return {
        ...state,
        productInnovationCategories: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_PRODUCT_SUBCATEGORIES_FAILED:
      return {
        ...state,
        productInnovationCategories: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };
    // ------ create_product_innovation_category ------
    case CREATE_PRODUCT_INNOVATION_CATEGORY:
      return {
        ...state,
        createProductInnovationCategoryAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_PRODUCT_INNOVATION_CATEGORY_SUCCESSFUL:
      return {
        ...state,
        createProductInnovationCategoryAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_PRODUCT_INNOVATION_CATEGORY_FAILED:
      return {
        ...state,
        createProductInnovationCategoryAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ update_product_innovation_category ------
    case UPDATE_PRODUCT_INNOVATION_CATEGORY:
      return {
        ...state,
        updateProductInnovationCategoryAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_PRODUCT_INNOVATION_CATEGORY_SUCCESSFUL:
      return {
        ...state,
        updateProductInnovationCategoryAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_PRODUCT_INNOVATION_CATEGORY_FAILED:
      return {
        ...state,
        updateProductInnovationCategoryAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ delete_product_innovation_category ------
    case DELETE_PRODUCT_INNOVATION_CATEGORY:
      return {
        ...state,
        deleteProductInnovationCategoryAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_PRODUCT_INNOVATION_CATEGORY_SUCCESSFUL:
      return {
        ...state,
        deleteProductInnovationCategoryAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_PRODUCT_INNOVATION_CATEGORY_FAILED:
      return {
        ...state,
        deleteProductInnovationCategoryAction: {
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
