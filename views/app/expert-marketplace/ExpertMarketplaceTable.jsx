/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, Table, Tooltip } from 'antd';
import { isArray, isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import UserViwer from '../../../components/util-components/UserViwer';
import utils from '../../../helpers/utils/index';
import useColumDateRangeSort from '../../../hooks/useColumDateRangeSort';
import usePermission from '../../../hooks/usePermission';
import * as Actions from '../../../redux/actions';
import {
  getProductCategories,
  getProductSubCategories,
  getProductSubCategoryFAQ,
  getWorkspaceCategories,
} from '../../../redux/actions';
import ExpertiseCreateEdit from './ExpertMarketplaceCreateEdit.jsx';

const ExpertMarketplaceTable = () => {
  const dispatch = useDispatch();
  const { data: expertMarketplaces, loading } = useSelector(
    ({ marketplace }) => marketplace.expertMarketplaces
  );

  const { data: marketplaceCategories } = useSelector(
    ({ marketplaceCategory }) => marketplaceCategory.marketplaceCategories
  );

  const { data: productCategory } = useSelector(
    ({ productCategory }) => productCategory.productCategories
  );

  const { data: productSubcategories } = useSelector(
    ({ productSubCategory }) => productSubCategory.productSubCategories
  );

  const { data: productSubcategoryFaq } = useSelector(
    ({ productSubCategoryFAQ }) => productSubCategoryFAQ.productSubCategoryFAQ
  );

  const { data: workspaces } = useSelector(
    ({ workspaceCategory }) => workspaceCategory.workspaceCategories
  );

  const [pagination, setPagenation] = useState({
    current: 1,
    pageSize: 10,
  });

  // update expertmarketplace
  const [openUpdateExpertMarketplace, setOpenUpdateExpertMarketplace] =
    useState(false);
  const [updateExpertMarketplaceData, setUpdateExpertMarketplaceData] =
    useState({});

  const { hasEditPermission, hasDeletePermission } = usePermission();
  const getColumnDateRangeSortProps = useColumDateRangeSort();

  // filter states
  const [IDFilters, setIDFilters] = useState([{}]);
  const [expertiseTitleFilters, setExpertiseTitleFilters] = useState([{}]);
  const [createdByFilters, setCreatedByFilters] = useState([{}]);

  const history = useHistory();

  useEffect(() => {
    dispatch(Actions.getExpertMarketplaces());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProductCategories());
    dispatch(getProductSubCategories());
    dispatch(getProductSubCategoryFAQ());
    dispatch(getWorkspaceCategories());
  }, [dispatch]);

  const handledeleteExpertMarketplace = (id) => {
    dispatch(Actions.deleteExpertMarketplace(id));
    dispatch(Actions.getMarketplaceCategories());
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
      title: 'Expertise title',
      render: (_, { expertise_title, id }) => (
        <Link to={`/app/expert-marketplace/expetises/${id}/${expertise_title}`}>
          <span>{expertise_title}</span>
        </Link>
      ),
      key: 'expertise_title',
      filters: expertiseTitleFilters,
      onFilter: (value, { expertise_title }) =>
        expertise_title?.toLowerCase().includes(value?.toLowerCase()),
      filterSearch: (input) => {
        setTimeout(
          () => setExpertiseTitleFilters([{ text: input, value: input }]),
          0
        );
        return true;
      },
    },
    {
      title: 'Category',
      render: (_, { categories }) =>
        categories?.map?.(
          ({ name }, indx) =>
            `${name}${categories.length > indx + 1 ? ', ' : ''}`
        ),
      key: 'categories',
      filters: marketplaceCategories?.map?.(
        ({ id: value, name: text }) =>
          ({
            value,
            text,
          } || [])
      ),
      onFilter: (value, { categories }) => {
        const matchedCategories = categories.filter(({ id }) => id === value);

        return !isEmpty(matchedCategories);
      },
    },
    {
      title: 'Date created',
      key: 'created_at',
      ...getColumnDateRangeSortProps('created_at'),
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
      title: 'Workspace',
      render: (_, { workspace_id }) => (
        <span>{workspace_id?.workspace_type?.title}</span>
      ),
      key: 'workspace_id',
      filters: workspaces?.map?.(
        ({ id: value, title: text }) =>
          ({
            value,
            text,
          } || [])
      ),
      onFilter: (value, { workspace_id }) =>
        workspace_id?.workspace_type?.id === value,
    },
    {
      title: 'Product category',
      render: (_, { product_category }) => (
        <span>{product_category?.name}</span>
      ),
      key: 'product_category',
      filters: productCategory?.map?.(
        ({ id: value, name: text }) =>
          ({
            value,
            text,
          } || [])
      ),
      onFilter: (value, { product_category }) => product_category?.id === value,
    },
    {
      title: 'Product subcategory',
      render: (_, { product_sub_category }) => (
        <span>{product_sub_category?.name}</span>
      ),
      key: 'product_sub_category',
      filters: productSubcategories?.map?.(
        ({ id: value, name: text }) =>
          ({
            value,
            text,
          } || [])
      ),
      onFilter: (value, { product_sub_category }) =>
        product_sub_category?.id === value,
    },
    {
      title: 'Product subcategory faq',
      render: (_, { product_sub_faq }) => (
        <span>{product_sub_faq?.question}</span>
      ),
      key: 'product_sub_faq',
      filters: productSubcategoryFaq?.map?.(
        ({ id: value, question: text }) =>
          ({
            value,
            text,
          } || [])
      ),
      onFilter: (value, { product_sub_faq }) => product_sub_faq?.id === value,
    },
    {
      title: 'Gig status',
      dataIndex: 'gig_status',
      key: 'gig_status',
      filters: [
        { value: 'PENDING', text: 'PENDING' },
        { value: 'DRAFT', text: 'DRAFT' },
        { value: 'PUBLISHED', text: 'PUBLISHED' },
      ],
      onFilter: (value, { gig_status }) => gig_status === value,
    },
    {
      title: 'Actions',
      key: 'Actions',
      fixed: 'right',
      render: (_, data) => (
        <Space>
          <Button
            type="ghost"
            icon={<EditOutlined />}
            size="small"
            onClick={() => {
              history.push(`/app/expert-marketplace/expetises/${data.id}`);
              setOpenUpdateExpertMarketplace(true);
              setUpdateExpertMarketplaceData(data);
            }}
            disabled={!hasEditPermission}
          />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => handledeleteExpertMarketplace(data.id)}
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
        dataSource={isArray(expertMarketplaces) ? expertMarketplaces : []}
        columns={columns}
        className="custom-table"
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: true }}
        loading={loading}
      />

      <ExpertiseCreateEdit
        open={openUpdateExpertMarketplace}
        data={updateExpertMarketplaceData}
        onClose={() => {
          setOpenUpdateExpertMarketplace(false);
          setUpdateExpertMarketplaceData({});
        }}
      />
    </>
  );
};

export default ExpertMarketplaceTable;
