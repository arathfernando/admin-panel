import { DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Popconfirm, Space, Table, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useColumnSearchFilterSort from '../../../../hooks/useColumnSearchFilterSort';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';
import CreateCurrency from './create';
import EditCurrency from './edit';

const CurrencyList = () => {
  const dispatch = useDispatch();

  const [currencyList, SetCurrencyList] = useState([]);
  const { list, loading } = useSelector((state) => state.currency);
  const [pagination, setPagenation] = React.useState({
    current: 1,
    pageSize: 10,
  });

  const { hasDeletePermission } = usePermission();
  const getColumnSearchFilterSortProps = useColumnSearchFilterSort();

  useEffect(() => {
    dispatch(Actions.getAllCurrency());
  }, [dispatch]);

  useEffect(() => {
    SetCurrencyList(list);
  }, [list]);

  const deleteCurrency = ({ id, name }) => {
    dispatch(
      Actions.deleteCurrency({
        id,
        translate: {
          removeKeys: [{ key: name }],
        },
      })
    );
  };

  const tableColumns = [
    {
      title: 'ID',
      ...getColumnSearchFilterSortProps('id'),
    },
    {
      title: ' Name',
      ...getColumnSearchFilterSortProps('name'),
    },
    {
      title: 'Symbol Native',
      ...getColumnSearchFilterSortProps('symbol_native'),
    },
    {
      title: 'Code',
      ...getColumnSearchFilterSortProps('currency_code'),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      /* eslint-disable */
      render: (_, elm) => (
        <Space>
          <EditCurrency id={elm?.id} data={currencyList} />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => deleteCurrency(elm)}
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
        <CreateCurrency />
      </div>
      <div className="table-responsive">
        <Table
          rowKey="id"
          columns={tableColumns}
          dataSource={currencyList}
          pagination={pagination}
          onChange={handleTableChange}
          className="custom-table"
          loading={loading}
        />
      </div>
    </Card>
  );
};
export default CurrencyList;
