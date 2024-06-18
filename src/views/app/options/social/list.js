import { DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Image, Popconfirm, Space, Table, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useColumnSearchFilterSort from '../../../../hooks/useColumnSearchFilterSort';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';
import CreateSocial from './create';
import EditSocial from './edit';

const SocialList = () => {
  const dispatch = useDispatch();
  const [socialList, setSocialList] = useState(null);
  const { socialList: sList, loading } = useSelector((state) => state.social);

  const { hasDeletePermission } = usePermission();
  const getColumnSearchFilterSortProps = useColumnSearchFilterSort();

  const [pagination, setPagenation] = React.useState({
    current: 1,
    pageSize: 10,
  });

  useEffect(() => {
    dispatch(Actions.getAllSocial());
  }, [dispatch]);

  useEffect(() => {
    setSocialList(sList);
  }, [sList]);

  const deleteSocial = (id) => {
    dispatch(Actions.deleteSocial(id));
  };

  const tableColumns = [
    {
      title: 'ID',
      ...getColumnSearchFilterSortProps('id'),
    },
    {
      title: 'Icon',
      render: (_, elm) => <Image preview={false} width={100} src={elm.logo} />,
    },
    {
      title: 'Name',
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
          <EditSocial id={elm.id} data={socialList} />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => deleteSocial(elm.id)}
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
        <CreateSocial />
      </div>
      <div className="table-responsive">
        {socialList && (
          <Table
            rowKey="id"
            columns={tableColumns}
            dataSource={socialList}
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
export default SocialList;
