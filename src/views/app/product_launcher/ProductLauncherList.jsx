import { Button } from 'antd';
import React, { useState } from 'react';
import ProductLauncherTable from './ProductLauncherTable';

import usePermission from '../../../hooks/usePermission';
import CreateProductLauncher from './CreateProductLauncher';

const ProductLaunchersList = () => {
  const [openCreateProductLauncher, setOpenCreateProductLauncher] =
    useState(false);

  const { hasCreatePermission } = usePermission();

  return (
    <>
      <div
        style={{ padding: '50px 3%', background: 'white' }}
        className="custom_styles"
      >
        <div className="d-flex justify-content-between flex-wrap">
          <h2 className="hb-text-primary fs-36 fw-8 mb-4">Product Launchers</h2>
          <Button
            type="primary mb-3"
            onClick={() => setOpenCreateProductLauncher(true)}
            disabled={!hasCreatePermission}
          >
            + Create Project
          </Button>
        </div>

        <ProductLauncherTable />
      </div>

      <CreateProductLauncher
        open={openCreateProductLauncher}
        onCancel={() => setOpenCreateProductLauncher(false)}
      />
    </>
  );
};

export default ProductLaunchersList;
