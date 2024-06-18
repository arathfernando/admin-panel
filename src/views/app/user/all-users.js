import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Input,
  Popconfirm,
  Select,
  Space,
  Table,
  Tooltip,
  Upload,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Flex from '../../../components/shared-components/Flex';
import UserViwer from '../../../components/util-components/UserViwer';
import { userStatusList } from '../../../constants/userStatus';
import utils from '../../../helpers/utils/index';
import useColumDateRangeSort from '../../../hooks/useColumDateRangeSort';
import useColumnSearchFilterSort from '../../../hooks/useColumnSearchFilterSort';
import usePermission from '../../../hooks/usePermission';
import * as Actions from '../../../redux/actions';
import CreateUserButton from './create-user';

const { Option } = Select;

const AllUsers = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [userList, SetUserList] = useState(null);
  const { users, loading } = useSelector((state) => state.users);

  const { hasEditPermission, hasDeletePermission } = usePermission();
  const getColumnSearchFilterSortProps = useColumnSearchFilterSort();
  const getColumnDateRangeSortProps = useColumDateRangeSort();

  useEffect(() => {
    dispatch(Actions.getAllUsers({ page: 1, limit: 1000 }));
  }, [dispatch]);

  useEffect(() => {
    SetUserList(users);
  }, [users]);

  const handleShowStatus = (value) => {
    if (value !== 'All') {
      const key = 'status';
      const tagetValue = value;
      const data = utils.filterArray(users, key, tagetValue);
      SetUserList(data);
    } else {
      SetUserList(users);
    }
  };

  const editItem = (id) => {
    history.push(`/app/users/${id}`);
  };

  const deleteUser = (id) => {
    dispatch(Actions.deleteUser(id));
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
          `${
            record.general_profile?.first_name
              ? record.general_profile.first_name
              : ''
          } ${
            record.general_profile?.last_name
              ? record.general_profile.last_name
              : ''
          }`
      ),
      render: (_, record) => <UserViwer user={record} />,
      sorter: (a, b) => utils.antdTableSorter(a, b, 'first_name'),
    },
    {
      title: 'Email',
      key: 'email',
      render: (_, record) => (
        <div className="d-flex">
          <span>{record.email}</span>
        </div>
      ),
      ...getColumnSearchFilterSortProps('email'),
    },
    {
      title: 'Role',
      key: 'role',
      ...getColumnSearchFilterSortProps('role'),
    },
    {
      title: 'Email Verify',
      key: 'emailVerified',
      ...getColumnSearchFilterSortProps('emailVerified'),
    },
    {
      title: 'Phone Verify',
      key: 'phoneVerified',
      ...getColumnSearchFilterSortProps('phoneVerified'),
    },
    {
      title: 'Linkedin Login',
      key: 'isLoginWithLinkedin',
      ...getColumnSearchFilterSortProps('isLoginWithLinkedin'),
    },
    {
      title: 'Join date',
      ...getColumnDateRangeSortProps('createdAt'),
    },
    {
      title: 'Status',
      key: 'status',
      ...getColumnSearchFilterSortProps('status', {
        filters: [{ text: 'ACTIVE' }, { text: 'INACTIVE' }, { text: 'CLOSED' }],
      }),
      render: (user) => (
        <span
          className="fw-7"
          style={{
            color:
              // eslint-disable-next-line no-nested-ternary
              user.status === 'ACTIVE'
                ? '#8bc53f'
                : user.status === 'CLOSED'
                ? '#900604'
                : '#ed7117',
          }}
        >
          {user.status?.slice(0, 1)}
          {user.status?.slice(1)?.toLowerCase?.()}
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, elm) => (
        <Space>
          <Tooltip title="View/Edit">
            <Button
              type="primary"
              disabled={!hasEditPermission}
              icon={<EditOutlined />}
              onClick={() => editItem(elm.id)}
              size="small"
            />
          </Tooltip>
          <Popconfirm
            title="Are you sure delete this Item?"
            onConfirm={() => deleteUser(elm.id)}
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
        </Space>
      ),
    },
  ];

  const onSearch = (e) => {
    const { value } = e.target;
    const searchArray = users;
    const data = searchArray?.filter?.((user) =>
      `${user?.general_profile?.first_name || ''} ${
        user?.general_profile?.last_name || ''
      } ${user?.email || ''}`
        ?.toLowerCase()
        .includes(value?.toLowerCase())
    );
    SetUserList(data);
  };
  return (
    <Card>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        <Flex className="mb-1" mobileFlex={false}>
          <div className="mr-md-3 mb-3">
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              onChange={(e) => onSearch(e)}
            />
          </div>
          <div className="mb-3">
            <Select
              defaultValue="All"
              className="w-100"
              style={{ minWidth: 180 }}
              onChange={handleShowStatus}
              placeholder="All"
            >
              <Option value="All"> All </Option>
              {userStatusList.map((elm) => (
                <Option key={elm} value={elm}>
                  {elm}
                </Option>
              ))}
            </Select>
          </div>
        </Flex>
        <div style={{ display: 'flex' }}>
          <Space>
            <Tooltip title="Create User">
              <CreateUserButton />
            </Tooltip>
            <Tooltip title="Import Users">
              <Upload
                showUploadList={false}
                action={`${process.env.REACT_APP_API_URL}/user/json`}
                onChange={(e) => console.log(e)}
              >
                <Button type="primary" icon={<PlusOutlined />} block>
                  Import Users
                </Button>
              </Upload>
            </Tooltip>
          </Space>
        </div>
      </Flex>
      <div className="table-responsive">
        <Table
          rowKey="id"
          columns={tableColumns}
          dataSource={userList}
          className="custom-table"
          loading={loading}
        />
      </div>
    </Card>
  );
};
export default AllUsers;
