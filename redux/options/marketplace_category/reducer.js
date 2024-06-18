import {
  CREATE_MARKETPLACE_CATEGORY,
  CREATE_MARKETPLACE_CATEGORY_FAILED,
  CREATE_MARKETPLACE_CATEGORY_SUCCESSFUL,
  DELETE_MARKETPLACE_CATEGORY,
  DELETE_MARKETPLACE_CATEGORY_FAILED,
  DELETE_MARKETPLACE_CATEGORY_SUCCESSFUL,
  GET_MARKETPLACE_CATEGORIES,
  GET_MARKETPLACE_CATEGORIES_FAILED,
  GET_MARKETPLACE_CATEGORIES_SUCCESSFUL,
  UPDATE_MARKETPLACE_CATEGORY,
  UPDATE_MARKETPLACE_CATEGORY_FAILED,
  UPDATE_MARKETPLACE_CATEGORY_SUCCESSFUL,
} from '../../types/options/marketplace_category';

const INIT_STATE = {
  marketplaceCategories: {
    loading: false,
    error: null,
    data: [],
  },
  createMarketplaceCategoryAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  updateMarketplaceCategoryAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  deleteMarketplaceCategoryAction: {
    status: 'idle',
    error: null,
    data: {},
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // ------ get_marketplace_categories ------
    case GET_MARKETPLACE_CATEGORIES:
      return {
        ...state,
        marketplaceCategories: {
          ...state.marketplaceCategories,
          loading: true,
          error: null,
        },
      };
    case GET_MARKETPLACE_CATEGORIES_SUCCESSFUL:
      return {
        ...state,
        marketplaceCategories: {
          loading: false,
          error: null,
          ...action.payload,
          data: action.payload.data?.reverse?.() || [],
        },
      };
    case GET_MARKETPLACE_CATEGORIES_FAILED:
      return {
        ...state,
        marketplaceCategories: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };
    // ------ create_marketplace_category ------
    case CREATE_MARKETPLACE_CATEGORY:
      return {
        ...state,
        createMarketplaceCategoryAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_MARKETPLACE_CATEGORY_SUCCESSFUL:
      return {
        ...state,
        createMarketplaceCategoryAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_MARKETPLACE_CATEGORY_FAILED:
      return {
        ...state,
        createMarketplaceCategoryAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ update_marketplace_category ------
    case UPDATE_MARKETPLACE_CATEGORY:
      return {
        ...state,
        updateMarketplaceCategoryAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_MARKETPLACE_CATEGORY_SUCCESSFUL:
      return {
        ...state,
        updateMarketplaceCategoryAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_MARKETPLACE_CATEGORY_FAILED:
      return {
        ...state,
        updateMarketplaceCategoryAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ delete_marketplace_category ------
    case DELETE_MARKETPLACE_CATEGORY:
      return {
        ...state,
        deleteMarketplaceCategoryAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_MARKETPLACE_CATEGORY_SUCCESSFUL:
      return {
        ...state,
        deleteMarketplaceCategoryAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_MARKETPLACE_CATEGORY_FAILED:
      return {
        ...state,
        deleteMarketplaceCategoryAction: {
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
