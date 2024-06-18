/* eslint-disable camelcase */
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, Table, Tooltip } from 'antd';
import { isArray } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import UserViwer from '../../../components/util-components/UserViwer';
import utils from '../../../helpers/utils/index';
import useColumDateRangeSort from '../../../hooks/useColumDateRangeSort';
import usePermission from '../../../hooks/usePermission';
import * as Actions from '../../../redux/actions';
import CreateProductLauncher from './CreateProductLauncher';

const ProductLauncherTable = () => {
  const dispatch = useDispatch();
  const { data: productLaunchers, loading } = useSelector(
    ({ product }) => product.productLaunchers
  );
  const { data: productCategories } = useSelector(
    ({ productCategory }) => productCategory.productCategories
  );

  const { hasEditPermission, hasDeletePermission } = usePermission();

  const [pagination, setPagenation] = useState({
    current: 1,
    pageSize: 10,
  });

  // update expertmar ketplace
  const [openUpdateProductLauncher, setOpenUpdateProductLauncher] =
    useState(false);
  const getColumnDateRangeSortProps = useColumDateRangeSort();

  // filter states
  const [IDFilters, setIDFilters] = useState([{}]);
  const [projectNameFilters, setProjectNameFilters] = useState([{}]);
  const [projectDescriptionFilters, setProjectDescriptionFilters] = useState([
    {},
  ]);
  const [createdByFilters, setCreatedByFilters] = useState([{}]);

  const history = useHistory();

  useEffect(() => {
    dispatch(Actions.getProductLaunchers());
    dispatch(Actions.getProductCategories());
  }, [dispatch]);

  const handledeleteProductLauncher = (id) => {
    dispatch(Actions.deleteProductLauncher(id));
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
      title: 'Project name',
      render: (_, { project_name, id }) => (
        <Link to={`/app/product-launcher/${id}/${project_name}`}>
          <span>{project_name}</span>
        </Link>
      ),
      key: 'project_name',
      filters: projectNameFilters,
      onFilter: (value, { project_name }) =>
        project_name?.toLowerCase().includes(value?.toLowerCase()),
      filterSearch: (input) => {
        setTimeout(
          () => setProjectNameFilters([{ text: input, value: input }]),
          0
        );
        return true;
      },
    },
    {
      title: 'Description',
      dataIndex: 'project_description',
      key: 'project_description',
      filters: projectDescriptionFilters,
      onFilter: (value, { project_description }) =>
        project_description?.toLowerCase().includes(value?.toLowerCase()),
      filterSearch: (input) => {
        setTimeout(
          () => setProjectDescriptionFilters([{ text: input, value: input }]),
          0
        );
        return true;
      },
    },
    {
      title: 'Category',
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
    },
    {
      title: 'Date created',
      key: 'createdAt',
      ...getColumnDateRangeSortProps('createdAt'),
    },
    {
      title: 'Created by',
      render: (_, { created_by }) => <UserViwer user={created_by} />,
      key: 'created_by',
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
              history.push(`/app/product-launcher/edit/${data.id}`);
            }}
            disabled={!hasEditPermission}
          />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => handledeleteProductLauncher(data.id)}
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
        dataSource={isArray(productLaunchers) ? productLaunchers : []}
        columns={columns}
        className="custom-table"
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: true }}
        loading={loading}
      />
      <CreateProductLauncher
        open={openUpdateProductLauncher}
        onCancel={() => {
          setOpenUpdateProductLauncher(false);
        }}
      />
    </>
  );
};

export default ProductLauncherTable;
