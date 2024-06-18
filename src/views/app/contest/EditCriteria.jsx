/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Alert, Button, Form, Input, InputNumber, Modal, Table } from 'antd';
import React, { useMemo } from 'react';

import TextArea from 'antd/lib/input/TextArea';
import useTranslation from '../../../helpers/useTranslation';

const EditCriterias = ({
  onCancel,
  criteriaDataSource,
  setCriteriaDataSoursce,
  ...props
}) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const totalWeightage = useMemo(
    () =>
      criteriaDataSource?.reduce(
        (total, data) => Number(total) + Number(data?.weightage || 0),
        0
      ),
    [criteriaDataSource]
  );

  const onChange = (index, name, value) => {
    const newCriteriaDataSource = [...criteriaDataSource];
    newCriteriaDataSource[index] = {
      ...newCriteriaDataSource[index],
      [name]: value,
    };
    setCriteriaDataSoursce(newCriteriaDataSource);
  };

  const handleDeleteRow = (index) => {
    const newCriteriaDataSource = [...criteriaDataSource];
    newCriteriaDataSource.splice(index, 1);
    setCriteriaDataSoursce(
      newCriteriaDataSource.map((data, indx) => ({ ...data, key: indx + 1 }))
    );
  };

  const columns = [
    {
      title: t('Criteria'),
      render: (_, { title, key }) => (
        <Input
          autoFocus
          value={title}
          onChange={(e) => onChange(key - 1, 'title', e.target.value)}
          size="smal"
          bordered={false}
        />
      ),
      key: 'title',
    },
    {
      title: t('Description'),
      render: (_, { description, key }) => (
        <TextArea
          rows={5}
          value={description}
          onChange={(e) => onChange(key - 1, 'description', e.target.value)}
          size="smal"
          bordered={false}
        />
      ),
      key: 'description',
    },
    {
      title: t('Importance'),
      render: (_, { weightage, key }) => (
        <InputNumber
          value={weightage}
          size="smal"
          onChange={(value) => onChange(key - 1, 'weightage', value)}
          bordered={false}
          controls={false}
          min={0}
          max={100}
        />
      ),
      key: 'weightage',
    },
    {
      title: (
        <span className="d-flex justify-content-center">{t('Actions')}</span>
      ),
      key: 'Actions',
      render: (_, { key }) => (
        <div className="d-flex justify-content-center">
          <img
            src="/assets/img/icons/delete.svg"
            alt="delete"
            className="ml-3 cursor-pointer"
            onClick={() => handleDeleteRow(key - 1)}
          />
        </div>
      ),
    },
  ];

  return (
    <Modal footer={null} closable={false} width={688} {...props}>
      <Form layout="vertical" form={form} name="control-hooks">
        <div className="px-0 px-md-3">
          <p className="fw-5 mb-4">{t('Edit criterias')}</p>

          <Table
            dataSource={criteriaDataSource}
            columns={columns}
            className="criteria-list-table"
            pagination={false}
            scroll={{ x: true }}
          />

          {totalWeightage !== 100 && (
            <Alert
              message={
                <span>
                  {t('sum of criteria marks should be 100%')}{' '}
                  <span className="hb-text-primary ps-3">
                    {t('Now')}, {totalWeightage}%
                  </span>
                </span>
              }
              type="error"
              showIcon
            />
          )}

          <h6
            className="fs-14 fw-5 hb-text-primary mt-3 mb-5 cursor-pointer"
            onClick={() => {
              setCriteriaDataSoursce((state) => [
                ...state,
                {
                  key: state.length + 1,
                  title: '',
                  weightage: 0,
                },
              ]);
            }}
          >
            + {t('Add more criterias')}
          </h6>

          <div className="d-flex justify-content-end mt-3">
            <Button
              type="primary px-4"
              size="large"
              onClick={() => onCancel()}
              disabled={totalWeightage !== 100}
            >
              {t('Save')}
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default EditCriterias;
