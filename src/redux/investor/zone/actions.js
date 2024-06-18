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

// create_investor_zone
export const createInvestorZone = (payload) => {
  return {
    type: CREATE_INVESTOR_ZONE,
    payload,
  };
};
export const createInvestorZoneSuccessful = (payload) => {
  return {
    type: CREATE_INVESTOR_ZONE_SUCCESSFUL,
    payload,
  };
};
export const createInvestorZoneFailed = (payload) => {
  return {
    type: CREATE_INVESTOR_ZONE_FAILED,
    payload,
  };
};

// get_investor_zones
export const getInvestorZones = (payload) => {
  return {
    type: GET_INVESTOR_ZONES,
    payload,
  };
};
export const getInvestorZonesSuccessful = (payload) => {
  return {
    type: GET_INVESTOR_ZONES_SUCCESSFUL,
    payload,
  };
};
export const getInvestorZonesFailed = (payload) => {
  return {
    type: GET_INVESTOR_ZONES_FAILED,
    payload,
  };
};

// delete_investor_zone
export const deleteInvestorZone = (payload) => {
  return {
    type: DELETE_INVESTOR_ZONE,
    payload,
  };
};
export const deleteInvestorZoneSuccessful = (payload) => {
  return {
    type: DELETE_INVESTOR_ZONE_SUCCESSFUL,
    payload,
  };
};
export const deleteInvestorZoneFailed = (payload) => {
  return {
    type: DELETE_INVESTOR_ZONE_FAILED,
    payload,
  };
};

// update_investor_zone
export const updateInvestorZone = (payload) => {
  return {
    type: UPDATE_INVESTOR_ZONE,
    payload,
  };
};
export const updateInvestorZoneSuccessful = (payload) => {
  return {
    type: UPDATE_INVESTOR_ZONE_SUCCESSFUL,
    payload,
  };
};
export const updateInvestorZoneFailed = (payload) => {
  return {
    type: UPDATE_INVESTOR_ZONE_FAILED,
    payload,
  };
};
