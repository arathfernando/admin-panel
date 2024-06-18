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

// get_product_launchers
export const getProductLaunchers = () => {
  return {
    type: GET_PRODUCT_LAUNCHERS,
  };
};
export const getProductLaunchersSuccessful = (payload) => {
  return {
    type: GET_PRODUCT_LAUNCHERS_SUCCESSFUL,
    payload,
  };
};
export const getProductLaunchersFailed = (payload) => {
  return {
    type: GET_PRODUCT_LAUNCHERS_FAILED,
    payload,
  };
};

// create_product_launcher
export const createProductLauncher = (payload) => {
  return {
    type: CREATE_PRODUCT_LAUNCHER,
    payload,
  };
};
export const createProductLauncherSuccessful = (payload) => {
  return {
    type: CREATE_PRODUCT_LAUNCHER_SUCCESSFUL,
    payload,
  };
};
export const createProductLauncherFailed = (payload) => {
  return {
    type: CREATE_PRODUCT_LAUNCHER_FAILED,
    payload,
  };
};

// update_product_launcher
export const updateProductLauncher = (payload) => {
  return {
    type: UPDATE_PRODUCT_LAUNCHER,
    payload,
  };
};
export const updateProductLauncherSuccessful = (payload) => {
  return {
    type: UPDATE_PRODUCT_LAUNCHER_SUCCESSFUL,
    payload,
  };
};
export const updateProductLauncherFailed = (payload) => {
  return {
    type: UPDATE_PRODUCT_LAUNCHER_FAILED,
    payload,
  };
};

// delete_product_launcher
export const deleteProductLauncher = (payload) => {
  return {
    type: DELETE_PRODUCT_LAUNCHER,
    payload,
  };
};
export const deleteProductLauncherSuccessful = (payload) => {
  return {
    type: DELETE_PRODUCT_LAUNCHER_SUCCESSFUL,
    payload,
  };
};
export const deleteProductLauncherFailed = (payload) => {
  return {
    type: DELETE_PRODUCT_LAUNCHER_FAILED,
    payload,
  };
};

// -----------------------------------------------
// submit_product_basic
export const submitProductBasic = (payload) => {
  return {
    type: SUBMIT_PRODUCT_BASIC,
    payload,
  };
};
export const submitProductBasicSuccessful = (payload) => {
  return {
    type: SUBMIT_PRODUCT_BASIC_SUCCESSFUL,
    payload,
  };
};
export const submitProductBasicFailed = (payload) => {
  return {
    type: SUBMIT_PRODUCT_BASIC_FAILED,
    payload,
  };
};

// get_product_subcategory_by_category
export const getProductSubcategoryByCategory = (payload) => {
  return {
    type: GET_PRODUCT_SUBCATEGORY_BY_CATEGORY,
    payload,
  };
};
export const getProductSubcategoryByCategorySuccessful = (payload) => {
  return {
    type: GET_PRODUCT_SUBCATEGORY_BY_CATEGORY_SUCCESSFUL,
    payload,
  };
};
export const getProductSubcategoryByCategoryFailed = (payload) => {
  return {
    type: GET_PRODUCT_SUBCATEGORY_BY_CATEGORY_FAILED,
    payload,
  };
};

// GET_PRODUCT_CATEGORY_FAQ
export const getProductCategoryFaq = (payload) => {
  return {
    type: GET_PRODUCT_CATEGORY_FAQ,
    payload,
  };
};
export const getProductCategoryFaqSuccessful = (payload) => {
  return {
    type: GET_PRODUCT_CATEGORY_FAQ_SUCCESSFUL,
    payload,
  };
};
export const getProductCategoryFaqFailed = (payload) => {
  return {
    type: GET_PRODUCT_CATEGORY_FAQ_FAILED,
    payload,
  };
};

// submit_product_assessments
export const submitProductAssessments = (payload) => {
  return {
    type: SUBMIT_PRODUCT_ASSESSMENTS,
    payload,
  };
};
export const submitProductAssessmentsSuccessful = (payload) => {
  return {
    type: SUBMIT_PRODUCT_ASSESSMENTS_SUCCESSFUL,
    payload,
  };
};
export const submitProductAssessmentsFailed = (payload) => {
  return {
    type: SUBMIT_PRODUCT_ASSESSMENTS_FAILED,
    payload,
  };
};

// get_product_members
export const getProductMembers = (payload) => {
  return {
    type: GET_PRODUCT_MEMBERS,
    payload,
  };
};
export const getProductMembersSuccessful = (payload) => {
  return {
    type: GET_PRODUCT_MEMBERS_SUCCESSFUL,
    payload,
  };
};
export const getProductMembersFailed = (payload) => {
  return {
    type: GET_PRODUCT_MEMBERS_FAILED,
    payload,
  };
};

// add_product_member
export const addProductMember = (payload) => {
  return {
    type: ADD_PRODUCT_MEMBER,
    payload,
  };
};
export const addProductMemberSuccessful = (payload) => {
  return {
    type: ADD_PRODUCT_MEMBER_SUCCESSFUL,
    payload,
  };
};
export const addProductMemberFailed = (payload) => {
  return {
    type: ADD_PRODUCT_MEMBER_FAILED,
    payload,
  };
};

// get_product
export const getProduct = (payload) => {
  return {
    type: GET_PRODUCT,
    payload,
  };
};
export const getProductSuccessful = (payload) => {
  return {
    type: GET_PRODUCT_SUCCESSFUL,
    payload,
  };
};
export const getProductFailed = (payload) => {
  return {
    type: GET_PRODUCT_MEMBERS_FAILED,
    payload,
  };
};

// add_project_workspace
export const addProjectWorkspace = (payload) => {
  return {
    type: ADD_PROJECT_WORKSPACE,
    payload,
  };
};
export const addProjectWorkspaceSuccessful = (payload) => {
  return {
    type: ADD_PROJECT_WORKSPACE_SUCCESSFUL,
    payload,
  };
};
export const addProjectWorkspaceFailed = (payload) => {
  return {
    type: ADD_PROJECT_WORKSPACE_FAILED,
    payload,
  };
};

// add_workspace_member
export const addWorkspaceMember = (payload) => {
  return {
    type: ADD_WORKSPACE_MEMBER,
    payload,
  };
};
export const addWorkspaceMemberSuccessful = (payload) => {
  return {
    type: ADD_WORKSPACE_MEMBER_SUCCESSFUL,
    payload,
  };
};
export const addWorkspaceMemberFailed = (payload) => {
  return {
    type: ADD_WORKSPACE_MEMBER_FAILED,
    payload,
  };
};
// remove_product_member
export const removeProcuctMember = (payload) => {
  return {
    type: REMOVE_PRODUCT_MEMBER,
    payload,
  };
};
export const removeProcuctMemberSuccessful = (payload) => {
  return {
    type: REMOVE_PRODUCT_MEMBER_SUCCESSFUL,
    payload,
  };
};
export const removeProcuctMemberFailed = (payload) => {
  return {
    type: REMOVE_PRODUCT_MEMBER_FAILED,
    payload,
  };
};

// get_project_workspaces
export const getProjectWorkspaces = (payload) => {
  return {
    type: GET_PROJECT_WORKSPACES,
    payload,
  };
};
export const getProjectWorkspacesSuccessful = (payload) => {
  return {
    type: GET_PROJECT_WORKSPACES_SUCCESSFUL,
    payload,
  };
};
export const getProjectWorkspacesFailed = (payload) => {
  return {
    type: GET_PROJECT_WORKSPACES_FAILED,
    payload,
  };
};

// get_workspace_recommended_experts
export const getWorkspaceRecommendedExperts = (payload) => {
  return {
    type: GET_WORKSPACE_RECOMMENDED_EXPERTS,
    payload,
  };
};
export const getWorkspaceRecommendedExpertsSuccessful = (payload) => {
  return {
    type: GET_WORKSPACE_RECOMMENDED_EXPERTS_SUCCESSFUL,
    payload,
  };
};
export const getWorkspaceRecommendedExpertsFailed = (payload) => {
  return {
    type: GET_WORKSPACE_RECOMMENDED_EXPERTS_FAILED,
    payload,
  };
};

// invite_workspace_experts
export const inviteWorkspaceExperts = (payload) => {
  return {
    type: INVITE_WORKSPACE_EXPERTS,
    payload,
  };
};
export const inviteWorkspaceExpertsSuccessful = (payload) => {
  return {
    type: INVITE_WORKSPACE_EXPERTS_SUCCESSFUL,
    payload,
  };
};
export const inviteWorkspaceExpertsFailed = (payload) => {
  return {
    type: INVITE_WORKSPACE_EXPERTS_FAILED,
    payload,
  };
};
