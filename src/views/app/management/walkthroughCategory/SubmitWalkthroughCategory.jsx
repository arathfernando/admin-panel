/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Form, Input, Modal } from 'antd';
import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../../../redux/actions';

const SubmitWalkthroughCategory = ({ onCancel, data, ...props }) => {
  const { status } = useSelector(
    ({ walkthroughCategory }) =>
      walkthroughCategory.submitWalkthroughCategoryAction
  );

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  // set data
  useEffect(() => {
    if (!isEmpty(data)) {
      form.setFieldsValue({
        ...data,
        walkthrough_steps: data?.step || [''],
      });
    }
  }, [data, form]);

  const onFinish = ({ category_name, walkthrough_steps }) => {
    const payload = {};
    //update payload
    if (!isEmpty(data)) {
      payload.update_walkthrough_category = [
        {
          id: data?.id,
          category_name,
          step: walkthrough_steps,
        },
      ];
    } //create payload
    else {
      payload.create_walkthrough_category = [
        {
          category_name,
          step: walkthrough_steps,
        },
      ];
    }
    dispatch(
      Actions.submitWalkthroughCategory({
        ...payload,
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
      title={
        isEmpty(data) ? 'New Walkthrough Category' : 'Edit Walkthrough Category'
      }
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
          name="category_name"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Category name</h6>}
          style={{
            marginBottom: 32,
          }}
        >
          <Input placeholder="Type category name" />
        </Form.Item>

        <h6 className="h6-lg required-mark">Walkthrough steps</h6>
        <Form.List initialValue={['']} name="walkthrough_steps">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, indx) => (
                <div
                  className="d-flex justify-content-between align-items-center"
                  style={{ gap: 24 }}
                >
                  <Form.Item
                    style={{ marginBottom: 28, flexGrow: 1 }}
                    {...field}
                    rules={[
                      { required: true, message: 'This field is required' },
                    ]}
                  >
                    <Input
                      placeholder="Type new walkthrough step"
                      autoFocus
                      onPressEnter={() => add('', indx + 1)}
                    />
                  </Form.Item>

                  {fields?.length > 1 && (
                    <img
                      src="/assets/img/icons/delete-outline.svg"
                      alt=""
                      style={{ height: 22, marginBottom: 34 }}
                      className="cursor-pointer"
                      onClick={() => remove(indx)}
                    />
                  )}
                </div>
              ))}
              <Button
                type="text px-1 mt-n3 mb-4"
                className="h6-sm hb-text-primary"
                onClick={() => add('')}
              >
                + Add new walkthrough step
              </Button>
            </>
          )}
        </Form.List>

        <div className="d-flex justify-content-end">
          <Button
            type="primary ml-3 px-4"
            size="large"
            htmlType="submit"
            loading={status === 'submitting'}
          >
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default SubmitWalkthroughCategory;
