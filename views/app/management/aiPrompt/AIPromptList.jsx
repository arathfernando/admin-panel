import { Button } from 'antd';
import React, { useState } from 'react';
import usePermission from '../../../../hooks/usePermission';
import AIPromptTable from './AIPromptTable';
import SubmitAIPrompt from './SubmitAIPrompt';

const AIPromptsList = () => {
  const [openCreateAIPrompt, setOpenCreateAIPrompt] = useState(false);

  const { hasCreatePermission } = usePermission();

  return (
    <>
      <div
        style={{ padding: '50px 3%', background: 'white' }}
        className="custom_styles"
      >
        <div className="d-flex justify-content-between flex-wrap">
          <h2 className="hb-text-primary fs-36 fw-8 mb-4">AI Prompts</h2>
          <Button
            type="primary mb-3"
            onClick={() => setOpenCreateAIPrompt(true)}
            disabled={!hasCreatePermission}
          >
            + Create AI Prompt
          </Button>
        </div>

        <AIPromptTable />
      </div>

      <SubmitAIPrompt
        open={openCreateAIPrompt}
        onCancel={() => setOpenCreateAIPrompt(false)}
      />
    </>
  );
};

export default AIPromptsList;
