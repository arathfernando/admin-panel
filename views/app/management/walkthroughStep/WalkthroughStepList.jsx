import { Button } from 'antd';
import React, { useState } from 'react';
import usePermission from '../../../../hooks/usePermission';
import WalkthroughStepTable from './WalkthroughStepTable';

import SubmitWalkthroughStep from './SubmitWalkthroughStep';

const WalkthroughStepsList = () => {
  const [openCreateWalkthroughStep, setOpenCreateWalkthroughStep] =
    useState(false);

  const { hasCreatePermission } = usePermission();

  return (
    <>
      <div
        style={{ padding: '50px 3%', background: 'white' }}
        className="custom_styles"
      >
        <div className="d-flex justify-content-between flex-wrap">
          <h2 className="hb-text-primary fs-36 fw-8 mb-4">Walkthrough Steps</h2>
          <Button
            type="primary mb-3"
            onClick={() => setOpenCreateWalkthroughStep(true)}
            disabled={!hasCreatePermission}
          >
            + Create Walkthrough Step
          </Button>
        </div>

        <WalkthroughStepTable />
      </div>

      <SubmitWalkthroughStep
        open={openCreateWalkthroughStep}
        onCancel={() => setOpenCreateWalkthroughStep(false)}
      />
    </>
  );
};

export default WalkthroughStepsList;
