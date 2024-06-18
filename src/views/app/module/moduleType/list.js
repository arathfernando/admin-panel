/* eslint-disable camelcase */
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Image, Popconfirm, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import utils from '../../../../helpers/utils/index';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';
import CreateModuleType from './create';
import EditModuleType from './edit';

const List = () => {
  const dispatch = useDispatch();
  const [moduleTypeList, setModuleTypeList] = useState(null);
  const { list, loading } = useSelector((state) => state.moduleType);

  const { hasDeletePermission } = usePermission();

  useEffect(() => {
    dispatch(Actions.getAllModuleType());
  }, [dispatch]);

  useEffect(() => {
    setModuleTypeList(list);
  }, [list]);

  const handleDelete = (id) => {
    dispatch(Actions.deleteModuleType(id));
  };
  const tableColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'id'),
    },
    {
      title: 'Logo',
      dataIndex: 'logo',
      /* eslint-disable */
      render: (_, { image }) => (
        <Image preview={false} width={70} alt="" src={image} />
      ),
      /* eslint-enable */
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'slug'),
    },
    {
      title: 'Short description',
      dataIndex: 'short_description',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'short_description'),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'description'),
    },
    {
      title: 'CoBuilding',
      dataIndex: 'cobuilding',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'cobuilding'),
      render: (_, { cobuilding }) => (cobuilding === 'YES' ? 'True' : 'False'),
      filters: [
        {
          text: 'YES',
          value: 'YES',
        },
        {
          text: 'YES',
          value: 'NO',
        },
      ],
      onFilter: (value, record) => record.cobuilding === value,
    },
    {
      title: 'BetaTesting',
      dataIndex: 'beta_testing',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'beta_testing'),
      render: (_, { beta_testing }) =>
        beta_testing === 'YES' ? 'True' : 'False',
      filters: [
        {
          text: 'YES',
          value: 'YES',
        },
        {
          text: 'YES',
          value: 'NO',
        },
      ],
      onFilter: (value, record) => record.beta_testing === value,
    },
    {
      title: 'Published',
      dataIndex: 'published',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'published'),
      render: (published) =>
        published === 'YES' ? 'Published' : 'Not published',
      filters: [
        {
          text: 'Published',
          value: 'YES',
        },
        {
          text: 'Not published',
          value: 'NO',
        },
      ],
      onFilter: (value, record) => record.published === value,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      /* eslint-disable */
      render: (_, elm) => (
        <Space>
          <EditModuleType id={elm.id} data={moduleTypeList} />
          <Popconfirm
            title="Do you remove this ModuleType?"
            onConfirm={() => handleDelete(elm.id)}
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
        </Space>
      ),
      /* eslint-enable */
    },
  ];
  return (
    <Card>
      <div className="w-100 text-right mb-3">
        <CreateModuleType />
      </div>
      <div className="table-responsive">
        <Table
          rowKey="id"
          columns={tableColumns}
          dataSource={moduleTypeList}
          loading={loading}
        />
      </div>
    </Card>
  );
};
export default List;
