import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Card, Popconfirm, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import UserViwer from '../../../components/util-components/UserViwer';
import utils from '../../../helpers/utils/index';
import useColumDateRangeSort from '../../../hooks/useColumDateRangeSort';
import useColumnSearchFilterSort from '../../../hooks/useColumnSearchFilterSort';
import usePermission from '../../../hooks/usePermission';
import * as Actions from '../../../redux/actions';
import { orderHubbersTeam } from '../../../redux/actions';
import MemberCreate from './create';
import MemberEdit from './edit';

const MemberList = () => {
  const dispatch = useDispatch();
  const [list, setList] = useState(null);
  const { memberList, loading } = useSelector(
    (state) => state.hubbersTeam,
    shallowEqual
  );
  const { data: orderData, status } = useSelector(
    (state) => state.hubbersTeam.orderAction,
    shallowEqual
  );

  const { hasDeletePermission, hasChangeOrderPermission } = usePermission();
  const getColumnDateRangeSortProps = useColumDateRangeSort();
  const getColumnSearchFilterSortProps = useColumnSearchFilterSort();

  useEffect(() => {
    dispatch(Actions.getAllHubbersTeam());
  }, [dispatch]);

  useEffect(() => {
    setList(memberList.sort((a, b) => a.order - b.order));
  }, [memberList]);

  const handleOrderUp = (elm) => {
    const currecntElId = elm.id;
    const currentOrder = elm.order;
    const downOrderElm = memberList
      .sort((a, b) => b.order - a.order)
      .find(({ order }) => order < currentOrder);
    const downElId = downOrderElm?.id;
    const orderDownNo = downOrderElm?.order;

    if (currentOrder && currecntElId && downElId && orderDownNo) {
      dispatch(
        orderHubbersTeam({
          base_id: downElId,
          update_id: currecntElId,
        })
      );
    }
  };
  const handleOrderDown = (elm) => {
    const currecntElId = elm.id;
    const currentOrder = elm.order;
    const upOrderElm = memberList
      .sort((a, b) => a.order - b.order)
      .find(({ order }) => order > currentOrder);
    const upElId = upOrderElm?.id;
    const orderUpNo = upOrderElm?.order;
    if (currentOrder && currecntElId && upElId && orderUpNo) {
      dispatch(
        orderHubbersTeam({
          base_id: currecntElId,
          update_id: upElId,
        })
      );
    }
  };

  const tableColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'id'),
    },
    {
      title: 'Avatar',
      /* eslint-disable */
      render: (_, record) => (
        <UserViwer user={{ ...record.user, general_profile: record }}>
          <Avatar size={50} src={record?.avatar} />
        </UserViwer>
      ),
      /* eslint-enable */
    },
    {
      title: 'Email',
      /* eslint-disable */
      render: (_, record) => <span>{record.user?.email}</span>,
      /* eslint-enable */
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Join Date',
      ...getColumnDateRangeSortProps('join_date'),
    },
    {
      title: 'Terminate Date',
      ...getColumnDateRangeSortProps('termination_date'),
    },
    {
      title: 'Terminated',
      dataIndex: 'is_terminated',
      render: (_, record) => (
        <span>{record.is_terminated === 'YES' ? 'Yes' : 'Not'}</span>
      ),
    },
    {
      title: 'Published',
      dataIndex: 'published',
      render: (_, record) => (
        <span
          style={{
            color: `${record.is_published === 'YES' ? '#75ac2a' : 'red'}`,
          }}
        >
          {record.is_published === 'YES' ? 'Publish' : 'Not Publish'}
        </span>
      ),
    },
    {
      title: 'User Status',
      key: 'user_status',
      ...getColumnSearchFilterSortProps('user.status', {
        filters: [{ text: 'ACTIVE' }, { text: 'INACTIVE' }, { text: 'CLOSED' }],
      }),
      render: ({ user }) => (
        <span
          className="fw-7"
          style={{
            color:
              // eslint-disable-next-line no-nested-ternary
              user.status === 'ACTIVE'
                ? '#8bc53f'
                : user.status === 'CLOSED'
                ? '#900604'
                : '#ed7117',
          }}
        >
          {user.status?.slice(0, 1)}
          {user.status?.slice(1)?.toLowerCase?.()}
        </span>
      ),
    },
    {
      title: 'Order',
      dataIndex: 'order',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'order'),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      /* eslint-disable */
      render: (_, data) => (
        <Space>
          <MemberEdit id={data.id} data={list} />
          <Popconfirm
            title="Are you sure remove this member?"
            onConfirm={() => dispatch(Actions.deleteHubbersTeam(data.user?.id))}
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
          <Button
            size="small"
            type="default"
            icon={<ArrowUpOutlined />}
            loading={status === 'submitting' && orderData.update_id === data.id}
            onClick={() => handleOrderUp(data)}
            disabled={!hasChangeOrderPermission}
          />
          <Button
            size="small"
            type="default"
            loading={status === 'submitting' && orderData.base_id === data.id}
            icon={<ArrowDownOutlined />}
            onClick={() => handleOrderDown(data)}
            disabled={!hasChangeOrderPermission}
          />
        </Space>
      ),
      /* eslint-enable */
    },
  ];
  return (
    <Card>
      <div className="w-100 text-right mb-3">
        <MemberCreate />
      </div>
      <div className="table-responsive">
        <Table
          rowKey="id"
          columns={tableColumns}
          dataSource={list}
          loading={loading}
          className="custom-table"
        />
      </div>
    </Card>
  );
};
export default MemberList;
