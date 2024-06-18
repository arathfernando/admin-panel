import {
  CREATE_INVESTOR_ZONE,
  CREATE_INVESTOR_ZONE_FAILED,
  CREATE_INVESTOR_ZONE_SUCCESSFUL,
  DELETE_INVESTOR_ZONE,
  DELETE_INVESTOR_ZONE_FAILED,
  DELETE_INVESTOR_ZONE_SUCCESSFUL,
  GET_INVESTOR_ZONES,
  GET_INVESTOR_ZONES_FAILED,
  GET_INVESTOR_ZONES_SUCCESSFUL,
  UPDATE_INVESTOR_ZONE,
  UPDATE_INVESTOR_ZONE_FAILED,
  UPDATE_INVESTOR_ZONE_SUCCESSFUL,
} from '../../types/investor/zone';

const INIT_STATE = {
  zoneAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  investorZones: {
    loading: false,
    error: null,
    data: [],
  },
  deleteInvestorZoneAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  updateInvestorZoneAction: {
    status: 'idle',
    error: null,
    data: {},
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // ------ create_investor_zone ------
    case CREATE_INVESTOR_ZONE:
      return {
        ...state,
        zoneAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_INVESTOR_ZONE_SUCCESSFUL:
      return {
        ...state,
        zoneAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_INVESTOR_ZONE_FAILED:
      return {
        ...state,
        zoneAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ get_investor_zones ------
    case GET_INVESTOR_ZONES:
      return {
        ...state,
        investorZones: {
          ...state.investorZones,
          loading: true,
          error: null,
        },
      };
    case GET_INVESTOR_ZONES_SUCCESSFUL:
      return {
        ...state,
        investorZones: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_INVESTOR_ZONES_FAILED:
      return {
        ...state,
        investorZones: {
          loading: false,
          ...action.payload,
        },
      };
    // ------ delete_investor_zone ------
    case DELETE_INVESTOR_ZONE:
      return {
        ...state,
        deleteInvestorZoneAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_INVESTOR_ZONE_SUCCESSFUL:
      return {
        ...state,
        deleteInvestorZoneAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_INVESTOR_ZONE_FAILED:
      return {
        ...state,
        deleteInvestorZoneAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ update_investor_zone ------
    case UPDATE_INVESTOR_ZONE:
      return {
        ...state,
        updateInvestorZoneAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_INVESTOR_ZONE_SUCCESSFUL:
      return {
        ...state,
        updateInvestorZoneAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_INVESTOR_ZONE_FAILED:
      return {
        ...state,
        updateInvestorZoneAction: {
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
