import { Button } from 'antd';
import React, { useState } from 'react';
import BadgeTable from './BadgeTable';

import usePermission from '../../../../hooks/usePermission';
import CreateBadge from './CreateBadge';

const BadgesList = () => {
  const [openCreateBadge, setOpenCreateBadge] = useState(false);

  const { hasCreatePermission } = usePermission();

  return (
    <>
      <div
        style={{ padding: '50px 3%', background: 'white' }}
        className="custom_styles"
      >
        <div className="d-flex justify-content-between flex-wrap">
          <h2 className="hb-text-primary fs-36 fw-8 mb-4">Badges</h2>
          <Button
            type="primary mb-3"
            onClick={() => setOpenCreateBadge(true)}
            disabled={!hasCreatePermission}
          >
            + Create New Badge
          </Button>
        </div>

        <BadgeTable />
      </div>

      <CreateBadge
        open={openCreateBadge}
        onCancel={() => setOpenCreateBadge(false)}
      />
    </>
  );
};

export default BadgesList;
