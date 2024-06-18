/* eslint-disable camelcase */
import {
  DeleteOutlined,
  EditOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import { Button, Popconfirm, Progress, Space, Table, Tag, Tooltip } from 'antd';
import { isArray } from 'lodash';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useColumnSearchFilterSort from '../../../../../hooks/useColumnSearchFilterSort';
import usePermission from '../../../../../hooks/usePermission';
import * as Actions from '../../../../../redux/actions';
import { deleteTranslationLanguage } from '../../../../../redux/translation/translationLanguage/actions';
import SubmitTranslationLanguage from './SubmitTranslationLanguage';

const TranslationLanguageTable = () => {
  const dispatch = useDispatch();
  const { data: translationLanguages, loading } = useSelector(
    ({ transLanguage }) => transLanguage.translationLanguages
  );

  const { data: translationKeys = [] } = useSelector(
    ({ translationKey }) => translationKey.translationKeys
  );

  const { loading: atutoTranslateLoading } = useSelector(
    ({ translationKey }) => translationKey.startAutoTranslationAction
  );

  const [pagination, setPagenation] = useState({
    current: 1,
    pageSize: 50,
  });

  // update translation language
  const [
    openTranslateTranslationLanguage,
    setOpenTranslateTranslationLanguage,
  ] = useState(false);
  const [
    translateTranslationLanguageData,
    setTranslateTranslationLanguageData,
  ] = useState({});

  const getColumnSearchFilterSortProps = useColumnSearchFilterSort();

  const {
    hasDeletePermission,
    hasEditPermission,
    hasSpecificPermission: hasTranslatePermission,
  } = usePermission({
    specificPermission: 'translate',
    path: '/app/managements/translation/translation-language',
  });

  const handledeleteTranslationLanguage = (id) => {
    dispatch(deleteTranslationLanguage(id));
  };

  const columns = [
    {
      title: 'ID',
      key: 'id',
      ...getColumnSearchFilterSortProps('id'),
    },
    {
      title: 'Flag',
      render: (_, { translation_language }) => (
        <img
          src={translation_language?.flag}
          style={{ maxHeight: 18, width: 22 }}
          alt=""
          className="my-2"
        />
      ),
      key: 'flag',
    },
    {
      title: 'Language code',
      key: 'code',
      ...getColumnSearchFilterSortProps('translation_language.language_code'),
    },
    {
      title: 'Language name',
      key: 'language_name',
      ...getColumnSearchFilterSortProps('translation_language.language_name'),
    },
    {
      title: 'Translated',
      key: 'translated',
      ...getColumnSearchFilterSortProps(
        (_, { translation_project_value }) =>
          Math.floor(
            (100 / translationKeys.length) * translation_project_value.length ||
              0
          ),
        {
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
        }
      ),
      render: (_, { translation_project_value }) => (
        <div className="d-flex align-items-center" style={{ gap: 10 }}>
          <Progress
            status="success"
            percent={Math.floor(
              (100 / translationKeys.length) *
                translation_project_value.length || 0
            )}
            showInfo={false}
            style={{ width: 50 }}
            size="small"
          />
          <span>
            {`${Math.floor(
              (100 / translationKeys.length) *
                translation_project_value.length || 0
            )}%`}
          </span>
        </div>
      ),
      onFilter: (value, { translation_project_value }) =>
        (100 / translationKeys.length) * translation_project_value.length >
          value - 1 &&
        (100 / translationKeys.length) * translation_project_value.length <
          value + 10,
    },
    {
      title: 'Default',
      key: 'is_default',
      ...getColumnSearchFilterSortProps('is_default', {
        filters: [{ text: 'TRUE' }, { text: 'FALSE' }],
      }),
      render: (_, { is_default }) =>
        is_default === 'TRUE' ? (
          <Tag color="green" className="br-5 text-black">
            Default
          </Tag>
        ) : null,
      defaultSortOrder: 'ascend',
    },
    {
      title: (
        <p className="mb-0" style={{ textAlign: 'end' }}>
          Actions
        </p>
      ),
      className: 'pe-5',
      key: 'Actions',
      render: (_, record) => (
        <Space
          onClick={(e) => e.stopPropagation()}
          className="d-flex justify-content-end"
        >
          <Button
            type="primary br-5 px-2 d-flex align-items-center mx-auto"
            icon={<PlayCircleOutlined />}
            size="small"
            onClick={() => {
              dispatch(Actions.startAutoTranslation({ id: record.id }));
            }}
            disabled={!hasTranslatePermission}
            loading={atutoTranslateLoading?.[record.id]}
          >
            Start auto-translation
          </Button>

          <Button
            type="ghost mx-1"
            icon={<EditOutlined />}
            size="small"
            onClick={() => {
              setOpenTranslateTranslationLanguage(true);
              setTranslateTranslationLanguageData(record);
            }}
            disabled={!hasEditPermission}
          />

          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => handledeleteTranslationLanguage(record.id)}
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
        dataSource={isArray(translationLanguages) ? translationLanguages : []}
        columns={columns}
        className="custom-table"
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: true }}
        loading={loading}
      />
      <SubmitTranslationLanguage
        open={openTranslateTranslationLanguage}
        data={translateTranslationLanguageData}
        onCancel={() => {
          setOpenTranslateTranslationLanguage(false);
          setTranslateTranslationLanguageData({});
        }}
      />
    </>
  );
};

export default TranslationLanguageTable;
