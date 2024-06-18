import { Button } from 'antd';
import React, { useState } from 'react';
import CourseCategoryTable from './CourseCategoryTable';

import usePermission from '../../../../hooks/usePermission';
import CreateCourseCategory from './CreateCourseCategory';

const CourseCategorysList = () => {
  const [openCreateCourseCategory, setOpenCreateCourseCategory] =
    useState(false);

  const { hasCreatePermission } = usePermission();

  return (
    <>
      <div
        style={{ padding: '50px 3%', background: 'white' }}
        className="custom_styles"
      >
        <div className="d-flex justify-content-between flex-wrap">
          <h2 className="hb-text-primary fs-36 fw-8 mb-4">Categories</h2>
          <Button
            type="primary mb-3"
            onClick={() => setOpenCreateCourseCategory(true)}
            disabled={!hasCreatePermission}
          >
            + Create category
          </Button>
        </div>

        <CourseCategoryTable />
      </div>

      <CreateCourseCategory
        open={openCreateCourseCategory}
        onCancel={() => setOpenCreateCourseCategory(false)}
      />
    </>
  );
};

export default CourseCategorysList;
