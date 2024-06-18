/* eslint-disable react/no-danger */
/* eslint-disable camelcase */
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Popconfirm, Space, Table } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserViwer from '../../../../components/util-components/UserViwer';
import utils from '../../../../helpers/utils/index';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';
import CreateTopic from './create';
import EditTopic from './edit';

const TopicsAllList = () => {
  const dispatch = useDispatch();
  const [TopicList, SetTopicList] = useState(null);
  const { list, loading } = useSelector((state) => state.topic);
  const [pagination, setPagenation] = React.useState({
    current: 1,
    pageSize: 10,
  });

  // filter states
  const [IDFilters, setIDFilters] = useState([{}]);
  const [nameFilters, setNameFilters] = useState([{}]);
  const [descriptionFilters, setDescriptionFilters] = useState([{}]);
  const [createdByFilters, setCreatedByFilters] = useState([{}]);

  const { hasDeletePermission } = usePermission();

  useEffect(() => {
    dispatch(Actions.getAllTopics({ page: 1, limit: 1000 }));
  }, [dispatch]);

  useEffect(() => {
    SetTopicList(list);
  }, [list]);

  const handleDelete = (id) => {
    dispatch(Actions.deleteTopic(id));
  };

  const tableColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'id'),
      filters: IDFilters,
      onFilter: (value, { id }) => id === Number(value),
      filterSearch: (input) => {
        setTimeout(() => setIDFilters([{ text: input, value: input }]), 0);
        return true;
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filters: nameFilters,
      onFilter: (value, { name }) =>
        name?.toLowerCase?.().includes(value?.toLowerCase?.()),
      filterSearch: (input) => {
        setTimeout(() => setNameFilters([{ text: input, value: input }]), 0);
        return true;
      },
    },
    {
      title: 'Description',
      render: (_, { description }) => (
        <div
          className="ignore-space"
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
      ),
      key: 'description',
      filters: descriptionFilters,
      onFilter: (value, { description }) =>
        description?.toLowerCase?.().includes(value?.toLowerCase?.()),
      filterSearch: (input) => {
        setTimeout(
          () => setDescriptionFilters([{ text: input, value: input }]),
          0
        );
        return true;
      },
    },
    {
      title: 'Date Created',
      render: (_, { created_at }) =>
        created_at &&
        moment(created_at).isValid() &&
        moment(created_at).format('DD/MM/YYYY'),
      key: 'created_at',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'created_at'),
    },
    {
      title: 'Created by',
      render: (_, { created_by }) => <UserViwer user={created_by} />,
      key: 'created_by',
      filters: createdByFilters,
      onFilter: (value, { created_by }) =>
        `${created_by?.general_profile?.first_name || ''} ${
          created_by?.general_profile?.last_name || ''
        } ${created_by?.email || ''}`
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
      title: 'Topic location',
      dataIndex: 'topic_location',
      key: 'topic_location',
      filters: [
        {
          value: 'COMMUNITY',
          text: 'COMMUNITY',
        },
        {
          value: 'GROUP',
          text: 'GROUP',
        },
      ],
      onFilter: (value, { topic_location }) => topic_location === value,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        {
          value: 'PENDING',
          text: 'PENDING',
        },
        {
          value: 'ACCEPTED',
          text: 'ACCEPTED',
        },
        {
          value: 'REJECTED',
          text: 'REJECTED',
        },
      ],
      onFilter: (value, { status }) => status === value,
    },
    {
      title: 'Actions',
      key: 'Actions',
      render: (_, elm) => (
        <Space>
          <EditTopic id={elm.id} data={TopicList} />
          <Popconfirm
            title="Are you sure delete this Topic?"
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
        <CreateTopic />
      </div>
      <div className="table-responsive">
        <Table
          rowKey="id"
          loading={loading}
          columns={tableColumns}
          dataSource={TopicList}
          pagination={pagination}
          onChange={handleTableChange}
          className="custom-table"
        />
      </div>
    </Card>
  );
};
export default TopicsAllList;
