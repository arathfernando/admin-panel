/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
/* eslint-disable no-shadow */
import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Radio } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useEffect, useMemo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import FileS3UploadMultiple from '../../../../../components/util-components/FileS3UploadMultiple';
import {
  createContestRules,
  updateContestRules,
} from '../../../../../redux/actions';

const ContestRules = ({ setCurrentTab, contestId }) => {
  const contest = useSelector(
    ({ contest }) => contest.contestData.data,
    shallowEqual
  );
  const { status } = useSelector(({ contest }) => contest.contestRulesAction);

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    status === 'submitted' && setCurrentTab(5);
  }, [setCurrentTab, status]);

  useEffect(() => {
    form.setFieldsValue({
      ...contest.contest_rules,
    });
  }, [contest, form]);

  const isCreated = useMemo(() => contest.contest_rules?.id, [contest]);

  const onFinish = ({ everyone_can_participate, ...values }) => {
    const payload = {
      contest_id: contestId || contest.id,
      ...values,
    };
    if (isCreated) {
      dispatch(
        updateContestRules({ id: contest.contest_rules?.id, ...payload })
      );
    } else {
      dispatch(createContestRules(payload));
    }
  };

  return (
    <Form
      layout="vertical"
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      className="custom-form-style"
    >
      <div>
        <h6 className="fs-20 fw-5 text-black mb-3 mt-4">Rules of contest</h6>
        <h6 className="fs-12 fw-3 text-grey-light mb-4">
          Rule of contest are very important as it gives the legal framework
          between the organizer and the contestant. You can use Hubber standard
          rules or create your own set of rules for your contest.
        </h6>

        <Form.Item name="contest_rules" initialValue="HUBBERS_STANDARD_RULES">
          <Radio.Group>
            <Radio value="HUBBERS_STANDARD_RULES" className="mb-2">
              Hubbers standard rules
            </Radio>
            <Radio value="OWN_RULES" className="mb-2">
              Amend and write your own rules
            </Radio>
          </Radio.Group>
        </Form.Item>

        <p className="fs-13 fw-3 text-black mt-n1 mb-5">
          In order to provide contestant with more explanation, feel free to
          include picture, videos that help them to better understand which type
          of entries will be best for them.
        </p>

        <Form.Item
          name="other_description"
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <div className="p-2 border rounded-2 d-flex justify-content-center">
          <Form.Item
            name="attachments"
            rules={[{ required: true, message: 'This field is required' }]}
            noStyle
          >
            <FileS3UploadMultiple>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <Button icon={<UploadOutlined />}>Upload</Button>
              </div>
            </FileS3UploadMultiple>
          </Form.Item>
        </div>
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
      </div>
    </Form>
  );
};

export default ContestRules;
