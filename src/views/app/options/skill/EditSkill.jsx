/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Form, Input, Modal } from 'antd';
import { isEmpty } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserSelect from '../../../../components/util-components/selector/UserSelect';
import * as Actions from '../../../../redux/actions';

const EditSkill = ({ onCancel, data, ...props }) => {
  const { status: updateStatus } = useSelector(
    ({ skill }) => skill.updateSkillAction
  );

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const isSubmitting = useMemo(
    () => updateStatus === 'submitting',
    [updateStatus]
  );

  // set data
  useEffect(() => {
    if (!isEmpty(data)) {
      form.setFieldsValue({
        ...data,
        created_by: data?.created_by?.id,
      });
    }
  }, [data, form]);

  const onFinish = ({ ...values }) => {
    const payload = {
      ...values,
    };
    dispatch(
      Actions.updateSkill({
        ...payload,
        translate: {
          data: [{ key: values.skill }],
          removeKeys: [{ key: data.skill }],
        },
        id: data?.id,
        onSuccess: () => {
          onCancel();
          form.resetFields();
        },
      })
    );
  };

  return (
    <Modal
      footer={null}
      width={710}
      title="Edit Skill"
      className="sidecreen-modal-3 custom_styles"
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
      >
        <Form.Item
          name="created_by"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Created by</h6>}
          className="mb-4 pb-3"
        >
          <UserSelect />
        </Form.Item>

        <Form.Item
          name="skill"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">skill</h6>}
          className="mb-4 pb-3"
        >
          <Input placeholder="Type skill" />
        </Form.Item>
        <div className="d-flex justify-content-end mt-5">
          <Button
            type="primary ml-3 px-4"
            size="large"
            htmlType="submit"
            loading={isSubmitting}
          >
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default EditSkill;
