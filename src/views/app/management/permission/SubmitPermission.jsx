/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Checkbox, Divider, Form, Input, Modal } from 'antd';
import { isEmpty } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import permissions from '../../../../constants/permissions';
import * as Actions from '../../../../redux/actions';

const PermissionParent = ({ children, ParentEl, defaultExpand = false }) => {
  const [expand, setExpand] = useState(defaultExpand);

  return (
    <div className="w-100 mt-3">
      <div
        className="d-flex justify-content-between cursor-pointer w-100"
        style={{ gap: 10, marginBottom: 8 }}
      >
        <ParentEl />
        <div
          className="flex-grow-1 d-flex justify-content-end"
          onClick={() => setExpand((state) => !state)}
        >
          <img
            src="/assets/img/icons/arrow-down-black.svg"
            alt=""
            style={{ height: 14, transform: expand || 'rotate(180deg)' }}
          />
        </div>
      </div>
      <div
        className="overflow-hidden ml-4"
        style={{
          height: expand ? '100%' : 0,
        }}
      >
        {children}
      </div>

      {expand && <Divider className="my-2" />}
    </div>
  );
};

const PermissionEl = ({
  label,
  permisions: children,
  form,
  restField,
  name,
  fieldName,
  handleUpdateParentProp,
  defaultExpand,
  data,
}) => {
  const handleUpdateParent = () => {
    const values = form.getFieldValue('permission')[0] || {};

    const isAllSelected = children.every(({ fieldName }) => values[fieldName]);

    // some of the child selected
    let isSomeSelected = false;
    if (!isAllSelected) {
      isSomeSelected = children.some(({ fieldName }) => values[fieldName]);
    }

    // some of the child's child selected
    let isSomeOfSomeSelected = false;
    if (!isSomeSelected) {
      isSomeOfSomeSelected = children.some(
        ({ fieldName }) => values[`${fieldName}_SOME`]
      );
    }

    form.setFieldValue('permission', [
      {
        ...values,
        // reset parent field value
        [fieldName]: isAllSelected,
        [`${fieldName}_SOME`]:
          !isAllSelected && (isSomeSelected || isSomeOfSomeSelected),
      },
    ]);

    // update parent's parent
    handleUpdateParentProp?.();
  };

  return (
    <PermissionParent
      defaultExpand={defaultExpand}
      ParentEl={() => (
        <Form.Item
          {...restField}
          key={label}
          name={[name, fieldName]}
          noStyle
          valuePropName="checked"
        >
          <Checkbox
            indeterminate={
              form.getFieldValue('permission')[0]?.[`${fieldName}_SOME`]
            }
            onChange={(e) => {
              const resetKeyValues = {};
              const setResetFieldsValues = (children) => {
                if (children?.[0]) {
                  children.forEach(({ fieldName, children: children2 }) => {
                    if (fieldName && !children2) {
                      resetKeyValues[fieldName] = e.target.checked;
                    } else if (children) {
                      if (fieldName) {
                        resetKeyValues[fieldName] = e.target.checked;
                        resetKeyValues[`${fieldName}_SOME`] = false;
                      }
                      setResetFieldsValues(children2);
                    }
                  });
                }
              };
              setResetFieldsValues(children);
              form.setFieldValue('permission', [
                {
                  ...form.getFieldValue('permission')[0],
                  ...resetKeyValues,
                  [`${fieldName}_SOME`]: false,
                },
              ]);

              handleUpdateParentProp?.();
            }}
          >
            {label}
          </Checkbox>
        </Form.Item>
      )}
    >
      {children.map(({ label, fieldName, children }) =>
        children ? (
          <PermissionEl
            permisions={children}
            form={form}
            name={name}
            restField={restField}
            label={label}
            key={label}
            fieldName={fieldName}
            handleUpdateParentProp={handleUpdateParent}
            data={data}
          />
        ) : (
          <Form.Item
            {...restField}
            key={fieldName}
            name={[name, fieldName]}
            style={{ marginBottom: 0 }}
            valuePropName="checked"
          >
            <Checkbox onChange={handleUpdateParent}>{label}</Checkbox>
          </Form.Item>
        )
      )}
    </PermissionParent>
  );
};

const SubmitPermission = ({ onCancel, data, ...props }) => {
  const { status } = useSelector(
    ({ permission }) => permission.createPermissionAction
  );
  const { status: updateStatus } = useSelector(
    ({ permission }) => permission.updatePermissionAction
  );

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const isSubmitting = useMemo(
    () => status === 'submitting' || updateStatus === 'submitting',
    [status, updateStatus]
  );

  // set data
  useEffect(() => {
    if (data?.id) {
      form.setFieldsValue({
        ...data,
        permission: [JSON.parse(data.permission)],
      });
    } else {
      form.resetFields();
    }
  }, [data, form]);

  const onFinish = ({ permission, ...values }) => {
    const payload = {
      ...values,
      permission: JSON.stringify(permission[0]),
    };
    if (!isEmpty(data)) {
      dispatch(
        Actions.updatePermission({
          ...payload,
          id: data?.id,
          onSuccess: () => {
            onCancel();
            form.resetFields();
            dispatch(Actions.getCurrentAdmin());
          },
        })
      );
    } else {
      dispatch(
        Actions.createPermission({
          ...payload,
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
      title={isEmpty(data) ? 'New Permission' : 'Edit Permission'}
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
          name="role_name"
          rules={[{ required: true, message: 'This field is required' }]}
          label={<h6 className="h6-lg">Role</h6>}
          style={{
            marginBottom: 32,
          }}
        >
          <Input placeholder="Type your role" />
        </Form.Item>

        <h6 className="h6-lg required-mark">Permissions</h6>
        <Form.List
          name="permission"
          rules={[{ required: true, message: 'This field is required' }]}
          initialValue={[{}]}
        >
          {(fields) => (
            <div>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key}>
                  {permissions.map(({ label, fieldName, children }) => (
                    <PermissionEl
                      defaultExpand
                      permisions={children}
                      form={form}
                      name={name}
                      restField={restField}
                      label={label}
                      key={label}
                      fieldName={fieldName}
                      data={data}
                    />
                  ))}
                </div>
              ))}
            </div>
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

export default SubmitPermission;
