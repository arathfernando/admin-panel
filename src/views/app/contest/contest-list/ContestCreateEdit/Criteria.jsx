/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Form, Radio, Table } from 'antd';
import { isEmpty, orderBy } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import CKEditor5 from '../../../../../components/util-components/CkEditor';
import useTranslation from '../../../../../helpers/useTranslation';
import {
  createContestCriteria,
  updateContestCriteria,
} from '../../../../../redux/actions';
import EditCriterias from '../../EditCriteria';
import EditPrizes from '../../EditPrizes';

const initalPrizeDataSource = [
  {
    key: 1,
    name: 'Prize 1',
    amount: 1600,
    currency: 'EUR',
    royalty: 5,
    description: '5% royalty',
  },
  {
    key: 2,
    name: 'Prize 2',
    amount: 800,
    currency: 'EUR',
    royalty: 5,
    description: '5% royalty',
  },
  {
    key: 3,
    name: 'Prize 3',
    amount: 500,
    currency: 'EUR',
    royalty: 5,
    description: '5% royalty',
  },
];

const initalCriteriaDataSource = [
  {
    key: '1',
    title: 'Creativity and Innovation',
    description:
      'The first criterion for the UX/UI design contest is creativity and innovation. Participants should demonstrate their ability to think outside the box and come up with fresh, unique design solutions. Judges will assess the originality of the designs, including the overall concept, layout, color schemes, typography, and any innovative features or interactions.',
    weightage: 25,
  },
  {
    key: '2',
    title: 'User-Centered Design',
    description:
      'User-centered design is crucial in creating exceptional UX/UI experiences. In this step, participants should showcase their understanding of the target audience and design with their needs and preferences in mind. Judges will evaluate how effectively the designs address user goals, how intuitive the navigation is, and the overall usability and accessibility of the interface.',
    weightage: 25,
  },
  {
    key: '3',
    title: 'Visual Appeal and Aesthetics',
    description:
      'User-centered design is crucial in creating exceptional UX/UI experiences. In this step, participants should showcase their understanding of the target audience and design with their needs and preferences in mind. Judges will evaluate how effectively the designs address user goals, how intuitive the navigation is, and the overall usability and accessibility of the interface.',
    weightage: 25,
  },
  {
    key: '4',
    title: 'Technical Feasibility and Implementation',
    description:
      'A good UX/UI design should not only be visually appealing but also technically feasible and practical to implement. In this step, judges will assess the practicality of the designs, considering factors such as responsiveness across different devices, scalability, loading times, and adherence to industry standards and best practices. Participants should demonstrate an understanding of technical limitations and showcase their ability to create designs that can be effectively implemented.',
    weightage: 25,
  },
];

const ContestCriteria = ({ setCurrentTab, contestId }) => {
  const contest = useSelector(
    ({ contest }) => contest.contestData.data,
    shallowEqual
  );
  const { status } = useSelector(
    ({ contest }) => contest.contestCriteriaAction
  );

  const [prizeDataSource, setPrizeDataSoursce] = useState(
    initalPrizeDataSource
  );
  const [openEditPrizes, setOpenEditPrizes] = useState(false);

  const [criteriaDataSource, setCriteriaDataSoursce] = useState(
    initalCriteriaDataSource
  );
  const [openEditCriterias, setOpenEditCriterias] = useState(false);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [form] = Form.useForm();

  useEffect(() => {
    status === 'submitted' && setCurrentTab(4);
  }, [setCurrentTab, status]);

  useEffect(() => {
    form.setFieldsValue({
      ...contest.contest_criteria,
    });
  }, [contest, form]);

  useEffect(() => {
    if (!isEmpty(contest?.contest_criteria?.contest_own_criteria)) {
      setCriteriaDataSoursce(
        contest?.contest_criteria?.contest_own_criteria?.map?.(
          (data, indx) => ({ ...data, key: indx + 1 })
        )
      );
    }
    if (!isEmpty(contest?.contest_criteria?.contest_prizes)) {
      setPrizeDataSoursce(
        orderBy(
          contest.contest_criteria?.contest_prizes || [],
          ['id'],
          'asc'
        ).map?.((data, indx) => ({
          ...data,
          key: indx + 1,
        }))
      );
    }
  }, [contest]);

  const isCreated = useMemo(() => contest.contest_criteria?.id, [contest]);

  const onFinish = ({ everyone_can_participate, ...values }) => {
    const payload = {
      contest_id: contestId || contest.id,
      contest_prizes: prizeDataSource,
      contest_marks: criteriaDataSource.map(
        ({ title = '', weightage = 0, id }) => ({
          title,
          weightage,
          id,
        })
      ),
      contest_own_criteria: criteriaDataSource.map(
        ({ title = '', weightage = 0, id }) => ({
          title,
          weightage,
          id,
        })
      ),
      ...values,
    };

    if (isCreated) {
      dispatch(
        updateContestCriteria({
          id: contest.contest_criteria?.id,
          ...payload,
        })
      );
    } else {
      dispatch(createContestCriteria(payload));
    }
  };

  const prizeColumns = [
    {
      title: t('Name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('Amount'),
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: t('Currency'),
      render: (_, { currency }) => (currency === 'CURRENCY' ? 'EUR' : currency),
      key: 'currency',
    },
    {
      title: t('Royalty'),
      dataIndex: 'royalty',
      key: 'royalty',
    },
  ];

  const competitionMarksColumns = [
    {
      title: 'Criteria',
      render: (_, { title }) => (
        <p className="fs-12 fw-5 text-black mb-0 my-n1">{title}</p>
      ),
      key: 'title',
    },
    {
      title: 'Description',
      render: (_, { description }) => (
        <p className="fs-12 fw-5 text-black mb-0 my-n1">{t(description)}</p>
      ),
      key: 'description',
    },
    {
      title: 'Importance',
      render: (_, { weightage }) => (
        <p className="fs-12 fw-5 text-black mb-0 text-end my-n1">{`${
          weightage || 0
        } %`}</p>
      ),
      key: 'weightage',
    },
  ];

  return (
    <Form
      layout="vertical"
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      className="custom-form-style"
    >
      <div>
        <h6 className="fs-20 fw-5 text-black mb-3 mt-4">
          {t('Genreral description of the contest')}
        </h6>
        {/* <h6 className="fs-12 fw-3 text-grey-light mb-4">
          Write basic information about your project here
        </h6> */}

        <Form.Item
          name="contest_description"
          label={
            <h6 className="input-label hb-text-secondary">
              Description of the contest
            </h6>
          }
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <CKEditor5 rows={6} />
        </Form.Item>

        <p className="fw-5">Prizes</p>
        <p className="fs-12 fw-3 text-black">
          All great competition needs attractive prize to get our community of
          designers. Give their best creativity. A minimum of prize is 3 but you
          can add more if you wish.
        </p>

        <Table
          dataSource={prizeDataSource}
          columns={prizeColumns}
          className="prize-list-table"
          pagination={false}
          scroll={{ x: true }}
        />

        <u
          className="hb-text-primary cursor-pointer"
          onClick={() => setOpenEditPrizes(true)}
          role="button"
        >
          <h6 className="fs-14 fw-5 hb-text-primary mt-3 mb-5">Edit prizes</h6>
        </u>

        <h6 className="fs-14 fw-5 mb-3">CRITERIA</h6>

        <p className="fs-12 fw-3 text-black">
          For this type of competition, standard criteria is like this
        </p>

        <Table
          dataSource={criteriaDataSource}
          columns={competitionMarksColumns}
          className="product-competition-marks-table"
          pagination={false}
          scroll={{ x: true }}
        />

        <p className="fs-12 fw-3 text-black mt-3 mb-5">
          The judge will give a mark from 0 to 10 and the weighted average will
          be recorded.
        </p>

        <Form.Item
          name="own_criteria"
          label={
            <h6 className="input-label">
              Do you want to write your own criteria?
            </h6>
          }
          rules={[{ required: true, message: 'This field is required' }]}
          initialValue="NO"
        >
          <Radio.Group>
            <Radio value="YES" onClick={() => setOpenEditCriterias(true)}>
              Yes, I want my own criteria
            </Radio>
            <Radio value="NO">No, I want to keep the standard criteria</Radio>
          </Radio.Group>
        </Form.Item>

        <div className="d-flex justify-content-end mt-4">
          {/* <Button type="ghost mr-3 px-4" size="large">
            Save draft
          </Button> */}
          <Button
            type="primary px-3"
            size="large"
            htmlType="submit"
            loading={status === 'submitting'}
          >
            Next
          </Button>
        </div>

        <EditPrizes
          open={openEditPrizes}
          onCancel={() => setOpenEditPrizes(false)}
          prizeDataSource={prizeDataSource}
          setPrizeDataSoursce={setPrizeDataSoursce}
        />
        <EditCriterias
          open={openEditCriterias}
          onCancel={() => setOpenEditCriterias(false)}
          criteriaDataSource={criteriaDataSource}
          setCriteriaDataSoursce={setCriteriaDataSoursce}
        />
      </div>
    </Form>
  );
};

export default ContestCriteria;
