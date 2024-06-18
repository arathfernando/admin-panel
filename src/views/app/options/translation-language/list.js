import { DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Image, Popconfirm, Space, Table, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useColumnSearchFilterSort from '../../../../hooks/useColumnSearchFilterSort';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';
import AddTranslationLanguage from './create';
import EditTranslationLanguage from './edit';

const TranslationLanguageList = () => {
  const dispatch = useDispatch();
  const [translationlanguageList, setTranslationLanguageList] = useState(null);
  const { list, loading } = useSelector((state) => state.translationLanguage);

  const { hasDeletePermission } = usePermission();
  const getColumnSearchFilterSortProps = useColumnSearchFilterSort();

  const [pagination, setPagenation] = React.useState({
    current: 1,
    pageSize: 10,
  });

  useEffect(() => {
    dispatch(Actions.getAllTranslationLanguages());
  }, [dispatch]);

  useEffect(() => {
    setTranslationLanguageList(list);
  }, [list]);

  const deleteTranslationLanguage = (id) => {
    dispatch(Actions.deleteOptionTranslationLanguage(id));
  };

  const tableColumns = [
    {
      title: 'ID',
      ...getColumnSearchFilterSortProps('id'),
    },
    {
      title: 'Flag',
      render: (_, elm) => (
        <Image preview={false} width={70} height={70} src={elm.flag} />
      ),
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
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, elm) => (
        <Space>
          <EditTranslationLanguage id={elm.id} data={translationlanguageList} />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => deleteTranslationLanguage(elm.id)}
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
        <AddTranslationLanguage />
      </div>
      <div className="table-responsive">
        {translationlanguageList && (
          <Table
            rowKey="id"
            columns={tableColumns}
            dataSource={translationlanguageList}
            pagination={pagination}
            onChange={handleTableChange}
            className="custom-table"
            loading={loading}
          />
        )}
      </div>
    </Card>
  );
};
export default TranslationLanguageList;
