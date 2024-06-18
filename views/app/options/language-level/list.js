import { DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Popconfirm, Space, Table, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useColumnSearchFilterSort from '../../../../hooks/useColumnSearchFilterSort';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';
import CreateLanguageLevel from './create';
import EditLanguageLevel from './edit';

const LanguageLevelList = () => {
  const dispatch = useDispatch();
  const [languageLevelList, SetLanguageLevelList] = useState(null);
  const { list, loading } = useSelector((state) => state.languageLevel);
  const [pagination, setPagenation] = React.useState({
    current: 1,
    pageSize: 10,
  });

  const { hasDeletePermission } = usePermission();
  const getColumnSearchFilterSortProps = useColumnSearchFilterSort();

  useEffect(() => {
    dispatch(Actions.getAllLanguageLevel());
  }, [dispatch]);

  useEffect(() => {
    SetLanguageLevelList(list);
  }, [list]);

  const deleteLanguageLevel = (id) => {
    dispatch(Actions.deleteLanguageLevel(id));
  };

  const tableColumns = [
    {
      title: 'ID',
      ...getColumnSearchFilterSortProps('id'),
    },
    {
      title: 'Name',
      ...getColumnSearchFilterSortProps('language_level_name'),
    },
    {
      title: 'Description',
      ...getColumnSearchFilterSortProps('description'),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      /* eslint-disable */
      render: (_, elm) => (
        <Space>
          <EditLanguageLevel id={elm.id} data={languageLevelList} />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => deleteLanguageLevel(elm.id)}
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
        <CreateLanguageLevel />
      </div>
      <div className="table-responsive">
        <Table
          rowKey="id"
          className="custom-table"
          loading={loading}
          columns={tableColumns}
          dataSource={languageLevelList}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </div>
    </Card>
  );
};
export default LanguageLevelList;
