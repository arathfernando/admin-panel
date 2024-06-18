import {
  DELETE_CONTEST_ENTRY,
  DELETE_CONTEST_ENTRY_FAILED,
  DELETE_CONTEST_ENTRY_SUCCESSFUL,
  GET_CONTEST_ENTRIES,
  GET_CONTEST_ENTRIES_FAILED,
  GET_CONTEST_ENTRIES_SUCCESSFUL,
} from '../../types/contest/contestType';

// get_contest_entries
export const getContestEntries = () => {
  return {
    type: GET_CONTEST_ENTRIES,
  };
};
export const getContestEntriesSuccessful = (payload) => {
  return {
    type: GET_CONTEST_ENTRIES_SUCCESSFUL,
    payload,
  };
};
export const getContestEntriesFailed = (payload) => {
  return {
    type: GET_CONTEST_ENTRIES_FAILED,
    payload,
  };
};

// delete_contest_entry
export const deleteContestEntry = (payload) => {
  return {
    type: DELETE_CONTEST_ENTRY,
    payload,
  };
};
export const deleteContestEntrySuccessful = (payload) => {
  return {
    type: DELETE_CONTEST_ENTRY_SUCCESSFUL,
    payload,
  };
};
export const deleteContestEntryFailed = (payload) => {
  return {
    type: DELETE_CONTEST_ENTRY_FAILED,
    payload,
  };
};
