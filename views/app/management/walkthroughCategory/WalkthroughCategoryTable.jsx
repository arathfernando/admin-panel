/* eslint-disable camelcase */
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, Table, Tooltip } from 'antd';
import { isArray } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useColumnSearchFilterSort from '../../../../hooks/useColumnSearchFilterSort';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';
import SubmitWalkthroughCategory from './SubmitWalkthroughCategory';

const WalkthroughCategoryTable = () => {
  const dispatch = useDispatch();
  const { data: walkthroughCategorys, loading } = useSelector(
    ({ walkthroughCategory }) => walkthroughCategory.walkthroughCategorys
  );

  const [pagination, setPagenation] = useState({
    current: 1,
    pageSize: 10,
  });

  // update walkthrough category
  const [openSubmitWalkthroughCategory, setOpenSubmitWalkthroughCategory] =
    useState(false);
  const [submitWalkthroughCategoryData, setSubmitWalkthroughCategoryData] =
    useState({});

  const getColumnSearchFilterSortProps = useColumnSearchFilterSort();

  const { hasDeletePermission, hasEditPermission } = usePermission();

  useEffect(() => {
    dispatch(Actions.getWalkthroughCategorys());
  }, [dispatch]);

  const handledeleteWalkthroughCategory = (id) => {
    dispatch(Actions.deleteWalkthroughCategory(id));
  };

  const columns = [
    {
      title: 'ID',
      key: 'id',
      ...getColumnSearchFilterSortProps('id'),
    },
    {
      title: 'Category name',
      key: 'category_name',
      ...getColumnSearchFilterSortProps('category_name'),
    },
    {
      title: 'Steps',
      key: 'step',
      ...getColumnSearchFilterSortProps(({ step }) =>
        step?.map((step) => ` ${step}`).toString()
      ),
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
              setOpenSubmitWalkthroughCategory(true);
              setSubmitWalkthroughCategoryData(data);
            }}
            disabled={!hasEditPermission}
          />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => handledeleteWalkthroughCategory(data.id)}
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
        rowKey="id"
        dataSource={isArray(walkthroughCategorys) ? walkthroughCategorys : []}
        columns={columns}
        className="custom-table"
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: true }}
        loading={loading}
      />
      <SubmitWalkthroughCategory
        open={openSubmitWalkthroughCategory}
        data={submitWalkthroughCategoryData}
        onCancel={() => {
          setOpenSubmitWalkthroughCategory(false);
          setSubmitWalkthroughCategoryData({});
        }}
      />
    </>
  );
};

export default WalkthroughCategoryTable;
