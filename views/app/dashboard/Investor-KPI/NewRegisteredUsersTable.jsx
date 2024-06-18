/* eslint-disable camelcase */
import { EyeOutlined } from '@ant-design/icons';
import { Button, Form, Input, Pagination, Select, Table, Tooltip } from 'antd';
import { useWatch } from 'antd/lib/form/Form';
import moment from 'moment';
import React, { useMemo, useState } from 'react';
import UserViwer from '../../../../components/util-components/UserViwer';
import { rolesObj } from '../../../../constants/commonData';

import UserActivity from './UserActivity';

const NewRegisteredUsersTable = ({
  data: { data: users = [], loading } = {},
  type,
  getUserData,
  form,
}) => {
  const search = useWatch('search', form);

  const userListData = useMemo(
    () =>
      users.filter(
        ({ user } = {}) =>
          type === 'unregistered' ||
          `${user?.general_profile?.first_name} || ${user?.general_profile?.last_name}`
            .toLowerCase()
            .includes(search?.toLowerCase() || '')
      ),
    [users, search]
  );

  const [openUserActivityWithId, setOpenUserActivityWithId] = useState(0);

  const columns = [
    {
      title: 'Registration Date',
      key: 'dateHour',
      render: (_, { user }) => (
        <span className="fs-13 fw-5 text-black">
          {moment(user.createdAt).format('DD/MM/YYYY h a')}
        </span>
      ),
    },
    {
      title: 'User',
      key: 'user',
      render: (_, { user = {} }) => <UserViwer user={user} />,
    },
    {
      title: 'Country',
      key: 'country',
      dataIndex: 'country',
    },
    {
      title: 'City',
      key: 'city',
      render: (_, { city }) => (
        <span className="fs-13 fw-5 text-black">{city}</span>
      ),
    },
    {
      title: 'Role',
      key: 'role',
      render: (_, { user = {} }) => (
        <span className="fs-13 fw-5 text-black">
          {rolesObj[user.general_profile?.role]?.label}
        </span>
      ),
    },
    {
      title: 'Membership',
      key: 'membership',
      render: (_, { user = {} }) => (
        <span className="fs-13 fw-5 text-black">
          {user.membership || 'Free'}
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'Actions',
      render: (_, { user }) => (
        <Tooltip title="View activity">
          <Button
            type="ghost br-6"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => {
              setOpenUserActivityWithId(user?.id);
            }}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <>
      <div className="transaction bg-white">
        <Form
          layout="vertical"
          form={form}
          name="control-hooks"
          className="custor-form-style"
        >
          <div className="d-flex align-items-center justify-content-between mt-2">
            {type !== 'unregistered' && (
              <Form.Item name="search" noStyle>
                <Input
                  className="history-search-box"
                  prefix={
                    <img
                      src="/assets/img/icons/search.svg"
                      className="mx-1"
                      alt="search"
                    />
                  }
                  size="small"
                  style={{
                    maxWidth: 251,
                    width: '100%',
                    height: 32,
                    borderRadius: 6,
                    border: '1px solid #D1D5DB',
                  }}
                  placeholder="Type a name"
                />
              </Form.Item>
            )}
            <span className="flex-grow-1" />

            <Form.Item noStyle initialValue="7daysAgo" name="startDate">
              <Select
                style={{ minWidth: 119, height: 32, marginBottom: 20 }}
                options={[
                  {
                    key: 'today',
                    label: 'Today',
                  },
                  {
                    key: '7daysAgo',
                    label: 'Last 7 days',
                  },
                  {
                    key: '30daysAgo',
                    label: 'Last 1 months',
                  },
                  {
                    key: '2023-01-01',
                    label: 'All',
                  },
                ].map((data) => ({
                  ...data,
                  value: data.key,
                  label: data.label,
                }))}
                onChange={(startDate) => getUserData({ startDate })}
              />
            </Form.Item>
          </div>
        </Form>
        <Table
          dataSource={userListData}
          columns={columns}
          className="history-table"
          loading={loading}
          pagination={
            <Pagination
              size="small"
              total={userListData.length}
              className="history-table-pagination"
              prevIcon={<i className="bx bx-sm bx-chevron-left" />}
              nextIcon={<i className="bx bx-sm bx-chevron-right" />}
            />
          }
          scroll={{ x: true }}
        />
      </div>

      <UserActivity
        open={openUserActivityWithId}
        userId={openUserActivityWithId}
        onClose={() => setOpenUserActivityWithId(0)}
      />
    </>
  );
};

export default NewRegisteredUsersTable;
