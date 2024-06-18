import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, Table, Tooltip } from 'antd';
import { isArray } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import utils from '../../../../helpers/utils/index';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';
import CreateNationality from './CreateNationality';

const NationalityTable = () => {
  const dispatch = useDispatch();
  const { data: nationalities, loading } = useSelector(
    ({ nationality }) => nationality.nationalities
  );

  const { hasEditPermission, hasDeletePermission } = usePermission();

  const [pagination, setPagenation] = useState({
    current: 1,
    pageSize: 10,
  });

  // update nationality
  const [openUpdateNationality, setOpenUpdateNationality] = useState(false);
  const [updateNationalityData, setUpdateNationalityData] = useState({});

  // filter states
  const [IDFilters, setIDFilters] = useState([{}]);
  const [nationalityFilters, setNationalityFilters] = useState([{}]);

  useEffect(() => {
    dispatch(Actions.getNationalities());
  }, [dispatch]);

  const handledeleteNationality = ({ id, nationality }) => {
    dispatch(
      Actions.deleteNationality({
        id,
        translate: {
          removeKeys: [{ key: nationality }],
        },
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
      onFilter: (value, { id }) =>
        id?.toLowerCase?.().includes(value?.toLowerCase?.()),
      filterSearch: (input) => {
        setTimeout(() => setIDFilters([{ text: input, value: input }]), 0);
        return true;
      },
    },
    {
      title: 'Nationality',
      dataIndex: 'nationality',
      key: 'nationality',
      filters: nationalityFilters,
      onFilter: (value, { nationality }) =>
        nationality?.toLowerCase?.().includes(value?.toLowerCase?.()),
      filterSearch: (input) => {
        setTimeout(
          () => setNationalityFilters([{ text: input, value: input }]),
          0
        );
        return true;
      },
      sorter: (a, b) => utils.antdTableSorter(a, b, 'id'),
      defaultSortOrder: 'ascend',
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
              setOpenUpdateNationality(true);
              setUpdateNationalityData(data);
            }}
            disabled={!hasEditPermission}
          />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => handledeleteNationality(data)}
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
        dataSource={isArray(nationalities) ? nationalities : []}
        columns={columns}
        className="custom-table"
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: true }}
        loading={loading}
      />
      <CreateNationality
        open={openUpdateNationality}
        data={updateNationalityData}
        onCancel={() => {
          setOpenUpdateNationality(false);
          setUpdateNationalityData({});
        }}
      />
    </>
  );
};

export default NationalityTable;
