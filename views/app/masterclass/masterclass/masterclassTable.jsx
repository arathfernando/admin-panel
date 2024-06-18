/* eslint-disable camelcase */
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, Table, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import UserViwer from '../../../../components/util-components/UserViwer';
import utils from '../../../../helpers/utils/index';
import useColumDateRangeSort from '../../../../hooks/useColumDateRangeSort';
import useColumnSearchFilterSort from '../../../../hooks/useColumnSearchFilterSort';
import usePermission from '../../../../hooks/usePermission';
import { getMasterclasses } from '../../../../redux/actions';
import { deleteCourse } from '../../../../redux/masterclass/actions';
import MasterclassCreateEdit from './masterclassCreateEdit';

const MasterclassTable = () => {
  const { data: masterclasses, loading } = useSelector(
    ({ masterclass }) => masterclass.masterclasses
  );

  const [pagination, setPagenation] = useState({
    current: 1,
    pageSize: 10,
  });

  // update course category
  const [openUpdateMasterclass, setOpenUpdateMasterclass] = useState(false);
  const [masterclassId, setmasterclassId] = useState({});

  const { hasEditPermission, hasDeletePermission } = usePermission();
  const getColumnDateRangeSortProps = useColumDateRangeSort();

  // filter states
  const [titleFilters, setTitleFilters] = useState([{}]);
  const [categoryFilters, setCategoryFilters] = useState([{}]);
  const [createdByFilters, setCreatedByFilters] = useState([{}]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMasterclasses());
  }, [dispatch]);

  const handledeleteMasterclass = (id) => {
    dispatch(deleteCourse(id));
  };

  const ColumnSearchFilterSortProps = useColumnSearchFilterSort();

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'id'),
      ...ColumnSearchFilterSortProps('id'),
    },
    {
      title: 'Title',
      dataIndex: 'course_catch_line',
      key: 'course_title',
      render: (_, { course_title, id }) => (
        <Link to={`/app/masterclass/${id}/${course_title}`}>
          <span>{course_title}</span>
        </Link>
      ),
      filters: titleFilters,
      onFilter: (value, { course_title }) =>
        course_title?.toLowerCase().includes(value?.toLowerCase()),
      filterSearch: (input) => {
        setTimeout(() => setTitleFilters([{ text: input, value: input }]), 0);
        return true;
      },
    },
    {
      title: 'Category',
      render: (_, { course_category }) => course_category?.name,
      key: 'course_category',
      filters: categoryFilters,
      onFilter: (value, { course_category }) =>
        course_category?.course_category
          ?.toLowerCase()
          .includes(value?.toLowerCase()),
      filterSearch: (input) => {
        setTimeout(() => {
          setCategoryFilters([{ text: input, value: input }]);
        }, 0);
        return true;
      },
    },
    {
      title: 'Date created',
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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        {
          text: 'PENDING',
          value: 'PENDING',
        },
        {
          text: 'ACTIVE',
          value: 'ACTIVE',
        },
        {
          text: 'REJECTED',
          value: 'DELETED',
        },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Subscribers',
      render: (_, { course_enrolled }) => course_enrolled?.length,
      key: 'course_enrolled',
      sorter: (a, b) =>
        utils.antdTableSorter(a.course_enrolled, b.course_enrolled, 'length'),
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
              setOpenUpdateMasterclass(true);
              setmasterclassId(data?.id);
            }}
            disabled={!hasEditPermission}
          />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => handledeleteMasterclass(data.id)}
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
        dataSource={masterclasses}
        columns={columns}
        className="custom-table"
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: true }}
        loading={loading}
      />
      <MasterclassCreateEdit
        open={openUpdateMasterclass}
        type="update"
        courseId={masterclassId}
        onClose={() => {
          setOpenUpdateMasterclass(false);
          setmasterclassId(0);
        }}
      />
    </>
  );
};

export default MasterclassTable;
