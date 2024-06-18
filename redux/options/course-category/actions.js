import {
  GET_COURSE_CATEGORYS,
  GET_COURSE_CATEGORYS_SUCCESS,
  GET_COURSE_CATEGORYS_ERROR,

  CREATE_COURSE_CATEGORY,
  CREATE_COURSE_CATEGORY_SUCCESS,
  CREATE_COURSE_CATEGORY_ERROR,

  DELETE_COURSE_CATEGORY,
  DELETE_COURSE_CATEGORY_SUCCESS,
  DELETE_COURSE_CATEGORY_ERROR,

  UPDATE_COURSE_CATEGORY,
  UPDATE_COURSE_CATEGORY_SUCCESS,
  UPDATE_COURSE_CATEGORY_ERROR
} from '../../types/options/course';

export const getCourseCategorys = () => ({
  type: GET_COURSE_CATEGORYS,
});

export const getCourseCategorysSuccess = (data) => ({
  type: GET_COURSE_CATEGORYS_SUCCESS,
  payload: data,
});

export const getCourseCategorysError = (data) => ({
  type: GET_COURSE_CATEGORYS_ERROR,
  payload: data,
});

// create
export const createCourseCategory = (values) => ({
  type: CREATE_COURSE_CATEGORY,
  payload: values,
});

export const createCourseCategorySuccess = (data) => ({
  type: CREATE_COURSE_CATEGORY_SUCCESS,
  payload: data,
});

export const createCourseCategoryError = (message) => ({
  type: CREATE_COURSE_CATEGORY_ERROR,
  payload: message,
});

export const deleteCourseCategory = (data) => ({
  type: DELETE_COURSE_CATEGORY,
  payload: data,
});
export const deleteCourseCategorySuccess = (data) => ({
  type: DELETE_COURSE_CATEGORY_SUCCESS,
  payload: data,
});

export const deleteCourseCategoryError = (data) => ({
  type: DELETE_COURSE_CATEGORY_ERROR,
  payload: data,
});

// update
export const updateCourseCategory = (data) => ({
  type: UPDATE_COURSE_CATEGORY,
  payload: data,
});

export const updateCourseCategorySuccess = (data) => ({
  type: UPDATE_COURSE_CATEGORY_SUCCESS,
  payload: data,
});

export const updateCourseCategoryError = (data) => ({
  type: UPDATE_COURSE_CATEGORY_ERROR,
  payload: data,
});
