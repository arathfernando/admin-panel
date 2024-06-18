import { Button } from 'antd';
import React, { useState } from 'react';
import ProductCategoryTable from './ProductCategoryTable';

import usePermission from '../../../../hooks/usePermission';
import CreateProductCategory from './CreateProductCategory';

const ProductCategorysList = () => {
  const [openCreateProductCategory, setOpenCreateProductCategory] =
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
            Product Categories
          </h2>
          <Button
            type="primary mb-3"
            onClick={() => setOpenCreateProductCategory(true)}
            disabled={!hasCreatePermission}
          >
            + Create Product Category
          </Button>
        </div>

        <ProductCategoryTable />
      </div>

      <CreateProductCategory
        open={openCreateProductCategory}
        onCancel={() => setOpenCreateProductCategory(false)}
      />
    </>
  );
};

export default ProductCategorysList;
