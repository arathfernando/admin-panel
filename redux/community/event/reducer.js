import {
  CREATE_EVENT,
  CREATE_EVENT_ERROR,
  CREATE_EVENT_SUCCESS,
  GET_ALL_EVENT,
  GET_ALL_EVENT_ERROR,
  GET_ALL_EVENT_SUCCESS,
  GET_SINGLE_EVENT,
  GET_SINGLE_EVENT_ERROR,
  GET_SINGLE_EVENT_SUCCESS,
  SUBMIT_EVENT_GENERAL,
  SUBMIT_EVENT_GENERAL_FAILED,
  SUBMIT_EVENT_GENERAL_SUCCESSFUL,
  SUBMIT_EVENT_LECTURE,
  SUBMIT_EVENT_LECTURE_FAILED,
  SUBMIT_EVENT_LECTURE_SUCCESSFUL,
  SUBMIT_EVENT_SPEACKERS_TIMING,
  SUBMIT_EVENT_SPEACKERS_TIMING_FAILED,
  SUBMIT_EVENT_SPEACKERS_TIMING_SUCCESSFUL,
  UPDATE_EVENT,
  UPDATE_EVENT_ERROR,
  UPDATE_EVENT_SUCCESS,
} from '../../types/community/event';

const INIT_STATE = {
  loading: false,
  list: [],
  singleEvent: null,
  newEvent: null,
  updateEvent: null,
  error: '',
  submitEventGeneralAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  submitEventSpeackersTimingAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  submitEventLectureAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  eventPreviewData: {},
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ALL_EVENT:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case GET_ALL_EVENT_ERROR:
      return {
        ...state,
        loading: false,
        list: [],
        error: action.payload,
      };
    case GET_SINGLE_EVENT:
      return {
        ...state,
        loading: true,
      };
    case GET_SINGLE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        singleCommunity: action.payload,
      };
    case GET_SINGLE_EVENT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_EVENT:
      return {
        ...state,
        loading: true,
      };
    case CREATE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        newCommunity: action.payload,
      };
    case CREATE_EVENT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_EVENT:
      return {
        ...state,
        id: action.payload.id,
        loading: true,
      };
    case UPDATE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        updateCommunity: action.payload,
      };
    case UPDATE_EVENT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }; // ------ submit_event_general ------
    case SUBMIT_EVENT_GENERAL:
      return {
        ...state,
        submitEventGeneralAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case SUBMIT_EVENT_GENERAL_SUCCESSFUL:
      return {
        ...state,
        submitEventGeneralAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
        eventPreviewData: { ...state.eventPreviewData, ...action.payload },
      };
    case SUBMIT_EVENT_GENERAL_FAILED:
      return {
        ...state,
        submitEventGeneralAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ submit_event_speackers_timing ------
    case SUBMIT_EVENT_SPEACKERS_TIMING:
      return {
        ...state,
        submitEventSpeackersTimingAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case SUBMIT_EVENT_SPEACKERS_TIMING_SUCCESSFUL:
      return {
        ...state,
        submitEventSpeackersTimingAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
        eventPreviewData: {
          ...state.eventPreviewData,
          ...action.payload,
          // event_timing: orderBy(
          //   action.payload?.event_timing,
          //   (i) => i.start_date,
          //   "asc"
          // ),
        },
      };
    case SUBMIT_EVENT_SPEACKERS_TIMING_FAILED:
      return {
        ...state,
        submitEventSpeackersTimingAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ submit_event_lecture ------
    case SUBMIT_EVENT_LECTURE:
      return {
        ...state,
        submitEventLectureAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case SUBMIT_EVENT_LECTURE_SUCCESSFUL:
      return {
        ...state,
        submitEventLectureAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
        eventPreviewData: { ...state.eventPreviewData, ...action.payload },
      };
    case SUBMIT_EVENT_LECTURE_FAILED:
      return {
        ...state,
        submitEventLectureAction: {
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
