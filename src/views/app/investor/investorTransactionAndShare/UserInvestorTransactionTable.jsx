/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, Table, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import utils from '../../../../helpers/utils/index';
import useColumDateRangeSort from '../../../../hooks/useColumDateRangeSort';
import usePermission from '../../../../hooks/usePermission';
import { deleteInvestorAssignShare } from '../../../../redux/actions';
import AssignShares from './AssignShares';

const UserInvestorTransactionTable = () => {
  const { data: investorTransactionsOfUser, loading } = useSelector(
    ({ investorTransaction }) => investorTransaction.investorTransactionsOfUser
  );
  const [pagination, setPagenation] = React.useState({
    current: 1,
    pageSize: 10,
  });

  // states for column filters
  const [areaFilters, setAreaFilters] = useState([{}]);
  const [subAreaFilters, setSubAreaFilters] = useState([{}]);
  const [openInvestorAssignShare, setOpenInvestorAssignShare] = useState(false);
  const [investorAssignShareData, setInvestorAssignShareData] = useState({});

  const { hasEditPermission, hasDeletePermission } = usePermission();
  const getColumnDateRangeSortProps = useColumDateRangeSort();

  const dispatch = useDispatch();
  const { userId } = useParams();

  const handledeleteInvestorAssignShare = (id) => {
    dispatch(deleteInvestorAssignShare({ id, userId }));
  };

  const columns = [
    {
      title: 'Received date',
      key: 'start_date',
      ...getColumnDateRangeSortProps('start_date'),
    },
    {
      title: 'Global',
      key: 'global_share',
      render: (_, { global_share }) =>
        global_share === 'YES'
          ? 'Yes'
          : global_share === 'NO'
          ? 'No'
          : global_share,
      filters: [
        {
          text: 'Yes',
          value: 'YES',
        },
        {
          text: 'No',
          value: 'NO',
        },
      ],
      onFilter: (value, record) => record.global_share === value,
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
      title: 'Sub-area',
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
      title: 'Initial total price (USD)',
      dataIndex: 'price_paid_usd',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'price_paid_usd'),
      key: 'price_paid_usd',
    },
    {
      title: 'Price to date',
      dataIndex: 'price_to_date',
      key: 'price_to_date',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'price_to_date'),
    },
    {
      title: 'Gain value',
      dataIndex: 'gain_value',
      key: 'gain_value',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'gain_value'),
    },
    {
      title: 'Total increase',
      dataIndex: 'total_increase',
      key: 'total_increase',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'total_increase'),
    },
    {
      title: 'Annualised return',
      dataIndex: 'anual_return',
      key: 'anual_return',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'anual_return'),
    },
    {
      title: 'Number of days invested',
      dataIndex: 'number_of_days_invested',
      key: 'number_of_days_invested',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'number_of_days_invested'),
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
        dataSource={investorTransactionsOfUser}
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

export default UserInvestorTransactionTable;
