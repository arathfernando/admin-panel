import { Button } from 'antd';
import React, { useState } from 'react';
import ProductTechCategoryTable from './ProductTechCategoryTable';

import usePermission from '../../../../hooks/usePermission';
import CreateProductTechCategory from './CreateProductTechCategory';

const ProductTechCategorysList = () => {
  const [openCreateProductTechCategory, setOpenCreateProductTechCategory] =
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
            Product Tech Categories
          </h2>
          <Button
            type="primary mb-3"
            onClick={() => setOpenCreateProductTechCategory(true)}
            disabled={!hasCreatePermission}
          >
            + Create Product Tech Category
          </Button>
        </div>

        <ProductTechCategoryTable />
      </div>

      <CreateProductTechCategory
        open={openCreateProductTechCategory}
        onCancel={() => setOpenCreateProductTechCategory(false)}
      />
    </>
  );
};

export default ProductTechCategorysList;
