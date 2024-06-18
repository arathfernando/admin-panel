import { Button } from 'antd';
import React, { useState } from 'react';
import MarketplaceCategoryTable from './MarketplaceCategoryTable';

import usePermission from '../../../../hooks/usePermission';
import CreateMarketplaceCategory from './CreateMarketplaceCategory';

const MarketplaceCategorysList = () => {
  const [openCreateMarketplaceCategory, setOpenCreateMarketplaceCategory] =
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
            Marketplace Categories
          </h2>
          <Button
            type="primary mb-3"
            onClick={() => setOpenCreateMarketplaceCategory(true)}
            disabled={!hasCreatePermission}
          >
            + Create Marketplace Category
          </Button>
        </div>

        <MarketplaceCategoryTable />
      </div>

      <CreateMarketplaceCategory
        open={openCreateMarketplaceCategory}
        onCancel={() => setOpenCreateMarketplaceCategory(false)}
      />
    </>
  );
};

export default MarketplaceCategorysList;
