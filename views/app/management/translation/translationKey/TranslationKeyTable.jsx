/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import {
  CaretDownOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import {
  Button,
  Dropdown,
  Form,
  Popconfirm,
  Progress,
  Space,
  Table,
  Tag,
  Tooltip,
} from 'antd';
import { useWatch } from 'antd/lib/form/Form';
import TextArea from 'antd/lib/input/TextArea';
import { isArray, isEmpty } from 'lodash';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import useColumDateRangeSort from '../../../../../hooks/useColumDateRangeSort';
import useColumnSearchFilterSort from '../../../../../hooks/useColumnSearchFilterSort';
import usePermission from '../../../../../hooks/usePermission';
import * as Actions from '../../../../../redux/actions';
import SubmitTranslationKey from './SubmitTranslationKey';

const ExpandedRowRender = ({ record }) => {
  const { data: translationLanguages = [], loading } = useSelector(
    ({ transLanguage }) => transLanguage.translationLanguages,
    shallowEqual
  );

  const { status, data } = useSelector(
    ({ translationKey }) => translationKey.updateTranslationTextAction
  );

  const [form] = Form.useForm();

  const inputRerf = useRef();

  const [selectedLangId, setSelectedLangId] = useState();

  const translation_value = useWatch('translation_value', form);

  const [translationText, settranslationText] = useState();

  const selectedLang = useMemo(
    () => translationLanguages?.find?.(({ id }) => id === selectedLangId) || {},
    [selectedLangId, translationLanguages]
  );

  // select default language initially
  useEffect(() => {
    if (!isEmpty(translationLanguages) && !selectedLangId) {
      setSelectedLangId(
        translationLanguages.find(({ is_default }) => is_default === 'TRUE')?.id
      );
    }
  }, [translationLanguages]);

  // set selected language text
  useEffect(() => {
    const translationText =
      record?.translation_project_value?.find?.(
        ({ translation_project_language }) =>
          translation_project_language?.id === selectedLangId
      )?.translation_value || '';
    form.setFieldValue('translation_value', translationText);
    settranslationText(translationText);
  }, [selectedLangId]);

  const languages = translationLanguages?.map((lang) => ({
    key: lang?.id,
    label: (
      <div
        className="d-flex align-items-center cursor-pointer"
        style={{ gap: 8 }}
      >
        <img
          src={lang?.translation_language?.flag}
          style={{ width: 15 }}
          alt=""
        />
        <span className="hb-text-primary">
          {lang?.translation_language?.language_name}
        </span>
      </div>
    ),
    onClick: () => {
      inputRerf.current && inputRerf.current.focus();
      setSelectedLangId(lang?.id);
    },
  }));

  const dispatch = useDispatch();

  const onSave = ({ translation_value }) => {
    dispatch(
      Actions.updateTranslationText({
        translation_value,
        translation_project_key_id: record.id,
        translation_project_language_id: selectedLangId,
        onSuccess: () => {
          settranslationText(translation_value);
          dispatch(
            Actions.updateTranslationKeyTextState({
              translation_value,
              translation_project_key_id: record.id,
              translation_project_language_id: selectedLangId,
              translation_project_language: selectedLang,
            })
          );
        },
        onError: () => null,
      })
    );
  };

  return (
    <div className="p-2">
      <Dropdown
        menu={{
          items: languages,
          style: { border: '1px solid #ACACAC', width: 'fit-content' },
          className: 'p-3',
        }}
        trigger={['click']}
        placement="bottom"
      >
        <div className="d-flex cursor-pointer mb-1" style={{ gap: 4 }}>
          <h6 className="h6-sm">
            <b className="hb-text-primary">
              {selectedLang?.translation_language?.language_name}
            </b>
          </h6>
          <Button
            type="text p-0 mt-n1"
            size="small"
            icon={<CaretDownOutlined className="hb-text-primary" />}
            loading={loading && isEmpty(translationLanguages)}
          />
        </div>
      </Dropdown>

      <Form
        form={form}
        onFinish={onSave}
        className="custom-form-style"
        layout="vertical"
      >
        <Form.Item name="translation_value" noStyle>
          <TextArea
            ref={inputRerf}
            className="mb-3"
            rows={1}
            autoSize
            placeholder="Type translation text"
            style={{ maxHeight: 150 }}
          />
        </Form.Item>

        <Button
          type="primary btn-text-md px-3"
          size="small"
          htmlType="submit"
          disabled={!translation_value || translation_value === translationText}
          loading={
            status === 'submitting' &&
            data?.translation_project_key_id === record.id &&
            data?.translation_project_language_id === selectedLangId
          }
        >
          Save
        </Button>
      </Form>
    </div>
  );
};

const TranslationKeyTable = ({ searchtranslationkey }) => {
  const dispatch = useDispatch();
  const {
    data = [],
    loading,
    translationNamespace,
  } = useSelector(({ translationKey }) => translationKey.translationKeys);

  const { data: translationLanguages = [] } = useSelector(
    ({ transLanguage }) => transLanguage.translationLanguages,
    shallowEqual
  );

  const [pagination, setPagenation] = useState({
    current: 1,
    pageSize: 100,
  });

  const translationKeys = useMemo(
    () =>
      data.filter(({ translation_key }) =>
        translation_key
          ?.toString?.()
          .toLowerCase()
          .includes((searchtranslationkey || '').toLowerCase())
      ),
    [data, searchtranslationkey]
  );

  const { projectId } = useParams();

  const [expandCollapseAllRows, setExpandCollapseAllRows] = useState();

  // update translation key
  const [openUpdateTranslationKey, setOpenUpdateTranslationKey] =
    useState(false);
  const [updateTranslationKeyData, setUpdateTranslationKeyData] = useState({});

  const { hasDeletePermission, hasEditPermission } = usePermission({
    path: '/app/managements/translation/translation-key',
  });

  const getColumnSearchFilterSortProps = useColumnSearchFilterSort();
  const getColumnDateRangeSortProps = useColumDateRangeSort();

  useEffect(() => {
    dispatch(Actions.getTranslationKeys({ projectId }));
  }, [dispatch]);

  const handledeleteTranslationKey = (id) => {
    dispatch(Actions.deleteTranslationKey(id));
  };

  const columns = [
    {
      title: (
        <div className="d-flex align-items-cente ml-n5" style={{ gap: 24 }}>
          <img
            src="/assets/img/icons/arrow-down.svg"
            className="cursor-pointer p-4 m-n4"
            alt=""
            style={{
              height: 66,
              transform: expandCollapseAllRows === 'expand' && 'rotate(180deg)',
            }}
            onClick={(e) => {
              e.stopPropagation();
              setExpandCollapseAllRows(
                expandCollapseAllRows === 'expand' ? 'collapse' : 'expand'
              );
            }}
          />

          <span>ID</span>
        </div>
      ),
      key: 'id',
      ...getColumnSearchFilterSortProps('id'),
    },
    {
      title: 'Translation key',
      key: 'translation_key',
      ...getColumnSearchFilterSortProps('translation_key'),
    },
    {
      title: 'Namespace',
      key: 'namespace',
      ...getColumnSearchFilterSortProps('namespace', {
        filters: translationNamespace.map((namespace) => ({ text: namespace })),
        exactMatch: true,
      }),
      render: (_, { namespace }) =>
        namespace && (
          <Tag color="green" className="br-5 text-black">
            {namespace}
          </Tag>
        ),
    },
    {
      title: 'Translated',
      key: 'translated',
      ...getColumnSearchFilterSortProps('translation_project_value.length', {
        exactMatch: true,
      }),
      render: (_, { translation_project_value }) => (
        <div className="d-flex align-items-center" style={{ gap: 10 }}>
          <Progress
            status="success"
            percent={Math.floor(
              (100 / translationLanguages.length) *
                translation_project_value?.length
            )}
            showInfo={false}
            style={{ width: 50 }}
            size="small"
          />
          <span>
            {translation_project_value.length}/{translationLanguages?.length}
          </span>
        </div>
      ),
    },
    {
      title: 'Created date',
      key: 'created_at',
      ...getColumnDateRangeSortProps('created_at'),
    },
    {
      title: 'Updated date',
      key: 'updated_at',
      ...getColumnDateRangeSortProps('updated_at'),
      defaultSortOrder: 'ascend',
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
            onClick={(e) => {
              e.stopPropagation();
              setOpenUpdateTranslationKey(true);
              setUpdateTranslationKeyData(data);
            }}
            disabled={!hasEditPermission}
          />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={(e) => {
                e.stopPropagation();
                handledeleteTranslationKey(data.id);
              }}
              onCancel={(e) => e.stopPropagation()}
              okText="Yes"
              cancelText="No"
              disabled={!hasDeletePermission}
            >
              <Button
                danger
                icon={<DeleteOutlined />}
                size="small"
                disabled={!hasDeletePermission}
                onClick={(e) => e.stopPropagation()}
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
        rowKey="id"
        dataSource={isArray(translationKeys) ? translationKeys : []}
        columns={columns}
        className="custom-table"
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: true }}
        loading={loading}
        expandable={{
          expandedRowRender: (record) => <ExpandedRowRender record={record} />,
          rowExpandable: () => true,
          expandIcon: ({ expanded, onExpand, record }) =>
            expanded ? (
              <img
                src="/assets/img/icons/arrow-down.svg"
                className="cursor-pointer p-4 m-n4"
                alt=""
                style={{ height: 62, transform: 'rotate(180deg)' }}
                onClick={(e) => {
                  setExpandCollapseAllRows();
                  onExpand(record, e);
                }}
              />
            ) : (
              <img
                src="/assets/img/icons/arrow-down.svg"
                className="cursor-pointer p-4 m-n4"
                alt=""
                style={{ height: 62 }}
                onClick={(e) => {
                  setExpandCollapseAllRows();
                  onExpand(record, e);
                }}
              />
            ),
          expandRowByClick: true,
          expandedRowKeys:
            expandCollapseAllRows === 'expand'
              ? translationKeys.map(({ id }) => id)
              : expandCollapseAllRows === 'collapse'
              ? []
              : undefined,
          onExpand: () => setExpandCollapseAllRows(),
        }}
        rowClassName="cursor-pointer"
      />
      <SubmitTranslationKey
        open={openUpdateTranslationKey}
        data={updateTranslationKeyData}
        onCancel={() => {
          setOpenUpdateTranslationKey(false);
          setUpdateTranslationKeyData({});
        }}
      />
    </>
  );
};

export default TranslationKeyTable;
