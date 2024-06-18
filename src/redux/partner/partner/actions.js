import {
  CREATE_PARTNER,
  CREATE_PARTNER_ERROR,
  CREATE_PARTNER_SUCCESS,
  DELETE_PARTNER,
  DELETE_PARTNER_ERROR,
  DELETE_PARTNER_SUCCESS,
  GET_ALL_PARTNER,
  GET_ALL_PARTNER_ERROR,
  GET_ALL_PARTNER_SUCCESS,
  GET_MARKETPLACES_BY_SEARCH_FILTER_SORTBY,
  GET_MARKETPLACES_BY_SEARCH_FILTER_SORTBY_FAILED,
  GET_MARKETPLACES_BY_SEARCH_FILTER_SORTBY_SUCCESSFUL,
  GET_PARTNERS_BY_NAME,
  GET_PARTNERS_BY_NAME_FAILED,
  GET_PARTNERS_BY_NAME_SUCCESSFUL,
  SEARCH_CONTESTS,
  SEARCH_CONTESTS_FAILED,
  SEARCH_CONTESTS_SUCCESSFUL,
  SEARCH_PROJECTS,
  SEARCH_PROJECTS_FAILED,
  SEARCH_PROJECTS_SUCCESSFUL,
  UPDATE_PARTNER,
  UPDATE_PARTNER_ERROR,
  UPDATE_PARTNER_SUCCESS,
} from '../../types/partner/partner';

export const getAllPartner = () => ({
  type: GET_ALL_PARTNER,
});
export const getAllPartnerSuccess = (data) => ({
  type: GET_ALL_PARTNER_SUCCESS,
  payload: data,
});
export const getAllPartnerError = (data) => ({
  type: GET_ALL_PARTNER_ERROR,
  payload: data,
});

export const createPartner = (data) => ({
  type: CREATE_PARTNER,
  payload: data,
});
export const createPartnerSuccess = (data) => ({
  type: CREATE_PARTNER_SUCCESS,
  payload: data,
});
export const createPartnerError = (data) => ({
  type: CREATE_PARTNER_ERROR,
  payload: data,
});

export const updatePartner = (data) => ({
  type: UPDATE_PARTNER,
  payload: data,
});
export const updatePartnerSuccess = (data) => ({
  type: UPDATE_PARTNER_SUCCESS,
  payload: data,
});
export const updatePartnerError = (data) => ({
  type: UPDATE_PARTNER_ERROR,
  payload: data,
});

export const deletePartner = (data) => ({
  type: DELETE_PARTNER,
  payload: data,
});
export const deletePartnerSuccess = (data) => ({
  type: DELETE_PARTNER_SUCCESS,
  payload: data,
});
export const deletePartnerError = (data) => ({
  type: DELETE_PARTNER_ERROR,
  payload: data,
});
// get_partners_by_name
export const getPartnersByName = (payload) => {
  return {
    type: GET_PARTNERS_BY_NAME,
    payload,
  };
};
export const getPartnersByNameSuccessful = (payload) => {
  return {
    type: GET_PARTNERS_BY_NAME_SUCCESSFUL,
    payload,
  };
};
export const getPartnersByNameFailed = (payload) => {
  return {
    type: GET_PARTNERS_BY_NAME_FAILED,
    payload,
  };
};

// get_marketplaces_by_search_filter_sortby
export const getMarketplacesBySearchFilterSortby = (payload) => {
  return {
    type: GET_MARKETPLACES_BY_SEARCH_FILTER_SORTBY,
    payload,
  };
};
export const getMarketplacesBySearchFilterSortbySuccessful = (payload) => {
  return {
    type: GET_MARKETPLACES_BY_SEARCH_FILTER_SORTBY_SUCCESSFUL,
    payload,
  };
};
export const getMarketplacesBySearchFilterSortbyFailed = (payload) => {
  return {
    type: GET_MARKETPLACES_BY_SEARCH_FILTER_SORTBY_FAILED,
    payload,
  };
};

// search_projects
export const searchProjects = (payload) => {
  return {
    type: SEARCH_PROJECTS,
    payload,
  };
};
export const searchProjectsSuccessful = (payload) => {
  return {
    type: SEARCH_PROJECTS_SUCCESSFUL,
    payload,
  };
};
export const searchProjectsFailed = (payload) => {
  return {
    type: SEARCH_PROJECTS_FAILED,
    payload,
  };
};

// search_contests
export const searchContests = (payload) => {
  return {
    type: SEARCH_CONTESTS,
    payload,
  };
};
export const searchContestsSuccessful = (payload) => {
  return {
    type: SEARCH_CONTESTS_SUCCESSFUL,
    payload,
  };
};
export const searchContestsFailed = (payload) => {
  return {
    type: SEARCH_CONTESTS_FAILED,
    payload,
  };
};
