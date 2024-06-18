import { DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Image, Popconfirm, Space, Table, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useColumnSearchFilterSort from '../../../../hooks/useColumnSearchFilterSort';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';
import CreateContestCategory from './create';
import EditContestCategory from './edit';

const ContestCategoryList = () => {
  const dispatch = useDispatch();
  const [contestCategoryList, setContestCategoryList] = useState([]);
  const { list, loading } = useSelector((state) => state.contestCategory);
  const [pagination, setPagenation] = React.useState({
    current: 1,
    pageSize: 10,
  });

  const { hasDeletePermission } = usePermission();
  const getColumnSearchFilterSortProps = useColumnSearchFilterSort();

  useEffect(() => {
    setContestCategoryList(list);
  }, [list]);

  useEffect(() => {
    dispatch(Actions.getAllContestCategory());
  }, [dispatch]);

  const deleteContestCategory = (id) => {
    dispatch(Actions.deleteContestCategory(id));
  };

  const tableColumns = [
    {
      title: 'ID',
      ...getColumnSearchFilterSortProps('id'),
    },
    {
      title: 'Image',
      render: (_, elm) => (
        <Image preview={false} width={100} height={100} src={elm.image} />
      ),
    },
    {
      title: 'Title',
      ...getColumnSearchFilterSortProps('title'),
    },
    {
      title: 'Description',
      ...getColumnSearchFilterSortProps('description'),
    },
    {
      title: 'Standard rule',
      ...getColumnSearchFilterSortProps('contest_standard_rule'),
      render: (_, { contest_standard_rule }) => (
        <span className="text-elps-3">{contest_standard_rule}</span>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, elm) => (
        <Space>
          <EditContestCategory id={elm.id} data={contestCategoryList} />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => deleteContestCategory(elm.id)}
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
        <CreateContestCategory categoryList={contestCategoryList} />
      </div>
      <div className="table-responsive">
        <Table
          rowKey="id"
          columns={tableColumns}
          dataSource={contestCategoryList}
          pagination={pagination}
          onChange={handleTableChange}
          className="custom-table"
          loading={loading}
        />
      </div>
    </Card>
  );
};
export default ContestCategoryList;
