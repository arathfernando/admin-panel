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
import CreateExpertiseReview from './CreateExpertiseReview';

const ExpertiseReviewTable = () => {
  const dispatch = useDispatch();
  const { data: expertiseReviews, loading } = useSelector(
    ({ expertiseReview }) => expertiseReview.expertiseReviews
  );
  const { data: expertises } = useSelector(
    ({ marketplace }) => marketplace.expertMarketplaces
  );

  const [pagination, setPagenation] = useState({
    current: 1,
    pageSize: 10,
  });

  // update expertmar ketplace
  const [openUpdateExpertiseReview, setOpenUpdateExpertiseReview] =
    useState(false);
  const [updateExpertiseReviewData, setUpdateExpertiseReviewData] = useState(
    {}
  );

  const { hasEditPermission, hasDeletePermission } = usePermission();
  const getColumnDateRangeSortProps = useColumDateRangeSort();

  // filter states
  const [IDFilters, setIDFilters] = useState([{}]);
  const [teacherNameFilters, setTeacherNameFilters] = useState([{}]);
  const [commentFilters, setCommentFilters] = useState([{}]);
  const [reviewCreatedByFilters, setReviewCreatedByFilters] = useState([{}]);

  useEffect(() => {
    dispatch(Actions.getExpertiseReviews());
    dispatch(Actions.getExpertMarketplaces());
  }, [dispatch]);

  const handledeleteExpertiseReview = (id) => {
    dispatch(Actions.deleteExpertiseReview(id));
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
      render: (_, { gig: { created_by } }) => <UserViwer user={created_by} />,
      key: 'gig',
      filters: teacherNameFilters,
      onFilter: (value, { created_by }) =>
        `${created_by?.general_profile?.first_name || ''} ${
          created_by?.general_profile?.last_name || ''
        } ${created_by?.email || ''}`
          ?.toLowerCase()
          .includes(value?.toLowerCase()),
      filterSearch: (input) => {
        setTimeout(
          () => setTeacherNameFilters([{ text: input, value: input }]),
          0
        );
        return true;
      },
    },
    {
      title: 'Expertise Name',
      render: (_, { gig }) => gig?.expertise_title,
      key: 'expertise_title',
      filters:
        expertises?.map?.(({ expertise_title: text, id: value }) => ({
          value,
          text,
        })) || [],
      onFilter: (value, { gig }) => gig?.id === Number(value),
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
      dataIndex: 'message',
      key: 'message',
      filters: commentFilters,
      onFilter: (value, { message }) =>
        message?.toLowerCase?.().includes(value?.toLowerCase?.()),
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
              setOpenUpdateExpertiseReview(true);
              setUpdateExpertiseReviewData(data);
            }}
            disabled={!hasEditPermission}
          />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => handledeleteExpertiseReview(data.id)}
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
        dataSource={isArray(expertiseReviews) ? expertiseReviews : []}
        columns={columns}
        className="custom-table"
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: true }}
        loading={loading}
      />
      <CreateExpertiseReview
        open={openUpdateExpertiseReview}
        data={updateExpertiseReviewData}
        onCancel={() => {
          setOpenUpdateExpertiseReview(false);
          setUpdateExpertiseReviewData({});
        }}
      />
    </>
  );
};

export default ExpertiseReviewTable;
