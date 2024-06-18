const permissions = [
  {
    fieldName: 'ALL_ALL',
    label: 'All',
    children: [
      {
        label: 'Admin',
        fieldName: 'ADMIN_ALL',
        children: [
          {
            fieldName: 'admin_list',
            label: 'View',
            route: '/app/admins',
            action: 'view',
          },
          {
            fieldName: 'admin_create',
            label: 'Create',
            action: 'create',
          },
          {
            fieldName: 'admin_update',
            label: 'Update',
            action: 'update',
          },
          {
            fieldName: 'admin_delete',
            label: 'Delete',
            action: 'delete',
          },
        ],
      },
      {
        label: 'User',
        fieldName: 'USER_ALL',
        children: [
          {
            fieldName: 'user_list',
            label: 'View',
            route: '/app/users',
            action: 'view',
          },
          {
            fieldName: 'user_create',
            label: 'Create',
            action: 'create',
          },
          {
            fieldName: 'user_update',
            label: 'Update',
            route: '/app/users/:id',
            action: 'update',
          },
          {
            fieldName: 'user_delete',
            label: 'Delete',
            action: 'delete',
          },
        ],
      },
      {
        label: 'Community',
        fieldName: 'COMMUNITY',
        children: [
          {
            fieldName: 'COMMUNITY_ALL',
            label: 'Community',
            children: [
              {
                fieldName: 'community_list',
                label: 'View',
                route: '/app/community/all',
                action: 'view',
              },
              {
                fieldName: 'community_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'community_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'community_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            action: 'view',
          },
          {
            fieldName: 'MEMBER_ALL',
            label: 'Member',
            children: [
              {
                fieldName: 'member_list',
                label: 'View',
                route: '/app/community/member',
                action: 'view',
              },
              {
                fieldName: 'member_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'member_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'member_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            action: 'view',
          },
          {
            label: 'Topic',
            children: [
              {
                fieldName: 'topic_list',
                label: 'View',
                route: '/app/community/topic',
                action: 'view',
              },
              {
                fieldName: 'topic_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'topic_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'topic_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'TOPIC_ALL',
            action: 'view',
          },
          {
            label: 'Post',
            children: [
              {
                fieldName: 'post_list',
                label: 'View',
                route: '/app/community/post',
                action: 'view',
              },
              {
                fieldName: 'post_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'post_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'post_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'POST_ALL',
            action: 'view',
          },
          {
            label: 'Article',
            children: [
              {
                fieldName: 'community_article_list',
                label: 'View',
                route: '/app/community/article',
                action: 'view',
              },
              {
                fieldName: 'community_article_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'community_article_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'community_article_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'COMMUNITY_ARTICLE_ALL',
            action: 'view',
          },
          {
            label: 'Event',
            children: [
              {
                fieldName: 'event_list',
                label: 'View',
                route: '/app/community/event',
                action: 'view',
              },
              {
                fieldName: 'event_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'event_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'event_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'EVENT_ALL',
            action: 'view',
          },
          {
            label: 'Group',
            children: [
              {
                fieldName: 'group_list',
                label: 'View',
                route: '/app/community/group',
                action: 'view',
              },
              {
                fieldName: 'group_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'group_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'group_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'GROUP_ALL',
            action: 'view',
          },
          {
            label: 'Course',
            children: [
              {
                fieldName: 'course_list',
                label: 'View',
                route: '/app/community/course',
                action: 'view',
              },
              {
                fieldName: 'course_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'course_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'course_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'COURSE_ALL',
            action: 'view',
          },
        ],
      },
      {
        label: 'Hubbers Investor',
        fieldName: 'HUNBBERS INVESTOR',
        children: [
          {
            label: 'Zone',
            children: [
              {
                fieldName: 'zone_list',
                label: 'View',
                route: '/app/investor/zones',
                action: 'view',
              },
              {
                fieldName: 'zone_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'zone_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'zone_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'ZONE_ALL',
            action: 'view',
          },
          {
            label: 'Worldwide Share',
            children: [
              {
                fieldName: 'worldwide_share_list',
                label: 'View',
                route: '/app/investor/worldwide-shares',
                action: 'view',
              },
              {
                fieldName: 'worldwide_share_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'worldwide_share_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'worldwide_share_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'WORLDWIDE_SHARE_ALL',
            action: 'view',
          },
          {
            label: 'Investor Transaction',
            children: [
              {
                fieldName: 'investor_transaction_list',
                label: 'View',
                route: '/app/investor/investor-transaction/:userId?/:userName?',
                action: 'view',
              },
              {
                fieldName: 'investor_transaction_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'investor_transaction_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'investor_transaction_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'INVESTOR_TRANSACTION_ALL',
            action: 'view',
          },
          {
            label: 'Share Price',
            children: [
              {
                fieldName: 'share_price_list',
                label: 'View',
                route: '/app/investor/share-price',
                action: 'view',
              },
              {
                fieldName: 'share_price_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'share_price_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'share_price_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'SHARE_PRICE_ALL',
            action: 'view',
          },
        ],
      },
      {
        label: 'Hubbers Team',
        fieldName: 'HUBBERS_TEAM_ALL',
        children: [
          {
            fieldName: 'hubbers_team_list',
            label: 'View',
            route: '/app/hubbers-team',
            action: 'view',
          },
          {
            fieldName: 'hubbers_team_create',
            label: 'Create',
            action: 'create',
          },
          {
            fieldName: 'hubbers_team_update',
            label: 'Update',
            action: 'update',
          },
          {
            fieldName: 'hubbers_team_order',
            label: 'Order',
            action: 'order',
          },
          {
            fieldName: 'hubbers_team_delete',
            label: 'Delete',
            action: 'delete',
          },
        ],
      },
      {
        label: 'Module',
        fieldName: 'MODULE_ALL',
        children: [
          {
            fieldName: 'MODULE_TYPE_ALL',
            label: 'Module Type',
            children: [
              {
                fieldName: 'module_type_list',
                label: 'View',
                route: '/app/module/module-type',
                action: 'view',
              },
              {
                fieldName: 'module_type_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'module_type_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'module_type_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
          },
        ],
      },
      {
        label: 'Contest',
        fieldName: 'CONTEST',
        children: [
          {
            label: 'Contest',
            children: [
              {
                fieldName: 'contest_list',
                label: 'View',
                route: '/app/contests/:contestList',
                action: 'view',
              },
              {
                fieldName: 'contest_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'contest_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'contest_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'CONTEST_ALL',
            action: 'view',
          },
          {
            label: 'Contest Member',
            children: [
              {
                fieldName: 'contest_member_list',
                label: 'View',
                route: '/app/contests/:contestMember',
                action: 'view',
              },
              {
                fieldName: 'contest_member_create',
                label: 'Add',
                action: '',
              },
              {
                fieldName: 'contest_member_update',
                label: 'Accept',
                action: '',
              },
              {
                fieldName: 'contest_member__update',
                label: 'Reject',
                action: '',
              },
              {
                fieldName: 'contest_member_delete',
                label: 'Remove',
                action: '',
              },
            ],
            fieldName: 'CONTEST_MEMBER_ALL',
            action: 'view',
          },
          {
            label: 'Contest Template',
            children: [
              {
                fieldName: 'contest_template_list',
                label: 'View',
                route: '/app/contests/:contestTemplate',
                action: 'view',
              },
              {
                fieldName: 'contest_template_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'contest_template_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'contest_template_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'CONTEST_TEMPLATE_ALL',
            action: 'view',
          },
          {
            label: 'Contest Entry',
            children: [
              {
                fieldName: 'contest_enty_list',
                label: 'View',
                route: '/app/contests/:contest_entry',
                action: 'view',
              },
              {
                fieldName: 'contest_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'CONTEST_ENTY_ALL',
            action: 'view',
          },
        ],
      },
      {
        label: 'Partner',
        fieldName: 'PARTNER',
        children: [
          {
            label: 'Partner',
            children: [
              {
                fieldName: 'partner_list',
                label: 'View',
                route: '/app/partner/partner-list',
                action: 'view',
              },
              {
                fieldName: 'partner_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'partner_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'partner_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'PARTNER_ALL',
            action: 'view',
          },
          {
            label: 'Partner Type',
            children: [
              {
                fieldName: 'partner_type_list',
                label: 'View',
                route: '/app/partner/partner-type',
                action: 'view',
              },
              {
                fieldName: 'partner_type_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'partner_type_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'partner_type_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'PARTNER_TYPE_ALL',
            action: 'view',
          },
        ],
      },
      {
        label: 'Masterclass',
        fieldName: 'MASTERCLASS',
        children: [
          {
            label: 'Masterclass',
            children: [
              {
                fieldName: 'masterclass_list',
                label: 'View',
                route: '/app/masterclass',
                action: 'view',
              },
              {
                fieldName: 'masterclass_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'masterclass_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'masterclass_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'MASTERCLASS_ALL',
            action: 'view',
          },
          {
            label: 'Masterclass Student & Instructor',
            children: [
              {
                fieldName: 'masterclass_student_list',
                label: 'View',
                route: '/app/masterclass/:masterclassId/:masterclassTitle',
                action: 'view',
              },
              {
                fieldName: 'masterclass_student_create',
                label: 'Add',
                action: 'create',
              },
              {
                fieldName: 'masterclass_student_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'MASTERCLASS_STUDENT_ALL',
            action: 'view',
          },
          {
            label: 'Masterclass Review',
            children: [
              {
                fieldName: 'masterclass_review_list',
                label: 'View',
                route: '/app/masterclass/review',
                action: 'view',
              },
              {
                fieldName: 'masterclass_review_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'masterclass_review_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'masterclass_review_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'MASTERCLASS_REVIEW_ALL',
            action: 'view',
          },
        ],
      },
      {
        label: 'Expert Marketplace',
        fieldName: 'EXPERT MARKETPLACE',
        children: [
          {
            label: 'Expertise',
            children: [
              {
                fieldName: 'expert_marketplace_list',
                label: 'View',
                route: '/app/expertise',
                action: 'view',
              },
              {
                fieldName: 'expert_marketplace_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'expert_marketplace_update',
                label: 'Update',
                route: '/app/expert-marketplace/expetises/:marketplaceId?',
                action: 'update',
              },
              {
                fieldName: 'expert_marketplace_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'EXPERT_MARKETPLACE_ALL',
            action: 'view',
          },
          {
            label: 'Expertise Client',
            children: [
              {
                fieldName: 'expertise_client_list',
                label: 'View',
                route:
                  '/app/expert-marketplace/expetises/:expertiseId/:expertiseName',
                action: 'view',
              },
              {
                fieldName: 'expertise_client_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'EXPERTISE_CLIENT_ALL',
            action: 'view',
          },
          {
            label: 'Expertise Review',
            children: [
              {
                fieldName: 'expertise_review_list',
                label: 'View',
                route: '/app/expert-marketplace/review',
                action: 'view',
              },
              {
                fieldName: 'expertise_review_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'expertise_review_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'expertise_review_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'EXPERTISE_REVIEW_ALL',
            action: 'view',
          },
        ],
      },
      {
        label: 'Product Launcher',
        fieldName: 'PRODUCT_ALL',
        children: [
          {
            fieldName: 'product_list',
            label: 'View',
            route: '/app/product-launcher/:productId?',
            action: 'view',
          },
          {
            fieldName: 'product_create',
            label: 'Create',
            action: 'create',
          },
          {
            fieldName: 'product_update',
            label: 'Update',
            route: '/app/product-launcher/edit/:productId?',
            action: 'update',
          },
          {
            fieldName: 'product_delete',
            label: 'Delete',
            action: 'delete',
          },
        ],
      },
      {
        label: 'Job',
        fieldName: 'JOB',
        children: [
          {
            label: 'Job',
            children: [
              {
                fieldName: 'job_list',
                label: 'View',
                route: '/app/jobs',
                action: 'view',
              },
              {
                fieldName: 'job_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'job_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'job_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'JOB_ALL',
            action: 'view',
          },
          {
            label: 'Job Review',
            children: [
              {
                fieldName: 'job_review_list',
                label: 'View',
                route: '/app/job/review',
                action: 'view',
              },
              {
                fieldName: 'job_review_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'job_review_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'job_review_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'JOB_REVIEW_ALL',
            action: 'view',
          },
        ],
      },

      {
        label: 'Managements',
        fieldName: 'MANAGEMENTS',
        children: [
          {
            label: 'Permission',
            children: [
              {
                fieldName: 'permission_list',
                label: 'View',
                route: '/app/managements/permission',
                action: 'view',
              },
              {
                fieldName: 'permission_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'permission_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'permission_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'PERMISSION_ALL',
            action: 'view',
          },
          {
            label: 'AI Prompt',
            children: [
              {
                fieldName: 'ai_prompt_list',
                label: 'View',
                route: '/app/managements/ai-prompt',
                action: 'view',
              },
              {
                fieldName: 'ai_prompt_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'ai_prompt_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'ai_prompt_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'AI_PROMPT_ALL',
            action: 'view',
          },
          {
            label: 'AI Prompt Type',
            children: [
              {
                fieldName: 'ai_prompt_type_list',
                label: 'View',
                route: '/app/managements/ai-prompt-type',
                action: 'view',
              },
              {
                fieldName: 'ai_prompt_type_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'ai_prompt_type_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'ai_prompt_type_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'AI_PROMPT_TYPE_ALL',
            action: 'view',
          },
          {
            label: 'Translation',
            fieldName: 'TRANSLATION',
            children: [
              {
                label: 'Translation Project',
                children: [
                  {
                    fieldName: 'translation_project_list',
                    label: 'View',
                    route: '/app/managements/translation',
                    action: 'view',
                  },
                  {
                    fieldName: 'translation_project_create',
                    label: 'Create',
                    action: 'create',
                  },
                  {
                    fieldName: 'translation_project_update',
                    label: 'Update',
                    action: 'update',
                  },
                  {
                    fieldName: 'translation_project_delete',
                    label: 'Delete',
                    action: 'delete',
                  },
                ],
                fieldName: 'TRANSLATION_PROJECT_ALL',
                action: 'view',
              },
              {
                label: 'Translation Key',
                children: [
                  {
                    fieldName: 'translation_key_list',
                    label: 'View',
                    route: '/app/managements/translation/translation-key',
                    action: 'view',
                  },
                  {
                    fieldName: 'translation_key_create',
                    label: 'Create',
                    action: 'create',
                  },
                  {
                    fieldName: 'translation_key_update',
                    label: 'Update',
                    action: 'update',
                  },
                  {
                    fieldName: 'translation_key_delete',
                    label: 'Delete',
                    action: 'delete',
                  },
                ],
                fieldName: 'TRANSLATION_KEY_ALL',
                action: 'view',
              },
              {
                label: 'Translation Language',
                children: [
                  {
                    fieldName: 'trans_language_list',
                    label: 'View',
                    route: '/app/managements/translation/translation-language',
                    action: 'view',
                  },
                  {
                    fieldName: 'trans_language_create',
                    label: 'Add',
                    action: 'create',
                  },
                  {
                    fieldName: 'trans_language_update',
                    label: 'Update',
                    action: 'update',
                  },
                  {
                    fieldName: 'trans_language_translate',
                    label: 'Translate',
                    action: 'translate',
                  },
                  {
                    fieldName: 'trans_language_delete',
                    label: 'Delete',
                    action: 'delete',
                  },
                ],
                fieldName: 'TRANS_LANGUAGE_ALL',
                action: 'view',
              },
            ],
          },
          // notification
          {
            label: 'Notification',
            children: [
              {
                fieldName: 'notification_list',
                label: 'View',
                route: '/app/managements/notification',
                action: 'view',
              },
              {
                fieldName: 'notification_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'notification_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'notification_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'NOTIFICATION_ALL',
            action: 'view',
          },
          // walkthrough_category
          {
            label: 'Walkthrough Category',
            children: [
              {
                fieldName: 'walkthrough_category_list',
                label: 'View',
                route: '/app/managements/walkthrough_category',
                action: 'view',
              },
              {
                fieldName: 'walkthrough_category_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'walkthrough_category_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'walkthrough_category_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'WALKTHROUGH_CATEGORY_ALL',
            action: 'view',
          },
          // walkthrough_step
          {
            label: 'Walkthrough Step',
            children: [
              {
                fieldName: 'walkthrough_step_list',
                label: 'View',
                route: '/app/managements/walkthrough_step',
                action: 'view',
              },
              {
                fieldName: 'walkthrough_step_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'walkthrough_step_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'walkthrough_step_delete',
                label: 'Delete',
                action: 'delete',
              },
              {
                fieldName: 'walkthrough_step_order',
                label: 'Order',
                action: 'order',
              },
            ],
            fieldName: 'WALKTHROUGH_STEP_ALL',
            action: 'view',
          },
        ],
      },
      {
        label: 'Options',
        fieldName: 'OPTIONS',
        children: [
          {
            label: 'Basic Type Category',
            children: [
              {
                fieldName: 'basic_type_category_list',
                label: 'View',
                route: '/app/options/basic-type-category',
                action: 'view',
              },
              {
                fieldName: 'basic_type_category_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'basic_type_category_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'basic_type_category_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'BASIC_TYPE_CATEGORY_ALL',
            action: 'view',
          },
          {
            label: 'Basic Type',
            children: [
              {
                fieldName: 'basic_type_list',
                label: 'View',
                route: '/app/options/basic-type',
                action: 'view',
              },
              {
                fieldName: 'basic_type_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'basic_type_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'basic_type_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'BASIC_TYPE_ALL',
            action: 'view',
          },
          {
            label: 'Expertise Category',
            children: [
              {
                fieldName: 'expertise_category_list',
                label: 'View',
                route: '/app/options/expertise-category',
                action: 'view',
              },
              {
                fieldName: 'expertise_category_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'expertise_category_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'expertise_category_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'EXPERTISE_CATEGORY_ALL',
            action: 'view',
          },
          {
            label: 'Product Tag',
            children: [
              {
                fieldName: 'product_tag_list',
                label: 'View',
                route: '/app/options/project-tags',
                action: 'view',
              },
              {
                fieldName: 'product_tag_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'product_tag_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'product_tag_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'PRODUCT_TAG_ALL',
            action: 'view',
          },
          {
            label: 'Language',
            children: [
              {
                fieldName: 'language_list',
                label: 'View',
                route: '/app/options/language',
                action: 'view',
              },
              {
                fieldName: 'language_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'language_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'language_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'LANGUAGE_ALL',
            action: 'view',
          },
          {
            label: 'Language Level',
            children: [
              {
                fieldName: 'language_level_list',
                label: 'View',
                route: '/app/options/language-level',
                action: 'view',
              },
              {
                fieldName: 'language_level_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'language_level_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'language_level_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'LANGUAGE_LEVEL_ALL',
            action: 'view',
          },
          {
            label: 'Translation Language',
            children: [
              {
                fieldName: 'translation_language_list',
                label: 'View',
                route: '/app/options/translation-language',
                action: 'view',
              },
              {
                fieldName: 'translation_language_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'translation_language_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'translation_language_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'TRANSLATION_LANGUAGE_ALL',
            action: 'view',
          },
          {
            label: 'Country',
            children: [
              {
                fieldName: 'country_list',
                label: 'View',
                route: '/app/options/country',
                action: 'view',
              },
              {
                fieldName: 'country_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'country_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'country_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'COUNTRY_ALL',
            action: 'view',
          },
          {
            label: 'Nationality',
            children: [
              {
                fieldName: 'nationality_list',
                label: 'View',
                route: '/app/options/nationality',
                action: 'view',
              },
              {
                fieldName: 'nationality_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'nationality_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'nationality_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'NATIONALITY_ALL',
            action: 'view',
          },
          {
            label: 'Currency',
            children: [
              {
                fieldName: 'currency_list',
                label: 'View',
                route: '/app/options/currency',
                action: 'view',
              },
              {
                fieldName: 'currency_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'currency_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'currency_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'CURRENCY_ALL',
            action: 'view',
          },
          {
            label: 'Timezone',
            children: [
              {
                fieldName: 'timezone_list',
                label: 'View',
                route: '/app/options/timezone',
                action: 'view',
              },
              {
                fieldName: 'timezone_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'timezone_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'timezone_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'TIMEZONE_ALL',
            action: 'view',
          },
          {
            label: 'Social',
            children: [
              {
                fieldName: 'social_list',
                label: 'View',
                route: '/app/options/social',
                action: 'view',
              },
              {
                fieldName: 'social_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'social_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'social_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'SOCIAL_ALL',
            action: 'view',
          },
          {
            label: 'Goal',
            children: [
              {
                fieldName: 'goal_list',
                label: 'View',
                route: '/app/options/goal',
                action: 'view',
              },
              {
                fieldName: 'goal_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'goal_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'goal_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'GOAL_ALL',
            action: 'view',
          },
          {
            label: 'Badge',
            children: [
              {
                fieldName: 'badge_list',
                label: 'View',
                route: '/app/options/badge',
                action: 'view',
              },
              {
                fieldName: 'badge_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'badge_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'badge_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'BADGE_ALL',
            action: 'view',
          },
          {
            label: 'Contest Category',
            children: [
              {
                fieldName: 'contest_category_list',
                label: 'View',
                route: '/app/options/contest-category',
                action: 'view',
              },
              {
                fieldName: 'contest_category_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'contest_category_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'contest_category_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'CONTEST_CATEGORY_ALL',
            action: 'view',
          },
          {
            label: 'Contest Category Criteria',
            children: [
              {
                fieldName: 'contest_category_criteria_list',
                label: 'View',
                route: '/app/options/contest-category-criteria',
                action: 'view',
              },
              {
                fieldName: 'contest_category_criteria_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'contest_category_criteria_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'contest_category_criteria_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'CONTEST_CATEGORY_CRITERIA_ALL',
            action: 'view',
          },
          {
            label: 'Course Category',
            children: [
              {
                fieldName: 'course_category_list',
                label: 'View',
                route: '/app/options/course-category',
                action: 'view',
              },
              {
                fieldName: 'course_category_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'course_category_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'course_category_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'COURSE_CATEGORY_ALL',
            action: 'view',
          },
          {
            label: 'Product Category',
            children: [
              {
                fieldName: 'product_category_list',
                label: 'View',
                route: '/app/options/product-category',
                action: 'view',
              },
              {
                fieldName: 'product_category_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'product_category_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'product_category_delete',
                label: 'Delete',
                action: 'delete',
              },
              {
                fieldName: 'product_category_order',
                label: 'Order',
                action: 'order',
              },
            ],
            fieldName: 'PRODUCT_CATEGORY_ALL',
            action: 'view',
          },
          {
            label: 'Product SubCategory',
            children: [
              {
                fieldName: 'product_subcategory_list',
                label: 'View',
                route: '/app/options/product-subcategory',
                action: 'view',
              },
              {
                fieldName: 'product_subcategory_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'product_subcategory_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'product_subcategory_delete',
                label: 'Delete',
                action: 'delete',
              },
              {
                fieldName: 'product_subcategory_order',
                label: 'Order',
                action: 'order',
              },
            ],
            fieldName: 'PRODUCT_SUBCATEGORY_ALL',
            action: 'view',
          },
          {
            label: 'Product Innovation Category',
            children: [
              {
                fieldName: 'product_innovation_category_list',
                label: 'View',
                route: '/app/options/product-innovation-category',
                action: 'view',
              },
              {
                fieldName: 'product_innovation_category_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'product_innovation_category_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'product_innovation_category_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'PRODUCT_INNOVATION_CATEGORY_ALL',
            action: 'view',
          },
          {
            label: 'Product Tech Category',
            children: [
              {
                fieldName: 'product_tech_category_list',
                label: 'View',
                route: '/app/options/product-tech-category',
                action: 'view',
              },
              {
                fieldName: 'product_tech_category_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'product_tech_category_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'product_tech_category_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'PRODUCT_TECH_CATEGORY_ALL',
            action: 'view',
          },
          {
            label: 'Product SubCategory Category',
            children: [
              {
                fieldName: 'product_subcategory_faq_list',
                label: 'View',
                route: '/app/options/product-subcategory-faq',
                action: 'view',
              },
              {
                fieldName: 'product_subcategory_faq_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'product_subcategory_faq_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'product_subcategory_faq_delete',
                label: 'Delete',
                action: 'delete',
              },
              {
                fieldName: 'product_subcategory_faq_order',
                label: 'Order',
                action: 'order',
              },
            ],
            fieldName: 'PRODUCT_SUBCATEGORY_FAQ_ALL',
            action: 'view',
          },
          {
            label: 'Marketplace Category',
            children: [
              {
                fieldName: 'marketplace_category_list',
                label: 'View',
                route: '/app/options/marketplace_category',
                action: 'view',
              },
              {
                fieldName: 'marketplace_category_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'marketplace_category_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'marketplace_category_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'MARKETPLACE_CATEGORY_ALL',
            action: 'view',
          },
          {
            label: 'Workspace Category',
            children: [
              {
                fieldName: 'workspace_category_list',
                label: 'View',
                route: '/app/options/workspace_category',
                action: 'view',
              },
              {
                fieldName: 'workspace_category_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'workspace_category_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'workspace_category_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'WORKSPACE_CATEGORY_ALL',
            action: 'view',
          },
          {
            label: 'Workspace Category Card',
            children: [
              {
                fieldName: 'workspace_category_card_list',
                label: 'View',
                route: '/app/options/workspace_category_card',
                action: 'view',
              },
              {
                fieldName: 'workspace_category_card_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'workspace_category_card_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'workspace_category_card_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'WORKSPACE_CATEGORY_CARD_ALL',
            action: 'view',
          },
          {
            label: 'Skill',
            children: [
              {
                fieldName: 'skill_list',
                label: 'View',
                route: '/app/options/skill',
                action: 'view',
              },
              {
                fieldName: 'skill_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'skill_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'skill_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'SKILL_ALL',
            action: 'view',
          },
          {
            label: 'Article',
            children: [
              {
                fieldName: 'article_list',
                label: 'View',
                route: '/app/options/article',
                action: 'view',
              },
              {
                fieldName: 'article_create',
                label: 'Create',
                action: 'create',
              },
              {
                fieldName: 'article_update',
                label: 'Update',
                action: 'update',
              },
              {
                fieldName: 'article_delete',
                label: 'Delete',
                action: 'delete',
              },
            ],
            fieldName: 'ARTICLE_ALL',
            action: 'view',
          },
        ],
      },
    ],
  },
];

export default permissions;
