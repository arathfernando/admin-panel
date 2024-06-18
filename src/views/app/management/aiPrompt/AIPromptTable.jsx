/* eslint-disable camelcase */
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, Table, Tooltip } from 'antd';
import { isArray } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import utils from '../../../../helpers/utils/index';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';
import SubmitAIPrompt from './SubmitAIPrompt';

const AIPromptTable = () => {
  const dispatch = useDispatch();
  const { data: aiPrompts, loading } = useSelector(
    ({ aiPrompt }) => aiPrompt.aiPrompts
  );

  const [pagination, setPagenation] = useState({
    current: 1,
    pageSize: 10,
  });

  // update ai prompt
  const [openUpdateAIPrompt, setOpenUpdateAIPrompt] = useState(false);
  const [updateAIPromptData, setUpdateAIPromptData] = useState({});

  // filter states
  const [IDFilters, setIDFilters] = useState([{}]);
  const [promptTypeFilters, setPromptTypeFilters] = useState([{}]);
  const [promptYextFilters, setPromptYextFilters] = useState([{}]);

  const { hasDeletePermission, hasEditPermission } = usePermission();

  useEffect(() => {
    dispatch(Actions.getAIPrompts());
  }, [dispatch]);

  const handledeleteAIPrompt = (id) => {
    dispatch(Actions.deleteAiPrompt(id));
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
      title: 'Prompt type',
      render: (_, { prompt_type }) => prompt_type?.name,
      key: 'prompt_type',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'prompt_type'),
      filters: promptTypeFilters,
      onFilter: (value, { prompt_type }) =>
        prompt_type?.name?.toLowerCase?.().includes(value?.toLowerCase?.()),
      filterSearch: (input) => {
        setTimeout(
          () => setPromptTypeFilters([{ text: input, value: input }]),
          0
        );
        return true;
      },
    },
    {
      title: 'Prompt text',
      dataIndex: 'prompt_text',
      key: 'prompt_text',
      filters: promptYextFilters,
      onFilter: (value, { prompt_text }) =>
        prompt_text?.toLowerCase?.().includes(value?.toLowerCase?.()),
      filterSearch: (input) => {
        setTimeout(
          () => setPromptYextFilters([{ text: input, value: input }]),
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
              setOpenUpdateAIPrompt(true);
              setUpdateAIPromptData(data);
            }}
            disabled={!hasEditPermission}
          />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => handledeleteAIPrompt(data.id)}
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
        dataSource={isArray(aiPrompts) ? aiPrompts : []}
        columns={columns}
        className="custom-table"
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: true }}
        loading={loading}
      />
      <SubmitAIPrompt
        open={openUpdateAIPrompt}
        data={updateAIPromptData}
        onCancel={() => {
          setOpenUpdateAIPrompt(false);
          setUpdateAIPromptData({});
        }}
      />
    </>
  );
};

export default AIPromptTable;
