import { Button } from 'antd';
import React, { useState } from 'react';
import ProductSubCategoryTable from './ProductSubCategoryTable';

import usePermission from '../../../../hooks/usePermission';
import CreateProductSubCategory from './CreateProductSubCategory';

const ProductSubCategorysList = () => {
  const [openCreateProductSubCategory, setOpenCreateProductSubCategory] =
    useState(false);

  const { hasCreatePermission } = usePermission();

  return (
    <>
      <div
        style={{ padding: '50px 3%', background: 'white' }}
        className="custom_styles"
      >
        <div className="d-flex justify-content-between flex-wrap">
          <h2 className="hb-text-primary fs-36 fw-8 mb-4">
            Product SubCategories
          </h2>
          <Button
            type="primary mb-3"
            onClick={() => setOpenCreateProductSubCategory(true)}
            disabled={!hasCreatePermission}
          >
            + Create Product SubCategory
          </Button>
        </div>

        <ProductSubCategoryTable />
      </div>

      <CreateProductSubCategory
        open={openCreateProductSubCategory}
        onCancel={() => setOpenCreateProductSubCategory(false)}
      />
    </>
  );
};

export default ProductSubCategorysList;
