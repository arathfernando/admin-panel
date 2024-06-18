import { Button } from 'antd';
import React, { useState } from 'react';
import SkillTable from './SkillTable';

import usePermission from '../../../../hooks/usePermission';
import CreateSkill from './CreateSkill';

const SkillsList = () => {
  const [openCreateSkill, setOpenCreateSkill] = useState(false);

  const { hasCreatePermission } = usePermission();

  return (
    <>
      <div
        style={{ padding: '50px 3%', background: 'white' }}
        className="custom_styles"
      >
        <div className="d-flex justify-content-between flex-wrap">
          <h2 className="hb-text-primary fs-36 fw-8 mb-4">Skills</h2>
          <Button
            type="primary mb-3"
            onClick={() => setOpenCreateSkill(true)}
            disabled={!hasCreatePermission}
          >
            + Create Skill
          </Button>
        </div>

        <SkillTable />
      </div>

      <CreateSkill
        open={openCreateSkill}
        onCancel={() => setOpenCreateSkill(false)}
      />
    </>
  );
};

export default SkillsList;
