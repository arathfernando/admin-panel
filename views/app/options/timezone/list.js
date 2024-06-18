import { DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Popconfirm, Space, Table, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import utils from '../../../../helpers/utils/index';
import useColumnSearchFilterSort from '../../../../hooks/useColumnSearchFilterSort';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';
import CreateTimezone from './create';
import EditTimezone from './edit';

const TimezoneList = () => {
  const dispatch = useDispatch();
  const [timezoneList, SetTimezoneList] = useState(null);
  const { list, loading } = useSelector((state) => state.timezone);
  const [pagination, setPagenation] = React.useState({
    current: 1,
    pageSize: 10,
  });

  const { hasDeletePermission } = usePermission();
  const getColumnSearchFilterSortProps = useColumnSearchFilterSort();

  useEffect(() => {
    dispatch(Actions.getAllTimezone());
  }, [dispatch]);

  useEffect(() => {
    SetTimezoneList(list);
  }, [list]);

  const deleteTimezone = (id) => {
    dispatch(Actions.deleteTimezone(id));
  };

  const tableColumns = [
    {
      title: 'ID',
      ...getColumnSearchFilterSortProps('id'),
    },
    {
      title: 'UTC',
      ...getColumnSearchFilterSortProps('timezone_utc'),
    },
    {
      title: 'Abbr',
      ...getColumnSearchFilterSortProps('timezone_abbr'),
    },
    {
      title: 'Offset',
      ...getColumnSearchFilterSortProps('offset'),
    },
    {
      title: 'Value',
      ...getColumnSearchFilterSortProps('timezone_value'),
    },
    {
      title: 'Text',
      ...getColumnSearchFilterSortProps('timezone_text'),
    },
    {
      title: 'Is DST',
      ...getColumnSearchFilterSortProps('dst', {
        filters: [
          { value: 'True', text: 'True' },
          { value: 'False', text: 'False' },
        ],
      }),
      render: (_, record) => (
        <span>{record.dst === 'TRUE' ? 'True' : 'False'}</span>
      ),
      /* eslint-disable */
      sorter: (a, b) => utils.antdTableSorter(a, b, 'dst'),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      /* eslint-disable */
      render: (_, elm) => (
        <Space>
          <EditTimezone id={elm.id} data={timezoneList} />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => deleteTimezone(elm.id)}
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
      /* eslint-enable */
    },
  ];
  const handleTableChange = (params) => {
    setPagenation(params.pagination);
  };
  return (
    <Card>
      <div className="text-right mb-3">
        <CreateTimezone />
      </div>
      <div className="table-responsive">
        <Table
          rowKey="id"
          columns={tableColumns}
          dataSource={timezoneList}
          pagination={pagination}
          onChange={handleTableChange}
          className="custom-table"
          loading={loading}
        />
      </div>
    </Card>
  );
};
export default TimezoneList;
