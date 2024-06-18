/* eslint-disable camelcase */
/* eslint-disable no-shadow */
import { Button, Drawer, Form, Input, Select } from 'antd';
import { useWatch } from 'antd/lib/form/Form';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import CKEditor5 from '../../../../components/util-components/CkEditor';
import UserSelect from '../../../../components/util-components/selector/UserSelect';
import useTranslation from '../../../../helpers/useTranslation';
import {
  getAllBasicType,
  getMarketplaceCategories,
  getProductCategories,
  getProductSubCategories,
  getProductSubCategoryFAQ,
  getWorkspaceCategories,
  submitMarketplaceOverview,
} from '../../../../redux/actions';

const Overview = ({ onNext, open, ExpertiseHeader, marketplace }) => {
  const { data: marketplaceCategories, marketplaceCategoriesLoading } =
    useSelector(
      ({ marketplaceCategory }) => marketplaceCategory.marketplaceCategories
    );

  const { list: basicTypes, loading: basicTypesLoading } = useSelector(
    (state) => state.basicType
  );

  const { data: productCategory, loading: productCategoryLoading } =
    useSelector(({ productCategory }) => productCategory.productCategories);

  const { data: productSubcategories, loading: productSubcategoriesLoading } =
    useSelector(
      ({ productSubCategory }) => productSubCategory.productSubCategories
    );

  const { data: productSubcategoryFaq, loading: productSubcategoryFaqLoading } =
    useSelector(
      ({ productSubCategoryFAQ }) => productSubCategoryFAQ.productSubCategoryFAQ
    );

  const { data: workspaces, loading: workspacesLoading } = useSelector(
    ({ workspaceCategory }) => workspaceCategory.workspaceCategories
  );

  const { status } = useSelector(
    ({ marketplace }) => marketplace.marketplaceOverviewAction
  );

  const [productCaterorySubcategories, setProductCaterorySubcategories] =
    useState([]);
  const [productSubcategoryAssessments, setProductSubcategoryAssessments] =
    useState([]);

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { marketplaceId } = useParams();

  const history = useHistory();

  const { t } = useTranslation();

  const product_category = useWatch('product_category', form);
  const product_sub_category = useWatch('product_sub_category', form);

  // pefill feilds for updating
  useEffect(() => {
    if (marketplace?.id) {
      form.setFieldsValue({
        ...marketplace,
        categories: marketplace?.categories?.map(({ id }) => id),
        created_by: marketplace?.created_by?.id,
        workspace_id: marketplace?.workspace_id?.id,
        product_category: marketplace?.product_category?.id,
        product_sub_category: marketplace?.product_sub_category?.id,
        product_sub_faq: marketplace?.product_sub_faq?.id,
      });
    } else {
      form.resetFields();
    }
  }, [form, marketplace]);

  useEffect(() => {
    dispatch(getProductCategories());
    dispatch(getProductSubCategories());
    dispatch(getProductSubCategoryFAQ());
    dispatch(getWorkspaceCategories());
  }, [dispatch]);

  // set subcategories based on selected product_category
  useEffect(() => {
    setProductCaterorySubcategories(
      productSubcategories?.filter?.(
        (data) => data.product_category?.id === product_category
      ) || []
    );
  }, [productSubcategories, product_category]);

  // set faqs based on selected product_subcategory
  useEffect(() => {
    setProductSubcategoryAssessments(
      productSubcategoryFaq?.filter?.(
        (data) => data.product_subcategory?.id === product_sub_category
      ) || []
    );
  }, [productSubcategoryFaq, product_sub_category]);

  // useEffect(() => {
  //   form.setFieldsValue({
  //     ...marketplace,
  //     categories: marketplace?.categories?.map?.(({ id }) => id),
  //     created_by: marketplace?.created_by?.id,
  //   });
  // }, [form, marketplace]);

  useEffect(() => {
    dispatch(getMarketplaceCategories());
    dispatch(getAllBasicType());
  }, [dispatch]);

  const onFinish = ({ ...values }) => {
    const payload = {
      ...values,
    };
    dispatch(
      submitMarketplaceOverview({
        ...payload,
        id: marketplaceId || marketplace?.id,
        onSuccess: ({ id }) => {
          history.push(
            `/app/expert-marketplace/expetises/${id || marketplaceId}`
          );
          onNext();
        },
      })
    );
  };
  return (
    <Drawer
      open={open}
      footer={null}
      closable={false}
      width={710}
      zIndex={999}
      contentWrapperStyle={{ maxWidth: '100vw' }}
      bodyStyle={{
        height: '100vh',
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
      }}
      className="custom_styles"
    >
      <ExpertiseHeader />
      <div className="px-5 mx-1 flex-grow-1 d-flex flex-column">
        <h3 className="h3-lg mb-4">Overview</h3>

        <Form
          layout="vertical"
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          className="custom-form-style flex-grow-1 d-flex flex-column"
        >
          <Form.Item
            name="created_by"
            rules={[{ required: true, message: 'This field is required' }]}
            label={<span className="hb-text-secondary">Created by</span>}
          >
            <UserSelect />
          </Form.Item>

          <Form.Item
            name="gig_status"
            rules={[{ required: true, message: 'This field is required' }]}
            label={<span className="hb-text-secondary">Category</span>}
            initialValue="DRAFT"
          >
            <Select
              options={[
                { value: 'PENDING', label: 'PENDING' },
                { value: 'DRAFT', label: 'DRAFT' },
                { value: 'PUBLISHED', label: 'PUBLISHED' },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="expertise_title"
            rules={[{ required: true, message: 'This field is required' }]}
            label={<span className="hb-text-secondary">Expertise title</span>}
          >
            <Input placeholder="e.g. Project 1" />
          </Form.Item>

          <Form.Item
            name="description"
            rules={[{ required: true, message: 'This field is required' }]}
            label={<span className="hb-text-secondary">Description</span>}
          >
            <CKEditor5
              rows={4}
              placeholder={t('Description of your expertise')}
            />
          </Form.Item>

          <Form.Item
            name="categories"
            rules={[{ required: true, message: 'This field is required' }]}
            label={<span className="hb-text-secondary">Category</span>}
          >
            <Select
              mode="multiple"
              optionFilterProp="label"
              options={marketplaceCategories?.map?.(
                ({ id: value, name: label }) => ({ value, label })
              )}
              loading={marketplaceCategoriesLoading}
            />
          </Form.Item>

          <Form.Item
            name="tags"
            rules={[{ required: true, message: 'This field is required' }]}
            label={<span className="hb-text-secondary">Tags</span>}
          >
            <Select
              mode="multiple"
              optionFilterProp="label"
              options={basicTypes?.map?.(({ id: value, name: label }) => ({
                value,
                label,
              }))}
              loading={basicTypesLoading}
            />
          </Form.Item>

          <Form.Item
            name="workspace_id"
            label={
              <span className="hb-text-secondary">
                {t('Choose the workspace you want to link your expertise')}
              </span>
            }
          >
            <Select
              allowClear
              showSearch
              optionFilterProp="label"
              options={workspaces?.map?.(({ id: value, title: label }) => ({
                value,
                label,
              }))}
              loading={workspacesLoading}
            />
          </Form.Item>

          <>
            <Form.Item
              name="product_category"
              label={
                <span className="hb-text-secondary">
                  {t('Choose the assessment category for your expertise')}
                </span>
              }
            >
              <Select
                allowClear
                showSearch
                optionFilterProp="label"
                options={productCategory?.map?.(
                  ({ id: value, name: label }) => ({
                    value,
                    label,
                  })
                )}
                loading={productCategoryLoading}
              />
            </Form.Item>

            <Form.Item
              name="product_sub_category"
              label={
                <span className="hb-text-secondary">
                  {t('Choose the assessment section for your expertise')}
                </span>
              }
            >
              <Select
                allowClear
                showSearch
                optionFilterProp="label"
                options={productCaterorySubcategories?.map?.(
                  ({ id: value, name: label }) => ({
                    value,
                    label,
                  })
                )}
                loading={productSubcategoriesLoading}
              />
            </Form.Item>
            <Form.Item
              name="product_sub_faq"
              label={
                <span className="hb-text-secondary">
                  {t('Choose the assessment question')}
                </span>
              }
            >
              <Select
                allowClear
                showSearch
                optionFilterProp="label"
                options={productSubcategoryAssessments?.map?.(
                  ({ id: value, question: label }) => ({
                    value,
                    label,
                  })
                )}
                loading={productSubcategoryFaqLoading}
              />
            </Form.Item>
          </>

          <div
            className="d-flex mt-auto py-4 justify-content-end"
            style={{ columnGap: 17 }}
          >
            <Button
              type="primary ml2 px-4"
              size="large"
              onClick={() => form.submit()}
              loading={status === 'submitting'}
            >
              <span className="fs-13 fw-5">Next step</span>
            </Button>
          </div>
        </Form>
      </div>
    </Drawer>
  );
};

export default Overview;
