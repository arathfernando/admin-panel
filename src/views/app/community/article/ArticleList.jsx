import { Button } from 'antd';
import React, { useState } from 'react';
import usePermission from '../../../../hooks/usePermission';
import ActicleTable from './ArticleTable';
import SubmitActicle from './SubmitArticle';

const ActiclesList = () => {
  const [openCreateActicle, setOpenCreateActicle] = useState(false);

  const { hasCreatePermission } = usePermission();

  return (
    <>
      <div
        style={{ padding: '50px 3%', background: 'white' }}
        className="custom_styles"
      >
        <div className="d-flex justify-content-between flex-wrap">
          <h2 className="hb-text-primary fs-36 fw-8 mb-4">Acticles</h2>
          <Button
            type="primary mb-3"
            onClick={() => setOpenCreateActicle(true)}
            disabled={!hasCreatePermission}
          >
            + Create Acticle
          </Button>
        </div>

        <ActicleTable />
      </div>

      <SubmitActicle
        open={openCreateActicle}
        onCancel={() => setOpenCreateActicle(false)}
      />
    </>
  );
};

export default ActiclesList;
