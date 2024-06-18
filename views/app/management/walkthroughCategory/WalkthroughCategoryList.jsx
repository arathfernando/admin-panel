import { Button } from 'antd';
import React, { useState } from 'react';
import usePermission from '../../../../hooks/usePermission';
import WalkthroughCategoryTable from './WalkthroughCategoryTable';

import SubmitWalkthroughCategory from './SubmitWalkthroughCategory';

const WalkthroughCategorysList = () => {
  const [openCreateWalkthroughCategory, setOpenCreateWalkthroughCategory] =
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
            Walkthrough Categorys
          </h2>
          <Button
            type="primary mb-3"
            onClick={() => setOpenCreateWalkthroughCategory(true)}
            disabled={!hasCreatePermission}
          >
            + Create Walkthrough Category
          </Button>
        </div>

        <WalkthroughCategoryTable />
      </div>

      <SubmitWalkthroughCategory
        open={openCreateWalkthroughCategory}
        onCancel={() => setOpenCreateWalkthroughCategory(false)}
      />
    </>
  );
};

export default WalkthroughCategorysList;
