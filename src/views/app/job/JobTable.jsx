/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-key */
/* eslint-disable camelcase */
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, Table, Tooltip } from 'antd';
import { isArray, isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserViwer from '../../../components/util-components/UserViwer';
import utils from '../../../helpers/utils/index';
import useColumDateRangeSort from '../../../hooks/useColumDateRangeSort';
import usePermission from '../../../hooks/usePermission';
import * as Actions from '../../../redux/actions';
import CreateJob from './CreateJob';

const JobTable = () => {
  const dispatch = useDispatch();
  const { data: jobs, loading } = useSelector(({ job }) => job.jobs);

  const { hasEditPermission, hasDeletePermission } = usePermission();
  const getColumnDateRangeSortProps = useColumDateRangeSort();

  const { data: skillslist } = useSelector(({ skill }) => skill.skills);

  const [pagination, setPagenation] = useState({
    current: 1,
    pageSize: 10,
  });

  // update job
  const [openUpdateJob, setOpenUpdateJob] = useState(false);
  const [updateJobData, setUpdateJobData] = useState({});

  // filter states
  const [IDFilters, setIDFilters] = useState([{}]);
  const [jobNameFilters, setJobNameFilters] = useState([{}]);
  const [jobDescriptionFilters, setJobDescriptionFilters] = useState([{}]);
  const [priceFilters, setPriceFilters] = useState([{}]);
  const [createdByFilters, setCreatedByFilters] = useState([{}]);

  useEffect(() => {
    dispatch(Actions.getJobs());
  }, [dispatch]);

  const handledeleteJob = (id) => {
    dispatch(Actions.deleteJob(id));
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'id'),
      filters: IDFilters,
      onFilter: (value, { id }) => id === Number(value),
      filterSearch: (input) => {
        setTimeout(() => setIDFilters([{ text: input, value: input }]), 0);
        return true;
      },
    },
    {
      title: 'Job name',
      dataIndex: 'job_name',
      key: 'job_name',
      filters: jobNameFilters,
      onFilter: (value, { job_name }) =>
        job_name?.toLowerCase?.().includes(value?.toLowerCase?.()),
      filterSearch: (input) => {
        setTimeout(() => setJobNameFilters([{ text: input, value: input }]), 0);
        return true;
      },
    },
    {
      title: 'Job description',
      render: (_, { job_description }) => (
        <div
          className="ignore-space"
          dangerouslySetInnerHTML={{
            __html: job_description,
          }}
        />
      ),
      key: 'job_description',
      filters: jobDescriptionFilters,
      onFilter: (value, { job_description }) =>
        job_description?.toLowerCase?.().includes(value?.toLowerCase?.()),
      filterSearch: (input) => {
        setTimeout(
          () => setJobDescriptionFilters([{ text: input, value: input }]),
          0
        );
        return true;
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      filters: priceFilters,
      onFilter: (value, { price }) => price === Number(value),
      filterSearch: (input) => {
        setTimeout(() => setPriceFilters([{ text: input, value: input }]), 0);
        return true;
      },
    },
    {
      title: 'Skills',
      render: (_, { skills }) =>
        skills?.map(({ skill }) => ` ${skill}`)?.toString?.(),
      key: 'skills',
      filters: skillslist?.map?.(({ id: value, skill: text }) => ({
        value,
        text,
      })),
      onFilter: (value, { skills }) => {
        const matchedSkillss = skills.filter(({ id }) => id === value);
        return !isEmpty(matchedSkillss);
      },
    },
    {
      title: 'Attachments',
      render: (_, { attachments }) => (
        <div className="d-flex flex-column" style={{ gap: 5 }}>
          {attachments?.map((attachment) => (
            <a
              target="_blank"
              href={attachment}
              className="hb-text-primary cursor-pointer"
              style={{ whiteSpace: 'nowrap' }}
              rel="noreferrer"
              // onClick={() => window.location.assign(attachment)}
            >
              {attachment?.slice(attachment?.lastIndexOf('/') + 1)}
            </a>
          ))}
        </div>
      ),
      key: 'attachments',
    },
    {
      title: 'End date',
      key: 'end_date',
      ...getColumnDateRangeSortProps('end_date'),
    },
    {
      title: 'Created date',
      key: 'created_at',
      ...getColumnDateRangeSortProps('created_at'),
    },
    {
      title: 'Created by',
      render: (_, { created_by }) => <UserViwer user={created_by} />,
      key: 'created_by',
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
          value: 'OPEN',
          text: 'OPEN',
        },
        {
          value: 'IN_PROGRESS',
          text: 'IN_PROGRESS',
        },
        {
          value: 'COMPLETED',
          text: 'COMPLETED',
        },
      ],
      onFilter: (value, { status }) => status === value,
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
              setOpenUpdateJob(true);
              setUpdateJobData(data);
            }}
            disabled={!hasEditPermission}
          />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => handledeleteJob(data.id)}
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
        dataSource={isArray(jobs) ? jobs : []}
        columns={columns}
        className="custom-table"
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: true }}
        loading={loading}
      />
      <CreateJob
        open={openUpdateJob}
        data={updateJobData}
        onCancel={() => {
          setOpenUpdateJob(false);
          setUpdateJobData({});
        }}
      />
    </>
  );
};

export default JobTable;
