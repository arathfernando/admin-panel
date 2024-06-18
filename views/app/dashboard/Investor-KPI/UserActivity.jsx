/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Divider, Modal, Table } from 'antd';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useColumDateRangeSort from '../../../../hooks/useColumDateRangeSort';
import useColumnSearchFilterSort from '../../../../hooks/useColumnSearchFilterSort';
import { getUserActivity } from '../../../../redux/actions';

const UserActivity = ({ open, onClose, userId }) => {
  const { data: userActivity = [], loading } = useSelector(
    ({ kpi }) => kpi.userActivity
  );
  const dispatch = useDispatch();

  const getColumnDateRangeSortProps = useColumDateRangeSort();
  const getColumnSearchFilterSortProps = useColumnSearchFilterSort();

  useEffect(() => {
    if (userId) {
      dispatch(getUserActivity({ user_id: userId }));
    }
  }, [userId]);

  const columns = [
    {
      title: 'Date',
      ...getColumnDateRangeSortProps('dateHour'),
      render: (_, { dateHour }) => (
        <span className="fs-13 fw-5 text-black">
          {moment(dateHour, 'YYYYMMDDHH').format('DD/MM/YYYY h a')}
        </span>
      ),
    },
    {
      title: 'Event',
      ...getColumnSearchFilterSortProps('eventName', {
        filters: [
          { text: 'page_view' },
          { text: 'scroll' },
          { text: 'user_engagement' },
          { text: 'session_start' },
        ],
      }),
    },
    {
      title: 'Platform / Device',
      ...getColumnSearchFilterSortProps('platformDeviceCategory'),
    },
    {
      title: 'Page path',
      ...getColumnSearchFilterSortProps('pagePath', {
        filters: [
          { text: 'Community', value: 'community' },
          { text: 'Group', value: 'group' },
          { text: 'Event', value: 'event' },
          { text: 'Contest', value: 'contest' },
          { text: 'Pasterclass', value: 'masterclass' },
          { text: 'Product launcher', value: 'product-launcher' },
          { text: 'Expert marketplace', value: 'expert-marketplace' },
          { text: 'Business needs', value: 'job' },
        ],
      }),
    },
    {
      title: 'Page title',
      ...getColumnSearchFilterSortProps('pageTitle'),
    },
    {
      title: 'Location',
      ...getColumnSearchFilterSortProps('location'),
    },
  ];

  return (
    <Modal
      open={open}
      onCancel={onClose}
      width={1200}
      closable={false}
      footer={null}
      bodyStyle={{ padding: 28, paddingBottom: 8 }}
    >
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h4 className="h4-lg fw-7 text-black mb-0">User activity</h4>
        <img
          src="/assets/img/icons/modal-close.svg"
          className="cursor-pointer"
          alt="close"
          onClick={onClose}
        />
      </div>
      <Divider className="mt-2 mb-0" />
      <Table
        dataSource={userActivity}
        columns={columns}
        className="custom-table"
        loading={loading}
        onRow={() => ({ className: 'text-nowrap' })}
        scroll={{ x: true }}
      />
    </Modal>
  );
};

export default UserActivity;
