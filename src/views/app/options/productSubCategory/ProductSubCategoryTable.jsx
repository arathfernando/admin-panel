/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Button, Image, Popconfirm, Space, Table, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import utils from '../../../../helpers/utils/index';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';
import { exchangeProductSubcateoryOrder } from '../../../../redux/actions';
import CreateProductSubCategory from './CreateProductSubCategory';

const ProductSubCategoryTable = () => {
  const dispatch = useDispatch();
  const { data: productSubCategories, loading } = useSelector(
    ({ productSubCategory }) => productSubCategory.productSubCategories
  );
  const { data: productCategories } = useSelector(
    ({ productCategory }) => productCategory.productCategories
  );
  const { data: orderData, status } = useSelector(
    (state) => state.productSubCategory.productSubcateoryOrderAction
  );

  const [pagination, setPagenation] = useState({
    current: 1,
    pageSize: 10,
  });

  const { hasEditPermission, hasDeletePermission, hasChangeOrderPermission } =
    usePermission();

  // update product subcategory
  const [openUpdateProductSubCategory, setOpenUpdateProductSubCategory] =
    useState(false);
  const [updateProductSubCategoryData, setUpdateProductSubCategoryData] =
    useState({});

  // filter states
  const [idFilters, setIDFilters] = useState([{}]);
  const [nameFilters, setNameFilters] = useState([{}]);
  const [descriptionFilters, setDescriptionFilters] = useState([{}]);
  const [orderFilters, setOrderFilters] = useState([{}]);

  useEffect(() => {
    dispatch(Actions.getProductSubCategories());
    dispatch(Actions.getProductCategories());
  }, [dispatch]);

  const handledeleteProductSubCategory = ({ id, name }) => {
    dispatch(
      Actions.deleteProductSubcategory({
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
    const downOrderElm = productSubCategories
      .sort((a, b) => b.order - a.order)
      .find(({ order }) => order < currentOrder);
    const downElId = downOrderElm?.id;
    const orderDownNo = downOrderElm?.order;

    if (currentOrder && currecntElId && downElId && orderDownNo) {
      dispatch(
        exchangeProductSubcateoryOrder({
          base_id: downElId,
          update_id: currecntElId,
        })
      );
    }
  };
  const handleOrderDown = (elm) => {
    const currecntElId = elm.id;
    const currentOrder = elm.order;
    const upOrderElm = productSubCategories
      .sort((a, b) => a.order - b.order)
      .find(({ order }) => order > currentOrder);
    const upElId = upOrderElm?.id;
    const orderUpNo = upOrderElm?.order;
    if (currentOrder && currecntElId && upElId && orderUpNo) {
      dispatch(
        exchangeProductSubcateoryOrder({
          base_id: currecntElId,
          update_id: upElId,
        })
      );
    }
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
      title: 'Product category',
      render: (_, { product_category }) => product_category?.name,
      key: 'product_category_id',
      filters: productCategories?.map?.(
        ({ id: value, name: text }) =>
          ({
            value,
            text,
          } || [])
      ),
      onFilter: (value, { product_category }) =>
        product_category?.id === Number(value),
      filterSearch: true,
    },
    {
      title: 'Icon',
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
      title: 'Order',
      dataIndex: 'order',
      key: 'order',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'order'),
      filters: orderFilters,
      onFilter: (value, { order }) => order == value,
      filterSearch: (input) => {
        setTimeout(() => setOrderFilters([{ text: input, value: input }]), 0);
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
              setOpenUpdateProductSubCategory(true);
              setUpdateProductSubCategoryData(data);
            }}
            disabled={!hasEditPermission}
          />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => handledeleteProductSubCategory(data)}
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
        dataSource={productSubCategories}
        columns={columns}
        className="custom-table"
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: true }}
        loading={loading}
      />
      <CreateProductSubCategory
        open={openUpdateProductSubCategory}
        data={updateProductSubCategoryData}
        onCancel={() => {
          setOpenUpdateProductSubCategory(false);
          setUpdateProductSubCategoryData({});
        }}
      />
    </>
  );
};

export default ProductSubCategoryTable;
