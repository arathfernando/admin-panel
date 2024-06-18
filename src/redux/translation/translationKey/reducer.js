/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable no-case-declarations */
import { uniqBy } from 'lodash';
import {
  CREATE_TRANSLATION_KEY,
  CREATE_TRANSLATION_KEY_FAILED,
  CREATE_TRANSLATION_KEY_SUCCESSFUL,
  DELETE_TRANSLATION_KEY,
  DELETE_TRANSLATION_KEY_FAILED,
  DELETE_TRANSLATION_KEY_SUCCESSFUL,
  GET_TRANSLATION_KEY,
  GET_TRANSLATION_KEY_FAILED,
  GET_TRANSLATION_KEY_SUCCESSFUL,
  START_AUTO_TRANSLATION,
  START_AUTO_TRANSLATION_FAILED,
  START_AUTO_TRANSLATION_SUCCESSFUL,
  UPDATE_TRANSLATION_KEY,
  UPDATE_TRANSLATION_KEY_FAILED,
  UPDATE_TRANSLATION_KEY_SUCCESSFUL,
  UPDATE_TRANSLATION_KEY_TEXT_STATE,
  UPDATE_TRANSLATION_TEXT,
  UPDATE_TRANSLATION_TEXT_FAILED,
  UPDATE_TRANSLATION_TEXT_SUCCESSFUL,
} from '../../types/translation/translation_key';

const INIT_STATE = {
  translationKeys: {
    loading: false,
    error: null,
    data: [],
    translationNamespace: [],
  },
  createTranslationKeyAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  updateTranslationKeyAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  deleteTranslationKeyAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  startAutoTranslationAction: {
    loading: {},
    error: null,
    data: {},
  },
  updateTranslationTextAction: {
    status: 'idle',
    error: null,
    data: {},
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // ------ get_translation_keys ------
    case GET_TRANSLATION_KEY:
      return {
        ...state,
        translationKeys: {
          ...state.translationKeys,
          loading: true,
          error: null,
          translationNamespace: [],
        },
      };
    case GET_TRANSLATION_KEY_SUCCESSFUL:
      return {
        ...state,
        translationKeys: {
          loading: false,
          error: null,
          ...action.payload,
          translationNamespace:
            uniqBy(action.payload?.data, ({ namespace }) => namespace).map(
              ({ namespace }) => namespace
            ) || [],
        },
      };
    case GET_TRANSLATION_KEY_FAILED:
      return {
        ...state,
        translationKeys: {
          loading: false,
          data: [],
          ...action.payload,
          translationNamespace: [],
        },
      };
    // ------ create_translation_key ------
    case CREATE_TRANSLATION_KEY:
      return {
        ...state,
        createTranslationKeyAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_TRANSLATION_KEY_SUCCESSFUL:
      return {
        ...state,
        createTranslationKeyAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_TRANSLATION_KEY_FAILED:
      return {
        ...state,
        createTranslationKeyAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ update_translation_key ------
    case UPDATE_TRANSLATION_KEY:
      return {
        ...state,
        updateTranslationKeyAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_TRANSLATION_KEY_SUCCESSFUL:
      return {
        ...state,
        updateTranslationKeyAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_TRANSLATION_KEY_FAILED:
      return {
        ...state,
        updateTranslationKeyAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ delete_translation_key ------
    case DELETE_TRANSLATION_KEY:
      return {
        ...state,
        deleteTranslationKeyAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_TRANSLATION_KEY_SUCCESSFUL:
      return {
        ...state,
        deleteTranslationKeyAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_TRANSLATION_KEY_FAILED:
      return {
        ...state,
        deleteTranslationKeyAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ start_auto_translation ------
    case START_AUTO_TRANSLATION:
      return {
        ...state,
        startAutoTranslationAction: {
          loading: {
            ...state.startAutoTranslationAction.loading,
            [action.payload.id]: true,
          },
          error: null,
          data: action.payload,
        },
      };
    case START_AUTO_TRANSLATION_SUCCESSFUL:
      return {
        ...state,
        startAutoTranslationAction: {
          loading: {
            ...state.startAutoTranslationAction.loading,
            [action.payload.id]: false,
          },
          error: null,
          data: action.payload,
        },
      };
    case START_AUTO_TRANSLATION_FAILED:
      return {
        ...state,
        startAutoTranslationAction: {
          loading: {
            ...state.startAutoTranslationAction.loading,
            [action.payload.id]: false,
          },
          error: action.payload,
          data: {},
        },
      };
    // ------ update_translation_text ------
    case UPDATE_TRANSLATION_TEXT:
      return {
        ...state,
        updateTranslationTextAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_TRANSLATION_TEXT_SUCCESSFUL:
      return {
        ...state,
        updateTranslationTextAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_TRANSLATION_TEXT_FAILED:
      return {
        ...state,
        updateTranslationTextAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ update_translation_key_text_state ------
    case UPDATE_TRANSLATION_KEY_TEXT_STATE:
      const {
        translation_project_key_id,
        translation_project_language_id,
        translation_value,
        translation_project_language,
      } = action.payload;

      const translationKeys = state.translationKeys.data;

      // find translation_key
      const tarngetedTrnsKey = translationKeys.find(
        ({ id }) => id === translation_project_key_id
      );
      // find translation_project_value
      const translationProjectValues =
        tarngetedTrnsKey.translation_project_value;
      const tarngetedTrnsProjectValue = translationProjectValues.find(
        ({ translation_project_language }) =>
          translation_project_language?.id === translation_project_language_id
      );
      // update translation_project_value
      if (tarngetedTrnsProjectValue) {
        tarngetedTrnsProjectValue.translation_value = translation_value;
      } else {
        translationProjectValues.push({
          translation_value,
          translation_project_language,
        });
      }
      // update translation_project_value
      tarngetedTrnsKey.translation_project_value = translationProjectValues;

      return {
        ...state,
        translationKeys: {
          ...state.translationKeys,
          data: translationKeys,
        },
      };
    default:
      return {
        ...state,
      };
  }
};
