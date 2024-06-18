/* eslint-disable react/no-array-index-key */
/* eslint-disable camelcase */
import { DeleteOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Popconfirm, Space, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import utils from '../../../helpers/utils/index';
import useColumnSearchFilterSort from '../../../hooks/useColumnSearchFilterSort';
import usePermission from '../../../hooks/usePermission';
import * as Actions from '../../../redux/actions';
import CreateAdmin from './create';
import EditAdmin from './edit';

const AdminList = () => {
  const dispatch = useDispatch();
  const [adminList, setAdminList] = useState(null);
  const { list, loading } = useSelector((state) => state.admins);
  const { data: permissions } = useSelector(
    ({ permission }) => permission.permissions
  );

  const currentAdmin = useSelector(
    ({ admins }) => admins.currentAdmin.data,
    shallowEqual
  );

  const { hasDeletePermission } = usePermission();
  const getColumnSearchFilterSortProps = useColumnSearchFilterSort();

  useEffect(() => {
    dispatch(Actions.getAdminsByPagenation({ page: 1, limit: 1000 }));

    dispatch(Actions.getPermissions());
  }, [dispatch]);

  useEffect(() => {
    setAdminList(list?.filter((admin) => admin?.id !== currentAdmin?.id));
  }, [list, currentAdmin]);

  const handleDelete = (id) => {
    dispatch(Actions.deleteAdmin(id));
  };

  const tableColumns = [
    {
      title: 'ID',
      key: 'id',
      ...getColumnSearchFilterSortProps('id'),
    },
    {
      title: 'Name',
      key: 'name',
      ...getColumnSearchFilterSortProps(
        (record) =>
          `${record.first_name ? record.first_name : ''} ${
            record.last_name ? record.last_name : ''
          }`
      ),
      render: (_, record) => (
        <Space>
          <Avatar size={30} src={record.profile_image} />
          {`${record.first_name ? record.first_name : ''} ${
            record.last_name ? record.last_name : ''
          }`}
        </Space>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'first_name'),
    },
    {
      title: 'Email',
      key: 'email',
      ...getColumnSearchFilterSortProps('email'),
    },
    {
      title: 'Published',
      key: 'status',
      ...getColumnSearchFilterSortProps('status'),
      render: (_, record) => (
        <span
          style={{
            color: `${record.status === 'ACTIVE' ? '#75ac2a' : 'red'}`,
          }}
        >
          {record.status === 'ACTIVE' ? 'ACTIVE' : 'INACTIVE'}
        </span>
      ),
    },
    {
      title: 'Admin Role',
      key: 'admin_role',
      ...getColumnSearchFilterSortProps(
        ({ admin_role }) => admin_role?.map(({ role_name }) => role_name),
        {
          filters: permissions?.map?.(({ role_name }) => ({
            text: role_name,
            value: role_name,
          })),
        }
      ),
      render: ({ admin_role }) =>
        admin_role?.map(({ role_name }, indx) => (
          <Tag color="green" key={indx}>
            {role_name}{' '}
          </Tag>
        )),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, elm) => (
        <Space>
          <EditAdmin id={elm.id} data={adminList} />
          <Popconfirm
            title="Do you remove this admin?"
            onConfirm={() => handleDelete(elm.id)}
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
        </Space>
      ),
    },
  ];
  return (
    <Card>
      <div className="w-100 text-right mb-3">
        <CreateAdmin />
      </div>
      <div className="table-responsive">
        <Table
          rowKey="id"
          columns={tableColumns}
          dataSource={adminList}
          className="custom-table"
          loading={loading}
        />
      </div>
    </Card>
  );
};
export default AdminList;
