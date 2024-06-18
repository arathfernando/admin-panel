import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Permission from '../Permission';
import ContestCategoryCriteriasList from './ContestCategoryCriteria/ContestCategoryCriteriaList';
import ArticlesList from './article/ArticleList';
import ContestCategory from './contest-category';
import CourseCategorysList from './courseCategory/CourseCategoryList';
import MarketplaceCategorysList from './marketplaceCategory/MarketplaceCategoryList';
import NationalitiesList from './nationality/NationalityList';
import ProductCategorysList from './productCategory/ProductCategoryList';
import ProductInnovationCategorysList from './productInnovationCategory/ProductInnovationCategoryList';
import ProductSubCategorysList from './productSubCategory/ProductSubCategoryList';
import ProductSubCategoryFAQsList from './productSubCategoryFAQ/ProductSubCategoryFAQList';
import ProductTechCategorysList from './productTechCategory/ProductTechCategoryList';
import SkillsList from './skill/SkillList';
import WorkspaceCategorysList from './workspaceCategory/WorkspaceCategoryList';
import WorkspaceCategoryCardsList from './workspaceCategoryCard/WorkspaceCategoryCardsList';

const BasicType = React.lazy(() => import('./basic-type'));

const BasicTypeCategory = React.lazy(() => import('./basic-type-category'));

const ExpertiseCategory = React.lazy(() => import('./expertise-category'));

const ProjectTags = React.lazy(() => import('./project-tags'));

const Language = React.lazy(() => import('./language'));

const LanguageLevel = React.lazy(() => import('./language-level'));

const TranslationLanguage = React.lazy(() => import('./translation-language'));

const Country = React.lazy(() => import('./country'));

const Currency = React.lazy(() => import('./currency'));

const Timezone = React.lazy(() => import('./timezone'));

const Social = React.lazy(() => import('./social'));

const Goal = React.lazy(() => import('./goal'));
const Badge = React.lazy(() => import('./badge/BadgeList'));

const Options = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/basic-type`} />

      <Route
        path={`${match.url}/basic-type-category`}
        render={(props) => (
          <Permission>
            <BasicTypeCategory {...props} />
          </Permission>
        )}
      />

      <Route
        path={`${match.url}/basic-type`}
        render={(props) => (
          <Permission>
            <BasicType {...props} />
          </Permission>
        )}
      />

      <Route
        path={`${match.url}/expertise-category`}
        render={(props) => (
          <Permission>
            <ExpertiseCategory {...props} />
          </Permission>
        )}
      />

      <Route
        path={`${match.url}/project-tags`}
        render={(props) => (
          <Permission>
            <ProjectTags {...props} />
          </Permission>
        )}
      />

      <Route
        path={`${match.url}/language`}
        render={(props) => (
          <Permission>
            <Language {...props} />
          </Permission>
        )}
      />

      <Route
        path={`${match.url}/language-level`}
        render={(props) => (
          <Permission>
            <LanguageLevel {...props} />
          </Permission>
        )}
      />

      <Route
        path={`${match.url}/translation-language`}
        render={(props) => (
          <Permission>
            <TranslationLanguage {...props} />
          </Permission>
        )}
      />

      <Route
        path={`${match.url}/country`}
        render={(props) => (
          <Permission>
            <Country {...props} />
          </Permission>
        )}
      />

      <Route
        path={`${match.url}/currency`}
        render={(props) => (
          <Permission>
            <Currency {...props} />
          </Permission>
        )}
      />

      <Route
        path={`${match.url}/timezone`}
        render={(props) => (
          <Permission>
            <Timezone {...props} />
          </Permission>
        )}
      />

      <Route
        path={`${match.url}/social`}
        render={(props) => (
          <Permission>
            <Social {...props} />
          </Permission>
        )}
      />

      <Route
        path={`${match.url}/goal`}
        render={(props) => (
          <Permission>
            <Goal {...props} />
          </Permission>
        )}
      />

      <Route
        path={`${match.url}/badge`}
        render={(props) => (
          <Permission>
            <Badge {...props} />
          </Permission>
        )}
      />

      <Route
        path={`${match.url}/contest-category`}
        render={(props) => (
          <Permission>
            <ContestCategory {...props} />
          </Permission>
        )}
      />

      <Route
        path={`${match.url}/contest-category-criteria`}
        render={(props) => (
          <Permission>
            <ContestCategoryCriteriasList {...props} />
          </Permission>
        )}
      />

      <Route
        path={`${match.url}/course-category`}
        render={(props) => (
          <Permission>
            <CourseCategorysList {...props} />
          </Permission>
        )}
      />

      <Route
        path={`${match.url}/product-category`}
        render={(props) => (
          <Permission>
            <ProductCategorysList {...props} />
          </Permission>
        )}
      />

      <Route
        path={`${match.url}/product-subcategory`}
        render={(props) => (
          <Permission>
            <ProductSubCategorysList {...props} />
          </Permission>
        )}
      />

      <Route
        path={`${match.url}/product-innovation-category`}
        render={(props) => (
          <Permission>
            <ProductInnovationCategorysList {...props} />
          </Permission>
        )}
      />

      <Route
        path={`${match.url}/product-tech-category`}
        render={(props) => (
          <Permission>
            <ProductTechCategorysList {...props} />
          </Permission>
        )}
      />

      <Route
        path={`${match.url}/product-subcategory-faq`}
        render={(props) => (
          <Permission>
            <ProductSubCategoryFAQsList {...props} />
          </Permission>
        )}
      />

      <Route
        path={`${match.url}/marketplace_category`}
        render={(props) => (
          <Permission>
            <MarketplaceCategorysList {...props} />
          </Permission>
        )}
      />

      <Route
        path={`${match.url}/workspace_category`}
        render={(props) => (
          <Permission>
            <WorkspaceCategorysList {...props} />
          </Permission>
        )}
      />

      <Route
        path={`${match.url}/workspace_category_card`}
        render={(props) => (
          <Permission>
            <WorkspaceCategoryCardsList {...props} />
          </Permission>
        )}
      />

      <Route
        path={`${match.url}/skill`}
        render={(props) => (
          <Permission>
            <SkillsList {...props} />
          </Permission>
        )}
      />

      <Route
        path={`${match.url}/nationality`}
        render={(props) => (
          <Permission>
            <NationalitiesList {...props} />
          </Permission>
        )}
      />

      <Route
        exac
        path={`${match.url}/article`}
        render={(props) => (
          <Permission>
            <ArticlesList {...props} />
          </Permission>
        )}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Options;
