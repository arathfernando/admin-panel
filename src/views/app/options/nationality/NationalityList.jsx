import { Button } from 'antd';
import React, { useState } from 'react';
import NationalityTable from './NationalityTable';

import usePermission from '../../../../hooks/usePermission';
import CreateNationality from './CreateNationality';

const NationalitiesList = () => {
  const [openCreateNationality, setOpenCreateNationality] = useState(false);

  const { hasCreatePermission } = usePermission();

  return (
    <>
      <div
        style={{ padding: '50px 3%', background: 'white' }}
        className="custom_styles"
      >
        <div className="d-flex justify-content-between flex-wrap">
          <h2 className="hb-text-primary fs-36 fw-8 mb-4">Nationalities</h2>
          <Button
            type="primary mb-3"
            onClick={() => setOpenCreateNationality(true)}
            disabled={!hasCreatePermission}
          >
            + Create Nationality
          </Button>
        </div>

        <NationalityTable />
      </div>

      <CreateNationality
        open={openCreateNationality}
        onCancel={() => setOpenCreateNationality(false)}
      />
    </>
  );
};

export default NationalitiesList;
