import { Button } from 'antd';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ExpertMarketplaceTable from './ExpertMarketplaceTable';

import usePermission from '../../../hooks/usePermission';
import ExpertiseCreateEdit from './ExpertMarketplaceCreateEdit.jsx';

const ExpertMarketplacesList = () => {
  const [openCreateExpertMarketplace, setOpenCreateExpertMarketplace] =
    useState(false);

  const { hasCreatePermission } = usePermission();

  const history = useHistory();

  return (
    <>
      <div
        style={{ padding: '50px 3%', background: 'white' }}
        className="custom_styles"
      >
        <div className="d-flex justify-content-between flex-wrap">
          <h2 className="hb-text-primary fs-36 fw-8 mb-4">
            Expert Marketplace
          </h2>
          <Button
            type="primary mb-3"
            onClick={() => {
              setOpenCreateExpertMarketplace(true);
              history.push(`/app/expert-marketplace/expetises`);
            }}
            disabled={!hasCreatePermission}
          >
            + Create expertise
          </Button>
        </div>

        <ExpertMarketplaceTable />
      </div>

      <ExpertiseCreateEdit
        data={{}}
        open={openCreateExpertMarketplace}
        onClose={() => setOpenCreateExpertMarketplace(false)}
      />
    </>
  );
};

export default ExpertMarketplacesList;
