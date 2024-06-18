import { Button } from 'antd';
import React, { useState } from 'react';
import ExpertiseReviewTable from './ExpertiseReviewTable';

import usePermission from '../../../../hooks/usePermission';
import CreateExpertiseReview from './CreateExpertiseReview';

const ExpertiseReviewsList = () => {
  const [openCreateExpertiseReview, setOpenCreateExpertiseReview] =
    useState(false);

  const { hasCreatePermission } = usePermission();

  return (
    <>
      <div
        style={{ padding: '50px 3%', background: 'white' }}
        className="custom_styles"
      >
        <div className="d-flex justify-content-between flex-wrap">
          <h2 className="hb-text-primary fs-36 fw-8 mb-4">Expertise Reviews</h2>
          <Button
            type="primary mb-3"
            onClick={() => setOpenCreateExpertiseReview(true)}
            disabled={!hasCreatePermission}
          >
            + Create Expertise Review
          </Button>
        </div>

        <ExpertiseReviewTable />
      </div>

      <CreateExpertiseReview
        open={openCreateExpertiseReview}
        onCancel={() => setOpenCreateExpertiseReview(false)}
      />
    </>
  );
};

export default ExpertiseReviewsList;
