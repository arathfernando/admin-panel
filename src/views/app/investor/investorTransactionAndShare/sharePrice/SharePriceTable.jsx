/* eslint-disable camelcase */
import { Button, Popconfirm, Space, Table, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import utils from '../../../../../helpers/utils/index';
import useColumDateRangeSort from '../../../../../hooks/useColumDateRangeSort';
import usePermission from '../../../../../hooks/usePermission';
import {
  deleteInvestorSharePrice,
  getSharePrices,
} from '../../../../../redux/actions';
import AssignPrices from './AssignPrice';

const SharePriceTable = () => {
  const { data: sharePrices, loading } = useSelector(
    ({ investorTransaction }) => investorTransaction.sharePrices
  );
  const [pagination, setPagenation] = useState({
    current: 1,
    pageSize: 10,
  });

  // filter states
  const [areaFilters, setAreaFilters] = useState([{}]);
  const [subAreaFilters, setSubAreaFilters] = useState([{}]);

  // state for edit page
  const [openInvestorSharePrice, setOpenInvestorSharePrice] = useState(false);
  const [investorSharePriceData, setInvestorSharePriceData] = useState({});

  const { hasEditPermission, hasDeletePermission } = usePermission();
  const getColumnDateRangeSortProps = useColumDateRangeSort();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSharePrices());
  }, [dispatch]);

  const handledeleteInvestorSharePrice = (id) => {
    dispatch(deleteInvestorSharePrice(id));
  };

  const columns = [
    {
      title: 'Date',
      key: 'createdAt',
      ...getColumnDateRangeSortProps('createdAt'),
    },
    {
      title: 'Area',
      render: (_, { zone }) => zone?.area_name,
      key: 'zone',
      filters: areaFilters,
      onFilter: (value, { zone }) =>
        zone?.area_name?.toLowerCase().includes(value?.toLowerCase()),
      filterSearch: (input) => {
        setTimeout(() => setAreaFilters([{ text: input, value: input }]), 0);
        return true;
      },
    },
    {
      title: 'Subarea',
      render: (_, { zone }) => zone?.subarea_name,
      key: 'subarea',
      filters: subAreaFilters,
      onFilter: (value, { zone }) =>
        zone?.subarea_name?.toLowerCase().includes(value?.toLowerCase()),
      filterSearch: (input) => {
        setTimeout(() => {
          setSubAreaFilters([{ text: input, value: input }]);
        }, 0);
        return true;
      },
    },
    {
      title: 'From which date',
      key: 'from_which_date',
      ...getColumnDateRangeSortProps('from_which_date'),
    },
    {
      title: 'Price share',
      dataIndex: 'price_share',
      key: 'price_share',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'price_share'),
    },
    {
      title: 'Price paid',
      dataIndex: 'price_paid',
      key: 'price_paid',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'price_paid'),
    },
    {
      title: 'Number of shares',
      dataIndex: 'no_of_share',
      key: 'no_of_share',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'no_of_share'),
    },
    {
      title: 'Total value',
      dataIndex: 'total_value',
      key: 'total_value',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'total_value'),
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
              setOpenInvestorSharePrice(true);
              setInvestorSharePriceData(data);
            }}
            disabled={!hasEditPermission}
          />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => handledeleteInvestorSharePrice(data.id)}
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
        dataSource={sharePrices}
        columns={columns}
        className="custom-table"
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: true }}
        loading={loading}
      />
      <AssignPrices
        open={openInvestorSharePrice}
        type="update"
        data={investorSharePriceData}
        onCancel={() => {
          setOpenInvestorSharePrice(false);
          setInvestorSharePriceData({});
        }}
      />
    </>
  );
};

export default SharePriceTable;
