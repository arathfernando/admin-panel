import { Button } from 'antd';
import React, { useState } from 'react';
import PermissionTable from './PermissionTable';
import SubmitPermission from './SubmitPermission';

const PermissionsList = () => {
  const [openCreatePermission, setOpenCreatePermission] = useState(false);

  return (
    <>
      <div
        style={{ padding: '50px 3%', background: 'white' }}
        className="custom_styles"
      >
        <div className="d-flex justify-content-between flex-wrap">
          <h2 className="hb-text-primary fs-36 fw-8 mb-4">Permissions</h2>
          <Button
            type="primary mb-3"
            onClick={() => setOpenCreatePermission(true)}
            // disabled={!hasCreatePermission}
          >
            + Create Permission
          </Button>
        </div>

        <PermissionTable />
      </div>

      <SubmitPermission
        open={openCreatePermission}
        onCancel={() => setOpenCreatePermission(false)}
      />
    </>
  );
};

export default PermissionsList;
