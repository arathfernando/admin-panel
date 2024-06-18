import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, Table, Tooltip } from 'antd';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useColumnSearchFilterSort from '../../../../hooks/useColumnSearchFilterSort';
import usePermission from '../../../../hooks/usePermission';
import {
  deleteContestEntry,
  getContestEntries,
} from '../../../../redux/actions';
import ViewWntry from './ViewEntry';

const CriteroaRender = ({ record = {} }) => {
  return !isEmpty(record.contestant_own_criteria_submission) ? <div className='pt-4 d-flex flex-wrap' style={{ gap: 34 }}>
    {record.contestant_own_criteria_submission.map?.((data) => (
      <div key={data.id}>
        <h5 className="fs-14 fw-5 text-black mb-3">
          {data.contest_own_criteria?.title}
        </h5>
        <p className="fs-12 fw-3 text-black">{data.description}</p>
      </div>
    ))}
  </div> : null
}

const ContestEntryTable = () => {
  const { data: contestEntries, loading } = useSelector(
    ({ contestEntry }) => contestEntry.contestEntries
  );

  const { hasEditPermission, hasDeletePermission } = usePermission();

  const [openViewEntry, setopenViewEntry] = useState(false);
  const [entryData, setentryData] = useState({});

  const [expandCollapseAllRows, setExpandCollapseAllRows] = useState('expand');

  const [pagination, setPagenation] = React.useState({
    current: 1,
    pageSize: 10,
  });

  const getColumnSearchFilterSortProps = useColumnSearchFilterSort();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContestEntries());
  }, [dispatch]);

  const handleDeleteEntry = (id) => {
    dispatch(deleteContestEntry(id));
  };

  const columns = [
    {
      title: (
        <div className="d-flex align-items-cente ml-n5" style={{ gap: 24 }}>
          <img
            src="/assets/img/icons/arrow-down.svg"
            className="cursor-pointer p-4 m-n4"
            alt=""
            style={{
              height: 66,
              transform: expandCollapseAllRows === 'expand' && 'rotate(180deg)',
            }}
            onClick={(e) => {
              e.stopPropagation();
              setExpandCollapseAllRows(
                expandCollapseAllRows === 'expand' ? 'collapse' : 'expand'
              );
            }}
          />

          <span>ID</span>
        </div>
      ),
      ...getColumnSearchFilterSortProps('id')
    },
    {
      title: 'Contest',
      ...getColumnSearchFilterSortProps('contest.title')
    },
    {
      title: 'Description',
      ...getColumnSearchFilterSortProps('describe_entry')
    },
    {
      title: 'Actions',
      key: 'Actions',
      render: (_, data) => (
        <Space>
          <Button
            type="ghost"
            onClick={() => {
              setopenViewEntry(true);
              setentryData(data);
            }}
            icon={<EyeOutlined />}
            size="small"
            disabled={!hasEditPermission}
          />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => handleDeleteEntry(data.id)}
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
        rowKey="id"
        dataSource={contestEntries}
        columns={columns}
        className="custom-table"
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: true }}
        loading={loading} expandable={{
          expandedRowRender: (record) => <CriteroaRender record={record} />,
          rowExpandable: () => true,
          expandedRowKeys:
            expandCollapseAllRows === 'expand'
              ? contestEntries.map(({ id }) => id)
              : expandCollapseAllRows === 'collapse'
                ? []
                : undefined,
          onExpand: () => setExpandCollapseAllRows(),
        }}
      />
      <ViewWntry
        entryData={entryData}
        open={openViewEntry}
        onClose={() => setopenViewEntry(false)}
      />
    </>
  );
};

export default ContestEntryTable;
