/* eslint-disable camelcase */
/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Form, Input, InputNumber, Modal, Select } from 'antd';
import { isEmpty } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../../../redux/actions';

const CreateProductSubCategoryFAQ = ({ onCancel, data, ...props }) => {
  const { status } = useSelector(
    ({ productSubCategoryFAQ }) =>
      productSubCategoryFAQ.createProductSubcategoryFaqAction
  );
  const { status: updateStatus } = useSelector(
    ({ productSubCategoryFAQ }) =>
      productSubCategoryFAQ.updateProductSubcategoryFaqAction
  );
  const { data: productSubCategories, loading } = useSelector(
    ({ productSubCategory }) => productSubCategory.productSubCategories
  );

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Actions.getProductSubCategories());
  }, [dispatch]);

  const isSubmitting = useMemo(
    () => status === 'submitting' || updateStatus === 'submitting',
    [status, updateStatus]
  );

  // set data
  useEffect(() => {
    if (!isEmpty(data)) {
      form.setFieldsValue({
        ...data,
        product_subcategory_id: data?.product_subcategory?.id,
      });
    }
  }, [data, form]);

  const onFinish = ({ ...values }) => {
    const payload = {
      ...values,
    };
    if (!isEmpty(data)) {
      dispatch(
        Actions.updateProductSubcategoryFaq({
          ...payload,
          id: data?.id,
          translate: {
            data: [
              { key: values.question },
              ...(payload?.answer?.map((key) => ({ key })) || []),
            ],
            removeKeys: [
              { key: data.question },
              ...(data?.answer?.map((key) => ({ key })) || []),
            ],
          },
          onSuccess: () => {
            onCancel();
            form.resetFields();
          },
        })
      );
    } else {
      dispatch(
        Actions.createProductSubcategoryFaq({
          ...payload,
          translate: {
            data: [
              { key: values.question },
              ...(payload?.answer?.map((key) => ({ key })) || []),
            ],
          },
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
          ? 'New Product SubCategory FAQ'
          : 'Edit Product SubCategory FAQ'
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
        hideRequiredMark
        className="custom-form-style"
      >
        <Form.Item
          name="product_subcategory_id"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Product subcategory</h6>}
          className="mb-4 pb-3"
        >
          <Select
            placeholder="Type choose product category"
            showSearch
            optionFilterProp="label"
            loading={loading}
            options={productSubCategories?.map?.(
              ({ name, product_category, id: value }) => ({
                value,
                label: `${product_category?.name || ''} >> ${name || ''}`,
              })
            )}
          />
        </Form.Item>

        <div className="d-flex">
          <Form.Item
            name="question"
            rules={[{ required: true, message: 'This field is required' }]}
            label={<h6 className="h6-lg">Question</h6>}
            className="mb-4 pb-3 flex-grow-1"
          >
            <Input placeholder="Type your question" />
          </Form.Item>
          <Form.Item
            name="percentage"
            rules={[{ required: true, message: 'This field is required' }]}
            label={<h6 className="h6-lg">Percentage</h6>}
            className="mb-4 pb-3"
            initialValue={10}
          >
            <InputNumber
              placeholder="%"
              style={{
                height: 36,
              }}
              min={1}
              max={100}
              prefix="%"
            />
          </Form.Item>
        </div>
        <Form.List initialValue={['']} name="answer">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, indx) => (
                <div
                  className="d-flex justify-content-between align-items-end"
                  style={{ gap: 24 }}
                >
                  <Form.Item
                    style={{ flexGrow: 1 }}
                    rules={[
                      { required: true, message: 'This field is required' },
                    ]}
                    label={<h6 className="h6-lg">Answer</h6>}
                    className="mb-4 pb-3"
                    {...field}
                  >
                    <Input placeholder="Type an answer" />
                  </Form.Item>

                  {fields?.length > 1 && (
                    <img
                      src="/assets/img/icons/delete-outline.svg"
                      alt=""
                      style={{ height: 23, marginBottom: 48 }}
                      className="cursor-pointer"
                      onClick={() => remove(indx)}
                    />
                  )}
                </div>
              ))}
              <Button
                type="text px-0"
                className="h6-sm hb-text-primary"
                style={{ marginBottom: 31 }}
                onClick={() => add('')}
              >
                + Add new answer
              </Button>
            </>
          )}
        </Form.List>

        <Form.Item
          name="default_answer"
          label={<h6 className="h6-lg">Default answer </h6>}
          className="mb-4 pb-3"
        >
          <Input placeholder="Type your default answer " />
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

export default CreateProductSubCategoryFAQ;
