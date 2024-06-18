import { Button } from 'antd';
import React, { useState } from 'react';
import usePermission from '../../../../hooks/usePermission';
import AIPromptTypeTable from './AIPromptTypeTable';
import SubmitAIPromptType from './SubmitAIPromptType';

const AIPromptTypesList = () => {
  const [openCreateAIPromptType, setOpenCreateAIPromptType] = useState(false);

  const { hasCreatePermission } = usePermission();

  return (
    <>
      <div
        style={{ padding: '50px 3%', background: 'white' }}
        className="custom_styles"
      >
        <div className="d-flex justify-content-between flex-wrap">
          <h2 className="hb-text-primary fs-36 fw-8 mb-4">AI Prompt Types</h2>
          <Button
            type="primary mb-3"
            onClick={() => setOpenCreateAIPromptType(true)}
            disabled={!hasCreatePermission}
          >
            + Create AI Prompt Type
          </Button>
        </div>

        <AIPromptTypeTable />
      </div>

      <SubmitAIPromptType
        open={openCreateAIPromptType}
        onCancel={() => setOpenCreateAIPromptType(false)}
      />
    </>
  );
};

export default AIPromptTypesList;
