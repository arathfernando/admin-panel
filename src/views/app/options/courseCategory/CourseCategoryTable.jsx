/* eslint-disable camelcase */
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Image, Popconfirm, Space, Table, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import UserViwer from '../../../../components/util-components/UserViwer';
import utils from '../../../../helpers/utils/index';
import useColumDateRangeSort from '../../../../hooks/useColumDateRangeSort';
import useColumnSearchFilterSort from '../../../../hooks/useColumnSearchFilterSort';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';
import CreateCourseCategory from './CreateCourseCategory';

const CourseCategoryTable = () => {
  const dispatch = useDispatch();
  const { list: courseCategorys, loading } = useSelector(
    (state) => state.courseCategory
  );

  const { hasEditPermission, hasDeletePermission } = usePermission();
  const getColumnDateRangeSortProps = useColumDateRangeSort();
  const getColumnSearchFilterSortProps = useColumnSearchFilterSort();

  // const courseCategorys= list
  const [pagination, setPagenation] = useState({
    current: 1,
    pageSize: 10,
  });

  // update course category
  const [openupdateCourseCategory, setOpenupdateCourseCategory] =
    useState(false);
  const [updateCourseCategoryData, setupdateCourseCategoryData] = useState({});

  // filter states
  const [nameFilters, setNameFilters] = useState([{}]);
  const [descriptionFilters, setDescriptionFilters] = useState([{}]);
  const [createdByFilters, setCreatedByFilters] = useState([{}]);

  useEffect(() => {
    dispatch(Actions.getCourseCategorys());
  }, [dispatch]);

  const handledeleteCourseCategory = ({ id, name, description }) => {
    dispatch(
      Actions.deleteCourseCategory({
        id,
        translate: {
          removeKeys: [{ key: name }, { key: description }],
        },
      })
    );
  };

  const columns = [
    {
      title: 'Id',
      ...getColumnSearchFilterSortProps('id'),
    },
    {
      title: 'Icon',
      render: (_, { icon }) => <Image height={35} width={40} src={icon} />,
      key: 'icon',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
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
      sorter: (a, b) => utils.antdTableSorter(a, b, 'description'),
      filters: descriptionFilters,
      onFilter: (value, { description }) =>
        description?.toLowerCase().includes(value?.toLowerCase()),
      filterSearch: (input) => {
        setTimeout(() => {
          setDescriptionFilters([{ text: input, value: input }]);
        }, 0);
        return true;
      },
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
      title: 'Actions',
      key: 'Actions',
      render: (_, data) => (
        <Space>
          <Button
            type="ghost"
            icon={<EditOutlined />}
            size="small"
            onClick={() => {
              setOpenupdateCourseCategory(true);
              setupdateCourseCategoryData(data);
            }}
            disabled={!hasEditPermission}
          />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => handledeleteCourseCategory(data)}
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
        dataSource={courseCategorys}
        columns={columns}
        className="custom-table"
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: true }}
        loading={loading}
      />
      <CreateCourseCategory
        open={openupdateCourseCategory}
        data={updateCourseCategoryData}
        onCancel={() => {
          setOpenupdateCourseCategory(false);
          setupdateCourseCategoryData({});
        }}
      />
    </>
  );
};

export default CourseCategoryTable;
