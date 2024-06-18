import { Button, Form, Modal } from 'antd';
import { isEmpty } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DeleteModal from '../../../../../components/util-components/DeleteModal';
import Loading from '../../../../../components/util-components/Loading';
import GoalSelect from '../../../../../components/util-components/selector/GoalSelect';
import useMediaQuery from '../../../../../hooks/useMediaQuery';
import { getGoals, updateUserGoals } from '../../../../../redux/actions';

const SubmitWorkExpreience = ({ open, onCancel, onSaved }) => {
  const { profile_goal = [] } = useSelector(
    ({ users }) => users.singleUser,
    shallowEqual
  );
  const {
    status,
    data: { submitType },
  } = useSelector(({ users }) => users.userGoalsAction);

  const { id } = useParams();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const submitMode = useMemo(
    () => (isEmpty(profile_goal) ? 'create' : 'edit'),
    [profile_goal]
  );

  useEffect(() => {
    form.setFieldValue(
      'goals',
      profile_goal.map(({ goal_id }) => goal_id?.id)
    );
  }, [profile_goal]);

  // fetch goals initially
  useEffect(() => {
    dispatch(getGoals());
  }, [dispatch]);

  const onFinish = ({ goals }) => {
    const payload = {
      submitType: submitMode,
      successMsg:
        submitMode === 'create'
          ? 'Created successfully!'
          : 'Updated successfully!',
      goals,
      id,
    };

    dispatch(
      updateUserGoals({
        ...payload,
        onSuccess: onSaved,
      })
    );
  };

  return (
    <Modal
      width={1097}
      closable={false}
      footer={null}
      open={open}
      onCancel={onCancel}
      bodyStyle={{ padding: '49px 68px' }}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <h3 className="h3-lg hb-text-primary" style={{ marginBottom: 24 }}>
          Goals
        </h3>

        <Form.Item name="goals" style={{ marginBottom: 48 }}>
          <GoalSelect />
        </Form.Item>

        <div className="d-flex align-items-center" style={{ gap: 4 }}>
          <Button type="text btn-text-md px-3 ml-n3" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="primary btn-text-md px-4"
            htmlType="submit"
            loading={status === 'submitting' && submitType !== 'remove'}
          >
            <span className="px-3">Save</span>
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

const SDGGoals = () => {
  const {
    singleUser: { profile_goal = [], isRefetching },
    loading,
    error,
  } = useSelector(({ users }) => users);
  const {
    status,
    data: { submitType },
  } = useSelector(({ users }) => users.userGoalsAction);

  const [openSubmitSVGGoals, setOpenSubmitSVGGoals] = useState(false);

  const [openSVGGoalsRemoveWorningWithId, setOpenSVGGoalsRemoveWorningWithId] =
    useState(0);

  const dispatch = useDispatch();
  const { id } = useParams();
  const { sm } = useMediaQuery();

  const handleRemoveNewWorkExpreince = () => {
    const payload = {
      submitType: 'remove',
      successMsg: 'Removed successfully!',
      profile_goal: profile_goal.filter(
        (value) => value.id !== openSVGGoalsRemoveWorningWithId
      ),
      id,
    };

    dispatch(
      updateUserGoals({
        ...payload,
        onSuccess: () => setOpenSVGGoalsRemoveWorningWithId(0),
      })
    );
  };

  return (
    <div className="bg-white">
      <div
        className="d-flex flex-column mx-auto"
        style={{ gap: 14, padding: sm ? '24px 45px' : 24, maxWidth: 1000 }}
      >
        <div
          className="d-flex justify-content-between align-items-center flex-wrap"
          style={{ gap: 8 }}
        >
          <h5 className="h5-lg text-black mb-0">SDG Goals</h5>
          <div className="d-flex justify-content-end flex-grow-1">
            <Button
              type="primary btn-text-md px-4"
              size="large"
              style={{ height: 49 }}
              onClick={() => {
                setOpenSubmitSVGGoals(true);
              }}
              disabled={(loading && !isRefetching) || error}
            >
              <span className="px-1">Add goal</span>
            </Button>
          </div>
        </div>

        <div
          className="position-relative goals-container"
          style={{ gap: 24, minHeight: loading && !isRefetching && 50 }}
        >
          <Loading loading={loading && !isRefetching} />
          {profile_goal.map?.((data = {}) => (
            <div
              key={data.id}
              className="goal-wrapper selected"
              style={{ background: data.goal_id?.color }}
            >
              <div className="goal-contect-wrapper">
                <div className="d-flex position-absolute">
                  <h6 className="goal-number">{data.goal_id?.goal_number}</h6>
                  <h6 className="goal-title">{data.goal_id?.goal_title}</h6>
                </div>
                <img
                  className="goal-image"
                  src={data.goal_id?.goal_image}
                  alt="goal_image"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <SubmitWorkExpreience
        open={openSubmitSVGGoals}
        onCancel={() => setOpenSubmitSVGGoals(false)}
        onSaved={() => setOpenSubmitSVGGoals(false)}
      />

      <DeleteModal
        name="goal"
        open={openSVGGoalsRemoveWorningWithId}
        onClose={() => setOpenSVGGoalsRemoveWorningWithId(0)}
        onDelete={handleRemoveNewWorkExpreince}
        loading={status === 'submitting' && submitType === 'remove'}
      />
    </div>
  );
};

export default SDGGoals;
