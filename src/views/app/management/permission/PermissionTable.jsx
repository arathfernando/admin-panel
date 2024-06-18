/* eslint-disable camelcase */
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, Table, Tooltip } from 'antd';
import { isArray } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import utils from '../../../../helpers/utils/index';
import useColumDateRangeSort from '../../../../hooks/useColumDateRangeSort';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';
import SubmitPermission from './SubmitPermission';

const PermissionTable = () => {
  const dispatch = useDispatch();
  const { data: permissions, loading } = useSelector(
    ({ permission }) => permission.permissions
  );

  const [pagination, setPagenation] = useState({
    current: 1,
    pageSize: 10,
  });

  const { hasEditPermission, hasDeletePermission } = usePermission();
  const getColumnDateRangeSortProps = useColumDateRangeSort();

  // update permission
  const [openUpdatePermission, setOpenUpdatePermission] = useState(false);
  const [updatePermissionData, setUpdatePermissionData] = useState({});

  // filter states
  const [IDFilters, setIDFilters] = useState([{}]);
  const [roleNameFilters, setRoleNameFilters] = useState([{}]);
  // const [permissionFilters, setPermissionFilters] = useState([{}]);

  useEffect(() => {
    dispatch(Actions.getPermissions());
  }, [dispatch]);

  const handledeletePermission = (id) => {
    dispatch(Actions.deletePermission(id));
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'id'),
      filters: IDFilters,
      onFilter: (value, { id }) =>
        id?.toLowerCase?.().includes(value?.toLowerCase?.()),
      filterSearch: (input) => {
        setTimeout(() => setIDFilters([{ text: input, value: input }]), 0);
        return true;
      },
    },
    {
      title: 'Role',
      dataIndex: 'role_name',
      key: 'role_name',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'role_name'),
      filters: roleNameFilters,
      onFilter: (value, { role_name }) =>
        role_name?.toLowerCase?.().includes(value?.toLowerCase?.()),
      filterSearch: (input) => {
        setTimeout(
          () => setRoleNameFilters([{ text: input, value: input }]),
          0
        );
        return true;
      },
    },
    // {
    //   title: 'Permission',
    //   render: (_, { permission }) => permission,
    //   key: 'permission',
    //   sorter: (a, b) => utils.antdTableSorter(a, b, 'permission'),
    //   filters: permissionFilters,
    //   onFilter: (value, { permission }) =>
    //     permission?.toLowerCase?.().includes(value?.toLowerCase?.()),
    //   filterSearch: (input) => {
    //     setTimeout(
    //       () => setPermissionFilters([{ text: input, value: input }]),
    //       0
    //     );
    //     return true;
    //   },
    // },
    {
      title: 'Date Created',
      key: 'created_at',
      ...getColumnDateRangeSortProps('created_at'),
    },
    {
      title: 'Date Updated',
      render: (_, { updated_at }) =>
        updated_at &&
        moment(updated_at).isValid() &&
        moment(updated_at).format('DD/MM/YYYY'),
      key: 'updated_at',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'updated_at'),
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
              setOpenUpdatePermission(true);
              setUpdatePermissionData(data);
            }}
            disabled={!hasEditPermission}
          />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => handledeletePermission(data.id)}
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
        dataSource={isArray(permissions) ? permissions : []}
        columns={columns}
        className="custom-table"
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: true }}
        loading={loading}
      />
      <SubmitPermission
        open={openUpdatePermission}
        data={updatePermissionData}
        onCancel={() => {
          setOpenUpdatePermission(false);
          setUpdatePermissionData({});
        }}
      />
    </>
  );
};

export default PermissionTable;
