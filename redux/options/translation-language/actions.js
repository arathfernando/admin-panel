import {
  CREATE_TRANSLATION_LANGUAGE,
  CREATE_TRANSLATION_LANGUAGE_ERROR,
  CREATE_TRANSLATION_LANGUAGE_SUCCESS,
  DELETE_TRANSLATION_LANGUAGE,
  DELETE_TRANSLATION_LANGUAGE_ERROR,
  DELETE_TRANSLATION_LANGUAGE_SUCCESS,
  GET_ALL_TRANSLATION_LANGUAGES,
  GET_ALL_TRANSLATION_LANGUAGES_ERROR,
  GET_ALL_TRANSLATION_LANGUAGES_SUCCESS,
  UPDATE_TRANSLATION_LANGUAGE,
  UPDATE_TRANSLATION_LANGUAGE_ERROR,
  UPDATE_TRANSLATION_LANGUAGE_SUCCESS,
} from '../../types/options/translation-language';

export const getAllTranslationLanguages = () => ({
  type: GET_ALL_TRANSLATION_LANGUAGES,
});

export const getAllTranslationLanguagesSuccess = (data) => ({
  type: GET_ALL_TRANSLATION_LANGUAGES_SUCCESS,
  payload: data,
});

export const getAllTranslationLanguageError = (data) => ({
  type: GET_ALL_TRANSLATION_LANGUAGES_ERROR,
  payload: data,
});

export const createTranslationLanguage = (data) => ({
  type: CREATE_TRANSLATION_LANGUAGE,
  payload: data,
});
export const createTranslationLanguageSuccess = (data) => ({
  type: CREATE_TRANSLATION_LANGUAGE_SUCCESS,
  payload: data,
});

export const createTranslationLanguageError = (data) => ({
  type: CREATE_TRANSLATION_LANGUAGE_ERROR,
  payload: data,
});

export const updateTranslationLanguage = (data) => ({
  type: UPDATE_TRANSLATION_LANGUAGE,
  payload: data,
});
export const updateTranslationLanguageSuccess = (data) => ({
  type: UPDATE_TRANSLATION_LANGUAGE_SUCCESS,
  payload: data,
});

export const updateTranslationLanguageError = (data) => ({
  type: UPDATE_TRANSLATION_LANGUAGE_ERROR,
  payload: data,
});

export const deleteOptionTranslationLanguage = (data) => ({
  type: DELETE_TRANSLATION_LANGUAGE,
  payload: data,
});
export const deleteTranslationLanguageSuccess = (data) => ({
  type: DELETE_TRANSLATION_LANGUAGE_SUCCESS,
  payload: data,
});

export const deleteTranslationLanguageError = (data) => ({
  type: DELETE_TRANSLATION_LANGUAGE_ERROR,
  payload: data,
});
