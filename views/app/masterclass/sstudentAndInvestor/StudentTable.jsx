/* eslint-disable camelcase */
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Form, Input, Popconfirm, Space, Table, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';

import { isArray } from 'lodash';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UserViwer from '../../../../components/util-components/UserViwer';
import utils from '../../../../helpers/utils/index';
import {
  getCourseStudents,
  remobveCourseStudent,
} from '../../../../redux/actions';
import AddUser from './AddUser';

const StudentTable = () => {
  const { data: courseStudents, loading } = useSelector(
    ({ masterclass }) => masterclass.courseStudents
  );

  const [pagination, setPagenation] = useState({
    current: 1,
    pageSize: 10,
  });

  // update course category
  const [openUpdateStudent, setOpenUpdateStudent] = useState(false);
  // const [updateStudentData, setupdateStudentData] = useState({});

  // filter states
  const [idFilters, setIdFilters] = useState([{}]);
  const [userFilters, setUserFilters] = useState([{}]);
  const [createdByFilters, setCreatedByFilters] = useState([{}]);

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { masterclassId } = useParams();

  useEffect(() => {
    dispatch(getCourseStudents({ id: masterclassId }));
  }, [dispatch, masterclassId]);

  const handledeleteStudent = (id) => {
    dispatch(remobveCourseStudent({ id, course_id: masterclassId }));
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
      title: 'Subscription date',
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
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'progress'),
      filters: createdByFilters,
      onFilter: (value, { progress }) =>
        progress?.toLowerCase().includes(value?.toLowerCase()),
      filterSearch: (input) => {
        setTimeout(() => {
          setCreatedByFilters([{ text: input, value: input }]);
        }, 0);
        return true;
      },
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
              setOpenUpdateStudent(true);
              setupdateStudentData(data);
            }}
          /> */}
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => handledeleteStudent(data.id)}
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
                getCourseStudents({
                  id: masterclassId,
                  search: target.value || undefined,
                })
              )
            }
          />
        </Form.Item>
      </Form>
      <Table
        dataSource={isArray(courseStudents) ? courseStudents : []}
        columns={columns}
        className="custom-table"
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: true }}
        loading={loading}
      />
      <AddUser
        open={openUpdateStudent}
        type="update"
        // data={updateStudentData}
        onClos={() => {
          setOpenUpdateStudent(false);
          // setupdateStudentData({});
        }}
      />
    </>
  );
};

export default StudentTable;
