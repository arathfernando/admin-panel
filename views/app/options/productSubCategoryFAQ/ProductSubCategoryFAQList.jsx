/* eslint-disable camelcase */
import { Button, Form, Select } from 'antd';
import { useWatch } from 'antd/lib/form/Form';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductSubCategoryFAQTable from './ProductSubCategoryFAQTable';

import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';
import CreateProductSubCategoryFAQ from './CreateProductSubCategoryFAQ';

const ProductSubCategoryFAQsList = () => {
  const { data: productCategories, loading: productCategoriesLoading } =
    useSelector(({ productCategory }) => productCategory.productCategories);
  const { data: productSubCategories, loading: productSubCategoriesLoading } =
    useSelector(
      ({ productSubCategory }) => productSubCategory.productSubCategories
    );

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const product_category = useWatch('product_category', form);

  const { hasCreatePermission } = usePermission();

  const productSubCategoriesByCategory = useMemo(
    () =>
      product_category
        ? productSubCategories?.filter?.(
            (data) => data?.product_category?.id === product_category
          )
        : productSubCategories,
    [productSubCategories, product_category]
  );

  const [openCreateProductSubCategoryFAQ, setOpenCreateProductSubCategoryFAQ] =
    useState(false);

  useEffect(() => {
    dispatch(Actions.getProductCategories());
    dispatch(Actions.getProductSubCategories());
  }, [dispatch]);

  return (
    <>
      <div
        style={{ padding: '50px 3%', background: 'white' }}
        className="custom_styles"
      >
        <div className="d-flex  flex-wrap" style={{ gap: 24 }}>
          <h2 className="hb-text-primary fs-36 fw-8 mb-4">
            Product SubCategory FAQ
          </h2>
          <Form
            form={form}
            layout="vertical"
            className="custom-form-style flex-grow-1"
          >
            <div className="d-flex flex-wrap" style={{ gap: 18 }}>
              <Form.Item
                name="product_category"
                style={{ marginBottom: 0, minWidth: 150 }}
              >
                <Select
                  allowClear
                  placeholder="product_category"
                  loading={productCategoriesLoading}
                  optionFilterProp="label"
                  options={productCategories?.map?.(
                    ({ id: value, name: label }) => ({
                      value,
                      label,
                    })
                  )}
                />
              </Form.Item>
              <Form.Item
                name="product_subcategory"
                style={{ marginBottom: 0, minWidth: 170 }}
              >
                <Select
                  placeholder="Product subcategory"
                  mode="multiple"
                  loading={productSubCategoriesLoading}
                  optionFilterProp="label"
                  options={productSubCategoriesByCategory?.map?.(
                    ({ id: value, name: label }) => ({
                      value,
                      label,
                    })
                  )}
                />
              </Form.Item>
              <Form.Item
                name="faq_percentage"
                style={{ marginBottom: 0, minWidth: 100 }}
              >
                <Select
                  placeholder="Percentage"
                  mode="multiple"
                  optionFilterProp="label"
                  options={[
                    {
                      label: '1% - 10%',
                      value: 1,
                    },
                    {
                      label: '11% - 20%',
                      value: 11,
                    },
                    {
                      label: '21% - 30%',
                      value: 21,
                    },
                    {
                      label: '31% - 40%',
                      value: 31,
                    },
                    {
                      label: '41% - 50%',
                      value: 41,
                    },
                    {
                      label: '51% - 60%',
                      value: 51,
                    },
                    {
                      label: '61% - 70%',
                      value: 61,
                    },
                    {
                      label: '71% - 80%',
                      value: 71,
                    },
                    {
                      label: '81% - 90%',
                      value: 81,
                    },
                    {
                      label: '91% - 100%',
                      value: 91,
                    },
                  ]}
                />
              </Form.Item>
            </div>
          </Form>
          <Button
            type="primary mb-3"
            onClick={() => setOpenCreateProductSubCategoryFAQ(true)}
            disabled={!hasCreatePermission}
          >
            + Create Product SubCategory FAQ
          </Button>
        </div>

        <ProductSubCategoryFAQTable form={form} />
      </div>

      <CreateProductSubCategoryFAQ
        open={openCreateProductSubCategoryFAQ}
        onCancel={() => setOpenCreateProductSubCategoryFAQ(false)}
      />
    </>
  );
};

export default ProductSubCategoryFAQsList;
