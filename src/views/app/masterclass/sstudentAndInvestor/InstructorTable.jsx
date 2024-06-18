/* eslint-disable camelcase */
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Form, Input, Popconfirm, Space, Table, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';

import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UserViwer from '../../../../components/util-components/UserViwer';
import utils from '../../../../helpers/utils/index';
import {
  getCourseInstructors,
  removeCourseInstructor,
} from '../../../../redux/actions';
import AddUser from './AddUser';

const InstructorTable = () => {
  const { data: courseInstructors, loading } = useSelector(
    ({ masterclass }) => masterclass.courseInstructors
  );

  const { masterclassId } = useParams();

  const [pagination, setPagenation] = useState({
    current: 1,
    pageSize: 10,
  });

  // update course category
  const [openUpdateInstructor, setOpenUpdateInstructor] = useState(false);
  const [updateInstructorData, setupdateInstructorData] = useState({});

  // filter states
  const [idFilters, setIdFilters] = useState([{}]);
  const [userFilters, setUserFilters] = useState([{}]);

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getCourseInstructors({ id: masterclassId }));
  }, [dispatch, masterclassId]);

  const handledeleteInstructor = (id) => {
    dispatch(removeCourseInstructor({ id, course_id: masterclassId }));
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'id'),
      filters: idFilters,
      onFilter: (value, { id }) => id === Number(value),
      filterSearch: (input) => {
        setTimeout(() => setIdFilters([{ text: input, value: input }]), 0);
        return true;
      },
    },
    {
      title: 'User',
      render: (_, { created_by }) => <UserViwer user={created_by} />,
      key: 'created_by',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'created_by'),
      filters: userFilters,
      onFilter: (value, { created_by }) =>
        `${created_by?.general_profile?.first_name || ''} ${
          created_by?.general_profile?.last_name || ''
        } ${created_by?.email || ''}`
          ?.toLowerCase()
          .includes(value?.toLowerCase()),
      filterSearch: (input) => {
        setTimeout(() => {
          setUserFilters([{ text: input, value: input }]);
        }, 0);
        return true;
      },
    },
    {
      title: 'Added on',
      render: (_, { created_at }) =>
        created_at && moment(created_at).format('DD/MM/YYYY'),
      key: 'created_at',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'created_at'),
    },
    {
      title: 'Last login',
      render: (_, { last_login }) =>
        last_login && moment(last_login).format('DD/MM/YYYY'),
      key: 'last_login',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'last_login'),
    },
    {
      title: 'Status',
      render: (_, { created_by }) => created_by?.status,
      key: 'status',
      filters: [
        {
          text: 'ACTIVE',
          value: 'ACTIVE',
        },
        {
          text: 'INACTIVE',
          value: 'INACTIVE',
        },
      ],
      onFilter: (value, record) => record.created_by?.status === value,
    },
    {
      title: 'Actions',
      key: 'Actions',
      render: (_, data) => (
        <Space>
          {/* <Button
            type="ghost"
            icon={<EditOutlined />}
            size="small"
            onClick={() => {
              setOpenUpdateInstructor(true);
              setupdateInstructorData(data);
            }}
          /> */}
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => handledeleteInstructor(data.id)}
              onCancel={() => console.log('Canceled to delete')}
              okText="Yes"
              cancelText="No"
            >
              <Button danger icon={<DeleteOutlined />} size="small" />
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
      <Form layout="vertical" form={form} name="control-hooks">
        <Form.Item name="search">
          <Input
            size="small"
            style={{
              height: 38,
              marginTop: 18,
              maxWidth: 570,
              border: '1px solid #D1D5DB',
              boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
              borderRadius: 6,
            }}
            placeholder="Search for an user"
            prefix={<img src="/assets/img/icons/search.svg" alt="search" />}
            onChange={({ target }) =>
              dispatch(
                getCourseInstructors({
                  id: masterclassId,
                  search: target.value || undefined,
                })
              )
            }
          />
        </Form.Item>
      </Form>
      <Table
        dataSource={courseInstructors}
        columns={columns}
        className="custom-table"
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: true }}
        loading={loading}
      />
      <AddUser
        open={openUpdateInstructor}
        type="update"
        data={updateInstructorData}
        onClos={() => {
          setOpenUpdateInstructor(false);
          setupdateInstructorData({});
        }}
      />
    </>
  );
};

export default InstructorTable;
