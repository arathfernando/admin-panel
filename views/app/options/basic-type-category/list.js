import { DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Popconfirm, Space, Table, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useColumnSearchFilterSort from '../../../../hooks/useColumnSearchFilterSort';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';
import CreateBasicTypeCategory from './create';
import EditBasicTypeCategory from './edit';

const BasicTypeCategoryList = () => {
  const dispatch = useDispatch();
  const [basicTypeCategoryList, setBasicTypeCategoryList] = useState(null);
  const { typeList, loading } = useSelector((state) => state.basicTypeCategory);
  const [pagination, setPagenation] = React.useState({
    current: 1,
    pageSize: 10,
  });

  useEffect(() => {
    dispatch(Actions.getAllBasicTypeCategory());
  }, [dispatch]);

  const { hasDeletePermission } = usePermission();

  const getColumnSearchFilterSortProps = useColumnSearchFilterSort();

  useEffect(() => {
    setBasicTypeCategoryList(typeList);
  }, [typeList]);

  const deleteBasicTypeCategory = (id) => {
    dispatch(Actions.deleteBasicTypeCategory(id));
  };

  const tableColumns = [
    {
      title: 'ID',
      ...getColumnSearchFilterSortProps('id', { type: 'number' }),
    },
    {
      title: 'Display Name',
      ...getColumnSearchFilterSortProps('display_name'),
    },
    {
      title: ' Name',
      ...getColumnSearchFilterSortProps('name'),
    },
    {
      title: 'Description',
      ...getColumnSearchFilterSortProps('description'),
    },

    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, elm) => (
        <Space>
          <EditBasicTypeCategory id={elm.id} data={basicTypeCategoryList} />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => deleteBasicTypeCategory(elm.id)}
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
        <CreateBasicTypeCategory categoryList={basicTypeCategoryList} />
      </div>
      <div className="table-responsive">
        <Table
          rowKey="id"
          loading={loading}
          columns={tableColumns}
          dataSource={basicTypeCategoryList}
          pagination={pagination}
          onChange={handleTableChange}
          className="custom-table"
        />
      </div>
    </Card>
  );
};
export default BasicTypeCategoryList;
