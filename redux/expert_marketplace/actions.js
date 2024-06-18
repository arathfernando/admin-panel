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

// get_expert_marketplaces
export const getExpertMarketplaces = () => {
  return {
    type: GET_EXPERT_MARKETPLACES,
  };
};
export const getExpertMarketplacesSuccessful = (payload) => {
  return {
    type: GET_EXPERT_MARKETPLACES_SUCCESSFUL,
    payload,
  };
};
export const getExpertMarketplacesFailed = (payload) => {
  return {
    type: GET_EXPERT_MARKETPLACES_FAILED,
    payload,
  };
};

// delete_expert_marketplace
export const deleteExpertMarketplace = (payload) => {
  return {
    type: DELETE_EXPERT_MARKETPLACE,
    payload,
  };
};
export const deleteExpertMarketplaceSuccessful = (payload) => {
  return {
    type: DELETE_EXPERT_MARKETPLACE_SUCCESSFUL,
    payload,
  };
};
export const deleteExpertMarketplaceFailed = (payload) => {
  return {
    type: DELETE_EXPERT_MARKETPLACE_FAILED,
    payload,
  };
};
// submit_marketplace_overview
export const submitMarketplaceOverview = (payload) => {
  return {
    type: SUBMIT_MARKETPLACE_OVERVIEW,
    payload,
  };
};
export const submitMarketplaceOverviewSuccessful = (payload) => {
  return {
    type: SUBMIT_MARKETPLACE_OVERVIEW_SUCCESSFUL,
    payload,
  };
};
export const submitMarketplaceOverviewFailed = (payload) => {
  return {
    type: SUBMIT_MARKETPLACE_OVERVIEW_FAILED,
    payload,
  };
};

// submit_marketplace_pricing
export const submitMarketplacePricing = (payload) => {
  return {
    type: SUBMIT_MARKETPLACE_PRICING,
    payload,
  };
};
export const submitMarketplacePricingSuccessful = (payload) => {
  return {
    type: SUBMIT_MARKETPLACE_PRICING_SUCCESSFUL,
    payload,
  };
};
export const submitMarketplacePricingFailed = (payload) => {
  return {
    type: SUBMIT_MARKETPLACE_PRICING_FAILED,
    payload,
  };
};

// submit_marketplace_faq
export const submitMarketplaceFaq = (payload) => {
  return {
    type: SUBMIT_MARKETPLACE_FAQ,
    payload,
  };
};
export const submitMarketplaceFaqSuccessful = (payload) => {
  return {
    type: SUBMIT_MARKETPLACE_FAQ_SUCCESSFUL,
    payload,
  };
};
export const submitMarketplaceFaqFailed = (payload) => {
  return {
    type: SUBMIT_MARKETPLACE_FAQ_FAILED,
    payload,
  };
};

// submit_marketplace_gallery
export const submitMarketplaceGallery = (payload) => {
  return {
    type: SUBMIT_MARKETPLACE_GALLERY,
    payload,
  };
};
export const submitMarketplaceGallerySuccessful = (payload) => {
  return {
    type: SUBMIT_MARKETPLACE_GALLERY_SUCCESSFUL,
    payload,
  };
};
export const submitMarketplaceGalleryFailed = (payload) => {
  return {
    type: SUBMIT_MARKETPLACE_GALLERY_FAILED,
    payload,
  };
};

// get_expertise_submissions
export const getExpertiseSubmissions = (payload) => {
  return {
    type: GET_EXPERTISE_SUBMISSIONS,
    payload,
  };
};
export const getExpertiseSubmissionsSuccessful = (payload) => {
  return {
    type: GET_EXPERTISE_SUBMISSIONS_SUCCESSFUL,
    payload,
  };
};
export const getExpertiseSubmissionsFailed = (payload) => {
  return {
    type: GET_EXPERTISE_SUBMISSIONS_FAILED,
    payload,
  };
};

// delete_expertise_submission
export const deleteExpertiseSubmission = (payload) => {
  return {
    type: DELETE_EXPERTISE_SUBMISSION,
    payload,
  };
};
export const deleteExpertiseSubmissionSuccessful = (payload) => {
  return {
    type: DELETE_EXPERTISE_SUBMISSION_SUCCESSFUL,
    payload,
  };
};
export const deleteExpertiseSubmissionFailed = (payload) => {
  return {
    type: DELETE_EXPERTISE_SUBMISSION_FAILED,
    payload,
  };
};

// get_marketplace
export const getMarketplace = (payload) => {
  return {
    type: GET_MARKETPLACE,
    payload,
  };
};
export const getMarketplaceSuccessful = (payload) => {
  return {
    type: GET_MARKETPLACE_SUCCESSFUL,
    payload,
  };
};
export const getMarketplaceFailed = (payload) => {
  return {
    type: GET_MARKETPLACE_FAILED,
    payload,
  };
};
