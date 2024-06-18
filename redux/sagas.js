/* eslint-disable no-unused-vars */
import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import acticleSaga from './community/acticle/saga';
import communitySaga from './community/all/saga';
import eventSaga from './community/event/saga';
import memberSaga from './community/member/saga';
import memberRoleSaga from './community/memberRole/saga';
import postSaga from './community/post/saga';
import topicSaga from './community/topic/saga';
import userRoleSagas from './user-role/saga';
import userSaga from './user/saga';

import adminSaga from './admin/saga';
import groupSaga from './community/group/saga';
import groupPrivacyOptionSaga from './community/groupPrivacyOption/saga';

import aiPromptSaga from './managements/ai_prompt/saga';
import aiPromptTypeSaga from './managements/ai_prompt_type/saga';
import notificationSaga from './managements/notification/saga';
import permissionSaga from './managements/permission/saga';
import walkthroughCategorySaga from './managements/walkthrough_category/saga';
import walkthroughStepSaga from './managements/walkthrough_step/saga';
import badgeSaga from './options/badge/saga';
import basicTypeCategorySaga from './options/basic-type-category/saga';
import basicTypeSaga from './options/basic-type/saga';
import contestCategoryCriteriaSaga from './options/contest-category-criteria/saga';
import contestCategorySaga from './options/contest-category/saga';
import countrySaga from './options/country/saga';
import courseCategorySaga from './options/course-category/saga';
import currencySaga from './options/currency/saga';
import expertiseCategorySaga from './options/expertise-category/saga';
import goalSaga from './options/goal/saga';
import languageLevelSaga from './options/language-level/saga';
import languageSaga from './options/language/saga';
import marketplaceCategorySaga from './options/marketplace_category/saga';
import nationalitiesaga from './options/nationality/saga';
import productCategorySaga from './options/product-category/saga';
import productSubCategorySaga from './options/product-subcategory/saga';
import projectTagSaga from './options/product-tags/saga';
import productInnovationCategorySaga from './options/product_innovation_category/saga';
import productSubCategoryFAQSaga from './options/product_subcategory_faq/saga';
import productTechCategorySaga from './options/product_tech_category/saga';
import skillSaga from './options/skill/saga';
import timezoneSaga from './options/timezone/saga';
import TranslationLanguageSaga from './options/translation-language/saga';
import workspaceCategorySaga from './options/workspace_category/saga';
import workspaceCategoryCardSaga from './options/workspace_category_card/saga';
import translationKeySaga from './translation/translationKey/saga';
import transLanguageSaga from './translation/translationLanguage/saga';
import translationProjectSaga from './translation/translationProject/saga';

import articleSaga from './article/saga';
import contributorRoleSaga from './community/contributorRole/saga';
import topicTypeSaga from './community/topicType/saga';
import ContestEntrySaga from './contest/contestEntry/saga';
import ContestListSaga from './contest/contestList/saga';
import ContestMemberaga from './contest/contestMember/saga';
import ContestTemplateSaga from './contest/contestTemplate/saga';
import expertiseReviewSaga from './expert_marketplace/expertiseReview/saga';
import marketplaceSaga from './expert_marketplace/saga';
import hubbersTeamSaga from './hubbers-team/saga';
import investorTransactionSaga from './investor/investorTransaction/saga';
import investorWorldwideShareSaga from './investor/worldwideShare/saga';
import investorZoneSaga from './investor/zone/saga';
import jobSaga from './job/job/saga';
import jobReviewSaga from './job/jobReview/saga';
import kpiSaga from './kpi/saga';
import masterclassReviewSaga from './masterclass/masterclassReview/saga';
import masterclassSaga from './masterclass/saga';
import ModuleTypeSaga from './module/moduleType/saga';
import adminNotificationSaga from './notification/saga';
import partnerContactSaga from './partner/partner-contact/saga';
import partnerTypeSaga from './partner/partner-type/saga';
import partnerSaga from './partner/partner/saga';
import productSaga from './product_launcher/saga';
import pushNotificationsSaga from './push_notification/saga';
import socialSaga from './social/social/saga';
import teamSaga from './team/all-teams/saga';
import teamMemberRoleSaga from './team/team-member-role/saga';
import teamMemberSaga from './team/team-member/saga';

export default function* rootSaga(getState) {
  yield all([
    adminSaga(),
    authSagas(),
    userRoleSagas(),
    userSaga(),
    basicTypeCategorySaga(),
    basicTypeSaga(),
    expertiseCategorySaga(),
    communitySaga(),
    eventSaga(),
    topicSaga(),
    memberRoleSaga(),
    memberSaga(),
    postSaga(),
    acticleSaga(),
    groupSaga(),
    groupPrivacyOptionSaga(),
    countrySaga(),
    currencySaga(),
    timezoneSaga(),
    languageSaga(),
    projectTagSaga(),
    languageLevelSaga(),
    TranslationLanguageSaga(),
    goalSaga(),
    badgeSaga(),
    contestCategorySaga(),
    contestCategoryCriteriaSaga(),
    courseCategorySaga(),
    masterclassSaga(),
    masterclassReviewSaga(),
    articleSaga(),
    marketplaceSaga(),
    expertiseReviewSaga(),
    productCategorySaga(),
    productSubCategorySaga(),
    productInnovationCategorySaga(),
    productTechCategorySaga(),
    productSubCategoryFAQSaga(),
    marketplaceCategorySaga(),
    workspaceCategorySaga(),
    workspaceCategoryCardSaga(),
    productSaga(),
    skillSaga(),
    nationalitiesaga(),
    aiPromptSaga(),
    aiPromptTypeSaga(),
    permissionSaga(),
    adminNotificationSaga(),
    walkthroughCategorySaga(),
    walkthroughStepSaga(),

    investorZoneSaga(),
    investorWorldwideShareSaga(),
    investorTransactionSaga(),
    hubbersTeamSaga(),
    jobSaga(),
    teamSaga(),
    teamMemberSaga(),
    teamMemberRoleSaga(),
    partnerSaga(),
    partnerTypeSaga(),
    partnerContactSaga(),
    ModuleTypeSaga(),
    ContestListSaga(),
    ContestTemplateSaga(),
    ContestEntrySaga(),
    ContestMemberaga(),
    socialSaga(),
    contributorRoleSaga(),
    topicTypeSaga(),
    jobReviewSaga(),
    notificationSaga(),
    pushNotificationsSaga(),
    translationProjectSaga(),
    translationKeySaga(),
    transLanguageSaga(),
    kpiSaga(),
  ]);
}
