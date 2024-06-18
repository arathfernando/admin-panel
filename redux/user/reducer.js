import { uniqBy } from 'lodash';
import {
  CREATE_USER,
  DELETE_USER,
  DELETE_USER_ERROR,
  DELETE_USER_SUCCESS,
  GET_ALL_USER,
  GET_ALL_USER_ERROR,
  GET_ALL_USER_SUCCESS,
  GET_BASIC_TYPES,
  GET_BASIC_TYPES_FAILED,
  GET_BASIC_TYPES_SUCCESSFUL,
  GET_BASIC_TYPE_CATEGORIES,
  GET_BASIC_TYPE_CATEGORIES_FAILED,
  GET_BASIC_TYPE_CATEGORIES_SUCCESSFUL,
  GET_GOALS,
  GET_GOALS_FAILED,
  GET_GOALS_SUCCESSFUL,
  GET_SOCIALS,
  GET_SOCIALS_FAILED,
  GET_SOCIALS_SUCCESSFUL,
  GET_USER,
  GET_USER_ERROR,
  GET_USER_SUCCESS,
  UPDATE_SINGLE_USER,
  UPDATE_USER_EDUCATION,
  UPDATE_USER_EDUCATION_FAILED,
  UPDATE_USER_EDUCATION_SUCCESSFUL,
  UPDATE_USER_GENERAL,
  UPDATE_USER_GENERAL_FAILED,
  UPDATE_USER_GENERAL_SUCCESSFUL,
  UPDATE_USER_GOALS,
  UPDATE_USER_GOALS_FAILED,
  UPDATE_USER_GOALS_SUCCESSFUL,
  UPDATE_USER_INTERESTS,
  UPDATE_USER_INTERESTS_FAILED,
  UPDATE_USER_INTERESTS_SUCCESSFUL,
  UPDATE_USER_ROLE_PROFILES,
  UPDATE_USER_ROLE_PROFILES_FAILED,
  UPDATE_USER_ROLE_PROFILES_SUCCESSFUL,
  UPDATE_USER_SOCIAL_MEDIA,
  UPDATE_USER_SOCIAL_MEDIA_FAILED,
  UPDATE_USER_SOCIAL_MEDIA_SUCCESSFUL,
  UPDATE_USER_WORK_EXPRIENCE,
  UPDATE_USER_WORK_EXPRIENCE_FAILED,
  UPDATE_USER_WORK_EXPRIENCE_SUCCESSFUL,
} from '../types/user';

const INIT_STATE = {
  loading: false,
  users: [],
  singleUser: {},
  createUser: null,
  error: '',
  userGeneralAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  userWorkExprienceAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  userEducationAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  socials: {
    loading: false,
    error: null,
    data: [],
  },
  userSocialMediaAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  goals: {
    loading: false,
    error: null,
    data: [],
  },
  userGoalsAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  basicTypeCategories: {
    loading: false,
    error: null,
    data: [],
  },
  basicTypes: {
    loading: false,
    error: null,
    data: [],
  },
  userInterestsAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  updateUserRoleProfilesAction: {
    status: 'idle',
    error: null,
    data: {},
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ALL_USER:
      return { ...state, loading: true };

    case GET_ALL_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        users: uniqBy(action.payload?.reverse?.(), ({ email }) => email) || [],
      };

    case GET_ALL_USER_ERROR:
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        loading: true,
        singleUser: { ...state.singleUser, ...action.payload },
      };
    case UPDATE_SINGLE_USER:
      return {
        ...state,
        singleUser: { ...state.singleUser, ...action.payload },
      };
    case GET_USER_SUCCESS:
      return { ...state, loading: false, singleUser: action.payload };
    case GET_USER_ERROR:
      return { ...state, loading: false, error: action.payload };
    case CREATE_USER:
      return { ...state, loading: true };
    case DELETE_USER:
      return {
        ...state,
        loading: true,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    // ------ update_user_general ------
    case UPDATE_USER_GENERAL:
      return {
        ...state,
        userGeneralAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_USER_GENERAL_SUCCESSFUL:
      return {
        ...state,
        userGeneralAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_USER_GENERAL_FAILED:
      return {
        ...state,
        userGeneralAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ update_user_work_exprience ------
    case UPDATE_USER_WORK_EXPRIENCE:
      return {
        ...state,
        userWorkExprienceAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_USER_WORK_EXPRIENCE_SUCCESSFUL:
      return {
        ...state,
        userWorkExprienceAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_USER_WORK_EXPRIENCE_FAILED:
      return {
        ...state,
        userWorkExprienceAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ update_user_education ------
    case UPDATE_USER_EDUCATION:
      return {
        ...state,
        userEducationAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_USER_EDUCATION_SUCCESSFUL:
      return {
        ...state,
        userEducationAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_USER_EDUCATION_FAILED:
      return {
        ...state,
        userEducationAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ get_socials ------
    case GET_SOCIALS:
      return {
        ...state,
        socials: {
          ...state.socials,
          loading: true,
          error: null,
        },
      };
    case GET_SOCIALS_SUCCESSFUL:
      return {
        ...state,
        socials: {
          loading: false,
          error: null,
          data: action.payload?.data || [],
        },
      };
    case GET_SOCIALS_FAILED:
      return {
        ...state,
        socials: {
          loading: false,
          error: action.payload,
          data: [],
        },
      };
    // ------ update_user_social_media ------
    case UPDATE_USER_SOCIAL_MEDIA:
      return {
        ...state,
        userSocialMediaAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_USER_SOCIAL_MEDIA_SUCCESSFUL:
      return {
        ...state,
        userSocialMediaAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_USER_SOCIAL_MEDIA_FAILED:
      return {
        ...state,
        userSocialMediaAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ get_goals ------
    case GET_GOALS:
      return {
        ...state,
        goals: {
          ...state.goals,
          loading: true,
          error: null,
        },
      };
    case GET_GOALS_SUCCESSFUL:
      return {
        ...state,
        goals: {
          loading: false,
          error: null,
          data: action.payload || [],
        },
      };
    case GET_GOALS_FAILED:
      return {
        ...state,
        goals: {
          loading: false,
          error: action.payload,
          data: [],
        },
      }; // ------ update_user_goals ------
    case UPDATE_USER_GOALS:
      return {
        ...state,
        userGoalsAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_USER_GOALS_SUCCESSFUL:
      return {
        ...state,
        userGoalsAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_USER_GOALS_FAILED:
      return {
        ...state,
        userGoalsAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      }; // ------ get_basic_type_categories ------
    case GET_BASIC_TYPE_CATEGORIES:
      return {
        ...state,
        basicTypeCategories: {
          ...state.basicTypeCategories,
          loading: true,
          error: null,
        },
      };
    case GET_BASIC_TYPE_CATEGORIES_SUCCESSFUL:
      return {
        ...state,
        basicTypeCategories: {
          loading: false,
          error: null,
          data: action.payload?.data || [],
        },
      };
    case GET_BASIC_TYPE_CATEGORIES_FAILED:
      return {
        ...state,
        basicTypeCategories: {
          loading: false,
          error: action.payload,
          data: [],
        },
      };
    // ------ get_basic_types ------
    case GET_BASIC_TYPES:
      return {
        ...state,
        basicTypes: {
          ...state.basicTypes,
          loading: true,
          error: null,
        },
      };
    case GET_BASIC_TYPES_SUCCESSFUL:
      return {
        ...state,
        basicTypes: {
          loading: false,
          error: null,
          data: action.payload?.data || [],
        },
      };
    case GET_BASIC_TYPES_FAILED:
      return {
        ...state,
        basicTypes: {
          loading: false,
          error: action.payload,
          data: [],
        },
      };
    // ------ update_user_interests ------
    case UPDATE_USER_INTERESTS:
      return {
        ...state,
        userInterestsAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_USER_INTERESTS_SUCCESSFUL:
      return {
        ...state,
        userInterestsAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_USER_INTERESTS_FAILED:
      return {
        ...state,
        userInterestsAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ update_user_role_profiles ------
    case UPDATE_USER_ROLE_PROFILES:
      return {
        ...state,
        updateUserRoleProfilesAction: {
          status: 'submitting',
          error: null,
          ...action.payload,
        },
      };
    case UPDATE_USER_ROLE_PROFILES_SUCCESSFUL:
      return {
        ...state,
        updateUserRoleProfilesAction: {
          status: 'submitted',
          error: null,
          ...action.payload,
        },
      };
    case UPDATE_USER_ROLE_PROFILES_FAILED:
      return {
        ...state,
        updateUserRoleProfilesAction: {
          status: 'failed',
          ...action.payload,
        },
      };
    default:
      return { ...state };
  }
};
