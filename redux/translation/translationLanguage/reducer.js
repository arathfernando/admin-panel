/* eslint-disable camelcase */
import {
  ADD_TRANSLATION_LANGUAGE,
  ADD_TRANSLATION_LANGUAGE_FAILED,
  ADD_TRANSLATION_LANGUAGE_SUCCESSFUL,
  DELETE_TRANSLATION_LANGUAGE,
  DELETE_TRANSLATION_LANGUAGE_FAILED,
  DELETE_TRANSLATION_LANGUAGE_SUCCESSFUL,
  GET_TRANSLATION_LANGUAGE,
  GET_TRANSLATION_LANGUAGE_FAILED,
  GET_TRANSLATION_LANGUAGE_SUCCESSFUL,
  TRANSLATE_TRANSLATION_KEYS,
  TRANSLATE_TRANSLATION_KEYS_FAILED,
  TRANSLATE_TRANSLATION_KEYS_SUCCESSFUL,
} from '../../types/translation/translation_language';

const INIT_STATE = {
  translationLanguages: {
    loading: false,
    error: null,
    data: [],
  },
  addTranslationLanguageAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  translateTranslationKeyAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  deleteTranslationLanguageAction: {
    status: 'idle',
    error: null,
    data: {},
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // ------ get_translation_languages ------
    case GET_TRANSLATION_LANGUAGE:
      return {
        ...state,
        translationLanguages: {
          ...state.translationLanguages,
          loading: true,
          error: null,
        },
      };
    case GET_TRANSLATION_LANGUAGE_SUCCESSFUL:
      return {
        ...state,
        translationLanguages: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_TRANSLATION_LANGUAGE_FAILED:
      return {
        ...state,
        translationLanguages: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };
    // ------ add_translation_language ------
    case ADD_TRANSLATION_LANGUAGE:
      return {
        ...state,
        addTranslationLanguageAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case ADD_TRANSLATION_LANGUAGE_SUCCESSFUL:
      return {
        ...state,
        addTranslationLanguageAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case ADD_TRANSLATION_LANGUAGE_FAILED:
      return {
        ...state,
        addTranslationLanguageAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ translate_translation_keys ------
    case TRANSLATE_TRANSLATION_KEYS:
      return {
        ...state,
        translateTranslationKeyAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case TRANSLATE_TRANSLATION_KEYS_SUCCESSFUL:
      return {
        ...state,
        translateTranslationKeyAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case TRANSLATE_TRANSLATION_KEYS_FAILED:
      return {
        ...state,
        translateTranslationKeyAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ delete_translation_language ------
    case DELETE_TRANSLATION_LANGUAGE:
      return {
        ...state,
        deleteTranslationLanguageAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_TRANSLATION_LANGUAGE_SUCCESSFUL:
      return {
        ...state,
        deleteTranslationLanguageAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_TRANSLATION_LANGUAGE_FAILED:
      return {
        ...state,
        deleteTranslationLanguageAction: {
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
