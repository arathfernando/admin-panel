/* eslint-disable camelcase */
import { Button, Popconfirm, Space, Table, Tooltip } from 'antd';
import React, { useState } from 'react';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import UserViwer from '../../../../components/util-components/UserViwer';
import utils from '../../../../helpers/utils/index';
import useColumDateRangeSort from '../../../../hooks/useColumDateRangeSort';
import usePermission from '../../../../hooks/usePermission';
import { deleteInvestorAssignShare } from '../../../../redux/actions';
import AssignShares from './AssignShares';

const InvestorTransactionsTable = () => {
  const { data: investorTransactions, loading } = useSelector(
    ({ investorTransaction }) => investorTransaction.investorTransactions
  );
  const [pagination, setPagenation] = React.useState({
    current: 1,
    pageSize: 10,
  });

  const { hasEditPermission, hasDeletePermission } = usePermission();
  const getColumnDateRangeSortProps = useColumDateRangeSort();

  // states for column filters
  const [areaFilters, setAreaFilters] = useState([{}]);
  const [subAreaFilters, setSubAreaFilters] = useState([{}]);
  const [userNameFilter, setUserNameFilter] = useState([{}]);

  // state for edit page
  const [openInvestorAssignShare, setOpenInvestorAssignShare] = useState(false);
  const [investorAssignShareData, setInvestorAssignShareData] = useState({});

  const dispatch = useDispatch();

  const handledeleteInvestorAssignShare = (id) => {
    dispatch(deleteInvestorAssignShare({ id }));
  };

  const columns = [
    {
      title: 'Date for shares',
      key: 'start_date',
      ...getColumnDateRangeSortProps('start_date'),
    },
    {
      title: 'User',
      render: (_, { user }) => (
        <Link
          to={`/app/investor/investor-transaction/${user?.id}/${
            user.general_profile?.first_name || ''
          } ${user.general_profile?.last_name || ''}`}
        >
          <UserViwer user={user} />{' '}
        </Link>
      ),
      filters: userNameFilter,
      onFilter: (value, { user }) =>
        `${user.general_profile?.first_name} ${user.general_profile?.last_name}`
          ?.toLowerCase()
          .includes(value?.toLowerCase()),
      filterSearch: (input) => {
        setTimeout(() => {
          setUserNameFilter([{ text: input, value: input }]);
        }, 0);
        return true;
      },
      key: 'user',
    },
    {
      title: 'Area',
      render: (_, { share_area }) => share_area?.zone?.area_name,
      key: 'share_area',
      filters: areaFilters,
      onFilter: (value, { share_area }) =>
        share_area?.zone?.area_name
          ?.toLowerCase()
          .includes(value?.toLowerCase()),
      filterSearch: (input) => {
        setTimeout(() => setAreaFilters([{ text: input, value: input }]), 0);
        return true;
      },
    },
    {
      title: 'Subarea',
      render: (_, { share_area }) => share_area?.zone?.subarea_name,
      key: 'subarea',
      filters: subAreaFilters,
      onFilter: (value, { share_area }) =>
        share_area?.zone?.subarea_name
          ?.toLowerCase()
          .includes(value?.toLowerCase()),
      filterSearch: (input) => {
        setTimeout(() => {
          setSubAreaFilters([{ text: input, value: input }]);
        }, 0);
        return true;
      },
    },
    {
      title: 'Number of shares',
      dataIndex: 'share_qty',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'share_qty'),
      key: 'share_qty',
    },
    {
      title: 'Share methods',
      dataIndex: 'share_method',
      key: 'share_method',
      filters: [
        {
          text: 'INITIAL',
          value: 'INITIAL',
        },
        {
          text: 'USER',
          value: 'USER',
        },
        {
          text: 'CONVERSION',
          value: 'CONVERSION',
        },
      ],
      onFilter: (value, record) => record.share_method === value,
    },
    {
      title: '% of shares (by area)',
      dataIndex: 'percent_of_share_by_area',
      render: (_, { percent_of_share_by_area }) =>
        percent_of_share_by_area && `${percent_of_share_by_area} %`,
      key: 'percent_of_share_by_area',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'percent_of_share_by_area'),
    },
    {
      title: 'Share value',
      dataIndex: 'share_value',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'share_value'),
      key: 'share_value',
    },
    {
      title: 'Price paid',
      dataIndex: 'price_paid_usd',
      key: 'price_paid_usd',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'price_paid_usd'),
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
              setOpenInvestorAssignShare(true);
              setInvestorAssignShareData(data);
            }}
            disabled={!hasEditPermission}
          />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => handledeleteInvestorAssignShare(data.id)}
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
        dataSource={investorTransactions}
        columns={columns}
        className="custom-table"
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: true }}
        loading={loading}
      />
      <AssignShares
        open={openInvestorAssignShare}
        type="update"
        data={investorAssignShareData}
        onCancel={() => {
          setOpenInvestorAssignShare(false);
          setInvestorAssignShareData({});
        }}
      />
    </>
  );
};

export default InvestorTransactionsTable;
