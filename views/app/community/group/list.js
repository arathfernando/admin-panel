/* eslint-disable camelcase */
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Image, Popconfirm, Space, Table, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserViwer from '../../../../components/util-components/UserViwer';
import utils from '../../../../helpers/utils/index';
import useColumDateRangeSort from '../../../../hooks/useColumDateRangeSort';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';
import GroupCreate from './create';
import EditGroup from './edit';

const GroupList = () => {
  const dispatch = useDispatch();
  const [groupList, setGroupList] = useState(null);
  const { list, loading } = useSelector((state) => state.group);
  const [pagination, setPagenation] = React.useState({
    current: 1,
    pageSize: 10,
  });

  const [titleFilters, setTitleFilters] = useState([{}]);
  const [communityNameFilters, setCommunityNameFilters] = useState([{}]);
  const [createdByFilters, setCreatedByFilters] = useState([{}]);

  const { hasDeletePermission } = usePermission();
  const getColumnDateRangeSortProps = useColumDateRangeSort();

  useEffect(() => {
    dispatch(Actions.getAllGroups({ page: 1, limit: 1000 }));
  }, [dispatch]);

  useEffect(() => {
    setGroupList(list);
  }, [list]);

  const tableColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'id'),
    },
    {
      title: 'Image',
      dataIndex: 'cover_page',
      render: (_, record) => <Image width={100} src={record.cover_page} />,
    },
    {
      title: 'Title',
      dataIndex: 'group_name',
      render: (_, record) => <span>{record.group_name}</span>,
      sorter: (a, b) => utils.antdTableSorter(a, b, 'group_name'),
      filters: titleFilters,
      onFilter: (value, { group_name }) =>
        group_name?.toLowerCase().includes(value?.toLowerCase()),
      filterSearch: (input) => {
        setTimeout(() => setTitleFilters([{ text: input, value: input }]), 0);
        return true;
      },
    },
    {
      title: 'Community Name',
      dataIndex: 'community',
      render: (_, record) => (
        <span>{record.community_request?.community?.name}</span>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'community'),
      filters: communityNameFilters,
      onFilter: (value, { community_request }) =>
        community_request?.community?.name
          ?.toLowerCase()
          .includes(value?.toLowerCase()),
      filterSearch: (input) => {
        setTimeout(
          () => setCommunityNameFilters([{ text: input, value: input }]),
          0
        );
        return true;
      },
    },
    {
      title: 'Privacy Option',
      dataIndex: 'privacy',
      render: (_, record) => <span>{record.privacy}</span>,
      sorter: (a, b) => utils.antdTableSorter(a, b, 'privacyOption'),
      filters: [
        {
          text: 'PUBLIC',
          value: 'PUBLIC',
        },
        {
          text: 'PRIVATE',
          value: 'PRIVATE',
        },
      ],
      onFilter: (value, { privacy }) => privacy === value,
    },
    {
      title: 'Global',
      dataIndex: 'group_type',
      render: (_, record) => (
        <span>{record.group_type === 'GLOBAL' ? 'Global' : 'Not Global'}</span>
      ),
      filters: [
        {
          text: 'Global',
          value: 'GLOBAL',
        },
        {
          text: 'Not Global',
          value: 'ONLY_COMMUNITY',
        },
      ],
      onFilter: (value, { group_type }) => group_type === value,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_, record) => <span>{record.status}</span>,
      filters: [
        {
          text: 'ACCEPTED',
          value: 'ACCEPTED',
        },
        {
          text: 'PENDING',
          value: 'PENDING',
        },
        {
          text: 'REJECTED',
          value: 'REJECTED',
        },
      ],
      onFilter: (value, { status }) => status === value,
    },
    {
      title: 'Created By',
      dataIndex: 'created_by',
      render: (_, record) => <UserViwer user={record.created_by} />,
      filters: createdByFilters,
      onFilter: (value, record) =>
        `${record.created_by?.general_profile?.first_name} ${record.created_by?.general_profile?.last_name}`
          .toLowerCase()
          .includes(value?.toLowerCase()),
      filterSearch: (input) => {
        setTimeout(
          () => setCreatedByFilters([{ text: input, value: input }]),
          0
        );
        return true;
      },
    },
    {
      title: 'Created At',
      ...getColumnDateRangeSortProps('created_at'),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, elm) => (
        <Space>
          <EditGroup id={elm.id} data={groupList} />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this group?"
              onConfirm={() => dispatch(Actions.deleteGroup(elm.id))}
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
    <Card>
      <div className="text-right mb-3">
        <GroupCreate />
      </div>
      <div className="table-responsive">
        <Table
          rowKey="id"
          columns={tableColumns}
          dataSource={groupList}
          pagination={pagination}
          onChange={handleTableChange}
          className="custom-table"
          loading={loading}
        />
      </div>
    </Card>
  );
};
export default GroupList;
