import { Button } from 'antd';
import React, { useState } from 'react';

import usePermission from '../../../../hooks/usePermission';
import ContestTemplatesTable from './ContestTemplatesTable';
import CreateTemplate from './CreateContsetTemplate';

const ContestTempleteList = () => {
  const [openCreateTemplate, setopenCreateTemplate] = useState(false);

  const { hasCreatePermission } = usePermission();

  return (
    <div className="contest-list">
      <div className="d-flex justify-content-between flex-wrap">
        <h2 className="hb-text-primary fs-36 fw-8 mb-3">Create new template</h2>
        <Button
          type="primary mb-3"
          onClick={() => setopenCreateTemplate(true)}
          disabled={!hasCreatePermission}
        >
          + Create new contest
        </Button>
      </div>

      <ContestTemplatesTable />

      {openCreateTemplate && (
        <CreateTemplate open onCancel={() => setopenCreateTemplate(false)} />
      )}
    </div>
  );
};

export default ContestTempleteList;
