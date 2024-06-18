/* eslint-disable camelcase */
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Image,
  Popconfirm,
  Select,
  Space,
  Table,
  Tooltip,
} from 'antd';
import { isArray } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserViwer from '../../../../components/util-components/UserViwer';
import utils from '../../../../helpers/utils/index';
import useColumDateRangeSort from '../../../../hooks/useColumDateRangeSort';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';
import EventCreate from './createEvent';

const { Option } = Select;

const statusOptions = ['PENDING', 'ACCEPTED', 'REJECTED'];

const EventList = () => {
  const dispatch = useDispatch();
  const [events, SetEvents] = useState(null);
  const {
    list,
    id: updtatingId,
    loading,
  } = useSelector((state) => state.event);
  const [pagination, setPagenation] = React.useState({
    current: 1,
    pageSize: 10,
  });

  const [titleFilters, setTitleFilters] = useState([{}]);
  const [communityNameFilters, setCommunityNameFilters] = useState([{}]);
  const [createdByFilters, setCreatedByFilters] = useState([{}]);

  const { hasCreatePermission, hasEditPermission, hasDeletePermission } =
    usePermission();
  const getColumnDateRangeSortProps = useColumDateRangeSort();

  useEffect(() => {
    dispatch(Actions.getAllEvents({ page: 1, limit: 1000 }));
  }, [dispatch]);

  useEffect(() => {
    SetEvents(isArray(list) ? list : []);
  }, [list]);

  const updateStatus = (id, status) => {
    dispatch(Actions.updateEvent({ id, status }));
  };

  const [openCreateEvent, setOpenCreateEvent] = useState(false);
  const [openEventData, setOpenEventData] = useState({});

  const tableColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'id'),
    },
    {
      title: 'Cover Image',
      dataIndex: 'cover_image',
      render: (_, record) =>
        record.cover_image && <Image width={100} src={record.cover_image} />,
    },
    {
      title: 'Title',
      dataIndex: 'event_title',
      render: (_, record) => <span>{record.event_title}</span>,
      sorter: (a, b) => utils.antdTableSorter(a, b, 'event_title'),
      filters: titleFilters,
      onFilter: (value, { event_title }) =>
        event_title?.toLowerCase().includes(value?.toLowerCase()),
      filterSearch: (input) => {
        setTimeout(() => setTitleFilters([{ text: input, value: input }]), 0);
        return true;
      },
    },
    {
      title: 'Gobal/Local',
      dataIndex: 'event_type',
      render: (_, record) => (
        <span>{record.event_type === 'GLOBAL' ? 'GLOBAL' : 'LOCAL'}</span>
      ),
      filters: [
        {
          text: 'GLOBAL',
          value: 'GLOBAL',
        },
        {
          text: 'COMMUNITY_EVENT',
          value: 'COMMUNITY_EVENT',
        },
        {
          text: 'GROUP_EVENT',
          value: 'GROUP_EVENT',
        },
      ],
      onFilter: (value, { event_type }) => event_type === value,
    },
    {
      title: 'Community',
      dataIndex: 'community',
      render: (_, record) => <span>{record.community?.name}</span>,
      sorter: (a, b) => utils.antdTableSorter(a, b, 'community'),
      filters: communityNameFilters,
      onFilter: (value, { community }) =>
        community?.name?.toLowerCase().includes(value?.toLowerCase()),
      filterSearch: (input) => {
        setTimeout(
          () => setCommunityNameFilters([{ text: input, value: input }]),
          0
        );
        return true;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_, { id, status }) => (
        <Select
          loading={loading && id === updtatingId}
          value={status}
          onChange={(value) => updateStatus(id, value)}
        >
          {statusOptions.map((value) => (
            <Option key={value} value={value} label={value} />
          ))}
        </Select>
      ),
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
      onFilter: (value, { created_by }) =>
        `${created_by?.general_profile?.first_name} ${created_by?.general_profile?.last_name}`
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
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => {
              setOpenCreateEvent(true);
              setOpenEventData(elm);
            }}
            disabled={!hasEditPermission}
          />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => dispatch(Actions.deleteEvent(elm.id))}
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
      <Card>
        <div className="text-right mb-3">
          <Button
            type="primary"
            onClick={() => {
              setOpenEventData({});
              setOpenCreateEvent(true);
            }}
            disabled={!hasCreatePermission}
          >
            <PlusOutlined /> Create New Event
          </Button>
        </div>
        <div className="table-responsive">
          <Table
            rowKey="id"
            columns={tableColumns}
            dataSource={events}
            pagination={pagination}
            onChange={handleTableChange}
            className="custom-table"
            loading={loading}
          />
        </div>

        {openCreateEvent && (
          <EventCreate
            open
            data={openEventData}
            onClose={() => setOpenCreateEvent(false)}
          />
        )}
      </Card>
    </>
  );
};
export default EventList;
