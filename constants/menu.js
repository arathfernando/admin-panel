import { UserRole } from '../helpers/authHelper';
import { adminRoot } from './defaultValues';

const data = [
  {
    id: 'dashboards',
    icon: 'iconsminds-shop-4',
    label: 'menu.dashboards',
    to: `${adminRoot}/dashboard`,
    subs: [
      {
        icon: 'simple-icon-briefcase',
        label: 'menu.kpi-overview',
        to: `${adminRoot}/dashboard/default`,
        // roles: [UserRole.Admin],
      },
    ],
  },
  {
    id: 'admins',
    icon: 'iconsminds-user',
    label: 'menu.admins',
    roles: [UserRole.SuperAdmin],
    to: `${adminRoot}/admins`,
  },
  {
    id: 'users',
    icon: 'iconsminds-user',
    label: 'menu.users',
    to: `${adminRoot}/users`,
  },
  {
    id: 'community',
    icon: 'iconsminds-shop-4',
    label: 'menu.community',
    to: `${adminRoot}/community`,
    subs: [
      {
        icon: 'simple-icon-doc',
        label: 'menu.community',
        to: `${adminRoot}/community/all`,
      },
      {
        icon: 'simple-icon-doc',
        label: 'menu.member',
        to: `${adminRoot}/community/member`,
      },
      {
        icon: 'simple-icon-doc',
        label: 'menu.topic',
        to: `${adminRoot}/community/topic`,
      },
      {
        icon: 'simple-icon-doc',
        label: 'menu.post',
        to: `${adminRoot}/community/post`,
      },
      {
        icon: 'simple-icon-doc',
        label: 'menu.article',
        to: `${adminRoot}/community/article`,
      },
      {
        icon: 'simple-icon-doc',
        label: 'menu.event',
        to: `${adminRoot}/community/event`,
      },
      {
        icon: 'simple-icon-doc',
        label: 'menu.group',
        to: `${adminRoot}/community/group`,
      },
    ],
  },
  {
    id: 'investors',
    icon: 'iconsminds-user',
    label: 'menu.investors',
    to: `${adminRoot}/investor/zones`,
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.investors.zones',
        to: `${adminRoot}/investor/zones`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.investors.worldwide-shares',
        to: `${adminRoot}/investor/worldwide-shares`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.investors.investor-transaction',
        to: `${adminRoot}/investor/investor-transaction`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.investors.share-price',
        to: `${adminRoot}/investor/share-price`,
      },
    ],
  },
  {
    id: 'hubbers-team',
    icon: 'iconsminds-user',
    label: 'menu.hubbers-team',
    to: `${adminRoot}/hubbers-team`,
  },
  {
    id: 'team',
    icon: 'iconsminds-user',
    label: 'menu.team',
    roles: [UserRole.Admin, UserRole.Editor],
    to: `${adminRoot}/team`,
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.all-teams',
        to: `${adminRoot}/team/all-teams`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.team-member',
        to: `${adminRoot}/team/team-member`,
      },
      // {
      //   icon: 'simple-icon-paper-plane',
      //   label: 'menu.team-member-role',
      //   to: `${adminRoot}/team/team-member-role`,
      // },
    ],
  },
  // {
  //   id: 'module',
  //   icon: 'iconsminds-user',
  //   label: 'menu.module',
  //   to: `${adminRoot}/module`,
  //   subs: [
  //     {
  //       icon: 'simple-icon-paper-plane',
  //       label: 'menu.module-type',
  //       to: `${adminRoot}/module/module-type`,
  //     },
  //     // {
  //     //   icon: 'simple-icon-paper-plane',
  //     //   label: 'menu.team-member',
  //     //   to: `${adminRoot}/team/team-member`,
  //     // },
  //     // {
  //     //   icon: 'simple-icon-paper-plane',
  //     //   label: 'menu.team-member-role',
  //     //   to: `${adminRoot}/team/team-member-role`,
  //     // },
  //   ],
  // },
  {
    id: 'contest',
    icon: 'iconsminds-shop-4',
    label: 'menu.contest',
    to: `${adminRoot}/contests/contestList`,
    // subs: [
    //   {
    //     icon: 'simple-icon-paper-plane',
    //     label: 'menu.contest-list',
    //     to: `${adminRoot}/contest/contest-list`,
    //   },
    //   {
    //     icon: 'simple-icon-paper-plane',
    //     label: 'menu.contest-member',
    //     to: `${adminRoot}/contest/contest-member`,
    //   },
    //   {
    //     icon: 'simple-icon-paper-plane',
    //     label: 'menu.contest-description',
    //     to: `${adminRoot}/contest/contest-description`,
    //   },
    //   {
    //     icon: 'simple-icon-paper-plane',
    //     label: 'menu.contest-entry',
    //     to: `${adminRoot}/contest/contest-entry`,
    //   },
    // ],
  },
  {
    id: 'partner',
    icon: 'iconsminds-user',
    label: 'menu.partner',
    to: `${adminRoot}/partner`,
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.partner-list',
        to: `${adminRoot}/partner/partner-list`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.partner-type',
        to: `${adminRoot}/partner/partner-type`,
      },
    ],
  },
  {
    id: 'masterclass',
    icon: 'iconsminds-shop-4',
    label: 'menu.masterclass',
    to: `${adminRoot}/masterclass`,
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.masterclass',
        to: `${adminRoot}/masterclass/masterclasses`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.review',
        to: `${adminRoot}/masterclass/review`,
      },
    ],
  },
  {
    id: 'expertMarketplace',
    icon: 'iconsminds-shop-4',
    label: 'menu.expertMarketplace',
    to: `${adminRoot}/expert-marketplace`,
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.expertise',
        to: `${adminRoot}/expert-marketplace/expetises`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.review',
        to: `${adminRoot}/expert-marketplace/review`,
      },
    ],
  },
  {
    id: 'productLauncher',
    icon: 'iconsminds-shop-4',
    label: 'menu.productLauncher',
    to: `${adminRoot}/product-launcher`,
  },
  {
    id: 'job',
    icon: 'iconsminds-shop-4',
    label: 'menu.job',
    to: `${adminRoot}/job`,
    subs: [
      {
        icon: 'iconsminds-shop-4',
        label: 'menu.job',
        to: `${adminRoot}/jobs`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.review',
        to: `${adminRoot}/job/review`,
      },
    ],
  },
  {
    id: 'managements',
    icon: 'iconsminds-shop',
    label: 'menu.managements',
    to: `${adminRoot}/managements`,
    subs: [
      {
        icon: 'iconsminds-shop-4',
        label: 'menu.permission',
        to: `${adminRoot}/managements/permission`,
      },
      {
        id: 'ai-prompt-type',
        icon: 'iconsminds-shop-4',
        label: 'menu.aiPromptType',
        to: `${adminRoot}/managements/ai-prompt-type`,
      },
      {
        id: 'ai-prompt',
        icon: 'iconsminds-shop-4',
        label: 'menu.aiPrompt',
        to: `${adminRoot}/managements/ai-prompt`,
      },
      {
        icon: 'iconsminds-shop-4',
        label: 'menu.translation',
        to: `${adminRoot}/managements/translation`,
      },
      {
        icon: 'iconsminds-shop-4',
        label: 'menu.notification',
        to: `${adminRoot}/managements/notification`,
      },
      {
        icon: 'iconsminds-shop-4',
        label: 'menu.walkthroughCategory',
        to: `${adminRoot}/managements/walkthrough_category`,
      },
      {
        icon: 'iconsminds-shop-4',
        label: 'menu.walkthroughStep',
        to: `${adminRoot}/managements/walkthrough_step`,
      },
    ],
  },
  {
    id: 'options',
    icon: 'iconsminds-three-arrow-fork',
    label: 'menu.options',
    to: `${adminRoot}/options`,
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.basicTypeCategory',
        to: `${adminRoot}/options/basic-type-category`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.basicType',
        to: `${adminRoot}/options/basic-type`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.expertiseCategory',
        to: `${adminRoot}/options/expertise-category`,
      },
      // {
      //   icon: 'simple-icon-paper-plane',
      //   label: 'menu.productTags',
      //   to: `${adminRoot}/options/project-tags`,
      // },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.language',
        to: `${adminRoot}/options/language`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.language-level',
        to: `${adminRoot}/options/language-level`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.translation-language',
        to: `${adminRoot}/options/translation-language`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.country',
        to: `${adminRoot}/options/country`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.nationality',
        to: `${adminRoot}/options/nationality`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.currency',
        to: `${adminRoot}/options/currency`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.timezone',
        to: `${adminRoot}/options/timezone`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.social',
        to: `${adminRoot}/options/social`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.goal',
        to: `${adminRoot}/options/goal`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.badge',
        to: `${adminRoot}/options/badge`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.contestCategory',
        to: `${adminRoot}/options/contest-category`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.contestCategoryCriteria',
        to: `${adminRoot}/options/contest-category-criteria`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.courseCategory',
        to: `${adminRoot}/options/course-category`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.productCategory',
        to: `${adminRoot}/options/product-category`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.productSubCategory',
        to: `${adminRoot}/options/product-subcategory`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.productSubCategoryFAQ',
        to: `${adminRoot}/options/product-subcategory-faq`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.productInnovationCategory',
        to: `${adminRoot}/options/product-innovation-category`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.productTechCategory',
        to: `${adminRoot}/options/product-tech-category`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.marketplaceCategory',
        to: `${adminRoot}/options/marketplace_category`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.workspaceCategory',
        to: `${adminRoot}/options/workspace_category`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.workspaceCategoryCard',
        to: `${adminRoot}/options/workspace_category_card`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.skill',
        to: `${adminRoot}/options/skill`,
      },
      {
        id: 'article',
        icon: 'simple-icon-paper-plane',
        label: 'menu.hubbers-latest-news',
        to: `${adminRoot}/options/article`,
      },
    ],
  },
  // {
  //   id: 'docs',
  //   icon: 'iconsminds-library',
  //   label: 'menu.docs',
  //   to: 'https://gogo-react-docs.coloredstrategies.com/',
  //   newWindow: true,
  // },
];
export default data;
