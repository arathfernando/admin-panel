/* eslint-disable consistent-return */
/* eslint-disable eqeqeq */
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Image, Popconfirm, Select, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useColumnSearchFilterSort from '../../../../hooks/useColumnSearchFilterSort';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';
import CreateBasicType from './create';
import EditBasicType from './edit';

const { Option } = Select;

const BasicTypeList = () => {
  const dispatch = useDispatch();
  const [basicTypeList, setBasicTypeList] = useState(null);
  const [categoryList, setCategoryList] = useState(null);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const { list, loading } = useSelector((state) => state.basicType);
  const { typeList } = useSelector((state) => state.basicTypeCategory);

  const [pagination, setPagenation] = React.useState({
    current: 1,
    pageSize: 10,
  });

  useEffect(() => {
    dispatch(Actions.getAllBasicType());
  }, [dispatch]);

  const { hasDeletePermission } = usePermission();

  const getColumnSearchFilterSortProps = useColumnSearchFilterSort();

  useEffect(() => {
    dispatch(Actions.getAllBasicTypeCategory());
  }, [dispatch]);

  useEffect(() => {
    setCategoryList(typeList);
  }, [typeList]);

  useEffect(() => {
    if (categoryList?.length > 0) {
      setCurrentCategoryId(categoryList[0].id);
    }
  }, [categoryList, dispatch]);

  useEffect(() => {
    if (list && list.length) {
      setBasicTypeList(list);
    }
  }, [list]);

  const deleteBasicType = ({ id, ...data }) => {
    if (id && currentCategoryId) {
      dispatch(
        Actions.deleteBasicType({
          id,
          currentCategoryId,
          translate: {
            removeKeys: [{ key: data.name }, { key: data?.description }],
          },
        })
      );
    }
  };

  const handleCategory = (value) => {
    if (value === 'all') {
      setBasicTypeList(list);
    } else {
      const temp = list.filter((item) => item.category?.id == value);
      setBasicTypeList(temp);
    }
  };

  const tableColumns = [
    {
      title: 'ID',
      ...getColumnSearchFilterSortProps('id', { type: 'number' }),
    },
    {
      title: 'Image',
      render: (_, elm) => {
        if (elm.image) {
          return (
            <Image width={70} height={70} preview={false} src={elm.image} />
          );
        }
      },
    },
    {
      title: 'Name',
      ...getColumnSearchFilterSortProps('name'),
    },
    {
      title: 'description',
      ...getColumnSearchFilterSortProps('description'),
    },
    {
      title: 'Category',
      ...getColumnSearchFilterSortProps('category.name'),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, elm) => {
        return (
          <Space>
            <EditBasicType
              id={elm.id}
              data={basicTypeList ?? []}
              category={categoryList ?? []}
            />
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => deleteBasicType(elm)}
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
          </Space>
        );
      },
    },
  ];

  const handleTableChange = (params) => {
    setPagenation(params.pagination);
  };

  return (
    <Card>
      <div className="d-flex mb-3" style={{ justifyContent: 'space-between' }}>
        <Select
          style={{ width: 200 }}
          onChange={handleCategory}
          placeholder="Type Category"
        >
          <Option value="all">All</Option>
          {categoryList?.map((item) => {
            return (
              <Option key={item.id} value={item.id}>
                {item.display_name}
              </Option>
            );
          })}
        </Select>
        <CreateBasicType categoryList={categoryList} />
      </div>
      <div className="table-responsive">
        <Table
          rowKey="id"
          className="custom-table"
          loading={loading}
          columns={tableColumns}
          dataSource={basicTypeList}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </div>
    </Card>
  );
};
export default BasicTypeList;
