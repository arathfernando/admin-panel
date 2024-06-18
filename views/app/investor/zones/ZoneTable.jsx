/* eslint-disable camelcase */
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, Table, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import utils from '../../../../helpers/utils/index';
import useColumDateRangeSort from '../../../../hooks/useColumDateRangeSort';
import usePermission from '../../../../hooks/usePermission';
import {
  deleteInvestorZone,
  getInvestorZones,
} from '../../../../redux/actions';
import ViewZone from './CreateZone';

const ZoneTable = () => {
  const { data: investorZones, loading } = useSelector(
    ({ investorZone }) => investorZone.investorZones
  );
  const [pagination, setPagenation] = useState({
    current: 1,
    pageSize: 10,
  });

  const { hasEditPermission, hasDeletePermission } = usePermission();
  const getColumnDateRangeSortProps = useColumDateRangeSort();

  // view zone
  const [openViewZone, setOpenViewZone] = useState(false);
  const [viewZoneData, setviewZoneData] = useState({});
  const [actionType, setActionType] = useState('update');

  // filter states
  const [communityIdFilters, setCommunityIdFilters] = useState([{}]);
  const [areaFilters, setAreaFilters] = useState([{}]);
  const [subAreaFilters, setSubAreaFilters] = useState([{}]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInvestorZones());
  }, [dispatch]);

  const handledeleteInvestorZone = (id) => {
    dispatch(deleteInvestorZone(id));
  };

  const columns = [
    {
      title: 'Community ID',
      render: (_, { community_id }) =>
        community_id && (
          <a
            href={`${process.env.REACT_APP_HUBBERS_DOMAIN}/desk/community/${community_id}`}
            target="_blank"
            rel="noreferrer"
          >
            {community_id}
          </a>
        ),
      key: 'community_id',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'community_id'),
      filters: communityIdFilters,
      onFilter: (value, { community_id }) =>
        community_id?.toLowerCase().includes(value?.toLowerCase()),
      filterSearch: (input) => {
        setTimeout(
          () => setCommunityIdFilters([{ text: input, value: input }]),
          0
        );
        return true;
      },
    },
    {
      title: 'Area name',
      dataIndex: 'area_name',
      key: 'area_name',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'area_name'),
      filters: areaFilters,
      onFilter: (value, { area_name }) =>
        area_name?.toLowerCase().includes(value?.toLowerCase()),
      filterSearch: (input) => {
        setTimeout(() => setAreaFilters([{ text: input, value: input }]), 0);
        return true;
      },
    },
    {
      title: 'Subarea name',
      dataIndex: 'subarea_name',
      key: 'subarea_name',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'subarea_name'),
      filters: subAreaFilters,
      onFilter: (value, { subarea_name }) =>
        subarea_name?.toLowerCase().includes(value?.toLowerCase()),
      filterSearch: (input) => {
        setTimeout(() => {
          setSubAreaFilters([{ text: input, value: input }]);
        }, 0);
        return true;
      },
    },
    {
      title: 'Date created',
      ...getColumnDateRangeSortProps('createdAt'),
    },
    {
      title: 'Actions',
      key: 'Actions',
      render: (_, data) => (
        <Space>
          <Button
            type="ghost"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => {
              setOpenViewZone(true);
              setviewZoneData(data);
              setActionType('view');
            }}
            disabled={!hasEditPermission}
          />
          <Button
            type="ghost"
            icon={<EditOutlined />}
            size="small"
            onClick={() => {
              setOpenViewZone(true);
              setviewZoneData(data);
              setActionType('update');
            }}
            disabled={!hasEditPermission}
          />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => handledeleteInvestorZone(data.id)}
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
        dataSource={investorZones}
        columns={columns}
        className="custom-table"
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: true }}
        loading={loading}
      />
      <ViewZone
        open={openViewZone}
        type={actionType}
        data={viewZoneData}
        onCancel={() => {
          setOpenViewZone(false);
          setviewZoneData({});
        }}
      />
    </>
  );
};

export default ZoneTable;
