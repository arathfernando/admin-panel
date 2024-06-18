import {
  CREATE_INVESTOR_AREA,
  CREATE_INVESTOR_AREA_FAILED,
  CREATE_INVESTOR_AREA_SUCCESSFUL,
  DELETE_INVESTOR_AREA,
  DELETE_INVESTOR_AREA_FAILED,
  DELETE_INVESTOR_AREA_SUCCESSFUL,
  GET_INVESTOR_WORDWIDESHARES,
  GET_INVESTOR_WORDWIDESHARES_FAILED,
  GET_INVESTOR_WORDWIDESHARES_SUCCESSFUL,
  UPDATE_INVESTOR_AREA,
  UPDATE_INVESTOR_AREA_FAILED,
  UPDATE_INVESTOR_AREA_SUCCESSFUL,
} from '../../types/investor/worldwideShare';

const INIT_STATE = {
  investorAreaAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  investorWorldwideShares: {
    loading: false,
    error: null,
    data: [],
  },
  updateInvestorAreaAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  deleteInvestorAreaAction: {
    status: 'idle',
    error: null,
    data: {},
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // ------ create_investor_area ------
    case CREATE_INVESTOR_AREA:
      return {
        ...state,
        investorAreaAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_INVESTOR_AREA_SUCCESSFUL:
      return {
        ...state,
        investorAreaAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_INVESTOR_AREA_FAILED:
      return {
        ...state,
        investorAreaAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ get_investor_worldwideShares ------
    case GET_INVESTOR_WORDWIDESHARES:
      return {
        ...state,
        investorWorldwideShares: {
          ...state.investorWorldwideShares,
          loading: true,
          error: null,
        },
      };
    case GET_INVESTOR_WORDWIDESHARES_SUCCESSFUL:
      return {
        ...state,
        investorWorldwideShares: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_INVESTOR_WORDWIDESHARES_FAILED:
      return {
        ...state,
        investorWorldwideShares: {
          loading: false,
          ...action.payload,
        },
      };

    // ------ update_investor_area ------
    case UPDATE_INVESTOR_AREA:
      return {
        ...state,
        updateInvestorAreaAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_INVESTOR_AREA_SUCCESSFUL:
      return {
        ...state,
        updateInvestorAreaAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_INVESTOR_AREA_FAILED:
      return {
        ...state,
        updateInvestorAreaAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ delete_investor_area ------
    case DELETE_INVESTOR_AREA:
      return {
        ...state,
        deleteInvestorAreaAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_INVESTOR_AREA_SUCCESSFUL:
      return {
        ...state,
        deleteInvestorAreaAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_INVESTOR_AREA_FAILED:
      return {
        ...state,
        deleteInvestorAreaAction: {
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
