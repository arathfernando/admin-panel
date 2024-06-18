import { DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Popconfirm, Space, Table, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useColumnSearchFilterSort from '../../../../hooks/useColumnSearchFilterSort';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';
import CreateLanguage from './create';
import EditLanguage from './edit';

const LanguageList = () => {
  const dispatch = useDispatch();
  const [languageList, SetLanguageList] = useState(null);
  const { list, loading } = useSelector((state) => state.language);
  const [pagination, setPagenation] = React.useState({
    current: 1,
    pageSize: 10,
  });

  const { hasDeletePermission } = usePermission();
  const getColumnSearchFilterSortProps = useColumnSearchFilterSort();

  useEffect(() => {
    dispatch(Actions.getAllLanguage());
  }, [dispatch]);

  useEffect(() => {
    SetLanguageList(list);
  }, [list]);

  const deleteLanguage = (id) => {
    dispatch(Actions.deleteLanguage(id));
  };

  const tableColumns = [
    {
      title: 'ID',
      ...getColumnSearchFilterSortProps('id'),
    },
    {
      title: 'Code',
      ...getColumnSearchFilterSortProps('language_code'),
    },
    {
      title: 'Name',
      ...getColumnSearchFilterSortProps('language_name'),
    },
    {
      title: 'Native Name',
      ...getColumnSearchFilterSortProps('native_name'),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, elm) => (
        <Space>
          <EditLanguage id={elm.id} data={languageList} />

          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => deleteLanguage(elm.id)}
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
        <CreateLanguage />
      </div>
      <div className="table-responsive">
        <Table
          className="custom-table"
          loading={loading}
          rowKey="id"
          columns={tableColumns}
          dataSource={languageList}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </div>
    </Card>
  );
};

export default LanguageList;
