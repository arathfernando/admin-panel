import {
  CREATE_JOB,
  CREATE_JOB_FAILED,
  CREATE_JOB_SUCCESSFUL,
  DELETE_JOB,
  DELETE_JOB_FAILED,
  DELETE_JOB_SUCCESSFUL,
  GET_JOB,
  GET_JOB_FAILED,
  GET_JOB_SUCCESSFUL,
  UPDATE_JOB,
  UPDATE_JOB_FAILED,
  UPDATE_JOB_SUCCESSFUL,
} from '../../types/job/job';

const INIT_STATE = {
  jobs: {
    loading: false,
    error: null,
    data: [],
  },
  createJobAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  updateJobAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  deleteJobAction: {
    status: 'idle',
    error: null,
    data: {},
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // ------ get_job ------
    case GET_JOB:
      return {
        ...state,
        jobs: {
          ...state.jobs,
          loading: true,
          error: null,
        },
      };
    case GET_JOB_SUCCESSFUL:
      return {
        ...state,
        jobs: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_JOB_FAILED:
      return {
        ...state,
        jobs: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };
    // ------ create_job ------
    case CREATE_JOB:
      return {
        ...state,
        createJobAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_JOB_SUCCESSFUL:
      return {
        ...state,
        createJobAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_JOB_FAILED:
      return {
        ...state,
        createJobAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ update_job ------
    case UPDATE_JOB:
      return {
        ...state,
        updateJobAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_JOB_SUCCESSFUL:
      return {
        ...state,
        updateJobAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_JOB_FAILED:
      return {
        ...state,
        updateJobAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ delete_job ------
    case DELETE_JOB:
      return {
        ...state,
        deleteJobAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_JOB_SUCCESSFUL:
      return {
        ...state,
        deleteJobAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_JOB_FAILED:
      return {
        ...state,
        deleteJobAction: {
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
