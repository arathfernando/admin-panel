/* eslint-disable camelcase */
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, Table, Tooltip } from 'antd';
import { isArray, isEmpty } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UserViwer from '../../../components/util-components/UserViwer';
import utils from '../../../helpers/utils/index';
import usePermission from '../../../hooks/usePermission';
import * as Actions from '../../../redux/actions';

const ExpertiseUsersTable = ({ form }) => {
  const dispatch = useDispatch();
  const { data: expertiseSubmissions, loading } = useSelector(
    ({ marketplace }) => marketplace.expertiseSubmissions
  );

  const [pagination, setPagenation] = useState({
    current: 1,
    pageSize: 10,
  });

  const { hasSpecificPermission: hasEditPermission } = usePermission({
    specificPermission: 'view',
  });
  const { hasDeletePermission } = usePermission();

  // filter states
  const [IDFilters, setIDFilters] = useState([{}]);
  const [userFilters, setUserFilters] = useState([{}]);
  const [packagePaidFilters, setPackagePaidFilters] = useState([{}]);

  const { expertiseId } = useParams();

  useEffect(() => {
    dispatch(Actions.getExpertiseSubmissions({ gig_id: expertiseId }));
  }, [dispatch, expertiseId]);

  const handledeleteExpertiseRequest = (id) => {
    dispatch(
      Actions.deleteExpertiseSubmission({
        id,
        gig_id: expertiseId,
        search: form.getFieldValue('search'),
      })
    );
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
      title: 'User',
      render: (_, { created_by }) => <UserViwer user={created_by} />,
      key: 'created_by',
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
      title: 'Request date',
      render: (_, { created_at }) => moment(created_at).format('DD/MM/YYYY'),
      key: 'created_at',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'created_at'),
    },
    {
      title: 'Package paid',
      render: (_, { gig_package }) => gig_package?.package_title,
      key: 'gig_package',
      filters: packagePaidFilters,
      onFilter: (value, { gig_package }) =>
        gig_package?.package_title
          ?.toLowerCase()
          .includes(value?.toLowerCase()),
      filterSearch: (input) => {
        setTimeout(
          () => setPackagePaidFilters([{ text: input, value: input }]),
          0
        );
        return true;
      },
    },
    {
      title: 'Expertise submitted',
      render: (_, { request_response }) =>
        isEmpty(request_response) ? 'Pending' : 'Submitted',
      key: 'request_response_status',
      filters: [
        {
          text: 'Pending',
          value: 'Pending',
        },
        {
          text: 'Submitted',
          value: 'Submitted',
        },
      ],
      onFilter: (value, { request_response }) =>
        `${isEmpty(request_response) ? 'Pending' : 'Submitted'}` === value,
    },
    {
      title: 'Actions',
      key: 'Actions',
      render: (_, data) => (
        <Space>
          <Button
            type="ghost"
            icon={<EyeOutlined />}
            size="small"
            disabled={!hasEditPermission}
          />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => handledeleteExpertiseRequest(data.id)}
              onCancel={() => console.log('Canceled to delete')}
              okText="Yes"
              cancelText="No"
              disabled={!hasDeletePermission}
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
      <Table
        dataSource={isArray(expertiseSubmissions) ? expertiseSubmissions : []}
        columns={columns}
        className="custom-table"
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: true }}
        loading={loading}
      />
    </>
  );
};

export default ExpertiseUsersTable;
