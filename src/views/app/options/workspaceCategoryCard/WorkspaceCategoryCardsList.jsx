import { Button } from 'antd';
import React, { useState } from 'react';
import WorkspaceCategoryCardTable from './WorkspaceCategoryCardTable';

import usePermission from '../../../../hooks/usePermission';
import CreateWorkspaceCategoryCard from './CreateWorkspaceCategoryCard';

const WorkspaceCategoryCardsList = () => {
  const [openCreateWorkspaceCategoryCard, setOpenCreateWorkspaceCategoryCard] =
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
            Workspace Category Cards
          </h2>
          <Button
            type="primary mb-3"
            onClick={() => setOpenCreateWorkspaceCategoryCard(true)}
            disabled={!hasCreatePermission}
          >
            + Create Workspace Category Card
          </Button>
        </div>

        <WorkspaceCategoryCardTable />
      </div>

      <CreateWorkspaceCategoryCard
        open={openCreateWorkspaceCategoryCard}
        onCancel={() => setOpenCreateWorkspaceCategoryCard(false)}
      />
    </>
  );
};

export default WorkspaceCategoryCardsList;
