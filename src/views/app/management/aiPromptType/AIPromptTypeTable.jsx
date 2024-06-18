/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-key */
/* eslint-disable camelcase */
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, Table, Tooltip } from 'antd';
import { isArray } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import utils from '../../../../helpers/utils/index';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';
import { handleCoppyLink } from '../aiPrompt/SubmitAIPrompt';
import SubmitAIPromptType from './SubmitAIPromptType';

const AIPromptTypeTable = () => {
  const dispatch = useDispatch();
  const { data: aiPromptTypes, loading } = useSelector(
    ({ aiPromptType }) => aiPromptType.aiPromptTypes
  );

  const [pagination, setPagenation] = useState({
    current: 1,
    pageSize: 10,
  });

  // update ai prompt type
  const [openUpdateAIPromptType, setOpenUpdateAIPromptType] = useState(false);
  const [updateAIPromptTypeData, setUpdateAIPromptTypeData] = useState({});

  // filter states
  const [IDFilters, setIDFilters] = useState([{}]);
  const [promptVariableNameFilters, setPromptVariableNameFilters] = useState([
    {},
  ]);
  const [promptTypeNameilters, setPromptTypeNameilters] = useState([{}]);

  const { hasDeletePermission, hasEditPermission } = usePermission();

  useEffect(() => {
    dispatch(Actions.getAIPromptTypes());
  }, [dispatch]);

  const handledeleteAIPromptType = (id) => {
    dispatch(Actions.deleteAIPromptType(id));
  };

  const columns = [
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
      title: 'Prompt type name',
      dataIndex: 'name',
      key: 'name',
      filters: promptTypeNameilters,
      onFilter: (value, { name }) =>
        name?.toLowerCase?.().includes(value?.toLowerCase?.()),
      filterSearch: (input) => {
        setTimeout(
          () => setPromptTypeNameilters([{ text: input, value: input }]),
          0
        );
        return true;
      },
    },
    {
      title: 'Prompt variables',
      render: (_, { variable_names }) =>
        variable_names?.map?.((variableName) => (
          <Tooltip title="click to coppy">
            <span
              onClick={() => handleCoppyLink(variableName)}
              className="cursor-pointer"
            >
              {variableName}&nbsp;&nbsp;
            </span>
          </Tooltip>
        )),
      key: 'variable_names',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'variable_names'),
      filters: promptVariableNameFilters,
      onFilter: (value, { variable_names }) =>
        variable_names
          ?.toString?.()
          ?.toLowerCase?.()
          .includes(value?.toLowerCase?.()),
      filterSearch: (input) => {
        setTimeout(
          () => setPromptVariableNameFilters([{ text: input, value: input }]),
          0
        );
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
              setOpenUpdateAIPromptType(true);
              setUpdateAIPromptTypeData(data);
            }}
            disabled={!hasEditPermission}
          />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => handledeleteAIPromptType(data.id)}
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
        dataSource={isArray(aiPromptTypes) ? aiPromptTypes : []}
        columns={columns}
        className="custom-table"
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: true }}
        loading={loading}
      />
      <SubmitAIPromptType
        open={openUpdateAIPromptType}
        data={updateAIPromptTypeData}
        onCancel={() => {
          setOpenUpdateAIPromptType(false);
          setUpdateAIPromptTypeData({});
        }}
      />
    </>
  );
};

export default AIPromptTypeTable;
