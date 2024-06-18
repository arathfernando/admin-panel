import { Button } from 'antd';
import React, { useState } from 'react';
import usePermission from '../../../../hooks/usePermission';
import CreateArea from './CreateArea';
import WorldwideSharesTable from './WorldwideSharesTable';

const WorldwideShares = () => {
  const [openCreateArea, setOpenCreateArea] = useState(false);

  const { hasCreatePermission } = usePermission();

  return (
    <>
      <div style={{ padding: '50px 3%', background: 'white' }}>
        <div className="d-flex justify-content-between flex-wrap">
          <h2 className="hb-text-primary fs-36 fw-8 mb-4">
            Worldwide Hubbers shares
          </h2>
          <Button
            type="primary mb-3"
            onClick={() => setOpenCreateArea(true)}
            disabled={!hasCreatePermission}
          >
            + Create area
          </Button>
        </div>

        <WorldwideSharesTable />
      </div>

      <CreateArea
        open={openCreateArea}
        onCancel={() => setOpenCreateArea(false)}
      />
    </>
  );
};

export default WorldwideShares;
