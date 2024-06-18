/* eslint-disable camelcase */
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, Table, Tooltip } from 'antd';
import { isArray } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import useColumnDateRangeSort from '../../../../hooks/useColumDateRangeSort';
import useColumnSearchFilterSort from '../../../../hooks/useColumnSearchFilterSort';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';
import SubmitContestCategoryCriteria from './SubmitContestCategoryCriteria';

const ContestCategoryCriteriaTable = () => {
  const dispatch = useDispatch();
  const { data: contestCategoryCriterias, loading } = useSelector(
    ({ contestCategoryCriteria }) =>
      contestCategoryCriteria.contestCategoryCriterias
  );

  const { list } = useSelector((state) => state.contestCategory);

  const [pagination, setPagenation] = useState({
    current: 1,
    pageSize: 10,
  });

  // update contest category criteria
  const [
    openUpdateContestCategoryCriteria,
    setOpenUpdateContestCategoryCriteria,
  ] = useState(false);
  const [
    updateContestCategoryCriteriaData,
    setUpdateContestCategoryCriteriaData,
  ] = useState({});

  const getColumnSearchFilterSortProps = useColumnSearchFilterSort();
  const getColumnDateRangeSortProps = useColumnDateRangeSort();

  const { path } = useRouteMatch();
  const { hasDeletePermission, hasEditPermission } = usePermission(path);

  useEffect(() => {
    dispatch(Actions.getContestCategoryCriterias());
    dispatch(Actions.getAllContestCategory());
  }, [dispatch]);

  const handledeleteContestCategoryCriteria = (id) => {
    dispatch(Actions.deleteContestCategoryCriteria(id));
  };

  const columns = [
    {
      title: 'ID',
      key: 'id',
      ...getColumnSearchFilterSortProps('id'),
    },
    {
      title: 'Contest category',
      key: 'contest_category',
      ...getColumnSearchFilterSortProps('contest_category.title', {
        filters: list.map(({ title: text }) => ({ text })),
        exactMatch: true,
      }),
      defaultSortOrder: 'ascend',
    },
    {
      title: 'Title',
      key: 'title',
      ...getColumnSearchFilterSortProps('title'),
    },
    {
      title: 'Description',
      key: 'description',
      ...getColumnSearchFilterSortProps('description'),
    },
    {
      title: 'Weightage',
      key: 'weightage',
      ...getColumnSearchFilterSortProps('weightage', { exactMatch: true }),
    },
    {
      title: 'Created at',
      key: 'created_at',
      ...getColumnDateRangeSortProps('created_at'),
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
              setOpenUpdateContestCategoryCriteria(true);
              setUpdateContestCategoryCriteriaData(data);
            }}
            disabled={!hasEditPermission}
          />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => handledeleteContestCategoryCriteria(data.id)}
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
        dataSource={
          isArray(contestCategoryCriterias) ? contestCategoryCriterias : []
        }
        columns={columns}
        className="custom-table"
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: true }}
        loading={loading}
      />
      <SubmitContestCategoryCriteria
        open={openUpdateContestCategoryCriteria}
        data={updateContestCategoryCriteriaData}
        onCancel={() => {
          setOpenUpdateContestCategoryCriteria(false);
          setUpdateContestCategoryCriteriaData({});
        }}
      />
    </>
  );
};

export default ContestCategoryCriteriaTable;
