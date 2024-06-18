/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Select,
  Table,
} from 'antd';
import React from 'react';
import useTranslation from '../../../helpers/useTranslation';

const EditPrizes = ({
  onCancel,
  prizeDataSource,
  setPrizeDataSoursce,
  ...props
}) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const onChange = (index, name, value) => {
    const newPrizeDataSource = [...prizeDataSource];
    newPrizeDataSource[index] = { ...newPrizeDataSource[index], [name]: value };
    setPrizeDataSoursce(newPrizeDataSource);
  };

  const columns = [
    {
      title: t('Prize'),
      render: (_, { key }) => (
        <div className="d-flex justify-content-center" style={{ width: 30 }}>
          {key === 1 ? (
            <>
              <Image
                src="/assets/img/contest/prize1.webp"
                alt="logo"
                height={30}
              />
            </>
          ) : key === 2 ? (
            <Image
              src="/assets/img/contest/prize2.webp"
              alt="logo"
              height={25}
            />
          ) : (
            <Image
              src="/assets/img/contest/prize3.webp"
              alt="logo"
              height={20}
            />
          )}
        </div>
      ),
      key: 'prize_no',
    },
    {
      title: t('Name'),
      render: (_, { name, key }) => (
        <Input
          autoFocus
          value={name}
          onChange={(e) => onChange(key - 1, 'name', e.target.value)}
          size="small"
          bordered={false}
        />
      ),
      key: 'name',
    },
    {
      title: t('Amount'),
      render: (_, { amount, key }) => (
        <Input
          value={amount}
          size="small"
          type="number"
          onChange={(e) => onChange(key - 1, 'amount', e.target.value)}
          bordered={false}
        />
      ),
      key: 'amount',
    },
    {
      title: t('Currency'),
      render: (_, { currency, key }) => (
        <Select
          style={{ minWidth: 60 }}
          value={currency}
          size="small"
          onChange={(value) => onChange(key - 1, 'currency', value)}
          options={[
            { value: 'HBS', label: 'HBS' },
            { value: 'HBB', label: 'HBB' },
            { value: 'CURRENCY', label: 'EUR' },
          ]}
          bordered={false}
        />
      ),
      key: 'currency',
    },
    {
      title: t('Royalty'),
      dataIndex: 'royalty',
      render: (_, { royalty, key }) => (
        <InputNumber
          value={royalty}
          size="small"
          type="number"
          onChange={(value) => onChange(key - 1, 'royalty', value)}
          bordered={false}
          suffix="%"
          style={{ width: 40 }}
          min={0}
          max={100}
          controls={false}
        />
      ),
      key: 'royalty',
    },
  ];

  return (
    <Modal footer={null} closable={false} width={688} {...props}>
      <Form layout="vertical" form={form} name="control-hooks">
        <div className="px-0 px-md-3">
          <p className="fw-5 mb-4">{t('Edit prizes')}</p>

          <Table
            dataSource={prizeDataSource}
            columns={columns}
            className="prize-list-table"
            pagination={false}
            scroll={{ x: true }}
          />

          {prizeDataSource?.length < 3 && (
            <h6
              className="fs-14 fw-5 hb-text-primary mt-3 mb-4 cursor-pointer"
              onClick={() => {
                setPrizeDataSoursce((state) => [
                  ...state,
                  {
                    key: state.length + 1,
                    name: `Prize ${state.length + 1}`,
                    amount: 0,
                    currency: 'CURRENCY',
                    royalty: 0,
                  },
                ]);
              }}
            >
              + {t('Add more prizes')}
            </h6>
          )}

          <div className="d-flex justify-content-end mt-3">
            <Button type="primary px-4" size="large" onClick={() => onCancel()}>
              {t('Save')}
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default EditPrizes;
