import { combineReducers } from 'redux';
import admins from './admin/reducer';
import authUser from './auth/reducer';
import acticle from './community/acticle/reducer';
import communityAll from './community/all/reducer';
import event from './community/event/reducer';
import group from './community/group/reducer';
import groupPrivacyOption from './community/groupPrivacyOption/reducer';
import member from './community/member/reducer';
import memberRole from './community/memberRole/reducer';
import post from './community/post/reducer';
import topic from './community/topic/reducer';
import aiPrompt from './managements/ai_prompt/reducer';
import aiPromptType from './managements/ai_prompt_type/reducer';
import notification from './managements/notification/reducer';
import permission from './managements/permission/reducer';
import walkthroughCategory from './managements/walkthrough_category/reducer';
import walkthroughStep from './managements/walkthrough_step/reducer';
import menu from './menu/reducer';
import badge from './options/badge/reducer';
import basicTypeCategory from './options/basic-type-category/reducer';
import basicType from './options/basic-type/reducer';
import contestCategoryCriteria from './options/contest-category-criteria/reducer';
import contestCategory from './options/contest-category/reducer';
import country from './options/country/reducer';
import courseCategory from './options/course-category/reducer';
import currency from './options/currency/reducer';
import expertiseCategory from './options/expertise-category/reducer';
import goal from './options/goal/reducer';
import languageLevel from './options/language-level/reducer';
import language from './options/language/reducer';
import marketplaceCategory from './options/marketplace_category/reducer';
import nationality from './options/nationality/reducer';
import productCategory from './options/product-category/reducer';
import productSubCategory from './options/product-subcategory/reducer';
import projectTag from './options/product-tags/reducer';
import productInnovationCategory from './options/product_innovation_category/reducer';
import productSubCategoryFAQ from './options/product_subcategory_faq/reducer';
import productTechCategory from './options/product_tech_category/reducer';
import skill from './options/skill/reducer';
import timezone from './options/timezone/reducer';
import translationLanguage from './options/translation-language/reducer';
import workspaceCategory from './options/workspace_category/reducer';
import workspaceCategoryCard from './options/workspace_category_card/reducer';
import settings from './settings/reducer';
import translationKey from './translation/translationKey/reducer';
import transLanguage from './translation/translationLanguage/reducer';
import translationProject from './translation/translationProject/reducer';
import userRole from './user-role/reducer';
import users from './user/reducer';

import article from './article/reducer';
import contributorRole from './community/contributorRole/reducer';
import topicType from './community/topicType/reducer';
import contestEntry from './contest/contestEntry/reducer';
import contest from './contest/contestList/reducer';
import contestMember from './contest/contestMember/reducer';
import contestTemplate from './contest/contestTemplate/reducer';
import expertiseReview from './expert_marketplace/expertiseReview/reducer';
import marketplace from './expert_marketplace/reducer';
import hubbersTeam from './hubbers-team/reducer';
import investorTransaction from './investor/investorTransaction/reducer';
import investorWorldwideShare from './investor/worldwideShare/reducer';
import investorZone from './investor/zone/reducer';
import job from './job/job/reducer';
import jobReview from './job/jobReview/reducer';
import kpi from './kpi/reducer';
import masterclassReview from './masterclass/masterclassReview/reducer';
import masterclass from './masterclass/reducer';
import moduleType from './module/moduleType/reducer';
import adminNotification from './notification/reducer';
import partnerContact from './partner/partner-contact/reducer';
import partnerType from './partner/partner-type/reducer';
import partner from './partner/partner/reducer';
import product from './product_launcher/reducer';
import pushNotifications from './push_notification/reducer';
import social from './social/social/reducer';
import team from './team/all-teams/reducer';
import teamMemberRole from './team/team-member-role/reducer';
import teamMember from './team/team-member/reducer';

const reducers = combineReducers({
  product,
  menu,
  settings,
  admins,
  authUser,
  userRole,
  users,
  event,
  topic,
  memberRole,
  member,
  acticle,
  post,
  group,
  groupPrivacyOption,
  adminNotification,
  // managements
  permission,
  notification,
  walkthroughCategory,
  walkthroughStep,
  // options
  basicTypeCategory,
  basicType,
  expertiseCategory,
  country,
  currency,
  projectTag,
  timezone,
  language,
  languageLevel,
  translationLanguage,
  goal,
  badge,
  contestCategory,
  contestCategoryCriteria,
  courseCategory,
  masterclass,
  masterclassReview,
  marketplace,
  productCategory,
  productSubCategory,
  productInnovationCategory,
  productTechCategory,
  productSubCategoryFAQ,
  marketplaceCategory,
  workspaceCategory,
  workspaceCategoryCard,
  skill,
  nationality,
  aiPrompt,
  aiPromptType,

  communityAll,
  investorZone,
  investorTransaction,
  investorWorldwideShare,
  hubbersTeam,
  job,
  article,
  team,
  teamMember,
  teamMemberRole,
  partner,
  partnerType,
  partnerContact,
  moduleType,
  contest,
  expertiseReview,
  contestTemplate,
  contestEntry,
  contestMember,
  social,
  contributorRole,
  topicType,
  jobReview,
  notification,
  translationProject,
  translationKey,
  transLanguage,
  pushNotifications,
  kpi,
});

export default reducers;
