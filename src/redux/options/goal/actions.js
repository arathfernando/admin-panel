import {
    CREATE_GOAL,
    CREATE_GOAL_ERROR,
    CREATE_GOAL_SUCCESS,
    DELETE_GOAL,
    DELETE_GOAL_ERROR,
    DELETE_GOAL_SUCCESS,
    GET_ALL_GOALS,
    GET_ALL_GOALS_ERROR,
    GET_ALL_GOALS_SUCCESS,
    UPDATE_GOAL,
    UPDATE_GOAL_ERROR,
    UPDATE_GOAL_SUCCESS
} from '../../types/options/goal';

export const getAllGoals = () => ({
  type: GET_ALL_GOALS,
});

export const getAllGoalsSuccess = (data) => ({
  type: GET_ALL_GOALS_SUCCESS,
  payload: data,
});

export const getAllGoalError = (data) => ({
  type: GET_ALL_GOALS_ERROR,
  payload: data,
});

export const createGoal = (data) => ({
  type: CREATE_GOAL,
  payload: data,
});
export const createGoalSuccess = (data) => ({
  type: CREATE_GOAL_SUCCESS,
  payload: data,
});

export const createGoalError = (data) => ({
  type: CREATE_GOAL_ERROR,
  payload: data,
});

export const updateGoal = (data) => ({
  type: UPDATE_GOAL,
  payload: data,
});
export const updateUserGoalsuccess = (data) => ({
  type: UPDATE_GOAL_SUCCESS,
  payload: data,
});

export const updateGoalError = (data) => ({
  type: UPDATE_GOAL_ERROR,
  payload: data,
});

export const deleteGoal = (data) => ({
  type: DELETE_GOAL,
  payload: data,
});
export const deleteGoalSuccess = (data) => ({
  type: DELETE_GOAL_SUCCESS,
  payload: data,
});

export const deleteGoalError = (data) => ({
  type: DELETE_GOAL_ERROR,
  payload: data,
});
