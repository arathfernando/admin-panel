import {
  CREATE_SKILL,
  CREATE_SKILL_FAILED,
  CREATE_SKILL_SUCCESSFUL,
  DELETE_SKILL,
  DELETE_SKILL_FAILED,
  DELETE_SKILL_SUCCESSFUL,
  GET_SKILL,
  GET_SKILL_FAILED,
  GET_SKILL_SUCCESSFUL,
  UPDATE_SKILL,
  UPDATE_SKILL_FAILED,
  UPDATE_SKILL_SUCCESSFUL,
} from '../../types/options/skill';

// get_skill
export const getSkills = () => {
  return {
    type: GET_SKILL,
  };
};
export const getSkillsSuccessful = (payload) => {
  return {
    type: GET_SKILL_SUCCESSFUL,
    payload,
  };
};
export const getSkillsFailed = (payload) => {
  return {
    type: GET_SKILL_FAILED,
    payload,
  };
};

// create_skill
export const createSkill = (payload) => {
  return {
    type: CREATE_SKILL,
    payload,
  };
};
export const createSkillSuccessful = (payload) => {
  return {
    type: CREATE_SKILL_SUCCESSFUL,
    payload,
  };
};
export const createSkillFailed = (payload) => {
  return {
    type: CREATE_SKILL_FAILED,
    payload,
  };
};

// update_skill
export const updateSkill = (payload) => {
  return {
    type: UPDATE_SKILL,
    payload,
  };
};
export const updateSkillSuccessful = (payload) => {
  return {
    type: UPDATE_SKILL_SUCCESSFUL,
    payload,
  };
};
export const updateSkillFailed = (payload) => {
  return {
    type: UPDATE_SKILL_FAILED,
    payload,
  };
};

// delete_skill
export const deleteSkill = (payload) => {
  return {
    type: DELETE_SKILL,
    payload,
  };
};
export const deleteSkillSuccessful = (payload) => {
  return {
    type: DELETE_SKILL_SUCCESSFUL,
    payload,
  };
};
export const deleteSkillFailed = (payload) => {
  return {
    type: DELETE_SKILL_FAILED,
    payload,
  };
};
