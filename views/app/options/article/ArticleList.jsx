import { Button } from 'antd';
import React, { useState } from 'react';
import ArticleTable from './ArticleTable';

import usePermission from '../../../../hooks/usePermission';
import CreateArticle from './CreateArticle';

const ArticlesList = () => {
  const [openCreateArticle, setOpenCreateArticle] = useState(false);

  const { hasCreatePermission } = usePermission();

  return (
    <>
      <div
        style={{ padding: '50px 3%', background: 'white' }}
        className="custom_styles"
      >
        <div className="d-flex justify-content-between flex-wrap">
          <h2 className="hb-text-primary fs-36 fw-8 mb-4">Articles</h2>
          <Button
            type="primary mb-3"
            onClick={() => setOpenCreateArticle(true)}
            disabled={!hasCreatePermission}
          >
            + Create Article
          </Button>
        </div>

        <ArticleTable />
      </div>

      <CreateArticle
        open={openCreateArticle}
        onCancel={() => setOpenCreateArticle(false)}
      />
    </>
  );
};

export default ArticlesList;
