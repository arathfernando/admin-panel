import { Button, Tabs } from 'antd';
import React, { useState } from 'react';

import usePermission from '../../../../hooks/usePermission';
import ContestCompletedTable from './ContestCompletedTable';
import CreateContest from './ContestCreateEdit';
import ContestDraftedTable from './ContestDraftedTable';
import ContestOngoingTable from './ContestOngoingTable';
import ContestPendingTable from './ContestPendingTable';

const ContestList = () => {
  const [openCreateContest, setopenCreateContest] = useState(false);

  const { hasCreatePermission } = usePermission();

  return (
    <div className="contest-list">
      <h2 className="hb-text-primary fs-36 fw-8 mb-3">Contest list</h2>
      <div className="d-flex justify-content-between flex-wrap">
        <h6 className="fs-24 fw-6 text-black mb-3">
          Here’s a list with active contests
        </h6>
        <Button
          type="primary mb-3"
          onClick={() => setopenCreateContest(true)}
          disabled={!hasCreatePermission}
        >
          + Create new contest
        </Button>
      </div>

      <Tabs
        className="contest-list-child-tab"
        items={[
          {
            label: `Pending contests`,
            key: '2',
            children: <ContestPendingTable />,
          },
          {
            label: `Drafted contests`,
            key: '5',
            children: <ContestDraftedTable />,
          },
          {
            label: `Ongoing contests`,
            key: '4',
            children: <ContestOngoingTable />,
          },
          {
            label: `Completed contests`,
            key: '3',
            children: <ContestCompletedTable />,
          },
        ]}
      />

      {openCreateContest && (
        <CreateContest open onCancel={() => setopenCreateContest(false)} />
      )}
    </div>
  );
};

export default ContestList;
