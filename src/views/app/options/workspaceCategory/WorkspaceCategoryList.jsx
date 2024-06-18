import { Button } from 'antd';
import React, { useState } from 'react';
import WorkspaceCategoryTable from './WorkspaceCategoryTable';

import usePermission from '../../../../hooks/usePermission';
import CreateWorkspaceCategory from './CreateWorkspaceCategory';

const WorkspaceCategorysList = () => {
  const [openCreateWorkspaceCategory, setOpenCreateWorkspaceCategory] =
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
            Workspace Categories
          </h2>
          <Button
            type="primary mb-3"
            onClick={() => setOpenCreateWorkspaceCategory(true)}
            disabled={!hasCreatePermission}
          >
            + Create Workspace Category
          </Button>
        </div>

        <WorkspaceCategoryTable />
      </div>

      <CreateWorkspaceCategory
        open={openCreateWorkspaceCategory}
        onCancel={() => setOpenCreateWorkspaceCategory(false)}
      />
    </>
  );
};

export default WorkspaceCategorysList;
