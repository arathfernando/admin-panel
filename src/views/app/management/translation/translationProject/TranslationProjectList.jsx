import { Button } from 'antd';
import React, { useState } from 'react';
import usePermission from '../../../../../hooks/usePermission';
import TranslationProjectTable from './TranslationProjectTable';

import SubmitTranslationProject from './SubmitTranslationProject';

const TranslationProjectsList = () => {
  const [openCreateTranslationProject, setOpenCreateTranslationProject] =
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
            Translation Projects
          </h2>
          <Button
            type="primary mb-3"
            onClick={() => setOpenCreateTranslationProject(true)}
            disabled={!hasCreatePermission}
          >
            + Create Translation Project
          </Button>
        </div>

        <TranslationProjectTable />
      </div>

      <SubmitTranslationProject
        open={openCreateTranslationProject}
        onCancel={() => setOpenCreateTranslationProject(false)}
      />
    </>
  );
};

export default TranslationProjectsList;
