/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Form, Input, Modal, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { isEmpty } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UploadImage from '../../../../components/UploadImage';
import * as Actions from '../../../../redux/actions';

const CreateProductSubCategory = ({ onCancel, data, ...props }) => {
  const { data: productCategories } = useSelector(
    ({ productCategory }) => productCategory.productCategories
  );

  const { status } = useSelector(
    ({ productSubCategory }) =>
      productSubCategory?.createProductSubcategoryAction
  );
  const { status: updateStatus } = useSelector(
    ({ productSubCategory }) =>
      productSubCategory.updateProductSubcategoryAction
  );

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const isSubmitting = useMemo(
    () => status === 'submitting' || updateStatus === 'submitting',
    [status, updateStatus]
  );

  useEffect(() => {
    dispatch(Actions.getProductCategories());
  }, [dispatch]);

  // set data
  useEffect(() => {
    if (!isEmpty(data)) {
      form.setFieldsValue({
        ...data,
        product_category_id: data?.product_category?.id,
      });
    }
  }, [data, form]);

  const onFinish = ({ ...values }) => {
    const payload = {
      ...values,
    };
    if (!isEmpty(data)) {
      dispatch(
        Actions.updateProductSubcategory({
          ...payload,
          translate: {
            data: [{ key: values.name }],
            removeKeys: [{ key: data.name }],
          },
          id: data?.id,
          onSuccess: () => {
            onCancel();
            form.resetFields();
          },
        })
      );
    } else {
      dispatch(
        Actions.createProductSubcategory({
          ...payload,
          translate: {
            data: [{ key: values.name }],
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
        isEmpty(data) ? 'New Product SubCategory' : 'Edit Product SubCategory'
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
          name="product_category_id"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Product category</h6>}
          className="mb-4 pb-3"
        >
          <Select
            placeholder="Type choose product category"
            showSearch
            optionFilterProp="label"
            options={productCategories?.map?.(({ name: label, id: value }) => ({
              value,
              label,
            }))}
          />
        </Form.Item>

        <Form.Item
          name="name"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Name</h6>}
          className="mb-4 pb-3"
        >
          <Input placeholder="Type your name" />
        </Form.Item>

        <Form.Item
          name="description"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Description </h6>}
          className="mb-4 pb-3"
        >
          <TextArea rows={5} placeholder="Type your description" />
        </Form.Item>

        <Form.Item required label={<h6 className="input-label">Icon</h6>}>
          <div className="p-2 border rounded-2">
            <Form.Item
              name="cover"
              rules={[{ required: true, message: 'This field is required' }]}
              style={{ marginBottom: 0 }}
            >
              <UploadImage aspect={1} center>
                <img
                  src="/assets/img/icons/add-image.svg"
                  className="my-auto mx-1 mb-sm-2"
                  alt="icon"
                />
                <h6 className="fs-16 fw-6 mb-1">
                  <u>Add image</u>
                </h6>
              </UploadImage>
            </Form.Item>
          </div>
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

export default CreateProductSubCategory;
