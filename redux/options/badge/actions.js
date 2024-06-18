import {
  CREATE_BADGE,
  CREATE_BADGE_FAILED,
  CREATE_BADGE_SUCCESSFUL,
  DELETE_BADGE,
  DELETE_BADGE_FAILED,
  DELETE_BADGE_SUCCESSFUL,
  GET_BADGE,
  GET_BADGE_FAILED,
  GET_BADGE_SUCCESSFUL,
  UPDATE_BADGE,
  UPDATE_BADGE_FAILED,
  UPDATE_BADGE_SUCCESSFUL,
} from '../../types/options/badge';

// get_badge
export const getBadges = () => {
  return {
    type: GET_BADGE,
  };
};
export const getBadgesSuccessful = (payload) => {
  return {
    type: GET_BADGE_SUCCESSFUL,
    payload,
  };
};
export const getBadgesFailed = (payload) => {
  return {
    type: GET_BADGE_FAILED,
    payload,
  };
};

// create_badge
export const createBadge = (payload) => {
  return {
    type: CREATE_BADGE,
    payload,
  };
};
export const createBadgeSuccessful = (payload) => {
  return {
    type: CREATE_BADGE_SUCCESSFUL,
    payload,
  };
};
export const createBadgeFailed = (payload) => {
  return {
    type: CREATE_BADGE_FAILED,
    payload,
  };
};

// update_badge
export const updateBadge = (payload) => {
  return {
    type: UPDATE_BADGE,
    payload,
  };
};
export const updateBadgeSuccessful = (payload) => {
  return {
    type: UPDATE_BADGE_SUCCESSFUL,
    payload,
  };
};
export const updateBadgeFailed = (payload) => {
  return {
    type: UPDATE_BADGE_FAILED,
    payload,
  };
};

// delete_badge
export const deleteBadge = (payload) => {
  return {
    type: DELETE_BADGE,
    payload,
  };
};
export const deleteBadgeSuccessful = (payload) => {
  return {
    type: DELETE_BADGE_SUCCESSFUL,
    payload,
  };
};
export const deleteBadgeFailed = (payload) => {
  return {
    type: DELETE_BADGE_FAILED,
    payload,
  };
};
