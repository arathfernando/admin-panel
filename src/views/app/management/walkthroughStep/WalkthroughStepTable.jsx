/* eslint-disable camelcase */
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Button, Popconfirm, Space, Table, Tooltip } from 'antd';
import { isArray } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useColumDateRangeSort from '../../../../hooks/useColumDateRangeSort';
import useColumnSearchFilterSort from '../../../../hooks/useColumnSearchFilterSort';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';
import SubmitWalkthroughStep from './SubmitWalkthroughStep';

const WalkthroughStepTable = () => {
  const dispatch = useDispatch();
  const { data: walkthroughSteps, loading } = useSelector(
    ({ walkthroughStep }) => walkthroughStep.walkthroughSteps
  );

  const { data: orderData, status } = useSelector(
    ({ walkthroughStep }) => walkthroughStep.exchangeWalkthroughStepOrderAction
  );

  const [pagination, setPagenation] = useState({
    current: 1,
    pageSize: 10,
  });

  // update walkthrough step
  const [openUpdateWalkthroughStep, setOpenUpdateWalkthroughStep] =
    useState(false);
  const [updateWalkthroughStepData, setUpdateWalkthroughStepData] = useState(
    {}
  );

  const getColumnSearchFilterSortProps = useColumnSearchFilterSort();
  const getColumnDateRangeSortProps = useColumDateRangeSort();

  const { hasDeletePermission, hasEditPermission, hasChangeOrderPermission } =
    usePermission();

  useEffect(() => {
    dispatch(Actions.getWalkthroughSteps());
  }, [dispatch]);

  const handledeleteWalkthroughStep = (id) => {
    dispatch(Actions.deleteWalkthroughStep(id));
  };

  const handleOrderUp = (elm) => {
    const currecntElId = elm.id;
    const currentOrder = elm.order;
    const downOrderElm = walkthroughSteps
      .sort((a, b) => b.order - a.order)
      .find(({ order }) => order < currentOrder);
    const downElId = downOrderElm?.id;
    const orderDownNo = downOrderElm?.order;

    if (currentOrder && currecntElId && downElId && orderDownNo) {
      dispatch(
        Actions.exchangeWalkthroughStepOrder({
          base_id: downElId,
          update_id: currecntElId,
        })
      );
    }
  };

  const handleOrderDown = (elm) => {
    const currecntElId = elm.id;
    const currentOrder = elm.order;
    const upOrderElm = walkthroughSteps
      .sort((a, b) => a.order - b.order)
      .find(({ order }) => order > currentOrder);
    const upElId = upOrderElm?.id;
    const orderUpNo = upOrderElm?.order;
    if (currentOrder && currecntElId && upElId && orderUpNo) {
      dispatch(
        Actions.exchangeWalkthroughStepOrder({
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
      ...getColumnSearchFilterSortProps('id'),
    },
    {
      title: 'Category',
      key: 'walkthrough_category',
      ...getColumnSearchFilterSortProps('walkthrough_category.category_name'),
    },
    {
      title: 'Step',
      key: 'step_name',
      ...getColumnSearchFilterSortProps('step_name'),
    },
    {
      title: 'Type',
      key: 'walkthrough_type',
      ...getColumnSearchFilterSortProps('walkthrough_type'),
    },
    {
      title: 'Title',
      key: 'title',
      ...getColumnSearchFilterSortProps('title'),
    },
    {
      title: 'Content',
      key: 'content',
      ...getColumnSearchFilterSortProps('content'),
    },
    {
      title: 'Order',
      key: 'order',
      ...getColumnSearchFilterSortProps('order'),
      defaultSortOrder: 'ascend',
    },
    {
      title: 'Created at',
      render: (_, { createdAt }) =>
        createdAt &&
        moment(createdAt).isValid() &&
        moment(createdAt).format('DD/MM/YYYY'),
      key: 'createdAt',
      ...getColumnDateRangeSortProps('createdAt'),
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
              setOpenUpdateWalkthroughStep(true);
              setUpdateWalkthroughStepData(data);
            }}
            disabled={!hasEditPermission}
          />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => handledeleteWalkthroughStep(data.id)}
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
        rowKey="id"
        dataSource={isArray(walkthroughSteps) ? walkthroughSteps : []}
        columns={columns}
        className="custom-table"
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: true }}
        loading={loading}
      />
      <SubmitWalkthroughStep
        open={openUpdateWalkthroughStep}
        data={updateWalkthroughStepData}
        onCancel={() => {
          setOpenUpdateWalkthroughStep(false);
          setUpdateWalkthroughStepData({});
        }}
      />
    </>
  );
};

export default WalkthroughStepTable;
