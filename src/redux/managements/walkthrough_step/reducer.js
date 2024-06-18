import { sortBy } from 'lodash';
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

const INIT_STATE = {
  walkthroughSteps: {
    loading: false,
    error: null,
    data: [],
  },
  createWalkthroughStepAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  updateWalkthroughStepAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  deleteWalkthroughStepAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  exchangeWalkthroughStepOrderAction: {
    status: 'idle',
    error: null,
    data: {},
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    //------ get_walkthrough_steps ------
    case GET_WALKTHROUGH_STEP:
      return {
        ...state,
        walkthroughSteps: {
          ...state.walkthroughSteps,
          loading: true,
          error: null,
        },
      };
    case GET_WALKTHROUGH_STEP_SUCCESSFUL:
      return {
        ...state,
        walkthroughSteps: {
          loading: false,
          error: null,
          ...action.payload,
          data: sortBy(
            action.payload.data,
            ({ walkthrough_category }) => walkthrough_category?.id
          ),
        },
      };
    case GET_WALKTHROUGH_STEP_FAILED:
      return {
        ...state,
        walkthroughSteps: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };
    //------ create_walkthrough_step ------
    case CREATE_WALKTHROUGH_STEP:
      return {
        ...state,
        createWalkthroughStepAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_WALKTHROUGH_STEP_SUCCESSFUL:
      return {
        ...state,
        createWalkthroughStepAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_WALKTHROUGH_STEP_FAILED:
      return {
        ...state,
        createWalkthroughStepAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    //------ update_walkthrough_step ------
    case UPDATE_WALKTHROUGH_STEP:
      return {
        ...state,
        updateWalkthroughStepAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_WALKTHROUGH_STEP_SUCCESSFUL:
      return {
        ...state,
        updateWalkthroughStepAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_WALKTHROUGH_STEP_FAILED:
      return {
        ...state,
        updateWalkthroughStepAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    //------ delete_walkthrough_step ------
    case DELETE_WALKTHROUGH_STEP:
      return {
        ...state,
        deleteWalkthroughStepAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_WALKTHROUGH_STEP_SUCCESSFUL:
      return {
        ...state,
        deleteWalkthroughStepAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_WALKTHROUGH_STEP_FAILED:
      return {
        ...state,
        deleteWalkthroughStepAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      }; //------ exchangewalkthroughsteporder ------
    case EXCHANGEWALKTHROUGHSTEPORDER:
      return {
        ...state,
        exchangeWalkthroughStepOrderAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case EXCHANGEWALKTHROUGHSTEPORDER_SUCCESSFUL:
      return {
        ...state,
        exchangeWalkthroughStepOrderAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case EXCHANGEWALKTHROUGHSTEPORDER_FAILED:
      return {
        ...state,
        exchangeWalkthroughStepOrderAction: {
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
