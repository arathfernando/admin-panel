/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Divider, Form, Input, InputNumber, Modal, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { isEmpty } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../../../redux/actions';

const SubmitContestCategoryCriteria = ({ onCancel, data, ...props }) => {
  const { status } = useSelector(
    ({ contestCategoryCriteria }) =>
      contestCategoryCriteria.createContestCategoryCriteriaAction
  );
  const { status: updateStatus } = useSelector(
    ({ contestCategoryCriteria }) =>
      contestCategoryCriteria.updateContestCategoryCriteriaAction
  );
  const { list, loading } = useSelector(
    (state) => state.contestCategory,
    shallowEqual
  );

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const isSubmitting = useMemo(
    () => status === 'submitting' || updateStatus === 'submitting',
    [status, updateStatus]
  );

  // set data
  useEffect(() => {
    if (!isEmpty(data)) {
      form.setFieldsValue({
        ...data,
        contest_category_id: data?.contest_category?.id,
        contest_default_criteria: [data],
      });
    }
  }, [data, form]);

  useEffect(() => {
    dispatch(Actions.getAllContestCategory());
  }, []);

  const onFinish = ({ contest_default_criteria, contest_category_id }) => {
    if (!isEmpty(data)) {
      dispatch(
        Actions.updateContestCategoryCriteria({
          update_default_criteria:
            contest_default_criteria?.map?.((data) => ({
              ...data,
              contest_category_id,
            })) || [],
          onSuccess: () => {
            onCancel();
            form.resetFields();
          },
        })
      );
    } else {
      dispatch(
        Actions.createContestCategoryCriteria({
          create_default_criteria:
            contest_default_criteria.map((data) => ({
              ...data,
              contest_category_id,
            })) || [],
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
        isEmpty(data)
          ? 'New Contest Category Criteria'
          : 'Edit Contest Category Criteria'
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
          name="contest_category_id"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Contest category</h6>}
          style={{
            marginBottom: 32,
          }}
        >
          <Select
            loading={loading}
            optionFilterProp="label"
            showSearch
            options={list?.map?.(({ title: label, id: value }) => ({
              value,
              label,
            }))}
            placeholder="Select contest category"
            disabled={!isEmpty(data)}
          />
        </Form.Item>

        <Divider />

        <Form.List initialValue={[{}]} name="contest_default_criteria">
          {(fields, { add, remove }) => (
            <div>
              {fields?.map?.(({ key, name, ...restField }, indx) => (
                <div key={key}>
                  <div
                    className="d-flex align-items-center"
                    style={{ gap: 20 }}
                  >
                    <div className="flex-grow-1">
                      <Form.Item
                        {...restField}
                        name={[name, 'title']}
                        rules={[
                          { required: true, message: 'This field is required' },
                        ]}
                        label={<h6 className="h6-lg">Title</h6>}
                        style={{
                          marginBottom: 32,
                        }}
                      >
                        <Input placeholder="Type title" />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, 'description']}
                        rules={[
                          { required: true, message: 'This field is required' },
                        ]}
                        label={<h6 className="h6-lg">Description</h6>}
                        style={{
                          marginBottom: 32,
                        }}
                      >
                        <TextArea rows={5} placeholder="Type description" />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, 'weightage']}
                        rules={[
                          { required: true, message: 'This field is required' },
                        ]}
                        label={<h6 className="h6-lg">Weightage</h6>}
                        style={{
                          marginBottom: 32,
                        }}
                      >
                        <InputNumber
                          className="w-100"
                          placeholder="Type weightage"
                        />
                      </Form.Item>
                    </div>

                    {fields?.length > 1 && !isEmpty(data) && (
                      <img
                        src="/assets/img/icons/delete-outline.svg"
                        alt=""
                        style={{ height: 23, marginBottom: 28 }}
                        className="cursor-pointer"
                        onClick={() => remove(indx)}
                      />
                    )}
                  </div>
                  <Divider
                    style={{ borderTop: '1px solid #E3E3E3' }}
                    className="mb-4 mt-0"
                  />
                </div>
              ))}

              <Button
                type="text mt-n2"
                onClick={() => add({})}
                className="btn-txt-light hb-text-primary mb-0 px-1 d-flex align-items-center cursor-pointer"
              >
                + Add new criteria
              </Button>
            </div>
          )}
        </Form.List>

        <div className="d-flex justify-content-end">
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

export default SubmitContestCategoryCriteria;
