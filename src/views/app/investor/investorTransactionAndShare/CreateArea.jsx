/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
} from 'antd';
import { isEmpty } from 'lodash';
import React, { useEffect, useMemo } from 'react';

import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import ZoneSelect from '../../../../components/util-components/selector/ZoneSelect';
import {
  createInvestorArea,
  updateInvestorArea,
} from '../../../../redux/actions';

const { Option } = Select;

const CreateArea = ({ onCancel, type, data, ...props }) => {
  const { status } = useSelector(
    ({ investorWorldwideShare }) => investorWorldwideShare.investorAreaAction
  );
  const { status: updateStatus } = useSelector(
    ({ investorWorldwideShare }) =>
      investorWorldwideShare.updateInvestorAreaAction
  );

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const isSubmitting = useMemo(
    () => status === 'submitting' || updateStatus === 'submitting',
    [status, updateStatus]
  );

  // set form data initially when updating
  useEffect(() => {
    if (!isEmpty(data)) {
      const { expected_start_date, zone, ...formData } = data;
      form.setFieldsValue({
        ...formData,
        expected_start_date: expected_start_date && moment(expected_start_date),
        zone: zone?.id,
      });
    }
  }, [data, form]);

  const onFinish = (values) => {
    if (type === 'update') {
      dispatch(
        updateInvestorArea({
          ...values,
          id: data.id,
          onSuccess: () => {
            onCancel();
            form.resetFields();
          },
        })
      );
    } else {
      dispatch(
        createInvestorArea({
          ...values,
          onSuccess: () => {
            onCancel();
            form.resetFields();
          },
        })
      );
    }
  };

  return (
    <Modal
      footer={null}
      width={710}
      title={!isEmpty(data) ? 'Edit area' : 'Create area'}
      className="sidecreen-modal-3"
      onCancel={onCancel}
      closeIcon={
        <img
          src="/assets/img/icons/modal-close.svg"
          alt=""
          onClick={onCancel}
        />
      }
      {...props}
    >
      <Form
        layout="vertical"
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        className="custom-form-style"
        hideRequiredMark
      >
        {type !== 'update' && (
          <Form.Item
            name="zone"
            label={<h6 className="h6-lg">{`Select area > subarea`}</h6>}
            rules={[{ required: true, message: 'This field is required' }]}
            className="mb-4 pb-3"
          >
            <ZoneSelect />
          </Form.Item>
        )}

        <Form.Item
          name="share_percentage"
          rules={[
            { required: true, message: 'This field is required' },
            {
              type: 'number',
              message: 'This is not a valid number',
            },
          ]}
          label={<h6 className="h6-lg">% of total shares</h6>}
          className="mb-4 pb-3"
        >
          <Input type="number" className="w-100" />
        </Form.Item>

        <Form.Item
          name="amount_share"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Total amount share</h6>}
          className="mb-4 pb-3"
        >
          <InputNumber className="w-100" />
        </Form.Item>

        <Row>
          <Col xs={24} md={12}>
            <Form.Item
              name="expected_start_date"
              rules={[{ required: true, message: 'This field is required' }]}
              label={<h6 className="h6-lg text-black">Date start expected</h6>}
              className="mb-4 pb-3"
            >
              <DatePicker className="w-100" disabled={type === 'update'} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={24} md={12}>
            <Form.Item
              name="global_share"
              rules={[{ required: true, message: 'This field is required' }]}
              label={<h6 className="h6-lg">Global share</h6>}
              className="mb-4 pb-3"
              initialValue="YES"
            >
              <Select>
                <Option value="YES">Yes</Option>
                <Option value="NO">No</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <div className="d-flex justify-content-end mt-5">
          <Button
            type="primary ml-3 px-4"
            size="large"
            htmlType="submit"
            loading={isSubmitting}
          >
            {type === 'update' ? 'Update' : 'Create'}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateArea;
