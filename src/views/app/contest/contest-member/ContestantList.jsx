/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
import { Button, Image, Popconfirm, Table } from 'antd';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserViwer from '../../../../components/util-components/UserViwer';
import Utils from '../../../../helpers/utils/index';
import usePermission from '../../../../hooks/usePermission';
import {
  contestContestantPermission,
  removeCotestantOrJudge,
} from '../../../../redux/actions';

const ContestantList = ({ type }) => {
  const { data: contestPendingContestants, loading: pendingLoading } =
    useSelector(({ contestMember }) => contestMember.contestPendingContestants);
  const { data: contestAcceptedContestants, loading: acceptedLoading } =
    useSelector(
      ({ contestMember }) => contestMember.contestAcceptedContestants
    );

  const { hasEditPermission, hasDeletePermission } = usePermission();

  const {
    status,
    data: { id, status: actionType },
  } = useSelector(
    ({ contestMember }) => contestMember.contestContestantPermissionAction
  );
  const { status: removeCotestantOrJudgeActionStatus, data } = useSelector(
    ({ contestMember }) => contestMember.removeCotestantOrJudgeAction
  );

  const [pagination, setPagenation] = React.useState({
    current: 1,
    pageSize: 10,
  });

  const dispatch = useDispatch();

  const handleAccept = (userId) => {
    dispatch(
      contestContestantPermission({
        id: userId,
        status: 'ACCEPTED',
        role: 'CONTESTANT',
      })
    );
  };

  const handleReject = (userId) => {
    dispatch(
      contestContestantPermission({
        id: userId,
        status: 'REJECTED',
        role: 'CONTESTANT',
      })
    );
  };

  const handleRemove = (id) => {
    dispatch(
      removeCotestantOrJudge({
        id,
        role: 'CONTESTANT',
      })
    );
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => Utils.antdTableSorter(a, b, 'id'),
    },
    {
      title: 'Thumbnail',
      render: (_, { contest }) => (
        <Image
          width={40}
          src={contest?.contest_cover}
          wrapperClassName="my-n1"
        />
      ),
      key: 'thumbnail',
    },
    {
      title: 'User',
      render: (_, { created_by }) => <UserViwer user={created_by} />,
      key: 'user',
      sorter: (a, b) => Utils.antdTableSorter(a, b, 'User'),
    },
    {
      title: 'Email',
      render: (_, { created_by }) => created_by?.email,
      key: 'email',
      sorter: (a, b) => Utils.antdTableSorter(a, b, 'User'),
    },
    {
      title: 'Role',
      render: (_, { role }) =>
        role === 'CONTESTANT'
          ? 'Contestant'
          : role === 'JUDGE'
          ? 'Judge'
          : role,
      key: 'role',
      sorter: (a, b) => Utils.antdTableSorter(a, b, 'role'),
    },
    {
      title: 'Time',
      render: (_, { time_of_accepted }) =>
        moment(time_of_accepted).isValid() &&
        moment(time_of_accepted).format('DD-MM-YYYY'),
      key: 'time_of_accepted',
      sorter: (a, b) => Utils.antdTableSorter(a, b, 'Time'),
    },
    {
      title: 'Contest',
      render: (_, { contest }) => contest?.title,
      key: 'id',
      sorter: (a, b) => Utils.antdTableSorter(a, b, 'Contest'),
    },
    {
      title: 'Status',
      render: (_, { status }) =>
        status === 'PENDING'
          ? 'Pending'
          : status === 'ACCEPTED'
          ? 'Active'
          : status,
      key: 'status',
      sorter: (a, b) => Utils.antdTableSorter(a, b, 'status'),
    },
    {
      title: 'Actions',
      key: 'Actions',
      render: (_, elm) =>
        type === 'new' ? (
          <div className="d-flex">
            <Popconfirm
              title="Are you sure Accept this contestant?"
              onConfirm={() => handleAccept(elm.id)}
              onCancel={() => console.log('Canceled to Accept')}
              okText="Yes"
              cancelText="No"
              disabled={!hasEditPermission}
            >
              <Button
                ghost
                style={{
                  color: '#8BC53F',
                  border: '1px solid #8BC53F',
                  width: 80,
                }}
                className="br-5 p-0"
                loading={
                  id === elm.id &&
                  actionType === 'ACCEPTED' &&
                  status === 'submitting'
                }
                disabled={!hasEditPermission}
              >
                Accept
              </Button>
            </Popconfirm>
            <Popconfirm
              title="Are you sure Reject this contestant?"
              onConfirm={() => handleReject(elm.id)}
              onCancel={() => console.log('Canceled to Reject')}
              okText="Yes"
              cancelText="No"
              disabled={!hasEditPermission}
            >
              <Button
                danger
                style={{
                  border: '1px solid #FF5A5F',
                  width: 80,
                }}
                className="br-5 ml-2 p-0"
                loading={
                  id === elm.id &&
                  actionType === 'REJECTED' &&
                  status === 'submitting'
                }
                disabled={!hasEditPermission}
              >
                Reject
              </Button>
            </Popconfirm>
          </div>
        ) : (
          <Popconfirm
            title="Are you sure delete this contestant?"
            onConfirm={() => handleRemove(elm.id)}
            onCancel={() => console.log('Canceled to delete')}
            okText="Yes"
            cancelText="No"
            disabled={!hasDeletePermission}
          >
            <Button
              danger
              style={{
                border: '1px solid #FF5A5F',
                width: 85,
              }}
              className="br-5 p-0"
              loading={
                data?.id === elm.id &&
                removeCotestantOrJudgeActionStatus === 'submitting'
              }
              disabled={!hasDeletePermission}
            >
              Remove
            </Button>
          </Popconfirm>
        ),
    },
  ];

  const handleTableChange = (params) => {
    setPagenation(params.pagination);
  };

  return (
    <>
      <Table
        dataSource={
          type === 'new'
            ? contestPendingContestants
            : contestAcceptedContestants
        }
        loading={type === 'new' ? pendingLoading : acceptedLoading}
        columns={columns}
        className="custom-table"
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: true }}
      />
    </>
  );
};

export default ContestantList;
