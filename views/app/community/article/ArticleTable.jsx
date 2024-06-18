/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Form, Popconfirm, Select, Space, Table, Tooltip } from 'antd';
import { useWatch } from 'antd/lib/form/Form';
import { isArray } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserViwer from '../../../../components/util-components/UserViwer';
import CommunitySelect from '../../../../components/util-components/selector/CommunitySelect';
import GroupSelect from '../../../../components/util-components/selector/GroupSelect';
import useColumDateRangeSort from '../../../../hooks/useColumDateRangeSort';
import useColumnSearchFilterSort from '../../../../hooks/useColumnSearchFilterSort';
import usePermission from '../../../../hooks/usePermission';
import { deleteActicle, getActicles } from '../../../../redux/actions';
import SubmitArticle from './SubmitArticle';

const ArticleTable = () => {
  const dispatch = useDispatch();
  const { data: acticles, loading } = useSelector(
    ({ acticle }) => acticle.acticles
  );

  const [pagination, setPagenation] = useState({
    current: 1,
    pageSize: 10,
  });

  // update article
  const [openUpdateArticle, setOpenUpdateArticle] = useState(false);
  const [updateArticleData, setUpdateArticleData] = useState({});

  const { hasDeletePermission, hasEditPermission } = usePermission();
  const getColumnDateRangeSortProps = useColumDateRangeSort();
  const getColumnSearchFilterSortProps = useColumnSearchFilterSort();

  const [form] = Form.useForm();
  const article_location = useWatch('article_location', form);

  useEffect(() => {
    dispatch(getActicles());
  }, [dispatch]);

  const handledeleteArticle = (id) => {
    dispatch(deleteActicle(id));
  };

  const columns = [
    {
      title: 'ID',
      ...getColumnSearchFilterSortProps('id'),
    },
    {
      title: 'Location',
      ...getColumnSearchFilterSortProps('location', {
        filters: [
          {
            value: 'Community',
            text: 'Community',
          },
          {
            value: 'Group',
            text: 'Group',
          },
        ],
      }),
      render: (_, { community }) => (community ? 'Community' : 'Group'),
      onFilter: (value, { community }) =>
        (community ? 'Community' : 'Group') === value,
    },
    {
      title: 'Community',
      ...getColumnSearchFilterSortProps('community.name'),
    },
    {
      title: 'Group',
      ...getColumnSearchFilterSortProps('group.group_name'),
    },
    {
      title: 'Topics',
      ...getColumnSearchFilterSortProps('topic'),
      render: (_, { topics }) =>
        topics?.map?.(({ name }) => name)?.toString?.(),
      onFilter: (value, { topics }) =>
        topics
          ?.map?.(({ name }) => name)
          ?.toString?.()
          ?.toLowerCase?.()
          .includes(value?.toLowerCase?.()),
    },
    {
      title: 'Created by',
      ...getColumnSearchFilterSortProps('created_by'),
      render: (_, record) => <UserViwer user={record.created_by} />,
      sorter: (a, b) => {
        return a.created_by?.general_profile?.first_name.toLowerCase() >
          b.created_by?.general_profile?.first_name.toLowerCase()
          ? -1
          : b.created_by?.general_profile?.first_name.toLowerCase() >
            a.created_by?.general_profile?.first_name.toLowerCase()
          ? 1
          : 0;
      },
      onFilter: (value, record) =>
        `${record.created_by?.general_profile?.first_name || ''} ${
          record.created_by?.general_profile?.last_name || ''
        }`
          .toLowerCase()
          .includes(value?.toLowerCase()),
    },
    {
      title: 'Created at',
      key: 'created_at',
      ...getColumnDateRangeSortProps('created_at'),
    },
    {
      title: 'Actions',
      key: 'Actions',
      render: (_, data) => (
        <Space>
          <Button
            type="ghost"
            icon={<EditOutlined />}
            size="small"
            onClick={() => {
              setOpenUpdateArticle(true);
              setUpdateArticleData(data);
            }}
            disabled={!hasEditPermission}
          />
          <Tooltip title="Delete" disabled>
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => handledeleteArticle(data.id)}
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
    <>
      <Form form={form} layout="vertical" className="mb-4">
        <Form.Item initialValue="COMMUNITY" name="article_location" noStyle>
          <Select
            options={[
              {
                value: 'COMMUNITY',
                text: 'Community',
              },
              {
                value: 'GROUP',
                text: 'Group',
              },
            ]}
            onChange={(article_location) => {
              dispatch(getActicles({ article_location }));
              form.setFieldValue('id');
            }}
          />
        </Form.Item>
        <Form.Item name="id" noStyle>
          {article_location === 'COMMUNITY' ? (
            <CommunitySelect
              onChange={(id) =>
                dispatch(getActicles({ article_location: 'COMMUNITY', id }))
              }
            />
          ) : (
            <GroupSelect
              onChange={(id) =>
                dispatch(getActicles({ article_location: 'GROUP', id }))
              }
            />
          )}
        </Form.Item>
      </Form>

      <Table
        dataSource={isArray(acticles) ? acticles : []}
        columns={columns}
        className="custom-table"
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: true }}
        loading={loading}
      />
      <SubmitArticle
        open={openUpdateArticle}
        data={updateArticleData}
        onCancel={() => {
          setOpenUpdateArticle(false);
          setUpdateArticleData({});
        }}
        loading={loading}
      />
    </>
  );
};

export default ArticleTable;
