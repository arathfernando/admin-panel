/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Col, DatePicker, Form, Input, Modal, Row } from 'antd';
import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useEffect, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import CommunitySelect from '../../../../components/util-components/selector/CommunitySelect';
import UserSelect from '../../../../components/util-components/selector/UserSelect';
import {
  createInvestorZone,
  updateInvestorZone,
} from '../../../../redux/actions';

const CreateZone = ({ onCancel, type, data, ...props }) => {
  const { status } = useSelector(({ investorZone }) => investorZone.zoneAction);
  const { status: updateStatus } = useSelector(
    ({ investorZone }) => investorZone.updateInvestorZoneAction
  );

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const isSubmitting = useMemo(
    () => status === 'submitting' || updateStatus === 'submitting',
    [status, updateStatus]
  );

  // set data to view
  useEffect(() => {
    if (!isEmpty(data)) {
      form.setFieldsValue({
        ...data,
        created_at_date: data.created_at_date && moment(data.created_at_date),
        created_by: data.created_by?.id,
        date_created: data.date_created && moment(data.date_created),
      });
    }
  }, [data, form]);

  const onFinish = ({ date_created, created_by, ...values }) => {
    if (type === 'update') {
      dispatch(
        updateInvestorZone({
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
        createInvestorZone({
          date_created,
          created_by,
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
      title={
        type === 'view'
          ? 'View zone'
          : !isEmpty(data)
          ? 'Edit zone'
          : 'Create a new zone'
      }
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
        hideRequiredMark
        className="custom-form-style"
      >
        <Form.Item
          name="community_id"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Community</h6>}
          className="mb-4 pb-3"
        >
          <CommunitySelect disabled={type === 'view'} />
        </Form.Item>

        <Form.Item
          name="area_name"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Area name</h6>}
          className="mb-4 pb-3"
        >
          <Input disabled={type === 'view'} />
        </Form.Item>

        <Form.Item
          name="subarea_name"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Subarea name</h6>}
          className="mb-4 pb-3"
        >
          <Input disabled={type === 'view'} />
        </Form.Item>

        <Form.Item
          name="created_by"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Created by</h6>}
          className="mb-4 pb-3"
        >
          <UserSelect
            placeholder="Type your name"
            // disabled={type === 'view' || type === 'update'}
          />
        </Form.Item>

        <Row>
          <Col xs={24} md={12}>
            <Form.Item
              name="created_at_date"
              label={<h6 className="h6-lg text-black">Created date</h6>}
              className="mb-4 pb-3"
            >
              <DatePicker
                className="w-100"
                disabled={type === 'view' || type === 'update'}
              />
            </Form.Item>
          </Col>
        </Row>

        {type !== 'view' && (
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
        )}
      </Form>
    </Modal>
  );
};

export default CreateZone;
