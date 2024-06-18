/* eslint-disable camelcase */
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Image, Popconfirm, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserViwer from '../../../../components/util-components/UserViwer';
import utils from '../../../../helpers/utils/index';
import useColumDateRangeSort from '../../../../hooks/useColumDateRangeSort';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';
import CreateCommunity from './create';
import EditCommunity from './edit';

const Community = () => {
  const dispatch = useDispatch();
  const [communityList, SetCommunityList] = useState(null);
  const { community, loading } = useSelector((state) => state.communityAll);
  const [pagination, setPagenation] = React.useState({
    current: 1,
    pageSize: 10,
  });

  const [nameFilters, setNameFilters] = useState([{}]);
  const [createdbyFilters, setCreatedByFilters] = useState([{}]);

  const countries = useSelector((state) => state.country).list;

  const { hasDeletePermission } = usePermission({ path: '/app/community/all' });
  const getColumnDateRangeSortProps = useColumDateRangeSort();

  useEffect(() => {
    dispatch(Actions.getAllCountry());
  }, [dispatch]);

  useEffect(() => {
    dispatch(Actions.getAllCommunity({ page: 1, limit: 1000 }));
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(Actions.deleteCommunity(id));
  };

  useEffect(() => {
    SetCommunityList(community);
  }, [community]);

  const tableColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'id'),
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      render: (_, record) =>
        record.avatar && <Image width={100} src={record.avatar} />,
    },
    {
      title: ' Name',
      dataIndex: 'name',
      render: (_, record) => <span>{record.name}</span>,
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
      filters: nameFilters,
      onFilter: (value, { name }) =>
        name?.toLowerCase().includes(value?.toLowerCase()),
      filterSearch: (input) => {
        setTimeout(() => setNameFilters([{ text: input, value: input }]), 0);
        return true;
      },
    },
    {
      title: 'Country',
      dataIndex: 'country',
      render: (_, record) => <span>{record.country?.country_name}</span>,
      sorter: (a, b) => utils.antdTableSorter(a, b, 'country'),
      filters: countries.map((country) => ({
        text: country.country_name,
        value: country.id,
      })),
      onFilter: (value, record) => record.country?.id === value,
    },
    {
      title: 'State',
      dataIndex: 'state',
      render: (_, record) => <span>{record.state}</span>,
    },
    {
      title: 'City',
      dataIndex: 'city',
      render: (_, record) => <span>{record.city}</span>,
      sorter: (a, b) => utils.antdTableSorter(a, b, 'city'),
    },
    {
      title: 'Published',
      dataIndex: 'is_published',
      render: (_, record) => (
        <span>
          {record.is_published === 'TRUE' ? 'Published' : 'Not Published'}
        </span>
      ),
      filters: [
        {
          text: 'Published',
          value: 'TRUE',
        },
        {
          text: 'Not Published',
          value: 'FALSE',
        },
      ],
      onFilter: (value, record) => record.is_published === value,
    },
    {
      title: 'Global',
      dataIndex: 'is_global',
      render: (_, record) => (
        <span>{record.is_global === 'TRUE' ? 'Global' : 'Internal'}</span>
      ),
      filters: [
        {
          text: 'Global',
          value: 'TRUE',
        },
        {
          text: 'Internal',
          value: 'FALSE',
        },
      ],
      onFilter: (value, record) => record.is_global === value,
    },
    {
      title: 'Type',
      key: 'community_type',
      dataIndex: 'community_type',
      filters: [
        {
          text: 'PUBLIC',
          value: 'PUBLIC',
        },
        {
          text: 'PRIVATE',
          value: 'PRIVATE',
        },
        {
          text: 'SECRET',
          value: 'SECRET',
        },
      ],
      onFilter: (value, record) => record.community_type === value,
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
          text: 'SUSPENDED',
          value: 'SUSPENDED',
        },
        {
          text: 'DELETED',
          value: 'DELETED',
        },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Created By',
      dataIndex: 'community_created_by',
      render: (_, record) => <UserViwer user={record.community_created_by} />,
      filters: createdbyFilters,
      onFilter: (value, record) =>
        `${record.community_created_by?.general_profile?.first_name} ${record.community_created_by?.general_profile?.last_name}`
          ?.toLowerCase()
          .includes(value?.toLowerCase()),
      filterSearch: (input) => {
        setTimeout(() => {
          setCreatedByFilters([{ text: input, value: input }]);
        }, 0);
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
          <EditCommunity id={elm.id} data={communityList} />
          <Popconfirm
            title="Are you sure delete this Community?"
            onConfirm={() => handleDelete(elm.id)}
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
        <CreateCommunity />
      </div>
      <div className="table-responsive">
        <Table
          rowKey="id"
          columns={tableColumns}
          dataSource={communityList}
          pagination={pagination}
          onChange={handleTableChange}
          className="custom-table"
          loading={loading}
        />
      </div>
    </Card>
  );
};
export default Community;
