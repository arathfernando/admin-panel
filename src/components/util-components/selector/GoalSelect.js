/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-shadow */
import { isArray, isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import useTranslation from '../../../helpers/useTranslation';
import { getAllGoals } from '../../../redux/actions';

const GoalSelect = ({ onChange, max, value, ...props }) => {
  const initialGoals = useSelector(({ goal }) => goal.list, shallowEqual);
  const [goals, setGoals] = useState([]);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  // get goals
  useEffect(() => {
    dispatch(getAllGoals());
  }, [dispatch]);

  // set goals to state
  useEffect(() => {
    setGoals(initialGoals);
  }, [initialGoals]);

  // select goals by initial value
  useEffect(() => {
    if (!isEmpty(value) && isArray(value)) {
      setTimeout(() => {
        setGoals((state) =>
          state.map((state) => ({
            ...state,
            selected: !!value?.find((goalId) => goalId === state?.id),
          }))
        );
      }, 0);
    }
  }, [value, initialGoals]);

  // goal select or if already selected then unselect
  const handleGoalSelectOrDeselect = (goal) => {
    const currentSelectedLength = goals
      .filter?.((goal) => goal.selected)
      .map((goal) => goal.id).length;

    const newGoals = goals.map((state) => ({
      ...state,
      selected:
        state.id === goal.id &&
        (goal.selected || (max ? currentSelectedLength < max : true))
          ? !goal.selected
          : state.selected,
    }));

    const selectedGoalIds = newGoals
      .filter?.((goal) => goal.selected)
      .map((goal) => goal.id);
    onChange(selectedGoalIds);
  };

  return (
    <div className="goal-select-container" {...props}>
      {goals.map((goal) => (
        <div
          key={goal.id}
          className={`goal-wrapper${goal.selected ? ' selected' : ''}`}
          style={{ background: goal.color }}
          onClick={() => handleGoalSelectOrDeselect(goal)}
        >
          <div className="goal-contect-wrapper">
            <div className="d-flex position-absolute">
              <h6 className="goal-number">{goal.goal_number}</h6>
              <h6 className="goal-title">{t(goal.goal_title)}</h6>
            </div>
            <img
              className="goal-image"
              src={goal.goal_image}
              alt={t(goal.goal_title)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default GoalSelect;
