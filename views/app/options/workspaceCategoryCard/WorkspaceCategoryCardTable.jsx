/* eslint-disable camelcase */
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, Table, Tooltip } from 'antd';
import { isArray } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import utils from '../../../../helpers/utils/index';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';
import CreateWorkspaceCategoryCard from './CreateWorkspaceCategoryCard';

const WorkspaceCategoryCardTable = () => {
  const dispatch = useDispatch();
  const { data: workspaceCategoryCards, loading } = useSelector(
    ({ workspaceCategoryCard }) => workspaceCategoryCard.workspaceCategoryCards
  );
  const { data: workspaceCategories } = useSelector(
    ({ workspaceCategory }) => workspaceCategory.workspaceCategories
  );

  const [pagination, setPagenation] = useState({
    current: 1,
    pageSize: 10,
  });

  const { hasEditPermission, hasDeletePermission } = usePermission();

  // update workspace category card
  const [openUpdateWorkspaceCategoryCard, setOpenUpdateWorkspaceCategoryCard] =
    useState(false);
  const [updateWorkspaceCategoryCardData, setUpdateWorkspaceCategoryCardData] =
    useState({});

  // filter states
  const [IDFilters, setIDFilters] = useState([{}]);
  const [titleFilters, setTitleFilters] = useState([{}]);
  const [descriptionFilters, setDescriptionFilters] = useState([{}]);
  const [orderFilters, setOrderFilters] = useState([{}]);

  useEffect(() => {
    dispatch(Actions.getWorkspaceCategoryCards());
    dispatch(Actions.getWorkspaceCategories());
  }, [dispatch]);

  const handledeleteWorkspaceCategoryCard = (id) => {
    dispatch(Actions.deleteWorkspaceCategoryCard(id));
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
      title: 'Workspace category',
      render: (_, { workspace_type }) => workspace_type?.title,
      key: 'workspace_category_id',
      filters: workspaceCategories?.map?.(
        ({ id: value, title: text }) =>
          ({
            value,
            text,
          } || [])
      ),
      onFilter: (value, { workspace_type }) =>
        workspace_type?.id === Number(value),
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
      title: 'Order',
      dataIndex: 'order',
      key: 'order',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'order'),
      filters: orderFilters,
      onFilter: (value, { order }) => order === Number(value),
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
              setOpenUpdateWorkspaceCategoryCard(true);
              setUpdateWorkspaceCategoryCardData(data);
            }}
            disabled={!hasEditPermission}
          />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => handledeleteWorkspaceCategoryCard(data.id)}
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
          isArray(workspaceCategoryCards) ? workspaceCategoryCards : []
        }
        columns={columns}
        className="custom-table"
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: true }}
        loading={loading}
      />
      <CreateWorkspaceCategoryCard
        open={openUpdateWorkspaceCategoryCard}
        data={updateWorkspaceCategoryCardData}
        onCancel={() => {
          setOpenUpdateWorkspaceCategoryCard(false);
          setUpdateWorkspaceCategoryCardData({});
        }}
      />
    </>
  );
};

export default WorkspaceCategoryCardTable;
