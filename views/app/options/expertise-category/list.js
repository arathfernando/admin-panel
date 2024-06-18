import { DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Image, Popconfirm, Space, Table, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useColumnSearchFilterSort from '../../../../hooks/useColumnSearchFilterSort';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';
import CreateExpertiseCategory from './create';
import EditExpertiseCategory from './edit';

const ExpertiseCategoryList = () => {
  const dispatch = useDispatch();
  const [expertiseCategoryList, setExpertiseCategoryList] = useState(null);
  const { list, loading } = useSelector((state) => state.expertiseCategory);
  const [pagination, setPagenation] = React.useState({
    current: 1,
    pageSize: 10,
  });

  const { hasDeletePermission } = usePermission();
  const getColumnSearchFilterSortProps = useColumnSearchFilterSort();

  useEffect(() => {
    dispatch(Actions.getAllExpertiseCategory());
  }, [dispatch]);

  useEffect(() => {
    setExpertiseCategoryList(list);
  }, [list]);

  const deleteExpertiseCategory = ({ id, name, description }) => {
    dispatch(
      Actions.deleteExpertiseCategory({
        id,
        translate: {
          removeKeys: [{ key: name }, { key: description }],
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
      title: 'Icon',
      render: ({ icon }) => icon && <Image width={100} src={icon} />,
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
      /* eslint-disable */
      render: (_, elm) => (
        <Space>
          <EditExpertiseCategory
            id={elm.id}
            data={expertiseCategoryList}
            type="expertiseCategory"
          />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => deleteExpertiseCategory(elm)}
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
        <CreateExpertiseCategory
          type="expertiseCategory"
          buttonContent="Create New ExpertiseCategory"
        />
      </div>
      <div className="table-responsive">
        <Table
          rowKey="id"
          className="custom-table"
          loading={loading}
          columns={tableColumns}
          dataSource={expertiseCategoryList}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </div>
    </Card>
  );
};
export default ExpertiseCategoryList;
