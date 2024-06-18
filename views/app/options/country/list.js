import { DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Popconfirm, Space, Table, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useColumnSearchFilterSort from '../../../../hooks/useColumnSearchFilterSort';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';
import CreateCountry from './create';
import EditCountry from './edit';

const CountryList = () => {
  const dispatch = useDispatch();
  const [countryList, setCountryList] = useState(null);
  const { list, loading } = useSelector((state) => state.country);
  const [pagination, setPagenation] = React.useState({
    current: 1,
    pageSize: 10,
  });

  const { hasDeletePermission } = usePermission();
  const getColumnSearchFilterSortProps = useColumnSearchFilterSort();

  useEffect(() => {
    dispatch(Actions.getAllCountry());
  }, [dispatch]);

  useEffect(() => {
    setCountryList(list);
  }, [list]);

  const deleteCountry = (id) => {
    dispatch(Actions.deleteCountry(id));
  };

  const tableColumns = [
    {
      title: 'ID',
      ...getColumnSearchFilterSortProps('id'),
    },
    {
      title: ' Name',
      ...getColumnSearchFilterSortProps('country_name'),
    },
    {
      title: 'Short Name',
      ...getColumnSearchFilterSortProps('short_name'),
    },
    {
      title: 'Continent',
      ...getColumnSearchFilterSortProps('continent'),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, elm) => (
        <Space>
          <EditCountry id={elm?.id} data={countryList} />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => deleteCountry(elm.id)}
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
    <Card>
      <div className="text-right mb-3">
        <CreateCountry />
      </div>
      <div className="table-responsive">
        <Table
          rowKey="id"
          columns={tableColumns}
          dataSource={countryList}
          pagination={pagination}
          onChange={handleTableChange}
          className="custom-table"
          loading={loading}
        />
      </div>
    </Card>
  );
};
export default CountryList;
