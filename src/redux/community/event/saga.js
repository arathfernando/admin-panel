/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import api, { axiosPut, post } from '../../../ApiConfig';
import objectToFormData from '../../../helpers/objectToFormData';

import {
  CREATE_EVENT,
  DELETE_EVENT,
  GET_ALL_EVENT,
  GET_SINGLE_EVENT,
  SUBMIT_EVENT_GENERAL,
  SUBMIT_EVENT_LECTURE,
  SUBMIT_EVENT_SPEACKERS_TIMING,
  UPDATE_EVENT,
} from '../../types/community/event';

import {
  createEventError,
  createEventSuccess,
  deleteEventError,
  deleteEventSuccess,
  getAllEvents,
  getAllEventsError,
  getAllEventsSuccess,
  getSingleEventError,
  getSingleEventSuccess,
  submitEventGeneralFailed,
  submitEventGeneralSuccessful,
  submitEventLectureFailed,
  submitEventLectureSuccessful,
  submitEventSpeackersTimingFailed,
  submitEventSpeackersTimingSuccessful,
  updateEventError,
  updateEventSuccess,
} from './actions';

const getAllEventsAsync = async ({ payload }) => {
  return api
    .get(`/admin/community-event?page=${payload.page}&limit=${payload.limit}`)
    .then((res) => res)
    .catch((error) => error);
};

function* GetAllEvents(payload) {
  try {
    const result = yield call(getAllEventsAsync, payload);
    if (result.status) {
      yield put(getAllEventsSuccess(result.data));
    } else {
      yield put(getAllEventsError('Get All Event Response is not success!'));
    }
  } catch (error) {
    yield put(getAllEventsError('Get All Event Error !'));
  }
}

const getSingleEventAsync = async (payload) => {
  await api
    .get(`/community/event/${payload.payload}`)
    .then((res) => res)
    .catch((error) => error);
};

function* GetSingleEvent(payload) {
  try {
    const result = yield call(getSingleEventAsync, payload);
    if (result.status) {
      yield put(getSingleEventSuccess(result.data.data));
    } else {
      yield put(
        getSingleEventError('Get Single Event Response is not success!')
      );
    }
  } catch (error) {
    yield put(getSingleEventError('Get Single Event Error !'));
  }
}

const createEventAsync = async ({ payload }) => {
  return api
    .post(`/admin/community-event`, objectToFormData(payload))
    .then((res) => res)
    .catch((error) => error);
};

function* CreateEvent(payload) {
  try {
    const result = yield call(createEventAsync, payload);
    if (result.status === 201 && result.statusText === 'Created') {
      yield put(createEventSuccess(result.data.data));
      yield put(getAllEvents({ page: 1, limit: 1000 }));
    } else {
      yield put(createEventError('Create Event Response is not success!'));
    }
  } catch (error) {
    yield put(createEventError('Create Event Error !'));
  }
}

const updateEventAsync = async ({ id, cover, ...payload }) => {
  if (cover && typeof cover !== 'string') {
    payload.cover = cover;
  }
  return api
    .put(`/admin/community-event/${id}`, objectToFormData(payload))
    .then((res) => res)
    .catch((error) => error);
};

function* UpdateEvent({ payload }) {
  try {
    const result = yield call(updateEventAsync, payload);
    if (result.status) {
      yield put(updateEventSuccess(result.data.data));
      yield put(getAllEvents({ page: 1, limit: 1000 }));
    } else {
      yield put(updateEventError('Update Event Response is not success!'));
    }
  } catch (error) {
    yield put(updateEventError('Update Event Error !'));
  }
}

const deleteEventAsync = async ({ payload }) => {
  return api
    .delete(`/admin/community-event/${payload}`)
    .then((res) => res)
    .catch((error) => error);
};

function* DeleteEvent(payload) {
  try {
    const result = yield call(deleteEventAsync, payload);
    if (result.status) {
      yield put(deleteEventSuccess(result.data.data));
      yield put(getAllEvents({ page: 1, limit: 1000 }));
    } else {
      yield put(deleteEventError('Delete Event Response is not success!'));
    }
  } catch (error) {
    yield put(deleteEventError('Delete Event Error !'));
  }
}
// submit_event_general
const submitEventGeneralAsync = ({ id, cover_image, ...payload }) => {
  if (id) {
    if (cover_image && typeof cover_image !== 'string') {
      payload.cover_image = cover_image;
    }
    return axiosPut(
      `${'/admin/community-event'}/${id}`,
      objectToFormData(payload),
      {},
      { notify: true }
    );
  }
  if (cover_image && typeof cover_image !== 'string') {
    payload.cover = cover_image;
  }
  return post(
    '/admin/community-event',
    objectToFormData({ ...payload }),
    {},
    { notify: true }
  );
};
function* SubmitEventGeneral({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(submitEventGeneralAsync, {
      ...payload,
      id: payload.id,
    });
    yield put(submitEventGeneralSuccessful(response.data));
    onSuccess?.(response.data);
    yield put(getAllEvents({ page: 1, limit: 1000 }));
  } catch (error) {
    yield put(submitEventGeneralFailed(error));
  }
}

// submit_event_speackers_timing
const submitEventSpeackersTimingAsync = async ({
  speakerId,
  timingId,
  ...payload
}) => {
  const event_speakers = await (speakerId
    ? axiosPut(
        `${`/admin/community-event/event-speaker`}`,
        payload.event_speakers,
        {}
      )
    : post(`/admin/community-event/event-speaker`, payload.event_speakers, {}));
  const event_timing = await (timingId
    ? axiosPut(
        `${`/admin/community-event/event-timing`}`,
        payload.event_timing,
        {},
        { notify: true }
      )
    : post(
        `/admin/community-event/event-timing`,
        payload.event_timing,
        {},
        { notify: true }
      ));
  return {
    event_speakers: event_speakers.data,
    event_timing: event_timing.data,
  };
};
function* SubmitEventSpeackersTiming({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(submitEventSpeackersTimingAsync, {
      ...payload,
    });
    yield put(submitEventSpeackersTimingSuccessful(response));
    onSuccess?.(response);
    yield put(getAllEvents({ page: 1, limit: 1000 }));
  } catch (error) {
    yield put(submitEventSpeackersTimingFailed(error));
  }
}

// submit_event_lecture
const submitEventLectureAsync = async ({ id, lectures }) => {
  const data = await (id
    ? axiosPut(
        '/admin/community-event/event-lecture',
        lectures,
        {},
        { notify: true }
      )
    : post(
        '/admin/community-event/event-lecture',
        lectures,
        {},
        { notify: true }
      ));
  return data;
};
function* SubmitEventLecture({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(submitEventLectureAsync, payload);
    yield put(submitEventLectureSuccessful(response.data));
    onSuccess?.(response.data);
    yield put(getAllEvents({ page: 1, limit: 1000 }));
  } catch (error) {
    yield put(submitEventLectureFailed(error));
  }
}

export function* watchGetAllEvents() {
  yield takeEvery(GET_ALL_EVENT, GetAllEvents);
}
export function* watchCreateEvent() {
  yield takeEvery(CREATE_EVENT, CreateEvent);
}
export function* watchGetSingleEvent() {
  yield takeEvery(GET_SINGLE_EVENT, GetSingleEvent);
}
export function* watchUpdateEvent() {
  yield takeEvery(UPDATE_EVENT, UpdateEvent);
}
export function* watchDeleteEvent() {
  yield takeEvery(DELETE_EVENT, DeleteEvent);
}
export function* watchSubmitEvent() {
  yield takeLatest(SUBMIT_EVENT_GENERAL, SubmitEventGeneral);
  yield takeLatest(SUBMIT_EVENT_SPEACKERS_TIMING, SubmitEventSpeackersTiming);
  yield takeLatest(SUBMIT_EVENT_LECTURE, SubmitEventLecture);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetAllEvents),
    fork(watchGetSingleEvent),
    fork(watchUpdateEvent),
    fork(watchCreateEvent),
    fork(watchDeleteEvent),
    fork(watchSubmitEvent),
  ]);
}
