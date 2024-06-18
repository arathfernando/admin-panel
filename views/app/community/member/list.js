/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
import { DeleteOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Form,
  Image,
  Popconfirm,
  Select,
  Space,
  Table,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserViwer from '../../../../components/util-components/UserViwer';
import utils from '../../../../helpers/utils/index';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';
import CreateCommunity from './create';
import EditCommunity from './edit';

const Member = () => {
  const dispatch = useDispatch();
  const { community, loading } = useSelector((state) => state.communityAll);
  const {
    list,
    loading: loadingMember,
    communityId,
  } = useSelector((state) => state.member);
  const [communityList, setCommunityList] = useState([]);
  const [tableList, setTableList] = useState([]);
  const [currentCommunity, setCurrentCommunity] = useState(null);

  const [communityNameFilters, setCommunityNameFilters] = useState([{}]);
  const [userNameFilters, setUserNameFilters] = useState([{}]);
  const [emailFilters, setEmailFilters] = useState([{}]);

  const [pagination, setPagenation] = React.useState({
    current: 1,
    pageSize: 10,
  });

  const { hasDeletePermission } = usePermission();

  useEffect(() => {
    dispatch(Actions.getAllMember({ page: 1, limit: 1000 }));
    dispatch(Actions.getAllCommunity({ page: 1, limit: 1000 }));
  }, []);

  useEffect(() => {
    setCommunityList(community);
  }, [community]);

  useEffect(() => {
    setTableList(list);
  }, [list]);

  const [form] = Form.useForm();

  useEffect(() => {
    if (communityId) {
      form.setFieldValue('community_id', communityId);
    }
  }, [communityId, form]);

  const onChangeCommunity = (value) => {
    setCurrentCommunity(value);
    if (value) {
      dispatch(Actions.getMemberListByCommunity(value));
    } else {
      dispatch(Actions.getAllMember({ page: 1, limit: 1000 }));
    }
  };

  const handleDelete = (id) => {
    dispatch(Actions.deleteMember(id));
  };

  const tableColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'id'),
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      render: (_, record) =>
        record.user?.general_profile?.avatar && (
          <Avatar
            src={<Image src={record.user?.general_profile?.avatar} />}
            size={70}
          />
        ),
    },
    {
      title: ' Name',
      dataIndex: 'name',
      render: (_, record) => <UserViwer user={record.user} hideAvatar />,
      sorter: (a, b) => {
        return a.user?.general_profile?.first_name.toLowerCase() >
          b.user?.general_profile?.first_name.toLowerCase()
          ? -1
          : b.user?.general_profile?.first_name.toLowerCase() >
            a.user?.general_profile?.first_name.toLowerCase()
          ? 1
          : 0;
      },
      filters: userNameFilters,
      onFilter: (value, record) =>
        `${record.user?.general_profile?.first_name || ''} ${
          record.user?.general_profile?.last_name || ''
        }`
          .toLowerCase()
          .includes(value?.toLowerCase()),
      filterSearch: (input) => {
        setTimeout(
          () => setUserNameFilters([{ text: input, value: input }]),
          0
        );
        return true;
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (_, record) => <span>{record.user?.email}</span>,
      sorter: (a, b) => {
        return a.user?.email.toLowerCase() > b.user?.email.toLowerCase()
          ? -1
          : b.user?.email.toLowerCase() > a.user?.email.toLowerCase()
          ? 1
          : 0;
      },
      filters: emailFilters,
      onFilter: (value, record) =>
        record.user?.email?.toLowerCase().includes(value?.toLowerCase()),
      filterSearch: (input) => {
        setTimeout(() => setEmailFilters([{ text: input, value: input }]), 0);
        return true;
      },
    },
    {
      title: 'Community',
      dataIndex: 'community',
      render: (_, record) => <span>{record.community?.name}</span>,
      sorter: (a, b) => {
        return a.community?.name.toLowerCase() > b.community?.name.toLowerCase()
          ? -1
          : b.community?.name.toLowerCase() > a.community?.name.toLowerCase()
          ? 1
          : 0;
      },
      filters: communityNameFilters,
      onFilter: (value, record) =>
        record.community?.name?.toLowerCase().includes(value?.toLowerCase()),
      filterSearch: (input) => {
        setTimeout(
          () => setCommunityNameFilters([{ text: input, value: input }]),
          0
        );
        return true;
      },
    },
    {
      title: 'Role',
      dataIndex: 'role',
      render: (_, record) => <span>{record.role}</span>,
      sorter: (a, b) => {
        return a.role?.toLowerCase() > b.role?.toLowerCase()
          ? -1
          : b.role?.toLowerCase() > a.role?.toLowerCase()
          ? 1
          : 0;
      },
      filters: [
        {
          text: 'COMMUNITY_LEADER',
          value: 'COMMUNITY_LEADER',
        },
        {
          text: 'HOST',
          value: 'HOST',
        },
        {
          text: 'MODERATOR',
          value: 'MODERATOR',
        },
        {
          text: 'MEMBER',
          value: 'MEMBER',
        },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: 'Status',
      dataIndex: 'invite_status',
      render: (_, record) => <span>{record.invite_status}</span>,
      sorter: (a, b) => utils.antdTableSorter(a, b, 'invite_status'),
      filters: [
        {
          text: 'ACCEPTED',
          value: 'ACCEPTED',
        },
        {
          text: 'PENDING',
          value: 'PENDING',
        },
        {
          text: 'REJECTED',
          value: 'REJECTED',
        },
      ],
      onFilter: (value, record) => record.invite_status === value,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, elm) => (
        <Space>
          <EditCommunity id={elm.id} data={tableList} />
          <Popconfirm
            title="Are you sure delete this Member?"
            onConfirm={() => handleDelete(elm)}
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
  const handleTableChange = (params) => {
    setPagenation(params.pagination);
  };

  return (
    <Card>
      <div
        className="mb-3"
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <div>
          <label>Select the community</label>
          <Form form={form} layout="vertical">
            <Form.Item name="community_id" label="label" noStyle>
              <Select
                showSearch
                allowClear
                optionFilterProp="label"
                className="ml-3"
                style={{ width: '160px' }}
                value={currentCommunity}
                onChange={onChangeCommunity}
                options={communityList?.map?.(({ id: value, name: label }) => ({
                  value,
                  label,
                }))}
                loading={loading}
              />
            </Form.Item>
          </Form>
        </div>
        <div>
          <CreateCommunity />
        </div>
      </div>
      <div className="table-responsive">
        <Table
          rowKey="id"
          columns={tableColumns}
          dataSource={tableList}
          pagination={pagination}
          onChange={handleTableChange}
          loading={loadingMember}
          className="custom-table"
        />
      </div>
    </Card>
  );
};
export default Member;
