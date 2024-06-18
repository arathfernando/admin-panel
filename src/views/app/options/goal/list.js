import { DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Image, Popconfirm, Space, Table, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import utils from '../../../../helpers/utils/index';
import useColumnSearchFilterSort from '../../../../hooks/useColumnSearchFilterSort';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';
import CreateGoal from './create';
import EditGoal from './edit';

const GoalList = () => {
  const dispatch = useDispatch();
  const [goalList, setGoalList] = useState(null);
  const { list, loading } = useSelector((state) => state.goal);

  const [pagination, setPagenation] = React.useState({
    current: 1,
    pageSize: 10,
  });

  const { hasDeletePermission } = usePermission();
  const getColumnSearchFilterSortProps = useColumnSearchFilterSort();

  useEffect(() => {
    dispatch(Actions.getAllGoals());
  }, [dispatch]);

  useEffect(() => {
    setGoalList(list);
  }, [list]);

  const deleteGoal = (id) => {
    dispatch(Actions.deleteGoal(id));
  };

  const tableColumns = [
    {
      title: 'ID',
      ...getColumnSearchFilterSortProps('id'),
    },
    {
      title: 'Icon',
      render: (_, elm) => (
        <Image
          preview={false}
          height={60}
          width={70}
          src={elm.goal_image}
          style={{ background: elm.color }}
        />
      ),
    },
    {
      title: 'Color',
      render: (_, { color }) => (
        <span style={{ background: color, color: 'white', padding: '2px 5px' }}>
          {color}
        </span>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'color'),
      ...getColumnSearchFilterSortProps('id'),
    },
    {
      title: 'Title',
      ...getColumnSearchFilterSortProps('goal_title'),
    },
    {
      title: 'Description',
      ...getColumnSearchFilterSortProps('description'),
    },
    {
      title: 'Number',
      ...getColumnSearchFilterSortProps('goal_number'),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, elm) => (
        <Space>
          <EditGoal id={elm.id} data={goalList} />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => deleteGoal(elm.id)}
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
        <CreateGoal />
      </div>
      <div className="table-responsive">
        {goalList && (
          <Table
            rowKey="id"
            className="custom-table"
            loading={loading}
            columns={tableColumns}
            dataSource={goalList}
            pagination={pagination}
            onChange={handleTableChange}
          />
        )}
      </div>
    </Card>
  );
};
export default GoalList;
