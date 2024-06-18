import { Button } from 'antd';
import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import usePermission from '../../../../hooks/usePermission';
import ContestCategoryCriteriaTable from './ContestCategoryCriteriaTable';

import SubmitContestCategoryCriteria from './SubmitContestCategoryCriteria';

const ContestCategoryCriteriasList = () => {
  const [
    openCreateContestCategoryCriteria,
    setOpenCreateContestCategoryCriteria,
  ] = useState(false);

  const { path } = useRouteMatch();
  const { hasCreatePermission } = usePermission(path);

  return (
    <>
      <div
        style={{ padding: '50px 3%', background: 'white' }}
        className="custom_styles"
      >
        <div className="d-flex justify-content-between flex-wrap">
          <h2 className="hb-text-primary fs-36 fw-8 mb-4">
            Contest Category Criterias
          </h2>
          <Button
            type="primary mb-3"
            onClick={() => setOpenCreateContestCategoryCriteria(true)}
            disabled={!hasCreatePermission}
          >
            + Create Contest Category Criteria
          </Button>
        </div>

        <ContestCategoryCriteriaTable />
      </div>

      <SubmitContestCategoryCriteria
        open={openCreateContestCategoryCriteria}
        onCancel={() => setOpenCreateContestCategoryCriteria(false)}
      />
    </>
  );
};

export default ContestCategoryCriteriasList;
