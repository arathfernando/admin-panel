/* eslint-disable camelcase */
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Progress, Space, Table, Tooltip } from 'antd';
import { isArray } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import useColumDateRangeSort from '../../../../../hooks/useColumDateRangeSort';
import useColumnSearchFilterSort from '../../../../../hooks/useColumnSearchFilterSort';
import usePermission from '../../../../../hooks/usePermission';
import * as Actions from '../../../../../redux/actions';
import SubmitTranslationProject from './SubmitTranslationProject';

const TranslationProjectTable = () => {
  const dispatch = useDispatch();
  const { data: translationProjects, loading } = useSelector(
    ({ translationProject }) => translationProject.translationProjects
  );

  const [pagination, setPagenation] = useState({
    current: 1,
    pageSize: 10,
  });

  // update translation project
  const [openUpdateTranslationProject, setOpenUpdateTranslationProject] =
    useState(false);
  const [updateTranslationProjectData, setUpdateTranslationProjectData] =
    useState({});

  const getColumnSearchFilterSortProps = useColumnSearchFilterSort();
  const getColumnDateRangeSortProps = useColumDateRangeSort();

  const { hasDeletePermission, hasEditPermission } = usePermission();

  const history = useHistory();

  useEffect(() => {
    dispatch(Actions.getTranslationProjects());
  }, [dispatch]);

  const handledeleteTranslationProject = (id) => {
    dispatch(Actions.deleteTranslationProject(id));
  };

  const columns = [
    {
      title: 'ID',
      key: 'id',
      ...getColumnSearchFilterSortProps('id'),
    },
    {
      title: 'Name',
      key: 'project_name',
      ...getColumnSearchFilterSortProps('project_name'),
    },
    {
      title: 'No of key',
      dataIndex: 'no_of_Key',
      ...getColumnSearchFilterSortProps('no_of_Key', { exactMatch: true }),
    },
    {
      title: 'No of language',
      dataIndex: 'translation_project_language',
      key: 'translation_project_language',
      ...getColumnSearchFilterSortProps('translation_project_language.length'),
    },
    {
      title: 'Translated',
      key: 'translated',
      ...getColumnSearchFilterSortProps('translated', {
        filters: [
          {
            text: '1% - 10%',
            value: 1,
          },
          {
            text: '11% - 20%',
            value: 11,
          },
          {
            text: '21% - 30%',
            value: 21,
          },
          {
            text: '31% - 40%',
            value: 31,
          },
          {
            text: '41% - 50%',
            value: 41,
          },
          {
            text: '51% - 60%',
            value: 51,
          },
          {
            text: '61% - 70%',
            value: 61,
          },
          {
            text: '71% - 80%',
            value: 71,
          },
          {
            text: '81% - 90%',
            value: 81,
          },
          {
            text: '91% - 100%',
            value: 91,
          },
        ],
      }),
      onFilter: (value, { translated }) =>
        translated > value - 1 && translated < value + 10,
      render: () => (
        <Progress
          type="circle"
          percent={100}
          style={{
            transform: 'scale(0.3)',
            marginTop: -40,
            marginBottom: -40,
            marginLeft: -33,
          }}
        />
      ),
    },
    {
      title: 'Created date',
      key: 'created_at',
      ...getColumnDateRangeSortProps('created_at'),
    },
    {
      title: 'Actions',
      key: 'Actions',
      render: (_, data) => (
        <Space onClick={(e) => e.stopPropagation()}>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            size="small"
            onClick={() =>
              history.push(
                `/app/managements/translation/translation-key/${data?.id}/${data?.project_name}`
              )
            }
          />
          <Button
            type="ghost"
            icon={<EditOutlined />}
            size="small"
            onClick={() => {
              setOpenUpdateTranslationProject(true);
              setUpdateTranslationProjectData(data);
            }}
            disabled={!hasEditPermission}
          />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => handledeleteTranslationProject(data.id)}
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
        dataSource={isArray(translationProjects) ? translationProjects : []}
        columns={columns}
        className="custom-table"
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: true }}
        loading={loading}
        onRow={({ id, project_name }) => ({
          onClick: () =>
            history.push(
              `/app/managements/translation/translation-key/${id}/${project_name}`
            ),
          className: 'cursor-pointer',
        })}
      />
      <SubmitTranslationProject
        open={openUpdateTranslationProject}
        data={updateTranslationProjectData}
        onCancel={() => {
          setOpenUpdateTranslationProject(false);
          setUpdateTranslationProjectData({});
        }}
      />
    </>
  );
};

export default TranslationProjectTable;
