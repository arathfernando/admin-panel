import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import api from '../../../ApiConfig';
import {
  DELETE_CONTEST_ENTRY,
  GET_CONTEST_ENTRIES,
} from '../../types/contest/contestType';
import {
  deleteContestEntryFailed,
  deleteContestEntrySuccessful,
  getContestEntries as getAllContestEntries,
  getContestEntriesFailed,
  getContestEntriesSuccessful,
} from './actions';

// get_contest_entries
const getContestEntries = () => {
  return api
    .get(`/admin/contest/revision/revision`, {
      params: { page: 1, limit: 1000 },
    })
    .then((res) => res.data);
};
function* GetContestEntries() {
  try {
    const response = yield call(getContestEntries);
    yield put(getContestEntriesSuccessful(response));
  } catch (error) {
    yield put(getContestEntriesFailed(error));
  }
}

// delete_contest_entry
const deleteContestEntry = (id) => {
  return api
    .delete(`/admin/contest/revision/${id}`, {}, { notify: true })
    .then((res) => res.data);
};
function* DeleteContestEntry({ payload }) {
  try {
    const response = yield call(deleteContestEntry, payload);
    yield put(deleteContestEntrySuccessful(response));
    if (response) {
      yield put(getAllContestEntries());
    }
  } catch (error) {
    yield put(deleteContestEntryFailed(error));
  }
}

export function* watchContestEntry() {
  yield takeEvery(GET_CONTEST_ENTRIES, GetContestEntries);
  yield takeLatest(DELETE_CONTEST_ENTRY, DeleteContestEntry);
}

export default function* rootSaga() {
  yield all([fork(watchContestEntry)]);
}
