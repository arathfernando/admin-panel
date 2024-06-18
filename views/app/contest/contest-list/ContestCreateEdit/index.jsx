/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Modal, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getContest, resetContestCreate } from '../../../../../redux/actions';
import ContestCriteria from './Criteria';
import CustomerIdentity from './CustomerIdentity';
import DescribeEntry from './DescribeEntry';
import PaymentCheckout from './PaymentCheckout';
import ContestRules from './Rules';

const CreateContestGeneral = ({
  onCancel,
  contestId,
  contestCategoryId,
  ...props
}) => {
  const [currentTab, setCurrentTab] = useState(1);
  const [created_by, setcreated_by] = useState();

  const dispatch = useDispatch();

  const onFinish = () => {
    dispatch(resetContestCreate());
    setCurrentTab(1);
    onCancel();
  };

  useEffect(() => {
    if (contestId) {
      dispatch(getContest(contestId));
    }
  }, [contestId, dispatch]);

  useEffect(() => {
    dispatch(resetContestCreate());
  }, [dispatch]);

  return (
    <Modal
      footer={null}
      width={800}
      zIndex={999}
      title={contestId ? 'Update contest' : 'Create new contest'}
      className="sidecreen-modal-3 create-contest-container"
      onCancel={() => {
        dispatch(resetContestCreate());
        setCurrentTab(1);
        onCancel();
      }}
      {...props}
    >
      <div className="step-container mx-0 mx-md-3 mx-lg-5 mb-n4 mb-md-0 mb-lg-5">
        <div className="step active" onClick={() => setCurrentTab(1)}>
          <pre className="title active d-none d-lg-block">
            Confirmation
            <br />
            of contest
          </pre>
        </div>
        <div className={`line${currentTab > 1 ? ' active' : ''}`} />
        <div
          className={`step${currentTab > 1 ? ' active' : ''}`}
          onClick={() => currentTab > 1 && setCurrentTab(2)}
        >
          <pre
            className={`title d-none d-lg-block${
              currentTab > 1 ? ' active' : ''
            }`}
          >
            Customer
            <br />
            identity
          </pre>
        </div>
        <div className={`line${currentTab > 2 ? ' active' : ''}`} />
        <div
          className={`step${currentTab > 2 ? ' active' : ''}`}
          onClick={() => currentTab > 2 && setCurrentTab(3)}
        >
          <pre
            className={`title d-none d-lg-block${
              currentTab > 2 ? ' active' : ''
            }`}
          >
            Contest
            <br />
            criteria
          </pre>
        </div>
        <div className={`line${currentTab > 3 ? ' active' : ''}`} />
        <div
          className={`step${currentTab > 3 ? ' active' : ''}`}
          onClick={() => currentTab > 3 && setCurrentTab(4)}
        >
          <pre
            className={`title d-none d-lg-block${
              currentTab > 3 ? ' active' : ''
            }`}
          >
            Rules of
            <br />
            contest
          </pre>
        </div>
        <div className={`line${currentTab > 4 ? ' active' : ''}`} />
        <div
          className={`step${currentTab > 4 ? ' active' : ''}`}
          onClick={() => currentTab > 4 && setCurrentTab(5)}
        >
          <pre
            className={`title d-none d-lg-block${
              currentTab > 4 ? ' active' : ''
            }`}
          >
            Payment
            <br />
            checkout
          </pre>
        </div>
      </div>

      <Tabs
        className="create-contest-tab-container"
        activeKey={currentTab}
        items={[
          {
            key: 1,
            children: (
              <DescribeEntry
                setcreated_by={setcreated_by}
                setCurrentTab={setCurrentTab}
                contestId={contestId}
              />
            ),
          },
          {
            key: 2,
            children: (
              <CustomerIdentity
                created_by={created_by}
                setCurrentTab={setCurrentTab}
                contestId={contestId}
              />
            ),
          },
          {
            key: 3,
            children: (
              <ContestCriteria
                setCurrentTab={setCurrentTab}
                contestId={contestId}
              />
            ),
          },
          {
            key: 4,
            children: (
              <ContestRules
                setCurrentTab={setCurrentTab}
                contestId={contestId}
              />
            ),
          },
          {
            key: 5,
            children: <PaymentCheckout onFinish={onFinish} />,
          },
        ]}
      />
    </Modal>
  );
};

export default CreateContestGeneral;
