import { Button } from 'antd';
import React, { useState } from 'react';
import usePermission from '../../../../hooks/usePermission';
import PostTable from './PostTable';
import SubmitPost from './SubmitPost';

const PostsList = () => {
  const [openCreatePost, setOpenCreatePost] = useState(false);

  const { hasCreatePermission } = usePermission();

  return (
    <>
      <div
        style={{ padding: '50px 3%', background: 'white' }}
        className="custom_styles"
      >
        <div className="d-flex justify-content-between flex-wrap">
          <h2 className="hb-text-primary fs-36 fw-8 mb-4">Posts</h2>
          <Button
            type="primary mb-3"
            onClick={() => setOpenCreatePost(true)}
            disabled={!hasCreatePermission}
          >
            + Create Post
          </Button>
        </div>

        <PostTable />
      </div>

      <SubmitPost
        open={openCreatePost}
        onCancel={() => setOpenCreatePost(false)}
      />
    </>
  );
};

export default PostsList;
