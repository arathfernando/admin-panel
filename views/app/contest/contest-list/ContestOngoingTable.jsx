/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Image, Table } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserViwer from '../../../../components/util-components/UserViwer';
import usePermission from '../../../../hooks/usePermission';
import { getOngoingContests } from '../../../../redux/actions';
import UpdateContest from './ContestCreateEdit';
import DeleteContest from './DeleteContest';

const ContestOngoingTable = () => {
  const { data: ongoingContests, loading } = useSelector(
    ({ contest }) => contest.ongoingContests
  );
  const [openEditContest, setOpenEditContest] = useState(false);
  const [openDeleteContestWithData, setopenDeleteContestWithData] = useState(0);

  const [contestData, setContestData] = useState(null);

  const [pagination, setPagenation] = React.useState({
    current: 1,
    pageSize: 10,
  });

  const { hasEditPermission, hasDeletePermission } = usePermission();

  const dispatch = useDispatch();

  const { status } = useSelector(({ contest }) => contest.contestGeneralAction);
  useEffect(() => {
    if (status === 'submitted') dispatch(getOngoingContests());
  }, [dispatch, status]);

  useEffect(() => {
    dispatch(getOngoingContests());
  }, [dispatch]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Thumbnail',
      render: (_, { contest_cover }) => (
        <Image width={40} src={contest_cover} wrapperClassName="my-n1" />
      ),
      key: 'contest_cover',
    },
    {
      title: 'Name',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Organizer name',
      render: (_, { contest_created_by }) => (
        <UserViwer user={contest_created_by} />
      ),
      key: 'title',
    },
    {
      title: 'Judges',
      render: (_, { contestant }) =>
        contestant?.filter?.(({ role }) => role === 'JUDGE')?.length || 0,
      key: 'contestant',
    },
    {
      title: 'Contestants',
      render: (_, { contestant }) =>
        contestant?.filter?.(({ role }) => role === 'CONTESTANT')?.length || 0,
      key: 'contestant',
    },
    {
      title: 'Created date',
      render: (_, { created_at }) =>
        moment(created_at).isValid() && moment(created_at).format('DD-MM-YYYY'),
      key: 'created_at',
    },
    {
      title: 'Start date',
      render: (_, { contest_start_date }) =>
        moment(contest_start_date).isValid() &&
        moment(contest_start_date).format('DD-MM-YYYY'),
      key: 'contest_start_date',
    },
    {
      title: 'End date',
      render: (_, { contest_end_date }) =>
        contest_end_date &&
        moment(contest_end_date).isValid() &&
        moment(contest_end_date).format('DD-MM-YYYY'),
      key: 'contest_end_date',
    },
    {
      title: 'Views',
      render: (_, { contest_submissions }) => contest_submissions?.length || 0,
      key: 'contest_submissions',
    },
    {
      title: 'Actions',
      key: 'Category',
      render: (_, data) => (
        <div className="d-flex">
          <Button
            size="small"
            type="text"
            icon={
              <img
                src="/assets/img/icons/edit.svg"
                alt="edit"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setOpenEditContest(true);
                  setContestData(data);
                }}
              />
            }
            disabled={!hasEditPermission}
          />
          <Button
            size="small"
            type="text ml-3"
            icon={
              <img
                src="/assets/img/icons/delete.svg"
                alt="delete"
                style={{ cursor: 'pointer' }}
                onClick={() => setopenDeleteContestWithData(data)}
              />
            }
            disabled={!hasDeletePermission}
          />
        </div>
      ),
    },
  ];

  const handleTableChange = (params) => {
    setPagenation(params.pagination);
  };

  return (
    <>
      <Table
        dataSource={ongoingContests}
        columns={columns}
        className="custom-table"
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: true }}
        loading={loading}
      />

      {openEditContest && (
        <UpdateContest
          open
          contestCategoryId={contestData.contest_type_id}
          contestId={contestData.id}
          onCancel={() => {
            setOpenEditContest(false);
            setContestData(null);
          }}
        />
      )}
      <DeleteContest
        contest={openDeleteContestWithData}
        onCancel={() => setopenDeleteContestWithData(null)}
      />
    </>
  );
};

export default ContestOngoingTable;
