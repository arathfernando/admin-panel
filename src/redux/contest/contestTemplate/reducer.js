import {
  CREATE_CONTEST_TEMPLATE,
  CREATE_CONTEST_TEMPLATE_FAILED,
  CREATE_CONTEST_TEMPLATE_SUCCESSFUL,
  DELETE_TEMPLATE,
  DELETE_TEMPLATE_FAILED,
  DELETE_TEMPLATE_SUCCESSFUL,
  GET_CONTEST_TEMPLATES,
  GET_CONTEST_TEMPLATES_FAILED,
  GET_CONTEST_TEMPLATES_SUCCESSFUL,
  RESET_CONTEST_TEMPLATE,
  UPDATE_CONTEST_TEMPLATE,
  UPDATE_CONTEST_TEMPLATE_FAILED,
  UPDATE_CONTEST_TEMPLATE_SUCCESSFUL,
} from '../../types/contest/contestType';

const INIT_STATE = {
  contestTemplateAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  contestTemplates: {
    loading: false,
    error: null,
    data: [],
  },
  templateDelete: {
    status: 'idle',
    error: null,
    data: {},
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // ------ get_contest_templates ------
    case GET_CONTEST_TEMPLATES:
      return {
        ...state,
        contestTemplates: {
          ...state.contestTemplates,
          loading: true,
          error: null,
        },
      };
    case GET_CONTEST_TEMPLATES_SUCCESSFUL:
      return {
        ...state,
        contestTemplates: {
          loading: false,
          error: null,
          data: action.payload,
        },
      };
    case GET_CONTEST_TEMPLATES_FAILED:
      return {
        ...state,
        contestTemplates: {
          loading: false,
          error: action.payload,
          data: [],
        },
      };
    // ------ create_contest_template ------
    case CREATE_CONTEST_TEMPLATE:
      return {
        ...state,
        contestTemplateAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    // ------ reset_contest_template ------
    case RESET_CONTEST_TEMPLATE:
      return {
        ...state,
        contestTemplateAction: {
          status: 'idle',
          error: null,
          data: {},
        },
      };
    case CREATE_CONTEST_TEMPLATE_SUCCESSFUL:
      return {
        ...state,
        contestTemplateAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_CONTEST_TEMPLATE_FAILED:
      return {
        ...state,
        contestTemplateAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };

    // ------ update_contest_template ------
    case UPDATE_CONTEST_TEMPLATE:
      return {
        ...state,
        contestTemplateAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_CONTEST_TEMPLATE_SUCCESSFUL:
      return {
        ...state,
        contestTemplateAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_CONTEST_TEMPLATE_FAILED:
      return {
        ...state,
        contestTemplateAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ delete_template ------
    case DELETE_TEMPLATE:
      return {
        ...state,
        templateDelete: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_TEMPLATE_SUCCESSFUL:
      return {
        ...state,
        templateDelete: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_TEMPLATE_FAILED:
      return {
        ...state,
        templateDelete: {
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
