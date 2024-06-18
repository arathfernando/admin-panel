import { Button } from 'antd';
import React, { useState } from 'react';
import ZoneTable from './ZoneTable';

import usePermission from '../../../../hooks/usePermission';
import CreateZone from './CreateZone';

const ZonesList = () => {
  const [openCreateZone, setOpenCreateZone] = useState(false);

  const { hasCreatePermission } = usePermission();

  return (
    <>
      <div
        style={{ padding: '50px 3%', background: 'white' }}
        className="contest-container"
      >
        <div className="d-flex justify-content-between flex-wrap">
          <h2 className="hb-text-primary fs-36 fw-8 mb-4">Zones</h2>
          <Button
            type="primary mb-3"
            onClick={() => setOpenCreateZone(true)}
            disabled={!hasCreatePermission}
          >
            + Create zone
          </Button>
        </div>

        <ZoneTable />
      </div>

      <CreateZone
        open={openCreateZone}
        onCancel={() => setOpenCreateZone(false)}
      />
    </>
  );
};

export default ZonesList;
