/* eslint-disable camelcase */
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, Table, Tooltip } from 'antd';
import { isArray } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import useColumDateRangeSort from '../../../../hooks/useColumDateRangeSort';
import useColumnSearchFilterSort from '../../../../hooks/useColumnSearchFilterSort';
import usePermission from '../../../../hooks/usePermission';
import {
  deleteNotification,
  getNotifications,
} from '../../../../redux/actions';
import SubmitNotification from './SubmitNotification';

const NotificationTable = () => {
  const dispatch = useDispatch();
  const { data: notifications, loading } = useSelector(
    ({ notification }) => notification.notifications
  );

  const [pagination, setPagenation] = useState({
    current: 1,
    pageSize: 10,
  });

  // update notification
  const [openUpdateNotification, setOpenUpdateNotification] = useState(false);
  const [updateNotificationData, setUpdateNotificationData] = useState({});

  const getColumnSearchFilterSortProps = useColumnSearchFilterSort();
  const getColumnDateRangeSortProps = useColumDateRangeSort();
  const { path } = useRouteMatch();
  const { hasDeletePermission, hasEditPermission } = usePermission(path);

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  const handledeleteNotification = (id) => {
    dispatch(deleteNotification(id));
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      ...getColumnSearchFilterSortProps('id'),
    },
    {
      title: 'Notification type',
      dataIndex: 'notification_type',
      key: 'notification_type',
      ...getColumnSearchFilterSortProps('notification_type'),
      defaultSortOrder: 'descend',
    },
    {
      title: 'Notification title',
      dataIndex: 'notification_title',
      key: 'notification_title',
      ...getColumnSearchFilterSortProps('notification_title'),
    },
    {
      title: 'Notification content',
      dataIndex: 'notification_content',
      key: 'notification_content',
      ...getColumnSearchFilterSortProps('notification_content'),
    },
    {
      title: 'Created at',
      render: (_, { created_at }) =>
        created_at &&
        moment(created_at).isValid() &&
        moment(created_at).format('DD/MM/YYYY'),
      key: 'createdAt',
      ...getColumnDateRangeSortProps('createdAt'),
    },
    {
      title: 'Actions',
      key: 'Actions',
      render: (_, data) => (
        <Space>
          <Button
            type="ghost"
            icon={<EditOutlined />}
            size="small"
            onClick={() => {
              setOpenUpdateNotification(true);
              setUpdateNotificationData(data);
            }}
            disabled={!hasEditPermission}
          />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => handledeleteNotification(data.id)}
              onCancel={() => console.log('Canceled to delete')}
              okText="Yes"
              cancelText="No"
              disabled={!hasDeletePermission}
            >
              <Button
                danger
                icon={<DeleteOutlined />}
                size="small"
                disabled={!hasDeletePermission}
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleTableChange = (params) => {
    setPagenation(params.pagination);
  };

  return (
    <>
      <Table
        rowKey="id"
        dataSource={isArray(notifications) ? notifications : []}
        columns={columns}
        className="custom-table"
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: true }}
        loading={loading}
      />
      <SubmitNotification
        open={openUpdateNotification}
        data={updateNotificationData}
        onCancel={() => {
          setOpenUpdateNotification(false);
          setUpdateNotificationData({});
        }}
      />
    </>
  );
};

export default NotificationTable;
