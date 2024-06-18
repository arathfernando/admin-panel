/* eslint-disable camelcase */
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, Table, Tooltip } from 'antd';
import { isArray } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserViwer from '../../../../components/util-components/UserViwer';
import useColumDateRangeSort from '../../../../hooks/useColumDateRangeSort';
import useColumnSearchFilterSort from '../../../../hooks/useColumnSearchFilterSort';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';
import EditSkill from './EditSkill';

const SkillTable = () => {
  const dispatch = useDispatch();
  const { data: skills, loading } = useSelector(({ skill }) => skill.skills);

  const [pagination, setPagenation] = useState({
    current: 1,
    pageSize: 10,
  });

  const { hasEditPermission, hasDeletePermission } = usePermission();
  const getColumnDateRangeSortProps = useColumDateRangeSort();
  const getColumnSearchFilterSortProps = useColumnSearchFilterSort();

  // update skill
  const [openUpdateSkill, setOpenUpdateSkill] = useState(false);
  const [updateSkillData, setUpdateSkillData] = useState({});

  useEffect(() => {
    dispatch(Actions.getSkills());
  }, [dispatch]);

  const handledeleteSkill = ({ id, skill }) => {
    dispatch(
      Actions.deleteSkill({
        id,
        translate: {
          removeKeys: [{ key: skill }],
        },
      })
    );
  };

  const columns = [
    {
      title: 'ID',
      ...getColumnSearchFilterSortProps('id'),
    },
    {
      title: 'Skill',
      ...getColumnSearchFilterSortProps('skill'),
    },
    {
      title: 'Created date',
      key: 'createdAt',
      ...getColumnDateRangeSortProps('createdAt'),
    },
    {
      title: 'Created by',
      ...getColumnSearchFilterSortProps('created_by'),
      render: (_, { created_by }) => <UserViwer user={created_by} />,
      onFilter: (value, { created_by }) =>
        `${created_by?.general_profile?.first_name || ''} ${
          created_by?.general_profile?.last_name || ''
        } ${created_by?.email || ''}`
          ?.toLowerCase()
          .includes(value?.toLowerCase()),
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
              setOpenUpdateSkill(true);
              setUpdateSkillData(data);
            }}
            disabled={!hasEditPermission}
          />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => handledeleteSkill(data)}
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
        dataSource={isArray(skills) ? skills : []}
        columns={columns}
        className="custom-table"
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: true }}
        loading={loading}
      />
      <EditSkill
        open={openUpdateSkill}
        data={updateSkillData}
        onCancel={() => {
          setOpenUpdateSkill(false);
          setUpdateSkillData({});
        }}
      />
    </>
  );
};

export default SkillTable;
