/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-expressions */
import {
  ADD_PRODUCT_MEMBER,
  ADD_PRODUCT_MEMBER_FAILED,
  ADD_PRODUCT_MEMBER_SUCCESSFUL,
  ADD_PROJECT_WORKSPACE,
  ADD_PROJECT_WORKSPACE_FAILED,
  ADD_PROJECT_WORKSPACE_SUCCESSFUL,
  ADD_WORKSPACE_MEMBER,
  ADD_WORKSPACE_MEMBER_FAILED,
  ADD_WORKSPACE_MEMBER_SUCCESSFUL,
  CREATE_PRODUCT_LAUNCHER,
  CREATE_PRODUCT_LAUNCHER_FAILED,
  CREATE_PRODUCT_LAUNCHER_SUCCESSFUL,
  DELETE_PRODUCT_LAUNCHER,
  DELETE_PRODUCT_LAUNCHER_FAILED,
  DELETE_PRODUCT_LAUNCHER_SUCCESSFUL,
  GET_PRODUCT,
  GET_PRODUCT_CATEGORY_FAQ,
  GET_PRODUCT_CATEGORY_FAQ_FAILED,
  GET_PRODUCT_CATEGORY_FAQ_SUCCESSFUL,
  GET_PRODUCT_FAILED,
  GET_PRODUCT_LAUNCHERS,
  GET_PRODUCT_LAUNCHERS_FAILED,
  GET_PRODUCT_LAUNCHERS_SUCCESSFUL,
  GET_PRODUCT_MEMBERS,
  GET_PRODUCT_MEMBERS_FAILED,
  GET_PRODUCT_MEMBERS_SUCCESSFUL,
  GET_PRODUCT_SUBCATEGORY_BY_CATEGORY,
  GET_PRODUCT_SUBCATEGORY_BY_CATEGORY_FAILED,
  GET_PRODUCT_SUBCATEGORY_BY_CATEGORY_SUCCESSFUL,
  GET_PRODUCT_SUCCESSFUL,
  GET_PROJECT_WORKSPACES,
  GET_PROJECT_WORKSPACES_FAILED,
  GET_PROJECT_WORKSPACES_SUCCESSFUL,
  GET_WORKSPACE_RECOMMENDED_EXPERTS,
  GET_WORKSPACE_RECOMMENDED_EXPERTS_FAILED,
  GET_WORKSPACE_RECOMMENDED_EXPERTS_SUCCESSFUL,
  INVITE_WORKSPACE_EXPERTS,
  INVITE_WORKSPACE_EXPERTS_FAILED,
  INVITE_WORKSPACE_EXPERTS_SUCCESSFUL,
  REMOVE_PRODUCT_MEMBER,
  REMOVE_PRODUCT_MEMBER_FAILED,
  REMOVE_PRODUCT_MEMBER_SUCCESSFUL,
  SUBMIT_PRODUCT_ASSESSMENTS,
  SUBMIT_PRODUCT_ASSESSMENTS_FAILED,
  SUBMIT_PRODUCT_ASSESSMENTS_SUCCESSFUL,
  SUBMIT_PRODUCT_BASIC,
  SUBMIT_PRODUCT_BASIC_FAILED,
  SUBMIT_PRODUCT_BASIC_SUCCESSFUL,
  UPDATE_PRODUCT_LAUNCHER,
  UPDATE_PRODUCT_LAUNCHER_FAILED,
  UPDATE_PRODUCT_LAUNCHER_SUCCESSFUL,
} from '../types/product_launcher/product_launcher_types';

const INIT_STATE = {
  productLaunchers: {
    loading: false,
    error: null,
    data: [],
  },
  createProductLauncherAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  updateProductLauncherAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  deleteProductLauncherAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  submitProductBasicAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  SubcategoryByCategory: {
    loading: false,
    error: null,
    data: [],
  },
  productCategoryFaq: {
    loading: false,
    error: null,
    data: [],
  },
  productAssessmentsAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  productMembers: {
    loading: false,
    error: null,
    data: [],
  },
  addProductMemberAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  product: {
    loading: false,
    error: null,
    data: [],
  },
  addProjectWorkspaceAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  addWorkspaceMemberAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  removeProcuctMemberAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  projectWorkspaces: {
    loading: false,
    error: null,
    data: [],
  },
  productSubcategoryByCategory: {
    loading: false,
    error: null,
    data: [],
  },
  workspaceRecommendedExperts: {
    loading: false,
    error: null,
    data: [],
  },
  inviteWorkspaceExpertAction: {
    status: 'idle',
    error: null,
    data: {},
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // ------ get_product_launchers ------
    case GET_PRODUCT_LAUNCHERS:
      return {
        ...state,
        productLaunchers: {
          ...state.productLaunchers,
          loading: true,
          error: null,
        },
      };
    case GET_PRODUCT_LAUNCHERS_SUCCESSFUL:
      return {
        ...state,
        productLaunchers: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_PRODUCT_LAUNCHERS_FAILED:
      return {
        ...state,
        productLaunchers: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };
    // ------ create_product_launcher ------
    case CREATE_PRODUCT_LAUNCHER:
      return {
        ...state,
        createProductLauncherAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_PRODUCT_LAUNCHER_SUCCESSFUL:
      return {
        ...state,
        createProductLauncherAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_PRODUCT_LAUNCHER_FAILED:
      return {
        ...state,
        createProductLauncherAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ update_product_launcher ------
    case UPDATE_PRODUCT_LAUNCHER:
      return {
        ...state,
        updateProductLauncherAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_PRODUCT_LAUNCHER_SUCCESSFUL:
      return {
        ...state,
        updateProductLauncherAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_PRODUCT_LAUNCHER_FAILED:
      return {
        ...state,
        updateProductLauncherAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ delete_product_launcher ------
    case DELETE_PRODUCT_LAUNCHER:
      return {
        ...state,
        deleteProductLauncherAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_PRODUCT_LAUNCHER_SUCCESSFUL:
      return {
        ...state,
        deleteProductLauncherAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_PRODUCT_LAUNCHER_FAILED:
      return {
        ...state,
        deleteProductLauncherAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ submit_product_basic ------
    case SUBMIT_PRODUCT_BASIC:
      return {
        ...state,
        submitProductBasicAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case SUBMIT_PRODUCT_BASIC_SUCCESSFUL:
      return {
        ...state,
        submitProductBasicAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case SUBMIT_PRODUCT_BASIC_FAILED:
      return {
        ...state,
        submitProductBasicAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ get_product_subcategory_by_category ------
    case GET_PRODUCT_SUBCATEGORY_BY_CATEGORY:
      return {
        ...state,
        productSubcategoryByCategory: {
          ...state.productSubcategoryByCategory,
          loading: true,
          error: null,
        },
      };
    case GET_PRODUCT_SUBCATEGORY_BY_CATEGORY_SUCCESSFUL:
      return {
        ...state,
        productSubcategoryByCategory: {
          loading: false,
          error: null,
          ...action.payload,
          data:
            action.payload?.data?.map?.((data, indx) => ({
              ...data,
              order: indx,
            })) || [],
        },
      };
    case GET_PRODUCT_SUBCATEGORY_BY_CATEGORY_FAILED:
      return {
        ...state,
        productSubcategoryByCategory: {
          loading: false,
          ...action.payload,
        },
      };
    // ------ GET_PRODUCT_CATEGORY_FAQ ------
    case GET_PRODUCT_CATEGORY_FAQ:
      return {
        ...state,
        productCategoryFaq: {
          ...state.productCategoryFaq,
          loading: true,
          error: null,
        },
      };
    case GET_PRODUCT_CATEGORY_FAQ_SUCCESSFUL:
      const subCategoryAssessments = {};

      action.payload?.data?.forEach?.((data) => {
        if (!subCategoryAssessments[data.product_subcategory?.id]) {
          subCategoryAssessments[data.product_subcategory?.id] = [];
        }

        subCategoryAssessments[data.product_subcategory?.id]?.push?.({
          product_category: data?.product_category?.id,
          product_sub_category: data?.product_subcategory?.id,
          product_sub_faq: data?.id,
          product_sub_question: data?.question,
          product_sub_percentage: data?.percentage,
          product_sub_faq_ans: data?.answer,
          product_sub_faq_default_ans: data?.default_answer,
        });
      });

      return {
        ...state,
        productCategoryFaq: {
          loading: false,
          error: null,
          ...action.payload,
          data: subCategoryAssessments,
        },
      };
    case GET_PRODUCT_CATEGORY_FAQ_FAILED:
      return {
        ...state,
        productCategoryFaq: {
          loading: false,
          ...action.payload,
        },
      };
    // ------ submit_product_assessments ------
    case SUBMIT_PRODUCT_ASSESSMENTS:
      return {
        ...state,
        productAssessmentsAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case SUBMIT_PRODUCT_ASSESSMENTS_SUCCESSFUL:
      return {
        ...state,
        productAssessmentsAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case SUBMIT_PRODUCT_ASSESSMENTS_FAILED:
      return {
        ...state,
        productAssessmentsAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ get_product_members ------
    case GET_PRODUCT_MEMBERS:
      return {
        ...state,
        productMembers: {
          ...state.productMembers,
          loading: true,
          error: null,
        },
      };
    case GET_PRODUCT_MEMBERS_SUCCESSFUL:
      return {
        ...state,
        productMembers: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_PRODUCT_MEMBERS_FAILED:
      return {
        ...state,
        productMembers: {
          loading: false,
          ...action.payload,
        },
      };
    // ------ add_product_member ------
    case ADD_PRODUCT_MEMBER:
      return {
        ...state,
        addProductMemberAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case ADD_PRODUCT_MEMBER_SUCCESSFUL:
      return {
        ...state,
        addProductMemberAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case ADD_PRODUCT_MEMBER_FAILED:
      return {
        ...state,
        addProductMemberAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ get_product ------
    case GET_PRODUCT:
      return {
        ...state,
        product: {
          ...state.product,
          loading: true,
          error: null,
        },
      };
    case GET_PRODUCT_SUCCESSFUL:
      return {
        ...state,
        product: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_PRODUCT_FAILED:
      return {
        ...state,
        product: {
          loading: false,
          ...action.payload,
        },
      };
    // ------ add_project_workspace ------
    case ADD_PROJECT_WORKSPACE:
      return {
        ...state,
        addProjectWorkspaceAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case ADD_PROJECT_WORKSPACE_SUCCESSFUL:
      return {
        ...state,
        addProjectWorkspaceAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case ADD_PROJECT_WORKSPACE_FAILED:
      return {
        ...state,
        addProjectWorkspaceAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ add_workspace_member ------
    case ADD_WORKSPACE_MEMBER:
      return {
        ...state,
        addWorkspaceMemberAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case ADD_WORKSPACE_MEMBER_SUCCESSFUL:
      return {
        ...state,
        addWorkspaceMemberAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case ADD_WORKSPACE_MEMBER_FAILED:
      return {
        ...state,
        addWorkspaceMemberAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ remove_product_member ------
    case REMOVE_PRODUCT_MEMBER:
      return {
        ...state,
        removeProcuctMemberAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case REMOVE_PRODUCT_MEMBER_SUCCESSFUL:
      return {
        ...state,
        removeProcuctMemberAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case REMOVE_PRODUCT_MEMBER_FAILED:
      return {
        ...state,
        removeProcuctMemberAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ get_project_workspaces ------
    case GET_PROJECT_WORKSPACES:
      return {
        ...state,
        projectWorkspaces: {
          ...state.projectWorkspaces,
          loading: true,
          error: null,
        },
      };
    case GET_PROJECT_WORKSPACES_SUCCESSFUL:
      return {
        ...state,
        projectWorkspaces: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_PROJECT_WORKSPACES_FAILED:
      return {
        ...state,
        projectWorkspaces: {
          loading: false,
          ...action.payload,
        },
      };
    // ------ get_workspace_recommended_experts ------
    case GET_WORKSPACE_RECOMMENDED_EXPERTS:
      return {
        ...state,
        workspaceRecommendedExperts: {
          ...state.workspaceRecommendedExperts,
          loading: true,
          error: null,
        },
      };
    case GET_WORKSPACE_RECOMMENDED_EXPERTS_SUCCESSFUL:
      return {
        ...state,
        workspaceRecommendedExperts: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_WORKSPACE_RECOMMENDED_EXPERTS_FAILED:
      return {
        ...state,
        workspaceRecommendedExperts: {
          loading: false,
          ...action.payload,
        },
      };
    // ------ invite_workspace_experts ------
    case INVITE_WORKSPACE_EXPERTS:
      return {
        ...state,
        inviteWorkspaceExpertAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case INVITE_WORKSPACE_EXPERTS_SUCCESSFUL:
      return {
        ...state,
        inviteWorkspaceExpertAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case INVITE_WORKSPACE_EXPERTS_FAILED:
      return {
        ...state,
        inviteWorkspaceExpertAction: {
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
