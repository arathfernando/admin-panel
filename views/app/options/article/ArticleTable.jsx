/* eslint-disable camelcase */
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Image, Popconfirm, Space, Table, Tooltip } from 'antd';
import { isArray } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserViwer from '../../../../components/util-components/UserViwer';
import utils from '../../../../helpers/utils/index';
import useColumDateRangeSort from '../../../../hooks/useColumDateRangeSort';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';
import CreateArticle from './CreateArticle';

const ArticleTable = () => {
  const dispatch = useDispatch();
  const { data: articles, loading } = useSelector(
    ({ article }) => article.articles
  );

  const [pagination, setPagenation] = useState({
    current: 1,
    pageSize: 10,
  });

  const { hasEditPermission, hasDeletePermission } = usePermission();
  const getColumnDateRangeSortProps = useColumDateRangeSort();

  // update article
  const [openUpdateArticle, setOpenUpdateArticle] = useState(false);
  const [updateArticleData, setUpdateArticleData] = useState({});

  // filter states
  const [IDFilters, setIDFilters] = useState([{}]);
  const [titleFilters, setTitleFilters] = useState([{}]);
  const [descriptionFilters, setDescriptionFilters] = useState([{}]);
  const [createdByFilters, setCreatedByFilters] = useState([{}]);

  useEffect(() => {
    dispatch(Actions.getArticles());
  }, [dispatch]);

  const handledeleteArticle = (id) => {
    dispatch(Actions.deleteArticle(id));
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'id'),
      filters: IDFilters,
      onFilter: (value, { id }) =>
        id?.toLowerCase?.().includes(value?.toLowerCase?.()),
      filterSearch: (input) => {
        setTimeout(() => setIDFilters([{ text: input, value: input }]), 0);
        return true;
      },
    },
    {
      title: 'Image',
      render: (_, { image }) => <Image height={35} width={40} src={image} />,
      key: 'image',
    },
    {
      title: 'Title',
      dataIndex: 'article_title',
      key: 'article_title',
      filters: titleFilters,
      onFilter: (value, { article_title }) =>
        article_title?.toLowerCase?.().includes(value?.toLowerCase?.()),
      filterSearch: (input) => {
        setTimeout(() => setTitleFilters([{ text: input, value: input }]), 0);
        return true;
      },
    },
    {
      title: 'Description',
      dataIndex: 'article_description',
      key: 'article_description',
      filters: descriptionFilters,
      onFilter: (value, { article_description }) =>
        article_description?.toLowerCase?.().includes(value?.toLowerCase?.()),
      filterSearch: (input) => {
        setTimeout(
          () => setDescriptionFilters([{ text: input, value: input }]),
          0
        );
        return true;
      },
    },
    {
      title: 'Date Created',
      key: 'createdAt',
      ...getColumnDateRangeSortProps('createdAt'),
    },
    {
      title: 'Created by',
      render: (_, { created_by }) => <UserViwer user={created_by} />,
      key: 'created_by',
      filters: createdByFilters,
      onFilter: (value, { created_by }) =>
        `${created_by?.general_profile?.first_name || ''} ${
          created_by?.general_profile?.last_name || ''
        } ${created_by?.email || ''}`
          ?.toLowerCase()
          .includes(value?.toLowerCase()),
      filterSearch: (input) => {
        setTimeout(() => {
          setCreatedByFilters([{ text: input, value: input }]);
        }, 0);
        return true;
      },
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
          <Tooltip title="Delete">
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
      <Table
        dataSource={isArray(articles) ? articles : []}
        columns={columns}
        className="custom-table"
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: true }}
        loading={loading}
      />
      <CreateArticle
        open={openUpdateArticle}
        data={updateArticleData}
        onCancel={() => {
          setOpenUpdateArticle(false);
          setUpdateArticleData({});
        }}
      />
    </>
  );
};

export default ArticleTable;
