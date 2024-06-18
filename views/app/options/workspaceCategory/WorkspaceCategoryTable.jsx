/* eslint-disable camelcase */
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Image, Popconfirm, Space, Table, Tooltip } from 'antd';
import { isArray } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import utils from '../../../../helpers/utils/index';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';
import CreateWorkspaceCategory from './CreateWorkspaceCategory';

const WorkspaceCategoryTable = () => {
  const dispatch = useDispatch();
  const { data: workspaceCategories, loading } = useSelector(
    ({ workspaceCategory }) => workspaceCategory.workspaceCategories
  );

  const [pagination, setPagenation] = useState({
    current: 1,
    pageSize: 10,
  });

  const { hasEditPermission, hasDeletePermission } = usePermission();

  // update workspace category
  const [openUpdateWorkspaceCategory, setOpenUpdateWorkspaceCategory] =
    useState(false);
  const [updateWorkspaceCategoryData, setUpdateWorkspaceCategoryData] =
    useState({});

  // filter states
  const [IDFilters, setIDFilters] = useState([{}]);
  const [titleFilters, setTitleFilters] = useState([{}]);
  const [descriptionFilters, setDescriptionFilters] = useState([{}]);
  const [shortDescriptionFilters, setShortDescriptionFilters] = useState([{}]);

  useEffect(() => {
    dispatch(Actions.getWorkspaceCategories());
  }, [dispatch]);

  const handledeleteWorkspaceCategory = (data) => {
    dispatch(
      Actions.deleteWorkspaceCategory({
        id: data.id,
        translate: {
          removeKeys: [
            { key: data.title },
            { key: data.description },
            { key: data.short_description },
          ],
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
      filters: IDFilters,
      onFilter: (value, { id }) => id === Number(value),
      filterSearch: (input) => {
        setTimeout(() => setIDFilters([{ text: input, value: input }]), 0);
        return true;
      },
    },
    {
      title: 'Icon',
      render: (_, { icon }) => <Image height={35} width={40} src={icon} />,
      key: 'icon',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      filters: titleFilters,
      onFilter: (value, { title }) =>
        title?.toLowerCase().includes(value?.toLowerCase()),
      filterSearch: (input) => {
        setTimeout(() => setTitleFilters([{ text: input, value: input }]), 0);
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
      title: 'Short description',
      dataIndex: 'short_description',
      key: 'short_description',
      filters: shortDescriptionFilters,
      onFilter: (value, { description }) =>
        description?.toLowerCase().includes(value?.toLowerCase()),
      filterSearch: (input) => {
        setTimeout(
          () => setShortDescriptionFilters([{ text: input, value: input }]),
          0
        );
        return true;
      },
    },
    {
      title: 'Icon',
      render: (_, { co_created_with }) => (
        <Image height={35} width={40} src={co_created_with} />
      ),
      key: 'co_created_with',
    },
    {
      title: 'Label',
      dataIndex: 'label',
      key: 'label',
      filters: [
        {
          value: 'BETA',
          text: 'BETA',
        },
        {
          value: 'CO_CREATING',
          text: 'CO_CREATING',
        },
      ],
      onFilter: (value, { label }) => label === value,
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
              setOpenUpdateWorkspaceCategory(true);
              setUpdateWorkspaceCategoryData(data);
            }}
            disabled={!hasEditPermission}
          />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => handledeleteWorkspaceCategory(data)}
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
        dataSource={isArray(workspaceCategories) ? workspaceCategories : []}
        columns={columns}
        className="custom-table"
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: true }}
        loading={loading}
      />
      <CreateWorkspaceCategory
        open={openUpdateWorkspaceCategory}
        data={updateWorkspaceCategoryData}
        onCancel={() => {
          setOpenUpdateWorkspaceCategory(false);
          setUpdateWorkspaceCategoryData({});
        }}
      />
    </>
  );
};

export default WorkspaceCategoryTable;
