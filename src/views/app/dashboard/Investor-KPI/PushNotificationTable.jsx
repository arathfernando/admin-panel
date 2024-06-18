import { Pagination, Table } from 'antd';
import { isArray } from 'lodash';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserViwer from '../../../../components/util-components/UserViwer';
import useColumDateRangeSort from '../../../../hooks/useColumDateRangeSort';
import useColumnSearchFilterSort from '../../../../hooks/useColumnSearchFilterSort';
import * as Actions from '../../../../redux/actions';

const PushNotificationTable = () => {
  const dispatch = useDispatch();
  const {
    data: pushNotifications,
    loading,
    lastPage = 1,
    currentPage: page = 1,
    limit = 100,
  } = useSelector(
    // eslint-disable-next-line no-shadow
    ({ pushNotifications }) => pushNotifications.pushNotifications
  );

  const ColumnSearchFilterSortProps = useColumnSearchFilterSort();
  const getColumnDateRangeSortProps = useColumDateRangeSort();

  useEffect(() => {
    dispatch(Actions.getPushNotifications({ page: 1, limit: 100 }));
  }, [dispatch]);

  const columns = [
    {
      title: 'ID',
      ...ColumnSearchFilterSortProps('id'),
    },
    {
      title: 'Date',
      ...getColumnDateRangeSortProps('created_at'),
    },
    {
      title: 'notification from',
      ...ColumnSearchFilterSortProps('notification_from'),
      render: (_, { notification_from }) => (
        <UserViwer user={notification_from} />
      ),
      onFilter: (value, { created_by }) =>
        `${created_by?.general_profile?.first_name || ''} ${
          created_by?.general_profile?.last_name || ''
        } ${created_by?.email || ''}`
          ?.toLowerCase()
          .includes(value?.toLowerCase()),
    },
    {
      title: 'notification to',
      ...ColumnSearchFilterSortProps('notification_to'),
      render: (_, { notification_to }) => <UserViwer user={notification_to} />,
      onFilter: (value, { created_by }) =>
        `${created_by?.general_profile?.first_name || ''} ${
          created_by?.general_profile?.last_name || ''
        } ${created_by?.email || ''}`
          ?.toLowerCase()
          .includes(value?.toLowerCase()),
    },
    {
      title: 'Title',
      ...ColumnSearchFilterSortProps('title'),
    },
    {
      title: 'Content',
      ...ColumnSearchFilterSortProps('content'),
    },
    {
      title: 'Status',
      ...ColumnSearchFilterSortProps('seen_unseen', {
        filters: [{ text: 'SEEN' }, { text: 'UNSEEN' }],
        exactMatch: true,
      }),
    },
  ];

  return (
    <div>
      <Table
        dataSource={isArray(pushNotifications) ? pushNotifications : []}
        columns={columns}
        className="custom-table"
        pagination={false}
        scroll={{ x: true }}
        loading={loading}
      />
      <div
        className="d-flex justify-content-end mt-4"
        style={{ marginTop: 25 }}
      >
        <Pagination
          total={limit * lastPage || 0}
          current={page || 0}
          hideOnSinglePage
          defaultPageSize={100}
          // eslint-disable-next-line no-shadow
          onChange={(page, limit) => {
            dispatch(
              Actions.getPushNotifications({
                page,
                limit,
              })
            );
          }}
          pageSizeOptions={[10, 50, 100, 500, 1000, 5000]}
        />
      </div>
    </div>
  );
};

export default PushNotificationTable;
