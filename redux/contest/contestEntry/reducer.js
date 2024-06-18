import {
  DELETE_CONTEST_ENTRY,
  DELETE_CONTEST_ENTRY_FAILED,
  DELETE_CONTEST_ENTRY_SUCCESSFUL,
  GET_CONTEST_ENTRIES,
  GET_CONTEST_ENTRIES_FAILED,
  GET_CONTEST_ENTRIES_SUCCESSFUL,
} from '../../types/contest/contestType';

const INIT_STATE = {
  contestEntries: {
    loading: false,
    error: null,
    data: [],
  },
  deleteContestEntryAction: {
    status: 'idle',
    error: null,
    data: {},
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // ------ get_contest_entries ------
    case GET_CONTEST_ENTRIES:
      return {
        ...state,
        contestEntries: {
          ...state.contestEntries,
          loading: true,
          error: null,
        },
      };
    case GET_CONTEST_ENTRIES_SUCCESSFUL:
      return {
        ...state,
        contestEntries: {
          loading: false,
          error: null,
          data: action.payload,
        },
      };
    case GET_CONTEST_ENTRIES_FAILED:
      return {
        ...state,
        contestEntries: {
          loading: false,
          error: action.payload,
          data: [],
        },
      };
    // ------ delete_contest_entry ------
    case DELETE_CONTEST_ENTRY:
      return {
        ...state,
        deleteContestEntryAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_CONTEST_ENTRY_SUCCESSFUL:
      return {
        ...state,
        deleteContestEntryAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_CONTEST_ENTRY_FAILED:
      return {
        ...state,
        deleteContestEntryAction: {
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
