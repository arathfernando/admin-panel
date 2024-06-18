import {
  CREATE_WORKSPACE_CATEGORY_CARD,
  CREATE_WORKSPACE_CATEGORY_CARD_FAILED,
  CREATE_WORKSPACE_CATEGORY_CARD_SUCCESSFUL,
  DELETE_WORKSPACE_CATEGORY_CARD,
  DELETE_WORKSPACE_CATEGORY_CARD_FAILED,
  DELETE_WORKSPACE_CATEGORY_CARD_SUCCESSFUL,
  GET_WORKSPACE_CATEGORY_CARDS,
  GET_WORKSPACE_CATEGORY_CARDS_FAILED,
  GET_WORKSPACE_CATEGORY_CARDS_SUCCESSFUL,
  UPDATE_WORKSPACE_CATEGORY_CARD,
  UPDATE_WORKSPACE_CATEGORY_CARD_FAILED,
  UPDATE_WORKSPACE_CATEGORY_CARD_SUCCESSFUL,
} from '../../types/options/workspace_category_card';

// get_workspace_category_cards
export const getWorkspaceCategoryCards = () => {
  return {
    type: GET_WORKSPACE_CATEGORY_CARDS,
  };
};
export const getWorkspaceCategoryCardsSuccessful = (payload) => {
  return {
    type: GET_WORKSPACE_CATEGORY_CARDS_SUCCESSFUL,
    payload,
  };
};
export const getWorkspaceCategoryCardsFailed = (payload) => {
  return {
    type: GET_WORKSPACE_CATEGORY_CARDS_FAILED,
    payload,
  };
};

// create_workspace_category_card
export const createWorkspaceCategoryCard = (payload) => {
  return {
    type: CREATE_WORKSPACE_CATEGORY_CARD,
    payload,
  };
};
export const createWorkspaceCategoryCardSuccessful = (payload) => {
  return {
    type: CREATE_WORKSPACE_CATEGORY_CARD_SUCCESSFUL,
    payload,
  };
};
export const createWorkspaceCategoryCardFailed = (payload) => {
  return {
    type: CREATE_WORKSPACE_CATEGORY_CARD_FAILED,
    payload,
  };
};

// update_workspace_category_card
export const updateWorkspaceCategoryCard = (payload) => {
  return {
    type: UPDATE_WORKSPACE_CATEGORY_CARD,
    payload,
  };
};
export const updateWorkspaceCategoryCardSuccessful = (payload) => {
  return {
    type: UPDATE_WORKSPACE_CATEGORY_CARD_SUCCESSFUL,
    payload,
  };
};
export const updateWorkspaceCategoryCardFailed = (payload) => {
  return {
    type: UPDATE_WORKSPACE_CATEGORY_CARD_FAILED,
    payload,
  };
};

// delete_workspace_category_card
export const deleteWorkspaceCategoryCard = (payload) => {
  return {
    type: DELETE_WORKSPACE_CATEGORY_CARD,
    payload,
  };
};
export const deleteWorkspaceCategoryCardSuccessful = (payload) => {
  return {
    type: DELETE_WORKSPACE_CATEGORY_CARD_SUCCESSFUL,
    payload,
  };
};
export const deleteWorkspaceCategoryCardFailed = (payload) => {
  return {
    type: DELETE_WORKSPACE_CATEGORY_CARD_FAILED,
    payload,
  };
};
