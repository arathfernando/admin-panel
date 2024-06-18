/* eslint-disable camelcase */
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, Popconfirm, Space, Table, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserViwer from '../../../../components/util-components/UserViwer';
import utils from '../../../../helpers/utils/index';
import useColumDateRangeSort from '../../../../hooks/useColumDateRangeSort';
import useColumnSearchFilterSort from '../../../../hooks/useColumnSearchFilterSort';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';
import CreatePartner from './create';
import EditPartner from './edit';

const AllParters = () => {
  const dispatch = useDispatch();
  const [tableList, setTableList] = useState(null);
  const { partnerList, loading } = useSelector((state) => state.partner);

  const { hasEditPermission, hasDeletePermission } = usePermission();

  const { partnerTypeList } = useSelector((state) => state.partnerType);
  const languages = useSelector((state) => state.language.list);

  // filter states
  const [IDFilters, setIDFilters] = useState([{}]);
  const [createdByFilters, setCreatedByFilters] = useState([{}]);
  const [partnerNameFilters, setPartnerNameFilters] = useState([{}]);
  const [linkFilters, setLinkFilters] = useState([{}]);
  const [slugFilters, setSlugFilters] = useState([{}]);

  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(false);

  const getColumnDateRangeSortProps = useColumDateRangeSort();
  const getColumnSearchFilterSortProps = useColumnSearchFilterSort();

  useEffect(() => {
    dispatch(Actions.getAllPartnerType());
    dispatch(Actions.getAllLanguage({ page: 1, limit: 1000 }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(Actions.getAllPartner());
  }, [dispatch]);

  useEffect(() => {
    setTableList(partnerList);
  }, [partnerList]);

  const handleDelete = (id) => {
    dispatch(Actions.deletePartner(id));
  };

  const tableColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'id'),
      filters: IDFilters,
      onFilter: (value, { id }) => id === Number(value),
      filterSearch: (input) => {
        setTimeout(() => setIDFilters([{ text: input, value: input }]), 0);
        return true;
      },
    },
    {
      title: 'Created date',
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
      title: 'Name',
      dataIndex: 'partner_name',
      filters: partnerNameFilters,
      onFilter: (value, { partner_name }) =>
        partner_name?.toLowerCase().includes(value?.toLowerCase()),
      filterSearch: (input) => {
        setTimeout(
          () => setPartnerNameFilters([{ text: input, value: input }]),
          0
        );
        return true;
      },
    },
    {
      title: 'Type',
      render: (_, { partner_type }) => partner_type?.type,
      key: 'partner_type',
      filters: partnerTypeList?.map(({ id: value, type: text }) => ({
        value,
        text,
      })),
      onFilter: (value, { partner_type }) => partner_type?.id === value,
    },
    {
      title: 'Partnership area',
      ...getColumnSearchFilterSortProps('partnership_area', {
        filters: ['GLOBAL', 'LOCAL'].map((text) => ({ text })),
      }),
    },
    {
      title: 'Link',
      dataIndex: 'partner_link',
      key: 'partner_link',
      filters: linkFilters,
      onFilter: (value, { partner_link }) =>
        partner_link?.toLowerCase().includes(value?.toLowerCase()),
      filterSearch: (input) => {
        setTimeout(() => setLinkFilters([{ text: input, value: input }]), 0);
        return true;
      },
    },
    {
      title: 'Slug',
      dataIndex: 'partner_slug',
      key: 'partner_slug',
      filters: slugFilters,
      onFilter: (value, { partner_slug }) =>
        partner_slug?.toLowerCase().includes(value?.toLowerCase()),
      filterSearch: (input) => {
        setTimeout(() => setSlugFilters([{ text: input, value: input }]), 0);
        return true;
      },
    },
    {
      title: 'Status',
      render: (_, { status }) => status,
      key: 'status',
      filters: [
        {
          value: 'ACTIVE',
          text: 'ACTIVE',
        },
        {
          value: 'INACTIVE',
          text: 'INACTIVE',
        },
      ],
      onFilter: (value, { status }) => status === value,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      /* eslint-disable */
      render: (_, elm) => (
        <Space>
          <Tooltip title="View / Edit">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => {
                setVisible(true);
                setData(elm);
              }}
              size="small"
              disabled={!hasEditPermission}
            />
          </Tooltip>
          <Popconfirm
            title="Do you remove this Partner?"
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
    <>
      <Card>
        <div className="w-100 text-right mb-3">
          <CreatePartner />
        </div>
        <div className="table-responsive">
          <Table
            rowKey="id"
            columns={tableColumns}
            dataSource={tableList}
            loading={loading}
            className="custom-table"
          />
        </div>
      </Card>

      <EditPartner
        partnerTypeList={partnerTypeList}
        languages={languages}
        visible={visible}
        setVisible={setVisible}
        data={data}
      />
    </>
  );
};
export default AllParters;
