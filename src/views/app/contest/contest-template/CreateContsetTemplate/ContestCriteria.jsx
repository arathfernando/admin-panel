/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Form, Input, Radio, Select, Table } from 'antd';
import React, { useState } from 'react';
import CKEditor5 from '../../../../../components/util-components/CkEditor';
import EditCriterias from '../../EditCriteria';
import EditPrizes from '../../EditPrizes';
// import { getGoals } from "../../../../../store/actions";

const { Option } = Select;

const ContestCriteria = ({
  setCurrentTab,
  prizeColumns,
  prizeDataSource,
  competitionMarksColumns,
  criteriaDataSource,
  criteriaColumns,
  setPrizeDataSoursce,
  setCriteriaDataSoursce,
}) => {
  const [openEditPrizes, setOpenEditPrizes] = useState(false);

  const [openEditCriterias, setOpenEditCriterias] = useState(false);

  return (
    <div>
      <h6 className="fs-20 fw-5 text-black mb-3 mt-4">
        Genreral description of the contest
      </h6>
      <h6 className="fs-12 fw-3 text-grey-light mb-4">
        Write basic information about your project here
      </h6>
      <Form.Item
        name="template_name"
        rules={[{ required: true, message: 'This field is required' }]}
        label={<h6 className="input-label">Template name</h6>}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="template_category"
        label={<h6 className="input-label">Template category</h6>}
        initialValue="Options"
      >
        <Select>
          <Option value="Options">Market</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="contest_description"
        label={<h6 className="input-label">Description of the contest</h6>}
      >
        <CKEditor5 rows={4} />
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
        For this type of competition, standard criteria is like this:
      </p>

      <Table
        dataSource={criteriaDataSource}
        columns={competitionMarksColumns}
        className="product-competition-marks-table"
        pagination={false}
        scroll={{ x: true }}
      />

      <p className="fs-12 fw-3 text-black mt-3 mb-5">
        The judge will give a mark from 0 to 10 and the weighted average will be
        recorded.
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
          <Radio value="YES">Yes, I want my own criteria</Radio>
          <Radio value="NO">No, I want to keep the standard criteria</Radio>
        </Radio.Group>
      </Form.Item>

      <p className="fs-12 fw-3 text-black mt-3 mb-3">
        If yes, please write the name and the percentage assigned for each
        section
      </p>
      <Table
        dataSource={criteriaDataSource}
        columns={criteriaColumns}
        className="product-competition-marks-table"
        pagination={false}
        scroll={{ x: true }}
      />

      <h6
        className="fs-14 fw-5 hb-text-primary mt-2 cursor-pointer"
        onClick={() => setOpenEditCriterias(true)}
      >
        + Add more criteria
      </h6>
      <div className="d-flex justify-content-end mt-4">
        <Button type="ghost mr-3 px-4" size="large">
          Save draft
        </Button>
        <Button
          type="primary px-3"
          size="large"
          onClick={() => setCurrentTab(2)}
        >
          Next
        </Button>
      </div>

      <EditPrizes
        prizeDataSource={prizeDataSource}
        setPrizeDataSoursce={setPrizeDataSoursce}
        open={openEditPrizes}
        onCancel={() => setOpenEditPrizes(false)}
      />
      <EditCriterias
        open={openEditCriterias}
        onCancel={() => setOpenEditCriterias(false)}
        criteriaDataSource={criteriaDataSource}
        setCriteriaDataSoursce={setCriteriaDataSoursce}
      />
    </div>
  );
};

export default ContestCriteria;
