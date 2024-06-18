/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Form, Input, Modal } from 'antd';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserSelect from '../../../../components/util-components/selector/UserSelect';
import * as Actions from '../../../../redux/actions';

const CreateSkill = ({ onCancel, ...props }) => {
  const { status } = useSelector(({ skill }) => skill.createSkillAction);

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const isSubmitting = useMemo(() => status === 'submitting', [status]);

  const onFinish = ({ ...values }) => {
    const payload = {
      ...values,
    };
    dispatch(
      Actions.createSkill({
        ...payload,
        translate: {
          data: values.skill?.map?.((key) => ({ key })) || [],
        },
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
      title="New Skills"
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

        <h6 className="h6-lg">Skills</h6>
        <Form.List initialValue={['']} name="skill">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, indx) => (
                <div
                  className="d-flex justify-content-between align-items-end"
                  style={{ gap: 24 }}
                >
                  <Form.Item
                    style={{ marginBottom: 22, flexGrow: 1 }}
                    {...field}
                    // label={<h6 className="h6-lg">skills</h6>}
                    className="mb-4"
                    rules={[
                      { required: true, message: 'This field is required' },
                    ]}
                  >
                    <Input placeholder="Type skill name" autoFocus />
                  </Form.Item>

                  {fields?.length > 1 && (
                    <img
                      src="/assets/img/icons/delete-outline.svg"
                      alt=""
                      style={{ height: 23, marginBottom: 28 }}
                      className="cursor-pointer"
                      onClick={() => remove(indx)}
                    />
                  )}
                </div>
              ))}
              <Button
                type="text px-0 mt-n2"
                className="h6-sm hb-text-primary"
                onClick={() => add('')}
              >
                + Add new skill
              </Button>
            </>
          )}
        </Form.List>

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

export default CreateSkill;
