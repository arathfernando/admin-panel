import { Button } from 'antd';
import React, { useState } from 'react';
import JobTable from './JobTable';

import usePermission from '../../../hooks/usePermission';
import CreateJob from './CreateJob';

const JobsList = () => {
  const [openCreateJob, setOpenCreateJob] = useState(false);

  const { hasCreatePermission } = usePermission();

  return (
    <>
      <div
        style={{ padding: '50px 3%', background: 'white' }}
        className="custom_styles"
      >
        <div className="d-flex justify-content-between flex-wrap">
          <h2 className="hb-text-primary fs-36 fw-8 mb-4">Jobs</h2>
          <Button
            type="primary mb-3"
            onClick={() => setOpenCreateJob(true)}
            disabled={!hasCreatePermission}
          >
            + Create Job
          </Button>
        </div>

        <JobTable />
      </div>

      <CreateJob
        open={openCreateJob}
        onCancel={() => setOpenCreateJob(false)}
      />
    </>
  );
};

export default JobsList;
