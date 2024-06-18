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

// get_translation_keys
export const getTranslationKeys = (payload) => {
  return {
    type: GET_TRANSLATION_KEY,
    payload,
  };
};
export const getTranslationKeysSuccessful = (payload) => {
  return {
    type: GET_TRANSLATION_KEY_SUCCESSFUL,
    payload,
  };
};
export const getTranslationKeysFailed = (payload) => {
  return {
    type: GET_TRANSLATION_KEY_FAILED,
    payload,
  };
};

// create_translation_key
export const createTranslationKey = (payload) => {
  return {
    type: CREATE_TRANSLATION_KEY,
    payload,
  };
};
export const createTranslationKeySuccessful = (payload) => {
  return {
    type: CREATE_TRANSLATION_KEY_SUCCESSFUL,
    payload,
  };
};
export const createTranslationKeyFailed = (payload) => {
  return {
    type: CREATE_TRANSLATION_KEY_FAILED,
    payload,
  };
};

// update_translation_key
export const updateTranslationKey = (payload) => {
  return {
    type: UPDATE_TRANSLATION_KEY,
    payload,
  };
};
export const updateTranslationKeySuccessful = (payload) => {
  return {
    type: UPDATE_TRANSLATION_KEY_SUCCESSFUL,
    payload,
  };
};
export const updateTranslationKeyFailed = (payload) => {
  return {
    type: UPDATE_TRANSLATION_KEY_FAILED,
    payload,
  };
};

// delete_translation_key
export const deleteTranslationKey = (payload) => {
  return {
    type: DELETE_TRANSLATION_KEY,
    payload,
  };
};
export const deleteTranslationKeySuccessful = (payload) => {
  return {
    type: DELETE_TRANSLATION_KEY_SUCCESSFUL,
    payload,
  };
};
export const deleteTranslationKeyFailed = (payload) => {
  return {
    type: DELETE_TRANSLATION_KEY_FAILED,
    payload,
  };
};

// start_auto_translation
export const startAutoTranslation = (payload) => {
  return {
    type: START_AUTO_TRANSLATION,
    payload,
  };
};
export const startAutoTranslationSuccessful = (payload) => {
  return {
    type: START_AUTO_TRANSLATION_SUCCESSFUL,
    payload,
  };
};
export const startAutoTranslationFailed = (payload) => {
  return {
    type: START_AUTO_TRANSLATION_FAILED,
    payload,
  };
};

// update_translation_text
export const updateTranslationText = (payload) => {
  return {
    type: UPDATE_TRANSLATION_TEXT,
    payload,
  };
};
export const updateTranslationTextSuccessful = (payload) => {
  return {
    type: UPDATE_TRANSLATION_TEXT_SUCCESSFUL,
    payload,
  };
};
export const updateTranslationTextFailed = (payload) => {
  return {
    type: UPDATE_TRANSLATION_TEXT_FAILED,
    payload,
  };
};
// update_translation_key_text_state
export const updateTranslationKeyTextState = (payload) => {
  return {
    type: UPDATE_TRANSLATION_KEY_TEXT_STATE,
    payload,
  };
};
