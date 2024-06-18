/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Popconfirm, Table } from 'antd';
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { deleteTemplate, getContestTemplates } from '../../../../redux/actions';

import usePermission from '../../../../hooks/usePermission';
import EditContest from './CreateContsetTemplate';

const ContestTemplatesTable = () => {
  const { data: contestTemplates, loading } = useSelector(
    ({ contestTemplate }) => contestTemplate.contestTemplates
  );

  const [openEditContest, setopenEditContest] = useState(false);
  const [templateData, setTemplateData] = useState(null);

  const { hasEditPermission, hasDeletePermission } = usePermission();

  const [pagination, setPagenation] = React.useState({
    current: 1,
    pageSize: 10,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContestTemplates());
  }, [dispatch]);

  const handleRemove = (id) => {
    dispatch(deleteTemplate(id));
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'template_name',
      key: 'template_name',
    },
    {
      title: 'Description',
      dataIndex: 'contest_description',
      key: 'contest_description',
    },
    {
      title: 'Category',
      dataIndex: 'template_category',
      key: 'template_category',
    },
    {
      title: 'Actions',
      key: 'Actions',
      render: (_, elm) => (
        <div className="d-flex">
          <Button
            type="text"
            size="small"
            icon={
              <img
                src="/assets/img/icons/edit.svg"
                alt="edit"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setopenEditContest(true);
                  setTemplateData(elm);
                }}
              />
            }
            disabled={!hasEditPermission}
          />
          <Popconfirm
            title="Are you sure delete this template?"
            onConfirm={() => handleRemove(elm.id)}
            onCancel={() => console.log('Canceled to delete')}
            okText="Yes"
            cancelText="No"
            disabled={!hasDeletePermission}
          >
            <Button
              type="text ml-3"
              size="small"
              icon={
                <img
                  src="/assets/img/icons/delete.svg"
                  alt="delete"
                  style={{ cursor: 'pointer' }}
                />
              }
              disabled={!hasDeletePermission}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleTableChange = (params) => {
    setPagenation(params.pagination);
  };

  return (
    <>
      <Table
        dataSource={contestTemplates}
        columns={columns}
        className="custom-table"
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: true }}
        loading={loading}
      />

      <EditContest
        templateData={templateData}
        open={openEditContest}
        onCancel={() => setopenEditContest(false)}
      />
    </>
  );
};

export default ContestTemplatesTable;
