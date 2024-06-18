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

// create_investor_area
export const createInvestorArea = (payload) => {
  return {
    type: CREATE_INVESTOR_AREA,
    payload,
  };
};
export const createInvestorAreaSuccessful = (payload) => {
  return {
    type: CREATE_INVESTOR_AREA_SUCCESSFUL,
    payload,
  };
};
export const createInvestorAreaFailed = (payload) => {
  return {
    type: CREATE_INVESTOR_AREA_FAILED,
    payload,
  };
};

// get_investor_worldwideShares
export const getInvestorWorldwideShares = (payload) => {
  return {
    type: GET_INVESTOR_WORDWIDESHARES,
    payload,
  };
};
export const getInvestorWorldwideSharesSuccessful = (payload) => {
  return {
    type: GET_INVESTOR_WORDWIDESHARES_SUCCESSFUL,
    payload,
  };
};
export const getInvestorWorldwideSharesFailed = (payload) => {
  return {
    type: GET_INVESTOR_WORDWIDESHARES_FAILED,
    payload,
  };
};

// update_investor_area
export const updateInvestorArea = (payload) => {
  return {
    type: UPDATE_INVESTOR_AREA,
    payload,
  };
};
export const updateInvestorAreaSuccessful = (payload) => {
  return {
    type: UPDATE_INVESTOR_AREA_SUCCESSFUL,
    payload,
  };
};
export const updateInvestorAreaFailed = (payload) => {
  return {
    type: UPDATE_INVESTOR_AREA_FAILED,
    payload,
  };
};

// delete_investor_area
export const deleteInvestorArea = (payload) => {
  return {
    type: DELETE_INVESTOR_AREA,
    payload,
  };
};
export const deleteInvestorAreaSuccessful = (payload) => {
  return {
    type: DELETE_INVESTOR_AREA_SUCCESSFUL,
    payload,
  };
};
export const deleteInvestorAreaFailed = (payload) => {
  return {
    type: DELETE_INVESTOR_AREA_FAILED,
    payload,
  };
};
