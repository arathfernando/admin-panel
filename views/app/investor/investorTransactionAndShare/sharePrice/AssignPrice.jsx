/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Col, DatePicker, Form, InputNumber, Modal, Row } from 'antd';
import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useEffect, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import ZoneSelect from '../../../../../components/util-components/selector/ZoneSelect';
import {
  investorAssignPrice,
  updateInvestorSharePrice,
} from '../../../../../redux/investor/investorTransaction/actions';

const AssignPrices = ({ onCancel, type, data, ...props }) => {
  const { status } = useSelector(
    ({ investorTransaction }) => investorTransaction.investorAssignPriceAction
  );
  const { status: updateStatus } = useSelector(
    ({ investorTransaction }) =>
      investorTransaction.updateInvestorSharePriceAction
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
      const { from_which_date, zone, ...formData } = data;
      form.setFieldsValue({
        ...formData,
        from_which_date: from_which_date && moment(from_which_date),
        zone: zone?.id,
      });
    }
  }, [data, form]);

  const onFinish = ({ global_share, ...values }) => {
    if (type === 'update') {
      dispatch(
        updateInvestorSharePrice({
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
        investorAssignPrice({
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
      title={!isEmpty(data) ? 'Edit price' : 'Assign price'}
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
        <Form.Item
          name="zone"
          label={<h6 className="h6-lg">{`Select area > subarea`}</h6>}
          rules={[{ required: true, message: 'This field is required' }]}
          className="mb-4 pb-3"
        >
          <ZoneSelect disabled={type === 'update'} />
        </Form.Item>

        <Form.Item
          name="price_share"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Price share</h6>}
          className="mb-4 pb-3"
        >
          <InputNumber className="w-100" min={0} />
        </Form.Item>

        <Row>
          <Col xs={24} md={12}>
            <Form.Item
              name="from_which_date"
              rules={[{ required: true, message: 'This field is required' }]}
              label={<h6 className="h6-lg text-black">From which date</h6>}
              className="mb-4 pb-3"
            >
              <DatePicker className="w-100" disabled={type === 'update'} />
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

export default AssignPrices;
