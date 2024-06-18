/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Form, Modal, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createContestTemplate,
  resetContestTemplate,
  updateContestTwmplate,
} from '../../../../../redux/contest/contestTemplate/actions';
import ContestCriteria from './ContestCriteria';
import ContestRules from './ContestRules';

const initalPrizeDataSource = [
  {
    key: 1,
    name: 'Prize 1',
    Amount: 1600,
    Currency: 'EUR',
    Royalty: 5,
    Description: '5% royalty',
  },
  {
    key: 2,
    name: 'Prize 2',
    Amount: 800,
    Currency: 'EUR',
    Royalty: 5,
    Description: '5% royalty',
  },
  {
    key: 3,
    name: 'Prize 3',
    Amount: 500,
    Currency: 'EUR',
    Royalty: 5,
    Description: '5% royalty',
  },
];

const initalCriteriaDataSource = [
  {
    key: '1',
    name: 'Design',
    Mark: '25%',
  },
  {
    key: '2',
    name: 'Functionality',
    Mark: '25%',
  },
  {
    key: '3',
    name: 'Manufacturability',
    Mark: '25%',
  },
  {
    key: '5',
    name: 'Marketfit',
    Mark: '25%',
  },
];

const CreateTemplate = ({ onCancel, templateData, ...props }) => {
  const { status } = useSelector(
    ({ contestTemplate }) => contestTemplate.contestTemplateAction
  );

  const [currentTab, setCurrentTab] = useState(1);

  const [prizeDataSource, setPrizeDataSoursce] = useState(
    initalPrizeDataSource
  );

  const [criteriaDataSource, setCriteriaDataSoursce] = useState(
    initalCriteriaDataSource
  );

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (templateData) form.setFieldsValue(templateData);
  }, [form, templateData]);

  useEffect(() => {
    if (status === 'submitted') {
      onCancel();
      dispatch(resetContestTemplate());
    }
  }, [dispatch, onCancel, status]);

  const onFinish = ({ attachments, ...values }) => {
    const payload = {
      ...values,
      contest_marks: criteriaDataSource.map(({ name, Mark }) => ({
        title: name,
        mark: Mark,
      })),
      contest_prizes: prizeDataSource.map(
        ({ name, Amount, Currency, Royalty, Description }) => ({
          name,
          amount: Amount,
          currency: Currency,
          royalty: Royalty,
          description: Description,
        })
      ),
    };
    if (attachments) {
      payload.attachments = attachments?.map((attch) => attch.originFileObj);
    }
    if (templateData?.id) {
      dispatch(updateContestTwmplate({ id: templateData.id, ...payload }));
    } else {
      dispatch(createContestTemplate(payload));
    }
  };

  const prizeColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Amount',
      dataIndex: 'Amount',
      key: 'Amount',
    },
    {
      title: 'Currency',
      render: (_, { currency }) => (currency === 'CURRENCY' ? 'EUR' : currency),
      key: 'Currency',
    },
    {
      title: 'Royalty',
      dataIndex: 'Royalty',
      key: 'Royalty',
    },
    {
      title: 'Description',
      dataIndex: 'Description',
      key: 'Description',
    },
  ];

  const competitionMarksColumns = [
    {
      title: 'Name',
      render: (_, { name }) => (
        <p className="fs-12 fw-5 text-black mb-0 my-n1">{name}</p>
      ),
      key: 'name',
    },
    {
      title: 'Mark',
      render: (_, { Mark }) => (
        <p className="fs-12 fw-5 text-black mb-0 text-end my-n1">{Mark}</p>
      ),
      key: 'Mark',
    },
  ];

  const criteriaColumns = [
    {
      title: 'Name',
      render: (_, { name }) => (
        <p className="fs-12 fw-5 text-grey-light mb-0 my-n1">{name}</p>
      ),
      key: 'name',
    },
    {
      title: 'Mark',
      render: (_, { Mark }) => (
        <p className="fs-12 fw-5 text-grey-light mb-0 text-end my-n1">{Mark}</p>
      ),
      key: 'Mark',
    },
  ];

  return (
    <Modal
      footer={null}
      width={710}
      zIndex={999}
      title="New template"
      className="sidecreen-modal-3 create-contest-container contest-container"
      onCancel={onCancel}
      {...props}
    >
      <div className="step-container mx-0 mx-md-3 mx-lg-5 mb-n4 mb-md-0 mb-lg-5">
        <div className="step active" onClick={() => setCurrentTab(1)}>
          <pre className="title active">
            Contest
            <br />
            criteria
          </pre>
        </div>
        <div className={`line${currentTab > 1 ? ' active' : ''}`} />

        <div
          className={`step${currentTab > 1 ? ' active' : ''}`}
          onClick={() => setCurrentTab(2)}
        >
          <pre className={`title${currentTab > 1 ? ' active' : ''}`}>
            Rules of
            <br />
            contest
          </pre>
        </div>
      </div>

      <Form
        layout="vertical"
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        className="custom-form-style"
      >
        <Tabs
          className="create-contest-tab-container"
          activeKey={currentTab}
          items={[
            {
              key: 1,
              children: (
                <ContestCriteria
                  setCurrentTab={setCurrentTab}
                  setPrizeDataSoursce={setPrizeDataSoursce}
                  competitionMarksColumns={competitionMarksColumns}
                  criteriaDataSource={criteriaDataSource}
                  criteriaColumns={criteriaColumns}
                  prizeColumns={prizeColumns}
                  prizeDataSource={prizeDataSource}
                  setCriteriaDataSoursce={setCriteriaDataSoursce}
                />
              ),
            },
            {
              key: 2,
              children: (
                <ContestRules form={form} onFinish={() => form.submit()} />
              ),
            },
          ]}
        />
      </Form>
    </Modal>
  );
};

export default CreateTemplate;
