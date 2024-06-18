/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  InputNumber,
  Modal,
  Row,
} from 'antd';
import { useWatch } from 'antd/lib/form/Form';
import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import UserSelect from '../../../../components/util-components/selector/UserSelect';
import ZoneSelect from '../../../../components/util-components/selector/ZoneSelect';
import {
  investorAssignShares,
  updateInvestorAssignShare,
} from '../../../../redux/investor/investorTransaction/actions';

const AssignShares = ({ onCancel, type, data, ...props }) => {
  const { status } = useSelector(
    ({ investorTransaction }) => investorTransaction.investorTransactionAction
  );
  const { status: updateStatus } = useSelector(
    ({ investorTransaction }) =>
      investorTransaction.updateInvestorAssignShareAction
  );
  const [form] = Form.useForm();
  const global_share = useWatch('global_share', form);
  const dispatch = useDispatch();
  const { userId } = useParams();

  const isSubmitting = useMemo(
    () => status === 'submitting' || updateStatus === 'submitting',
    [status, updateStatus]
  );

  // set form data initially when updating
  useEffect(() => {
    if (!isEmpty(data)) {
      const { start_date, zone, user, price_share, global_share, ...formData } =
        data;
      form.setFieldsValue({
        ...formData,
        start_date: start_date && moment(start_date),
        zone: zone?.id,
        user: user?.id || user,
        global_share: global_share === 'YES',
      });
    }
  }, [data, form]);

  const onFinish = ({ global_share, ...values }) => {
    if (type === 'update') {
      dispatch(
        updateInvestorAssignShare({
          ...values,
          global_share: global_share ? 'YES' : 'NO',
          id: data.id,
          userId,
          onSuccess: () => {
            onCancel();
            form.resetFields();
          },
        })
      );
    } else {
      dispatch(
        investorAssignShares({
          ...values,
          global_share: global_share ? 'YES' : 'NO',
          userId,
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
      title={!isEmpty(data) ? 'Edit shares' : 'Assign shares'}
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
          name="user"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Select username</h6>}
          className="mb-4 pb-3"
        >
          <UserSelect />
        </Form.Item>

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
          name="share_qty"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Choose number of shares</h6>}
          className="mb-4 pb-3"
        >
          <InputNumber className="w-100" />
        </Form.Item>

        <Row>
          <Col xs={24} md={12}>
            <Form.Item
              name="start_date"
              rules={[{ required: true, message: 'This field is required' }]}
              label={
                <h6 className="h6-lg text-black">Date of share initiation</h6>
              }
              className="mb-4 pb-3"
            >
              <DatePicker className="w-100" />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col xs={24} md={12}>
            <Form.Item
              name="share_value"
              label={<h6 className="h6-lg">Share value (optional)</h6>}
              className="mb-4 pb-3"
            >
              <InputNumber className="w-100" min={0.001} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="global_share" className="mb-4 pb-3">
          <Checkbox
            checked={global_share}
            onChange={({ target }) =>
              form.setFieldValue('global_share', target.checked)
            }
          >
            <h6 className="h6-lg mb-0">Global shares visible</h6>
          </Checkbox>
        </Form.Item>

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

export default AssignShares;
