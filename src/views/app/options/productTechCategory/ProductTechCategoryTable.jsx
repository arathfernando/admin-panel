/* eslint-disable eqeqeq */
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, Table, Tooltip } from 'antd';
import { isArray } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import utils from '../../../../helpers/utils/index';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';
import CreateProductTechCategory from './CreateProductTechCategory';

const ProductTechCategoryTable = () => {
  const dispatch = useDispatch();
  const { data: productTechCategories, loading } = useSelector(
    ({ productTechCategory }) => productTechCategory.productTechCategories
  );

  const { hasEditPermission, hasDeletePermission } = usePermission();

  const [pagination, setPagenation] = useState({
    current: 1,
    pageSize: 10,
  });

  // update product tech category
  const [openUpdateProductTechCategory, setOpenUpdateProductTechCategory] =
    useState(false);
  const [updateProductTechCategoryData, setUpdateProductTechCategoryData] =
    useState({});

  // filter states
  const [idFilters, setIDFilters] = useState([{}]);
  const [nameFilters, setNameFilters] = useState([{}]);
  const [descriptionFilters, setDescriptionFilters] = useState([{}]);

  useEffect(() => {
    dispatch(Actions.getProductTechCategories());
  }, [dispatch]);

  const handledeleteProductTechCategory = (id) => {
    dispatch(Actions.deleteProductTechCategory(id));
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'id'),
      filters: idFilters,
      onFilter: (value, { id }) => id == value,
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
      title: 'Actions',
      key: 'Actions',
      render: (_, data) => (
        <Space>
          <Button
            type="ghost"
            icon={<EditOutlined />}
            size="small"
            onClick={() => {
              setOpenUpdateProductTechCategory(true);
              setUpdateProductTechCategoryData(data);
            }}
            disabled={!hasEditPermission}
          />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => handledeleteProductTechCategory(data.id)}
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
        dataSource={isArray(productTechCategories) ? productTechCategories : []}
        columns={columns}
        className="custom-table"
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: true }}
        loading={loading}
      />
      <CreateProductTechCategory
        open={openUpdateProductTechCategory}
        data={updateProductTechCategoryData}
        onCancel={() => {
          setOpenUpdateProductTechCategory(false);
          setUpdateProductTechCategoryData({});
        }}
      />
    </>
  );
};

export default ProductTechCategoryTable;
