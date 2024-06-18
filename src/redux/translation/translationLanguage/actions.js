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

// get_translation_languages
export const getTranslationLanguages = (payload) => {
  return {
    type: GET_TRANSLATION_LANGUAGE,
    payload,
  };
};
export const getTranslationLanguagesSuccessful = (payload) => {
  return {
    type: GET_TRANSLATION_LANGUAGE_SUCCESSFUL,
    payload,
  };
};
export const getTranslationLanguagesFailed = (payload) => {
  return {
    type: GET_TRANSLATION_LANGUAGE_FAILED,
    payload,
  };
};

// add_translation_language
export const addTranslationLanguage = (payload) => {
  return {
    type: ADD_TRANSLATION_LANGUAGE,
    payload,
  };
};
export const addTranslationLanguageSuccessful = (payload) => {
  return {
    type: ADD_TRANSLATION_LANGUAGE_SUCCESSFUL,
    payload,
  };
};
export const addTranslationLanguageFailed = (payload) => {
  return {
    type: ADD_TRANSLATION_LANGUAGE_FAILED,
    payload,
  };
};

// translate_translation_keys
export const translateTranslationKey = (payload) => {
  return {
    type: TRANSLATE_TRANSLATION_KEYS,
    payload,
  };
};
export const translateTranslationKeySuccessful = (payload) => {
  return {
    type: TRANSLATE_TRANSLATION_KEYS_SUCCESSFUL,
    payload,
  };
};
export const translateTranslationKeyFailed = (payload) => {
  return {
    type: TRANSLATE_TRANSLATION_KEYS_FAILED,
    payload,
  };
};

// delete_translation_language
export const deleteTranslationLanguage = (payload) => {
  return {
    type: DELETE_TRANSLATION_LANGUAGE,
    payload,
  };
};
export const deleteTranslationLanguageSuccessful = (payload) => {
  return {
    type: DELETE_TRANSLATION_LANGUAGE_SUCCESSFUL,
    payload,
  };
};
export const deleteTranslationLanguageFailed = (payload) => {
  return {
    type: DELETE_TRANSLATION_LANGUAGE_FAILED,
    payload,
  };
};
