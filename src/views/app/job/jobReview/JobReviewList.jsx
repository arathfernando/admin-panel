import { Button } from 'antd';
import React, { useState } from 'react';
import JobReviewTable from './JobReviewTable';

import usePermission from '../../../../hooks/usePermission';
import CreateJobReview from './CreateJobReview';

const JobReviewsList = () => {
  const [openCreateJobReview, setOpenCreateJobReview] = useState(false);

  const { hasCreatePermission } = usePermission();

  return (
    <>
      <div
        style={{ padding: '50px 3%', background: 'white' }}
        className="custom_styles"
      >
        <div className="d-flex justify-content-between flex-wrap">
          <h2 className="hb-text-primary fs-36 fw-8 mb-4">Job Reviews</h2>
          <Button
            type="primary mb-3"
            onClick={() => setOpenCreateJobReview(true)}
            disabled={!hasCreatePermission}
          >
            + Create Job Review
          </Button>
        </div>

        <JobReviewTable />
      </div>

      <CreateJobReview
        open={openCreateJobReview}
        onCancel={() => setOpenCreateJobReview(false)}
      />
    </>
  );
};

export default JobReviewsList;
