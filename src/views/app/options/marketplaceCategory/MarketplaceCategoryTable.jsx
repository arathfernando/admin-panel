/* eslint-disable camelcase */
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Image, Popconfirm, Space, Table, Tooltip } from 'antd';
import { isArray } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserViwer from '../../../../components/util-components/UserViwer';
import utils from '../../../../helpers/utils/index';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';
import CreateMarketplaceCategory from './CreateMarketplaceCategory';

const MarketplaceCategoryTable = () => {
  const dispatch = useDispatch();
  const { data: marketplaceCategories, loading } = useSelector(
    ({ marketplaceCategory }) => marketplaceCategory.marketplaceCategories
  );

  const [pagination, setPagenation] = useState({
    current: 1,
    pageSize: 10,
  });

  const { hasEditPermission, hasDeletePermission } = usePermission();

  // update marketplace category
  const [openUpdateMarketplaceCategory, setOpenUpdateMarketplaceCategory] =
    useState(false);
  const [updateMarketplaceCategoryData, setUpdateMarketplaceCategoryData] =
    useState({});

  // filter states
  const [idFilters, setIDFilters] = useState([{}]);
  const [createdByFilters, setCreatedByFilters] = useState([{}]);
  const [nameFilters, setNameFilters] = useState([{}]);
  const [descriptionFilters, setDescriptionFilters] = useState([{}]);

  useEffect(() => {
    dispatch(Actions.getMarketplaceCategories());
  }, [dispatch]);

  const handledeleteMarketplaceCategory = ({ id, name, description }) => {
    dispatch(
      Actions.deleteMarketplaceCategory({
        id,
        translate: {
          removeKeys: [{ key: name }, { key: description }],
        },
      })
    );
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'id'),
      filters: idFilters,
      onFilter: (value, { id }) => `${id}` === value,
      filterSearch: (input) => {
        setTimeout(() => setIDFilters([{ text: input, value: input }]), 0);
        return true;
      },
    },
    {
      title: 'Cover',
      render: (_, { cover }) => <Image height={35} width={40} src={cover} />,
      key: 'cover',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filters: nameFilters,
      onFilter: (value, { name }) =>
        name?.toLowerCase().includes(value?.toLowerCase()),
      filterSearch: (input) => {
        setTimeout(() => setNameFilters([{ text: input, value: input }]), 0);
        return true;
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      filters: descriptionFilters,
      onFilter: (value, { description }) =>
        description?.toLowerCase().includes(value?.toLowerCase()),
      filterSearch: (input) => {
        setTimeout(
          () => setDescriptionFilters([{ text: input, value: input }]),
          0
        );
        return true;
      },
    },
    {
      title: 'Date created',
      render: (_, { createdAt }) => moment(createdAt).format('DD/MM/YYYY'),
      key: 'createdAt',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'createdAt'),
    },
    {
      title: 'Created by',
      render: (_, { created_by }) => <UserViwer user={created_by} />,
      key: 'created_by',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'created_by'),
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
      title: 'Actions',
      key: 'Actions',
      render: (_, data) => (
        <Space>
          <Button
            type="ghost"
            icon={<EditOutlined />}
            size="small"
            onClick={() => {
              setOpenUpdateMarketplaceCategory(true);
              setUpdateMarketplaceCategoryData(data);
            }}
            disabled={!hasEditPermission}
          />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => handledeleteMarketplaceCategory(data)}
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
        dataSource={isArray(marketplaceCategories) ? marketplaceCategories : []}
        columns={columns}
        className="custom-table"
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: true }}
        loading={loading}
      />
      <CreateMarketplaceCategory
        open={openUpdateMarketplaceCategory}
        data={updateMarketplaceCategoryData}
        onCancel={() => {
          setOpenUpdateMarketplaceCategory(false);
          setUpdateMarketplaceCategoryData({});
        }}
      />
    </>
  );
};

export default MarketplaceCategoryTable;
