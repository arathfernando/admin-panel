import { Button } from 'antd';
import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import usePermission from '../../../../hooks/usePermission';
import NotificationTable from './NotificationTable';
import SubmitNotification from './SubmitNotification';

const NotificationsList = () => {
  const [openCreateNotification, setOpenCreateNotification] = useState(false);

  const { path } = useRouteMatch();
  const { hasCreatePermission } = usePermission(path);

  return (
    <>
      <div
        style={{ padding: '50px 3%', background: 'white' }}
        className="custom_styles"
      >
        <div className="d-flex justify-content-between flex-wrap">
          <h2 className="hb-text-primary fs-36 fw-8 mb-4">Notifications</h2>
          <Button
            type="primary mb-3"
            onClick={() => setOpenCreateNotification(true)}
            disabled={!hasCreatePermission}
          >
            + Create Notification
          </Button>
        </div>

        <NotificationTable />
      </div>

      <SubmitNotification
        open={openCreateNotification}
        onCancel={() => setOpenCreateNotification(false)}
      />
    </>
  );
};

export default NotificationsList;
