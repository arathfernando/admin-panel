import { Button } from 'antd';
import React, { useState } from 'react';
import usePermission from '../../../../hooks/usePermission';
import MasterclassCreateEdit from './masterclassCreateEdit';
import MasterclassTable from './masterclassTable';

const MasterclasssList = () => {
  const [openCreateMasterclass, setOpenCreateMasterclass] = useState(false);

  const { hasCreatePermission } = usePermission();

  return (
    <>
      <div
        style={{ padding: '50px 3%', background: 'white' }}
        className="custom_styles"
      >
        <div className="d-flex justify-content-between flex-wrap">
          <h2 className="hb-text-primary fs-36 fw-8 mb-4">Masterclasses</h2>
          <Button
            type="primary mb-3"
            onClick={() => setOpenCreateMasterclass(true)}
            disabled={!hasCreatePermission}
          >
            + Create masterclass
          </Button>
        </div>

        <MasterclassTable />
      </div>

      {openCreateMasterclass && (
        <MasterclassCreateEdit
          open
          onClose={() => setOpenCreateMasterclass(false)}
        />
      )}
    </>
  );
};

export default MasterclasssList;
