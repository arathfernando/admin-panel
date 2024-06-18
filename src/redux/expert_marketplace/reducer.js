import {
  DELETE_EXPERTISE_SUBMISSION,
  DELETE_EXPERTISE_SUBMISSION_FAILED,
  DELETE_EXPERTISE_SUBMISSION_SUCCESSFUL,
  DELETE_EXPERT_MARKETPLACE,
  DELETE_EXPERT_MARKETPLACE_FAILED,
  DELETE_EXPERT_MARKETPLACE_SUCCESSFUL,
  GET_EXPERTISE_SUBMISSIONS,
  GET_EXPERTISE_SUBMISSIONS_FAILED,
  GET_EXPERTISE_SUBMISSIONS_SUCCESSFUL,
  GET_EXPERT_MARKETPLACES,
  GET_EXPERT_MARKETPLACES_FAILED,
  GET_EXPERT_MARKETPLACES_SUCCESSFUL,
  GET_MARKETPLACE,
  GET_MARKETPLACE_FAILED,
  GET_MARKETPLACE_SUCCESSFUL,
  SUBMIT_MARKETPLACE_FAQ,
  SUBMIT_MARKETPLACE_FAQ_FAILED,
  SUBMIT_MARKETPLACE_FAQ_SUCCESSFUL,
  SUBMIT_MARKETPLACE_GALLERY,
  SUBMIT_MARKETPLACE_GALLERY_FAILED,
  SUBMIT_MARKETPLACE_GALLERY_SUCCESSFUL,
  SUBMIT_MARKETPLACE_OVERVIEW,
  SUBMIT_MARKETPLACE_OVERVIEW_FAILED,
  SUBMIT_MARKETPLACE_OVERVIEW_SUCCESSFUL,
  SUBMIT_MARKETPLACE_PRICING,
  SUBMIT_MARKETPLACE_PRICING_FAILED,
  SUBMIT_MARKETPLACE_PRICING_SUCCESSFUL,
} from '../types/expert_marketplace/expert_marketplace_types';

const INIT_STATE = {
  expertMarketplaces: {
    loading: false,
    error: null,
    data: [],
  },
  marketplace: {
    loading: false,
    error: null,
    data: {},
  },
  teExpertMarketplaceAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  marketplaceOverviewAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  marketplacePricingAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  marketplaceFaqAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  marketplaceGalleryAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  expertiseSubmissions: {
    loading: false,
    error: null,
    data: [],
  },
  deleteExpertiseSubmissionAction: {
    status: 'idle',
    error: null,
    data: {},
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // ------ get_expert_marketplaces ------
    case GET_EXPERT_MARKETPLACES:
      return {
        ...state,
        expertMarketplaces: {
          ...state.expertMarketplaces,
          loading: true,
          error: null,
        },
      };
    case GET_EXPERT_MARKETPLACES_SUCCESSFUL:
      return {
        ...state,
        expertMarketplaces: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_EXPERT_MARKETPLACES_FAILED:
      return {
        ...state,
        expertMarketplaces: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };
    // ------ delete_expert_marketplace ------
    case DELETE_EXPERT_MARKETPLACE:
      return {
        ...state,
        deleteExpertMarketplaceAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_EXPERT_MARKETPLACE_SUCCESSFUL:
      return {
        ...state,
        deleteExpertMarketplaceAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_EXPERT_MARKETPLACE_FAILED:
      return {
        ...state,
        deleteExpertMarketplaceAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ submit_marketplace_overview ------
    case SUBMIT_MARKETPLACE_OVERVIEW:
      return {
        ...state,
        marketplaceOverviewAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case SUBMIT_MARKETPLACE_OVERVIEW_SUCCESSFUL:
      return {
        ...state,
        marketplaceOverviewAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case SUBMIT_MARKETPLACE_OVERVIEW_FAILED:
      return {
        ...state,
        marketplaceOverviewAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ submit_marketplace_pricing ------
    case SUBMIT_MARKETPLACE_PRICING:
      return {
        ...state,
        marketplacePricingAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case SUBMIT_MARKETPLACE_PRICING_SUCCESSFUL:
      return {
        ...state,
        marketplacePricingAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case SUBMIT_MARKETPLACE_PRICING_FAILED:
      return {
        ...state,
        marketplacePricingAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ submit_marketplace_faq ------
    case SUBMIT_MARKETPLACE_FAQ:
      return {
        ...state,
        marketplaceFaqAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case SUBMIT_MARKETPLACE_FAQ_SUCCESSFUL:
      return {
        ...state,
        marketplaceFaqAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case SUBMIT_MARKETPLACE_FAQ_FAILED:
      return {
        ...state,
        marketplaceFaqAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ submit_marketplace_gallery ------
    case SUBMIT_MARKETPLACE_GALLERY:
      return {
        ...state,
        marketplaceGalleryAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case SUBMIT_MARKETPLACE_GALLERY_SUCCESSFUL:
      return {
        ...state,
        marketplaceGalleryAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case SUBMIT_MARKETPLACE_GALLERY_FAILED:
      return {
        ...state,
        marketplaceGalleryAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ get_expertise_submissions ------
    case GET_EXPERTISE_SUBMISSIONS:
      return {
        ...state,
        expertiseSubmissions: {
          ...state.expertiseSubmissions,
          loading: true,
          error: null,
        },
      };
    case GET_EXPERTISE_SUBMISSIONS_SUCCESSFUL:
      return {
        ...state,
        expertiseSubmissions: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_EXPERTISE_SUBMISSIONS_FAILED:
      return {
        ...state,
        expertiseSubmissions: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };
    // ------ delete_expertise_submission ------
    case DELETE_EXPERTISE_SUBMISSION:
      return {
        ...state,
        deleteExpertiseSubmissionAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_EXPERTISE_SUBMISSION_SUCCESSFUL:
      return {
        ...state,
        deleteExpertiseSubmissionAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_EXPERTISE_SUBMISSION_FAILED:
      return {
        ...state,
        deleteExpertiseSubmissionAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ get_marketplace ------
    case GET_MARKETPLACE:
      return {
        ...state,
        marketplace: {
          ...state.marketplace,
          loading: true,
          error: null,
        },
      };
    case GET_MARKETPLACE_SUCCESSFUL:
      return {
        ...state,
        marketplace: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_MARKETPLACE_FAILED:
      return {
        ...state,
        marketplace: {
          loading: false,
          ...action.payload,
        },
      };
    default:
      return {
        ...state,
      };
  }
};
