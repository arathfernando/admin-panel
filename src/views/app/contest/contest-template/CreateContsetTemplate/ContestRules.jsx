import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Radio } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Upload from 'antd/lib/upload/Upload';
import React from 'react';

import { useSelector } from 'react-redux';

const ContestRules = ({ onFinish, form }) => {
  const { status } = useSelector(
    ({ contestTemplate }) => contestTemplate.contestTemplateAction
  );

  return (
    <div
      style={{ minHeight: 'calc(100vh - 300px)' }}
      className="d-flex flex-column"
    >
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

      <p className="fs-13 fw-3 text-black mt-n1">
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

      <Form.Item
        name="attachments"
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <Upload
          listType="picture-card"
          onChange={(e) => {
            form.setFields([
              {
                name: 'attachments',
                value: e.fileList,
              },
            ]);
          }}
        >
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </Form.Item>

      <div className="d-flex justify-content-end flex-grow-1 align-iteml-end">
        <Button type="ghost mr-3 px-4" size="large">
          Save draft
        </Button>
        <Button
          type="primary px-3"
          size="large"
          onClick={() => onFinish()}
          loading={status === 'submitting'}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ContestRules;
