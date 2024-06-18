import { Button } from 'antd';
import React, { useState } from 'react';
import MasterclassReviewTable from './MasterclassReviewTable';

import usePermission from '../../../../hooks/usePermission';
import CreateMasterclassReview from './CreateMasterclassReview';

const MasterclassReviewsList = () => {
  const [openCreateMasterclassReview, setOpenCreateMasterclassReview] =
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
            Masterclass Reviews
          </h2>
          <Button
            type="primary mb-3"
            onClick={() => setOpenCreateMasterclassReview(true)}
            disabled={!hasCreatePermission}
          >
            + Create Masterclass Review
          </Button>
        </div>

        <MasterclassReviewTable />
      </div>

      <CreateMasterclassReview
        open={openCreateMasterclassReview}
        onCancel={() => setOpenCreateMasterclassReview(false)}
      />
    </>
  );
};

export default MasterclassReviewsList;
