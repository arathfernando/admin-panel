import {
  CREATE_WALKTHROUGH_STEP,
  CREATE_WALKTHROUGH_STEP_FAILED,
  CREATE_WALKTHROUGH_STEP_SUCCESSFUL,
  DELETE_WALKTHROUGH_STEP,
  DELETE_WALKTHROUGH_STEP_FAILED,
  DELETE_WALKTHROUGH_STEP_SUCCESSFUL,
  EXCHANGEWALKTHROUGHSTEPORDER,
  EXCHANGEWALKTHROUGHSTEPORDER_FAILED,
  EXCHANGEWALKTHROUGHSTEPORDER_SUCCESSFUL,
  GET_WALKTHROUGH_STEP,
  GET_WALKTHROUGH_STEP_FAILED,
  GET_WALKTHROUGH_STEP_SUCCESSFUL,
  UPDATE_WALKTHROUGH_STEP,
  UPDATE_WALKTHROUGH_STEP_FAILED,
  UPDATE_WALKTHROUGH_STEP_SUCCESSFUL,
} from '../../types/managements/walkthrough_step';

// get_walkthrough_steps
export const getWalkthroughSteps = () => {
  return {
    type: GET_WALKTHROUGH_STEP,
  };
};
export const getWalkthroughStepsSuccessful = (payload) => {
  return {
    type: GET_WALKTHROUGH_STEP_SUCCESSFUL,
    payload,
  };
};
export const getWalkthroughStepsFailed = (payload) => {
  return {
    type: GET_WALKTHROUGH_STEP_FAILED,
    payload,
  };
};

// create_walkthrough_step
export const createWalkthroughStep = (payload) => {
  return {
    type: CREATE_WALKTHROUGH_STEP,
    payload,
  };
};
export const createWalkthroughStepSuccessful = (payload) => {
  return {
    type: CREATE_WALKTHROUGH_STEP_SUCCESSFUL,
    payload,
  };
};
export const createWalkthroughStepFailed = (payload) => {
  return {
    type: CREATE_WALKTHROUGH_STEP_FAILED,
    payload,
  };
};

// update_walkthrough_step
export const updateWalkthroughStep = (payload) => {
  return {
    type: UPDATE_WALKTHROUGH_STEP,
    payload,
  };
};
export const updateWalkthroughStepSuccessful = (payload) => {
  return {
    type: UPDATE_WALKTHROUGH_STEP_SUCCESSFUL,
    payload,
  };
};
export const updateWalkthroughStepFailed = (payload) => {
  return {
    type: UPDATE_WALKTHROUGH_STEP_FAILED,
    payload,
  };
};

// delete_walkthrough_step
export const deleteWalkthroughStep = (payload) => {
  return {
    type: DELETE_WALKTHROUGH_STEP,
    payload,
  };
};
export const deleteWalkthroughStepSuccessful = (payload) => {
  return {
    type: DELETE_WALKTHROUGH_STEP_SUCCESSFUL,
    payload,
  };
};
export const deleteWalkthroughStepFailed = (payload) => {
  return {
    type: DELETE_WALKTHROUGH_STEP_FAILED,
    payload,
  };
};

// exchangewalkthroughsteporder
export const exchangeWalkthroughStepOrder = (payload) => {
  return {
    type: EXCHANGEWALKTHROUGHSTEPORDER,
    payload,
  };
};
export const exchangeWalkthroughStepOrderSuccessful = (payload) => {
  return {
    type: EXCHANGEWALKTHROUGHSTEPORDER_SUCCESSFUL,
    payload,
  };
};
export const exchangeWalkthroughStepOrderFailed = (payload) => {
  return {
    type: EXCHANGEWALKTHROUGHSTEPORDER_FAILED,
    payload,
  };
};
