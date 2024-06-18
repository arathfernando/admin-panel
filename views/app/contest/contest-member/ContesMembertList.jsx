/* eslint-disable camelcase */
import { Button, Form, Select, Tabs } from 'antd';
import { useWatch } from 'antd/lib/form/Form';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllContests,
  getContestAcceptedContestants,
  getContestAcceptedJudges,
  getContestPendingContestants,
  getContestPendingJudges,
} from '../../../../redux/actions';

import usePermission from '../../../../hooks/usePermission';
import AddMember from './AddMember';
import ContestantList from './ContestantList';
import JudgeList from './JudgeList';

const { Option } = Select;

const ContesMembertList = () => {
  const { data: allContests, loading } = useSelector(
    ({ contest }) => contest.allContests
  );
  const [openAddMember, setopenAddMember] = useState(false);
  const [currentTab, setCurrentTab] = useState('constestant');

  const [form] = Form.useForm();
  const contest_id = useWatch('contest_id', form);

  const dispatch = useDispatch();
  const { status } = useSelector(
    ({ contestMember }) => contestMember.addMemberAction
  );

  const { hasCreatePermission } = usePermission();

  // refetch data after add member
  useEffect(() => {
    if (status === 'submitted') {
      if (currentTab === 'constestant') {
        dispatch(getContestAcceptedContestants({ id: contest_id }));
        dispatch(getContestPendingContestants({ id: contest_id }));
      } else {
        dispatch(getContestAcceptedJudges({ id: contest_id }));
        dispatch(getContestPendingJudges({ id: contest_id }));
      }
    }
  }, [contest_id, currentTab, dispatch, status]);

  useEffect(() => {
    dispatch(getAllContests());
  }, [dispatch]);

  useEffect(() => {
    if (currentTab === 'constestant') {
      dispatch(getContestAcceptedContestants({ id: contest_id }));
      dispatch(getContestPendingContestants({ id: contest_id }));
    } else {
      dispatch(getContestAcceptedJudges({ id: contest_id }));
      dispatch(getContestPendingJudges({ id: contest_id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTab, contest_id]);

  return (
    <Form form={form} className="custom-form-style" layout="vertical">
      <div className="contest-list">
        <h2 className="hb-text-primary fs-36 fw-8 mb-3">Contest members</h2>
        <div className="d-flex justify-content-between flex-wrap">
          <Form.Item name="contest_id">
            <Select
              loading={loading}
              className="flex-grow-1"
              style={{ maxWidth: 591, minWidth: 150 }}
              defaultValue={0}
            >
              <Option key={0} value={0}>
                All contest
              </Option>
              {allContests?.map?.((contest) => (
                <Option key={contest.id} value={contest.id}>
                  {contest.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Button
            type="primary mb-3 ml-3"
            onClick={() => setopenAddMember(true)}
            disabled={!hasCreatePermission}
          >
            + Add new member
          </Button>
        </div>

        <Tabs
          onChange={(key) => setCurrentTab(key)}
          className="contest-list-child-tab"
          items={[
            {
              label: 'Contestants',
              key: 'constestant',
              children: (
                <div>
                  <p className="fs-12 fw-5 text-black">Current contestants</p>
                  <ContestantList />
                  <p className="fs-12 fw-5 text-black mt-4">New requests</p>
                  <ContestantList type="new" />
                </div>
              ),
            },
            {
              label: `Judges`,
              key: 'judge',
              children: (
                <div>
                  <p className="fs-12 fw-5 text-black">Current judges</p>
                  <JudgeList />
                  <p className="fs-12 fw-5 text-black mt-4">New requests</p>
                  <JudgeList type="new" />
                </div>
              ),
            },
          ]}
        />

        <AddMember
          open={openAddMember}
          onCancel={() => setopenAddMember(false)}
        />
      </div>
    </Form>
  );
};

export default ContesMembertList;
