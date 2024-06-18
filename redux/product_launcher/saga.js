/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
/* eslint-disable no-redeclare */
/* eslint-disable block-scoped-var */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-named-as-default-member */
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import objectToFormData from '../../helpers/objectToFormData';

import {
  ADD_PRODUCT_MEMBER,
  ADD_PROJECT_WORKSPACE,
  ADD_WORKSPACE_MEMBER,
  CREATE_PRODUCT_LAUNCHER,
  DELETE_PRODUCT_LAUNCHER,
  GET_PRODUCT,
  GET_PRODUCT_CATEGORY_FAQ,
  GET_PRODUCT_LAUNCHERS,
  GET_PRODUCT_MEMBERS,
  GET_PRODUCT_SUBCATEGORY_BY_CATEGORY,
  GET_PROJECT_WORKSPACES,
  GET_WORKSPACE_RECOMMENDED_EXPERTS,
  INVITE_WORKSPACE_EXPERTS,
  REMOVE_PRODUCT_MEMBER,
  SUBMIT_PRODUCT_ASSESSMENTS,
  SUBMIT_PRODUCT_BASIC,
  UPDATE_PRODUCT_LAUNCHER,
} from '../types/product_launcher/product_launcher_types';

import { axiosPut, del, get, post } from '../../ApiConfig';
import {
  addProductMemberFailed,
  addProductMemberSuccessful,
  addProjectWorkspaceFailed,
  addProjectWorkspaceSuccessful,
  addWorkspaceMemberFailed,
  addWorkspaceMemberSuccessful,
  createProductLauncherFailed,
  createProductLauncherSuccessful,
  deleteProductLauncherFailed,
  deleteProductLauncherSuccessful,
  getProductCategoryFaqFailed,
  getProductCategoryFaqSuccessful,
  getProductFailed,
  getProductLaunchers,
  getProductLaunchersFailed,
  getProductLaunchersSuccessful,
  getProductMembers,
  getProductMembersFailed,
  getProductMembersSuccessful,
  getProductSubcategoryByCategoryFailed,
  getProductSubcategoryByCategorySuccessful,
  getProductSuccessful,
  getProjectWorkspaces,
  getProjectWorkspacesFailed,
  getProjectWorkspacesSuccessful,
  getWorkspaceRecommendedExpertsFailed,
  getWorkspaceRecommendedExpertsSuccessful,
  inviteWorkspaceExpertsFailed,
  inviteWorkspaceExpertsSuccessful,
  removeProcuctMemberFailed,
  removeProcuctMemberSuccessful,
  submitProductAssessmentsFailed,
  submitProductAssessmentsSuccessful,
  submitProductBasicFailed,
  submitProductBasicSuccessful,
  updateProductLauncherFailed,
  updateProductLauncherSuccessful,
} from './actions';

// get_product_launchers
const getProductLaunchersAsync = () => {
  return get(
    `/admin/product-launcher/project`,
    { params: { page: 1, limit: 1000 } },
    { notifyError: true }
  );
};
function* GetProductLaunchers() {
  try {
    const response = yield call(getProductLaunchersAsync);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(
        getProductLaunchersSuccessful({ data: response.data?.data || [] })
      );
    } else {
      throw new Error('getProductLaunchers Response is not success!');
    }
  } catch (error) {
    yield put(getProductLaunchersFailed({ error, data: [] }));
  }
}

// create_product_launcher
const createProductLauncherAsync = (payload) => {
  return post(
    '/admin/product-launcher/project',
    objectToFormData(payload),
    {},
    { notify: true }
  );
};
function* CreateProductLauncher({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(createProductLauncherAsync, payload);
    if (response.status === 201 && response.statusText === 'Created') {
      yield put(createProductLauncherSuccessful(response.data));
      onSuccess?.(response.data);
      yield put(getProductLaunchers());
    } else {
      throw new Error('createProductLauncher Response is not success!');
    }
  } catch (error) {
    yield put(createProductLauncherFailed(error));
  }
}

// update_product_launcher
const updateProductLauncherAsync = ({ id, ...payload }) => {
  return axiosPut(
    `/admin/product-launcher/project/${id}`,
    payload,
    {},
    { notify: true }
  );
};
function* UpdateProductLauncher({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(updateProductLauncherAsync, payload);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(updateProductLauncherSuccessful(response.data));
      onSuccess?.(response.data);
      yield put(getProductLaunchers());
    } else {
      throw new Error('updateProductLauncher  Response is not success!');
    }
  } catch (error) {
    yield put(updateProductLauncherFailed(error));
  }
}

// delete_product_launcher
const deleteProductLauncherAsync = (id) => {
  return del(`/admin/product-launcher/project/${id}`, {}, { notify: true });
};
// delete_product_launcher
function* DeleteProductLauncher({ payload }) {
  try {
    const response = yield call(deleteProductLauncherAsync, payload);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(deleteProductLauncherSuccessful(response.data));
      yield put(getProductLaunchers());
    } else {
      throw new Error('deleteProductLauncher Response is not success!');
    }
  } catch (error) {
    yield put(deleteProductLauncherFailed(error));
  }
}

// -----------------------------------------------------------------------
// submit_product_basic
const submitProductBasicAsync = ({ id, ...payload }) => {
  if (id) {
    return axiosPut(
      `${`/admin/product-launcher/project`}/${id}`,
      objectToFormData(payload),
      {},
      { notify: true }
    );
  }
  return post(
    `/admin/product-launcher/project`,
    objectToFormData(payload),
    {},
    { notify: true }
  );
};
function* SubmitProductBasic({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(submitProductBasicAsync, {
      ...payload,
    });
    yield put(submitProductBasicSuccessful(response.data));
    onSuccess?.(response.data);
  } catch (error) {
    yield put(submitProductBasicFailed(error));
  }
}

// get_product_subcategory_by_category
const getProductSubcategoryByCategoryAsync = (id) => {
  return get(`/admin/product-launcher/product-subcategory/category/${id}`);
};
function* GetProductSubcategoryByCategory({ payload }) {
  try {
    const response = yield call(getProductSubcategoryByCategoryAsync, payload);
    yield put(
      getProductSubcategoryByCategorySuccessful({ data: response.data })
    );
  } catch (error) {
    yield put(getProductSubcategoryByCategoryFailed({ data: [], error }));
  }
}

// submit_product_assessments
const submitProductAssessmentsAsync = ({ id, ...payload }) => {
  if (id) {
    return axiosPut(
      `${`/admin/product-launcher/project/assessment`}/${id}`,
      payload,
      {},
      { notify: true }
    );
  }
  return post(
    `/admin/product-launcher/project/assessment`,
    payload,
    {},
    { notify: true }
  );
};
function* SubmitProductAssessments({ payload: { onSuccess, ...payload } }) {
  try {
    // const { id } = yield select(({ data }) => data?.submitProductAssessments);
    const response = yield call(submitProductAssessmentsAsync, {
      ...payload,
      id: '',
    });
    yield put(submitProductAssessmentsSuccessful(response.data));
    onSuccess?.(response.data);
  } catch (error) {
    yield put(submitProductAssessmentsFailed(error));
  }
}

// GET_PRODUCT_CATEGORY_FAQ
const getProductCategoryFaqAsync = (id) => {
  return get(
    `${`/admin/product-launcher/product-subcategory-faq/category`}/${id}`
  );
};
function* getProductCategoryFaq({ payload }) {
  try {
    const response = yield call(getProductCategoryFaqAsync, payload);
    yield put(getProductCategoryFaqSuccessful({ data: response.data }));
  } catch (error) {
    yield put(getProductCategoryFaqFailed({ data: [], error }));
  }
}

// get_product_members
const getProductMembersAsync = (id) => {
  return get(`/project/project-member/project/${id}`);
};
function* GetProductMembers({ payload }) {
  try {
    const response = yield call(getProductMembersAsync, payload);
    yield put(getProductMembersSuccessful({ ...payload, data: response.data }));
  } catch (error) {
    yield put(getProductMembersFailed({ ...payload, data: [], error }));
  }
}

// add_product_member
const addProductMemberAsync = (payload) => {
  return post(
    `/admin/product-launcher/project/project-member`,
    payload,
    {},
    { notify: true }
  );
};
function* AddProductMember({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(addProductMemberAsync, payload);
    yield put(addProductMemberSuccessful(response.data));
    yield put(getProductMembers(payload.project_id));
    onSuccess?.(response.data);
  } catch (error) {
    yield put(addProductMemberFailed(error));
  }
}
// get_product
const getProductAsync = (id) => {
  return get(`${`/admin/product-launcher/project`}/${id}`);
};
function* GetProduct({ payload }) {
  try {
    const response = yield call(getProductAsync, payload);
    yield put(getProductSuccessful({ ...payload, data: response.data }));
  } catch (error) {
    yield put(getProductFailed({ ...payload, data: [], error }));
  }
}
// add_project_workspace
const addProjectWorkspaceAsync = (payload) => {
  return post('/workspace', payload, {}, { notify: true });
};
function* AddProjectWorkspace({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(addProjectWorkspaceAsync, payload);
    yield put(addProjectWorkspaceSuccessful(response.data));
    yield put(getProjectWorkspaces(payload.project_id));
    onSuccess?.(response.data);
  } catch (error) {
    yield put(addProjectWorkspaceFailed(error));
  }
}

// add_workspace_member
const addWorkspaceMemberAsync = (payload) => {
  return post(
    `/admin/workspace/workspace-member`,
    payload,
    {},
    { notify: true, successMsg: 'workspace member added successfully' }
  );
};
function* AddWorkspaceMember({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(addWorkspaceMemberAsync, payload);
    yield put(addWorkspaceMemberSuccessful(response.data));
    onSuccess?.(response.data);
    // yield put(getWorkspaceMembers(payload.workspace_id));
  } catch (error) {
    yield put(addWorkspaceMemberFailed(error));
  }
}

// remove_product_member
const removeProcuctMemberAsync = ({ id }) => {
  return del(
    `/admin/product-launcher/project/project-member/${id}`,
    {},
    { notify: true }
  );
};
function* RemoveProcuctMember({
  payload: { onSuccess, productId, ...payload },
}) {
  try {
    const response = yield call(removeProcuctMemberAsync, payload);
    yield put(removeProcuctMemberSuccessful(response.data));
    onSuccess?.(response.data);
    yield put(getProductMembers(productId));
  } catch (error) {
    yield put(removeProcuctMemberFailed(error));
  }
}

// get_project_workspaces
const getProjectWorkspacesAsync = (id) => {
  return get(`/workspace/project/${id}`);
};
function* GetProjectWorkspaces({ payload }) {
  try {
    const response = yield call(getProjectWorkspacesAsync, payload);
    yield put(
      getProjectWorkspacesSuccessful({ ...payload, data: response.data })
    );
  } catch (error) {
    yield put(getProjectWorkspacesFailed({ ...payload, data: [], error }));
  }
}

// get_workspace_recommended_experts
const getWorkspaceRecommendedExpertsAsync = (id) => {
  return get(`/workspace/experts/${id}`);
};
function* GetWorkspaceRecommendedExperts({ payload }) {
  try {
    const response = yield call(getWorkspaceRecommendedExpertsAsync, payload);
    yield put(
      getWorkspaceRecommendedExpertsSuccessful({
        ...payload,
        data: response?.data,
      })
    );
  } catch (error) {
    yield put(
      getWorkspaceRecommendedExpertsFailed({ ...payload, data: [], error })
    );
  }
}

// invite_workspace_experts
const inviteWorkspaceExpertsAsync = (payload) => {
  return post(
    `/workspace/invite/expert`,
    payload,
    {},
    { notify: true, successMsg: 'Invited successfully' }
  );
};
function* InviteWorkspaceExperts({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(inviteWorkspaceExpertsAsync, payload);
    yield put(inviteWorkspaceExpertsSuccessful(response?.data));
    onSuccess?.(response?.data);
  } catch (error) {
    yield put(inviteWorkspaceExpertsFailed(error));
  }
}

export function* watchProductLauncher() {
  yield takeLatest(GET_PRODUCT_LAUNCHERS, GetProductLaunchers);
  yield takeLatest(CREATE_PRODUCT_LAUNCHER, CreateProductLauncher);
  yield takeLatest(UPDATE_PRODUCT_LAUNCHER, UpdateProductLauncher);
  yield takeLatest(DELETE_PRODUCT_LAUNCHER, DeleteProductLauncher);
  yield takeLatest(SUBMIT_PRODUCT_BASIC, SubmitProductBasic);
  yield takeLatest(
    GET_PRODUCT_SUBCATEGORY_BY_CATEGORY,
    GetProductSubcategoryByCategory
  );
  yield takeLatest(GET_PRODUCT_CATEGORY_FAQ, getProductCategoryFaq);
  yield takeLatest(GET_PRODUCT_MEMBERS, GetProductMembers);
  yield takeLatest(SUBMIT_PRODUCT_ASSESSMENTS, SubmitProductAssessments);
  yield takeLatest(ADD_PRODUCT_MEMBER, AddProductMember);
  yield takeLatest(GET_PRODUCT, GetProduct);
  yield takeLatest(ADD_PROJECT_WORKSPACE, AddProjectWorkspace);
  yield takeLatest(ADD_WORKSPACE_MEMBER, AddWorkspaceMember);
  yield takeLatest(REMOVE_PRODUCT_MEMBER, RemoveProcuctMember);
  yield takeLatest(GET_PROJECT_WORKSPACES, GetProjectWorkspaces);
  yield takeLatest(
    GET_WORKSPACE_RECOMMENDED_EXPERTS,
    GetWorkspaceRecommendedExperts
  );
  yield takeLatest(INVITE_WORKSPACE_EXPERTS, InviteWorkspaceExperts);
}

export default function* rootSaga() {
  yield all([fork(watchProductLauncher)]);
}
