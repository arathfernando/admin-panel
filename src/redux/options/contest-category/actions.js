import {
  CREATE_CONTEST_CATEGORY,
  CREATE_CONTEST_CATEGORY_ERROR,
  CREATE_CONTEST_CATEGORY_SUCCESS,
  DELETE_CONTEST_CATEGORY,
  DELETE_CONTEST_CATEGORY_ERROR,
  DELETE_CONTEST_CATEGORY_SUCCESS,
  GET_ALL_CONTEST_CATEGORY,
  GET_ALL_CONTEST_CATEGORY_ERROR,
  GET_ALL_CONTEST_CATEGORY_SUCCESS,
  UPDATE_CONTEST_CATEGORY,
  UPDATE_CONTEST_CATEGORY_ERROR,
  UPDATE_CONTEST_CATEGORY_SUCCESS,
} from '../../types/options/contest-category';

export const getAllContestCategory = () => ({
  type: GET_ALL_CONTEST_CATEGORY,
});

export const getAllContestCategorySuccess = (data) => ({
  type: GET_ALL_CONTEST_CATEGORY_SUCCESS,
  payload: data,
});

export const getAllContestCategoryError = (data) => ({
  type: GET_ALL_CONTEST_CATEGORY_ERROR,
  payload: data,
});

// create
export const createContestCategory = (values) => ({
  type: CREATE_CONTEST_CATEGORY,
  payload: values,
});

export const createContestCategorySuccess = (data) => ({
  type: CREATE_CONTEST_CATEGORY_SUCCESS,
  payload: data,
});

export const createContestCategoryError = (message) => ({
  type: CREATE_CONTEST_CATEGORY_ERROR,
  payload: message,
});

// delete
export const deleteContestCategory = (data) => ({
  type: DELETE_CONTEST_CATEGORY,
  payload: data,
});

export const deleteContestCategorySuccess = (data) => ({
  type: DELETE_CONTEST_CATEGORY_SUCCESS,
  payload: data,
});

export const deleteContestCategoryError = (data) => ({
  type: DELETE_CONTEST_CATEGORY_ERROR,
  payload: data,
});

// update
export const updateContestCategory = (data) => ({
  type: UPDATE_CONTEST_CATEGORY,
  payload: data,
});

export const updateContestCategorySuccess = (data) => ({
  type: UPDATE_CONTEST_CATEGORY_SUCCESS,
  payload: data,
});

export const updateContestCategoryError = (data) => ({
  type: UPDATE_CONTEST_CATEGORY_ERROR,
  payload: data,
});
