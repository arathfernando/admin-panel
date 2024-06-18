/* eslint-disable camelcase */
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, Table, Tooltip } from 'antd';
import { isArray } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RatingViewer from '../../../../components/util-components/RatingViewer';
import UserViwer from '../../../../components/util-components/UserViwer';
import utils from '../../../../helpers/utils/index';
import useColumDateRangeSort from '../../../../hooks/useColumDateRangeSort';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';
import CreateJobReview from './CreateJobReview';

const JobReviewTable = () => {
  const dispatch = useDispatch();
  const { data: jobReviews, loading } = useSelector(
    ({ jobReview }) => jobReview.jobReviews
  );
  const { data: jobs } = useSelector(({ job }) => job.jobs);

  const [pagination, setPagenation] = useState({
    current: 1,
    pageSize: 10,
  });

  const { hasEditPermission, hasDeletePermission } = usePermission();
  const getColumnDateRangeSortProps = useColumDateRangeSort();

  // update expertmar ketplace
  const [openUpdateJobReview, setOpenUpdateJobReview] = useState(false);
  const [updateJobReviewData, setUpdateJobReviewData] = useState({});

  // filter states
  const [IDFilters, setIDFilters] = useState([{}]);
  const [expertNameFilters, setExpertNameFilters] = useState([{}]);
  const [commentFilters, setCommentFilters] = useState([{}]);
  const [reviewCreatedByFilters, setReviewCreatedByFilters] = useState([{}]);

  useEffect(() => {
    dispatch(Actions.getJobReviews());
    dispatch(Actions.getJobs());
  }, [dispatch]);

  const handledeleteJobReview = (id) => {
    dispatch(Actions.deleteJobReview(id));
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
      title: 'Expert Name',
      render: (_, { expertise_user_id }) => (
        <UserViwer user={expertise_user_id} />
      ),
      key: 'expertise_user_id',
      filters: expertNameFilters,
      onFilter: (value, { expertise_user_id }) =>
        `${expertise_user_id?.general_profile?.first_name || ''} ${
          expertise_user_id?.general_profile?.last_name || ''
        } ${expertise_user_id?.email || ''}`
          ?.toLowerCase()
          .includes(value?.toLowerCase()),
      filterSearch: (input) => {
        setTimeout(
          () => setExpertNameFilters([{ text: input, value: input }]),
          0
        );
        return true;
      },
    },
    {
      title: 'Job Name',
      render: (_, { job_proposal }) => job_proposal?.job_basic?.job_name,
      key: 'job_name',
      filters:
        jobs?.map?.(({ job_name: text, id: value }) => ({
          value,
          text,
        })) || [],
      onFilter: (value, { job_proposal }) =>
        job_proposal?.job_basic?.id === Number(value),
    },
    {
      title: 'Overall rating',
      render: (_, { over_all_rating }) => (
        <>
          <RatingViewer ratingCount={over_all_rating} />
        </>
      ),
      key: 'over_all_rating',
      filters: [
        {
          value: 1,
          text: '1 star',
        },
        {
          value: 2,
          text: '2 stars',
        },
        {
          value: 3,
          text: '3 stars',
        },
        {
          value: 4,
          text: '4 stars',
        },
        {
          value: 5,
          text: '5 stars',
        },
      ],
      onFilter: (value, { over_all_rating }) =>
        over_all_rating === Number(value),
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
      filters: commentFilters,
      onFilter: (value, { comment }) =>
        comment?.toLowerCase?.().includes(value?.toLowerCase?.()),
      filterSearch: (input) => {
        setTimeout(() => setCommentFilters([{ text: input, value: input }]), 0);
        return true;
      },
    },
    {
      title: 'Review created by',
      render: (_, { created_by }) => <UserViwer user={created_by} />,
      key: 'created_by',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'created_by'),
      filters: reviewCreatedByFilters,
      onFilter: (value, { created_by }) =>
        `${created_by?.general_profile?.first_name || ''} ${
          created_by?.general_profile?.last_name || ''
        } ${created_by?.email || ''}`
          ?.toLowerCase()
          .includes(value?.toLowerCase()),
      filterSearch: (input) => {
        setTimeout(() => {
          setReviewCreatedByFilters([{ text: input, value: input }]);
        }, 0);
        return true;
      },
    },
    {
      title: 'Date Created',
      key: 'created_at',
      ...getColumnDateRangeSortProps('created_at'),
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
              setOpenUpdateJobReview(true);
              setUpdateJobReviewData(data);
            }}
            disabled={!hasEditPermission}
          />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => handledeleteJobReview(data.id)}
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
        dataSource={isArray(jobReviews) ? jobReviews : []}
        columns={columns}
        className="custom-table"
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: true }}
        loading={loading}
      />
      <CreateJobReview
        open={openUpdateJobReview}
        data={updateJobReviewData}
        onCancel={() => {
          setOpenUpdateJobReview(false);
          setUpdateJobReviewData({});
        }}
      />
    </>
  );
};

export default JobReviewTable;
