/* eslint-disable camelcase */
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Image, Popconfirm, Space, Table, Tooltip } from 'antd';
import { isArray } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import utils from '../../../../helpers/utils/index';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';
import CreateBadge from './CreateBadge';

const BadgeTable = () => {
  const dispatch = useDispatch();
  const { data: badges, loading } = useSelector(({ badge }) => badge.badges);

  const { hasEditPermission, hasDeletePermission } = usePermission();

  const [pagination, setPagenation] = useState({
    current: 1,
    pageSize: 10,
  });

  // update badge
  const [openUpdateBadge, setOpenUpdateBadge] = useState(false);
  const [updateBadgeData, setUpdateBadgeData] = useState({});

  // filter states
  const [IDFilters, setIDFilters] = useState([{}]);
  const [badgeNameFilters, setBadgeNameFilters] = useState([{}]);
  const [badgeCategoryFilters, setBadgeCategoryFilters] = useState([{}]);
  const [levelFilters, setLevelFilters] = useState([{}]);
  const [hbbPointsFilters, setHbbPointsFilters] = useState([{}]);

  useEffect(() => {
    dispatch(Actions.getBadges());
  }, [dispatch]);

  const handledeleteBadge = (id) => {
    dispatch(Actions.deleteBadge(id));
  };

  const columns = [
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
      title: 'Badge name',
      dataIndex: 'badge_name',
      key: 'badge_name',
      filters: badgeNameFilters,
      onFilter: (value, { badge_name }) =>
        badge_name?.toLowerCase?.().includes(value?.toLowerCase?.()),
      filterSearch: (input) => {
        setTimeout(
          () => setBadgeNameFilters([{ text: input, value: input }]),
          0
        );
        return true;
      },
    },
    {
      title: 'Badge category',
      dataIndex: 'badge_category',
      key: 'badge_category',
      filters: badgeCategoryFilters,
      onFilter: (value, { badge_category }) =>
        badge_category?.toLowerCase?.().includes(value?.toLowerCase?.()),
      filterSearch: (input) => {
        setTimeout(
          () => setBadgeCategoryFilters([{ text: input, value: input }]),
          0
        );
        return true;
      },
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'level'),
      filters: levelFilters,
      onFilter: (value, { level }) => level === Number(value),
      filterSearch: (input) => {
        setTimeout(() => setLevelFilters([{ text: input, value: input }]), 0);
        return true;
      },
    },
    {
      title: 'HBB points',
      dataIndex: 'hbb_points',
      key: 'hbb_points',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'hbb_points'),
      filters: hbbPointsFilters,
      onFilter: (value, { hbb_points }) => hbb_points === Number(value),
      filterSearch: (input) => {
        setTimeout(
          () => setHbbPointsFilters([{ text: input, value: input }]),
          0
        );
        return true;
      },
    },
    {
      title: 'Badge image',
      render: (_, { badge_image }) => (
        <Image height={35} width={40} src={badge_image} />
      ),
      key: 'badge_image',
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
              setOpenUpdateBadge(true);
              setUpdateBadgeData(data);
            }}
            disabled={!hasEditPermission}
          />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => handledeleteBadge(data.id)}
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
        dataSource={isArray(badges) ? badges : []}
        columns={columns}
        className="custom-table"
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: true }}
        loading={loading}
      />
      <CreateBadge
        open={openUpdateBadge}
        data={updateBadgeData}
        onCancel={() => {
          setOpenUpdateBadge(false);
          setUpdateBadgeData({});
        }}
      />
    </>
  );
};

export default BadgeTable;
