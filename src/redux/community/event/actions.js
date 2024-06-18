import {
  CREATE_EVENT,
  CREATE_EVENT_ERROR,
  CREATE_EVENT_SUCCESS,
  DELETE_EVENT,
  DELETE_EVENT_ERROR,
  DELETE_EVENT_SUCCESS,
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

export const getAllEvents = (data) => ({
  type: GET_ALL_EVENT,
  payload: data,
});
export const getAllEventsSuccess = (data) => ({
  type: GET_ALL_EVENT_SUCCESS,
  payload: data,
});

export const getAllEventsError = (data) => ({
  type: GET_ALL_EVENT_ERROR,
  payload: data,
});

export const getSingleEvent = (data) => ({
  type: GET_SINGLE_EVENT,
  payload: data,
});
export const getSingleEventSuccess = (data) => ({
  type: GET_SINGLE_EVENT_SUCCESS,
  payload: data,
});

export const getSingleEventError = (data) => ({
  type: GET_SINGLE_EVENT_ERROR,
  payload: data,
});

export const createEvent = (data) => ({
  type: CREATE_EVENT,
  payload: data,
});
export const createEventSuccess = (data) => ({
  type: CREATE_EVENT_SUCCESS,
  payload: data,
});

export const createEventError = (data) => ({
  type: CREATE_EVENT_ERROR,
  payload: data,
});

export const updateEvent = (data) => ({
  type: UPDATE_EVENT,
  payload: data,
});
export const updateEventSuccess = (data) => ({
  type: UPDATE_EVENT_SUCCESS,
  payload: data,
});

export const updateEventError = (data) => ({
  type: UPDATE_EVENT_ERROR,
  payload: data,
});

export const deleteEvent = (data) => ({
  type: DELETE_EVENT,
  payload: data,
});
export const deleteEventSuccess = (data) => ({
  type: DELETE_EVENT_SUCCESS,
  payload: data,
});

export const deleteEventError = (data) => ({
  type: DELETE_EVENT_ERROR,
  payload: data,
});

// submit_event_general
export const submitEventGeneral = (payload) => {
  return {
    type: SUBMIT_EVENT_GENERAL,
    payload,
  };
};
export const submitEventGeneralSuccessful = (payload) => {
  return {
    type: SUBMIT_EVENT_GENERAL_SUCCESSFUL,
    payload,
  };
};
export const submitEventGeneralFailed = (payload) => {
  return {
    type: SUBMIT_EVENT_GENERAL_FAILED,
    payload,
  };
};

// submit_event_speackers_timing
export const submitEventSpeackersTiming = (payload) => {
  return {
    type: SUBMIT_EVENT_SPEACKERS_TIMING,
    payload,
  };
};
export const submitEventSpeackersTimingSuccessful = (payload) => {
  return {
    type: SUBMIT_EVENT_SPEACKERS_TIMING_SUCCESSFUL,
    payload,
  };
};
export const submitEventSpeackersTimingFailed = (payload) => {
  return {
    type: SUBMIT_EVENT_SPEACKERS_TIMING_FAILED,
    payload,
  };
};

// submit_event_lecture
export const submitEventLecture = (payload) => {
  return {
    type: SUBMIT_EVENT_LECTURE,
    payload,
  };
};
export const submitEventLectureSuccessful = (payload) => {
  return {
    type: SUBMIT_EVENT_LECTURE_SUCCESSFUL,
    payload,
  };
};
export const submitEventLectureFailed = (payload) => {
  return {
    type: SUBMIT_EVENT_LECTURE_FAILED,
    payload,
  };
};
