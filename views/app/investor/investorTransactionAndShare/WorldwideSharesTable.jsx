/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, Table, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import utils from '../../../../helpers/utils/index';
import useColumDateRangeSort from '../../../../hooks/useColumDateRangeSort';
import usePermission from '../../../../hooks/usePermission';
import {
  deleteInvestorArea,
  getInvestorWorldwideShares,
} from '../../../../redux/actions';
import CreateArea from './CreateArea';

const WorldwideSharesTable = () => {
  const { data: investorWorldwideShares, loading } = useSelector(
    ({ investorWorldwideShare }) =>
      investorWorldwideShare.investorWorldwideShares
  );
  const [pagination, setPagenation] = React.useState({
    current: 1,
    pageSize: 10,
  });

  // filter states
  const [areaFilters, setAreaFilters] = useState([{}]);
  const [subAreaFilters, setSubAreaFilters] = useState([{}]);

  // state for edit page
  const [openInvestorArea, setOpenInvestorArea] = useState(false);
  const [investorAreaData, setInvestorAreaData] = useState({});

  const { hasEditPermission, hasDeletePermission } = usePermission();
  const getColumnDateRangeSortProps = useColumDateRangeSort();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInvestorWorldwideShares());
  }, [dispatch]);

  const handledeleteInvestorArea = (id) => {
    dispatch(deleteInvestorArea(id));
  };

  const columns = [
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
      title: 'Total share %',
      render: (_, { share_percentage }) => `${share_percentage}%`,
      key: 'share_percentage',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'share_percentage'),
    },
    {
      title: 'Total amount share',
      dataIndex: 'amount_share',
      key: 'amount_share',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'amount_share'),
    },
    {
      title: 'Total HBS',
      dataIndex: 'amount_share',
      key: 'amount_share',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'amount_share'),
    },
    {
      title: 'Date start area (Expected)',
      ...getColumnDateRangeSortProps('expected_start_date'),
    },
    {
      title: 'Global share (y/n)',
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
      title: 'Actions',
      key: 'Actions',
      render: (_, data) => (
        <Space>
          <Button
            type="ghost"
            icon={<EditOutlined />}
            size="small"
            onClick={() => {
              setOpenInvestorArea(true);
              setInvestorAreaData(data);
            }}
            disabled={!hasEditPermission}
          />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => handledeleteInvestorArea(data.id)}
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
        dataSource={investorWorldwideShares}
        columns={columns}
        className="custom-table"
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: true }}
        loading={loading}
      />
      <CreateArea
        open={openInvestorArea}
        type="update"
        data={investorAreaData}
        onCancel={() => {
          setOpenInvestorArea(false);
          setInvestorAreaData({});
        }}
      />
    </>
  );
};

export default WorldwideSharesTable;
