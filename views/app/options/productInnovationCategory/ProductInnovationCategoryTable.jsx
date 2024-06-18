/* eslint-disable eqeqeq */
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, Table, Tooltip } from 'antd';
import { isArray } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import utils from '../../../../helpers/utils/index';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';
import CreateProductInnovationCategory from './CreateProductInnovationCategory';

const ProductInnovationCategoryTable = () => {
  const dispatch = useDispatch();
  const { data: productInnovationCategories, loading } = useSelector(
    ({ productInnovationCategory }) =>
      productInnovationCategory.productInnovationCategories
  );

  const [pagination, setPagenation] = useState({
    current: 1,
    pageSize: 10,
  });

  const { hasEditPermission, hasDeletePermission } = usePermission();

  // update product innovation category
  const [
    openUpdateProductInnovationCategory,
    setOpenUpdateProductInnovationCategory,
  ] = useState(false);
  const [
    updateProductInnovationCategoryData,
    setUpdateProductInnovationCategoryData,
  ] = useState({});

  // filter states
  const [idFilters, setIDFilters] = useState([{}]);
  const [nameFilters, setNameFilters] = useState([{}]);
  const [descriptionFilters, setDescriptionFilters] = useState([{}]);

  useEffect(() => {
    dispatch(Actions.getProductInnovationCategories());
  }, [dispatch]);

  const handledeleteProductInnovationCategory = (id) => {
    dispatch(Actions.deleteProductInnovationCategory(id));
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
              setOpenUpdateProductInnovationCategory(true);
              setUpdateProductInnovationCategoryData(data);
            }}
            disabled={!hasEditPermission}
          />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => handledeleteProductInnovationCategory(data.id)}
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
        dataSource={
          isArray(productInnovationCategories)
            ? productInnovationCategories
            : []
        }
        columns={columns}
        className="custom-table"
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: true }}
        loading={loading}
      />
      <CreateProductInnovationCategory
        open={openUpdateProductInnovationCategory}
        data={updateProductInnovationCategoryData}
        onCancel={() => {
          setOpenUpdateProductInnovationCategory(false);
          setUpdateProductInnovationCategoryData({});
        }}
      />
    </>
  );
};

export default ProductInnovationCategoryTable;
