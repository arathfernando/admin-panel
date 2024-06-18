/* eslint-disable eqeqeq */
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Button, Image, Popconfirm, Space, Table, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useColumnSearchFilterSort from '../../../../hooks/useColumnSearchFilterSort';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';
import { exchangeProductCateoryOrder } from '../../../../redux/actions';
import CreateProductCategory from './CreateProductCategory';

const ProductCategoryTable = () => {
  const dispatch = useDispatch();
  const { data: productCategories, loading } = useSelector(
    ({ productCategory }) => productCategory.productCategories
  );

  const { hasEditPermission, hasDeletePermission, hasChangeOrderPermission } =
    usePermission();

  const { data: orderData, status } = useSelector(
    (state) => state.productCategory.productCateoryOrderAction
  );

  const [pagination, setPagenation] = useState({
    current: 1,
    pageSize: 10,
  });

  // update product category
  const [openUpdateProductCategory, setOpenUpdateProductCategory] =
    useState(false);
  const [updateProductCategoryData, setUpdateProductCategoryData] = useState(
    {}
  );

  const getColumnSearchFilterSortProps = useColumnSearchFilterSort();

  useEffect(() => {
    dispatch(Actions.getProductCategories());
  }, [dispatch]);

  const handledeleteProductCategory = ({ id, name }) => {
    dispatch(
      Actions.deleteProductCategory({
        id,
        translate: {
          removeKeys: [{ key: name }],
        },
      })
    );
  };

  const handleOrderUp = (elm) => {
    const currecntElId = elm.id;
    const currentOrder = elm.order;
    const downOrderElm = productCategories
      .sort((a, b) => b.order - a.order)
      .find(({ order }) => order < currentOrder);
    const downElId = downOrderElm?.id;
    const orderDownNo = downOrderElm?.order;

    if (currentOrder && currecntElId && downElId && orderDownNo) {
      dispatch(
        exchangeProductCateoryOrder({
          base_id: downElId,
          update_id: currecntElId,
        })
      );
    }
  };
  const handleOrderDown = (elm) => {
    const currecntElId = elm.id;
    const currentOrder = elm.order;
    const upOrderElm = productCategories
      .sort((a, b) => a.order - b.order)
      .find(({ order }) => order > currentOrder);
    const upElId = upOrderElm?.id;
    const orderUpNo = upOrderElm?.order;
    if (currentOrder && currecntElId && upElId && orderUpNo) {
      dispatch(
        exchangeProductCateoryOrder({
          base_id: currecntElId,
          update_id: upElId,
        })
      );
    }
  };

  const columns = [
    {
      title: 'ID',
      key: 'id',
      ...getColumnSearchFilterSortProps('id', { type: 'number' }),
    },
    {
      title: 'Icon',
      render: (_, { cover }) => <Image height={35} width={40} src={cover} />,
      key: 'icon',
    },
    {
      title: 'Name',
      key: 'name',
      ...getColumnSearchFilterSortProps('name'),
    },
    {
      title: 'Description',
      key: 'description',
      ...getColumnSearchFilterSortProps('description'),
    },
    {
      title: 'Order',
      key: 'order',
      ...getColumnSearchFilterSortProps('order', { type: 'number' }),
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
              setOpenUpdateProductCategory(true);
              setUpdateProductCategoryData(data);
            }}
            disabled={!hasEditPermission}
          />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => handledeleteProductCategory(data)}
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
    },
  ];

  const handleTableChange = (params) => {
    setPagenation(params.pagination);
  };

  return (
    <>
      <Table
        dataSource={productCategories}
        columns={columns}
        className="custom-table"
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: true }}
        loading={loading}
      />
      <CreateProductCategory
        open={openUpdateProductCategory}
        data={updateProductCategoryData}
        onCancel={() => {
          setOpenUpdateProductCategory(false);
          setUpdateProductCategoryData({});
        }}
      />
    </>
  );
};

export default ProductCategoryTable;
