import { Button } from 'antd';
import React, { useState } from 'react';
import ProductInnovationCategoryTable from './ProductInnovationCategoryTable';

import usePermission from '../../../../hooks/usePermission';
import CreateProductInnovationCategory from './CreateProductInnovationCategory';

const ProductInnovationCategorysList = () => {
  const [
    openCreateProductInnovationCategory,
    setOpenCreateProductInnovationCategory,
  ] = useState(false);

  const { hasCreatePermission } = usePermission();

  return (
    <>
      <div
        style={{ padding: '50px 3%', background: 'white' }}
        className="custom_styles"
      >
        <div className="d-flex justify-content-between flex-wrap">
          <h2 className="hb-text-primary fs-36 fw-8 mb-4">
            Product Innovation Categories
          </h2>
          <Button
            type="primary mb-3"
            onClick={() => setOpenCreateProductInnovationCategory(true)}
            disabled={!hasCreatePermission}
          >
            + Create Product Innovation Category
          </Button>
        </div>

        <ProductInnovationCategoryTable />
      </div>

      <CreateProductInnovationCategory
        open={openCreateProductInnovationCategory}
        onCancel={() => setOpenCreateProductInnovationCategory(false)}
      />
    </>
  );
};

export default ProductInnovationCategorysList;
