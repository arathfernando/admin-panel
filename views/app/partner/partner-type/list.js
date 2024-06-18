import { DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Popconfirm, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import utils from '../../../../helpers/utils/index';
import useColumDateRangeSort from '../../../../hooks/useColumDateRangeSort';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';
import CreatePartnerType from './create';
import EditPartnerType from './edit';

const PartnerTypeList = () => {
  const dispatch = useDispatch();
  const [tableList, setTableList] = useState(null);
  const { partnerTypeList, loading } = useSelector(
    (state) => state.partnerType
  );
  useEffect(() => {
    dispatch(Actions.getAllPartnerType());
  }, [dispatch]);

  const { hasDeletePermission } = usePermission();
  const getColumnDateRangeSortProps = useColumDateRangeSort();

  useEffect(() => {
    setTableList(partnerTypeList);
  }, [partnerTypeList]);

  const handleDelete = (id) => {
    dispatch(Actions.deletePartnerType(id));
  };
  const tableColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'id'),
    },
    {
      title: 'Name',
      dataIndex: 'type',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'type'),
    },
    {
      title: 'Created Date',
      ...getColumnDateRangeSortProps('createdAt'),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      /* eslint-disable */
      render: (_, elm) => (
        <Space>
          <EditPartnerType id={elm.id} data={tableList} />
          <Popconfirm
            title="Do you remove this Partner Type?"
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
        <CreatePartnerType />
      </div>
      <div className="table-responsive">
        <Table
          rowKey="id"
          columns={tableColumns}
          dataSource={tableList}
          className="custom-table"
          loading={loading}
        />
      </div>
    </Card>
  );
};
export default PartnerTypeList;
