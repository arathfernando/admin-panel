import { Button, Form, Modal } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import UserSelect from '../../../../../components/util-components/selector/UserSelect';

const InviteCoOganiser = ({
  onCancel,
  oganigersData,
  setOrganigersData,
  open,
}) => {
  const users = useSelector((state) => state.users?.users || []);
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldValue(
      'contest_coorganizer',
      oganigersData?.map((user) => user?.id)
    );
  }, [form, oganigersData]);

  return (
    <Modal footer={null} closable={false} width={598} open={open}>
      <Form layout="vertical" form={form} name="control-hooks">
        <center className="px-0 px-md-3">
          <h6 className="fs-20 fw-5 mt-4 mb-3">Invite co-organiser</h6>
          <p className="fs-16 fw-3 text-grey-light">
            Type their e-mail address to send a co-organiser invitation
          </p>
          <Form.Item name="contest_coorganizer">
            <UserSelect
              mode="multiple"
              placeholder=" "
              filterOption={false}
              suffixIcon={
                <img src="/assets/img/icons/mail-grey.svg" alt="mail" />
              }
              className="br-5"
              onChange={(values) =>
                setOrganigersData(
                  users.filter((user) => values.find((id) => id === user.id))
                )
              }
            />
          </Form.Item>

          <div className="d-flex justify-content-center mt-4">
            <Button type="default px-4 border-0 ml2" onClick={() => onCancel()}>
              Cancel
            </Button>
            <Button type="primary px-4" onClick={() => onCancel()}>
              Send invitation
            </Button>
          </div>
        </center>
      </Form>
    </Modal>
  );
};

export default InviteCoOganiser;
