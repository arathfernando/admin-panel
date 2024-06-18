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

const INIT_STATE = {
  loading: false,
  partnerList: [],
  error: '',
  partnersByName: {
    loading: false,
    error: null,
    data: [],
  },
  marketplaces: {
    loading: false,
    error: null,
    data: [],
  },
  searchProjects: {
    loading: false,
    error: null,
    data: [],
  },
  contests: {
    loading: false,
    error: null,
    data: [],
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ALL_PARTNER:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_PARTNER_SUCCESS:
      return {
        ...state,
        loading: false,
        partnerList: action.payload,
      };
    case GET_ALL_PARTNER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_PARTNER:
      return {
        ...state,
        loading: true,
      };
    case CREATE_PARTNER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case CREATE_PARTNER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_PARTNER:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PARTNER_SUCCESS:
      return {
        ...state,
        loading: false,
        updateJobCategory: action.payload,
      };
    case UPDATE_PARTNER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_PARTNER:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PARTNER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_PARTNER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    // ------ get_partners_by_name ------
    case GET_PARTNERS_BY_NAME:
      return {
        ...state,
        partnersByName: {
          ...state.partnersByName,
          loading: true,
          error: null,
        },
      };
    case GET_PARTNERS_BY_NAME_SUCCESSFUL:
      return {
        ...state,
        partnersByName: {
          loading: false,
          error: null,
          data: action.payload,
        },
      };
    case GET_PARTNERS_BY_NAME_FAILED:
      return {
        ...state,
        partnersByName: {
          loading: false,
          error: action.payload,
          data: null,
        },
      };
    // ------ get_marketplaces_by_search_filter_sortby ------
    case GET_MARKETPLACES_BY_SEARCH_FILTER_SORTBY:
      return {
        ...state,
        marketplaces: {
          ...action.payload,
          ...state.marketplaces,
          loading: true,
          error: null,
        },
      };
    case GET_MARKETPLACES_BY_SEARCH_FILTER_SORTBY_SUCCESSFUL:
      return {
        ...state,
        marketplaces: {
          ...action.payload,
          loading: false,
          error: null,
        },
      };
    case GET_MARKETPLACES_BY_SEARCH_FILTER_SORTBY_FAILED:
      return {
        ...state,
        marketplaces: {
          loading: false,
          ...action.payload,
        },
      };
    // ------ search_projects ------
    case SEARCH_PROJECTS:
      return {
        ...state,
        searchProjects: {
          ...state.searchProjects,
          loading: true,
          error: null,
        },
      };
    case SEARCH_PROJECTS_SUCCESSFUL:
      return {
        ...state,
        searchProjects: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case SEARCH_PROJECTS_FAILED:
      return {
        ...state,
        searchProjects: {
          loading: false,
          ...action.payload,
        },
      };
    // ------ search_contests ------
    case SEARCH_CONTESTS:
      return {
        ...state,
        contests: {
          ...state.contests,
          loading: true,
          error: null,
        },
      };
    case SEARCH_CONTESTS_SUCCESSFUL:
      return {
        ...state,
        contests: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case SEARCH_CONTESTS_FAILED:
      return {
        ...state,
        contests: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };
    default:
      return {
        ...state,
      };
  }
};
