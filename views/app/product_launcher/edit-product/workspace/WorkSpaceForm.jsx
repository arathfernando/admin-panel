/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import {
  Avatar,
  Button,
  Divider,
  Form,
  Input,
  Modal,
  Select,
  Space,
} from 'antd';
import { useWatch } from 'antd/lib/form/Form';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useTranslation from '../../../../../helpers/useTranslation';
import {
  getProductLaunchers,
  getProductMembers,
} from '../../../../../redux/actions';

const WorkSpaceForm = ({ open, onStart, form, onClose, workSpaceForm }) => {
  const { data: productLaunchers, loading: userProductsLoading } = useSelector(
    ({ product }) => product.productLaunchers
  );
  const { data: productMembers, loading: productMembersLoading } = useSelector(
    ({ product }) => product.productMembers
  );

  const { data: workspaces } = useSelector(
    ({ workspaceCategory }) => workspaceCategory.workspaceCategories
  );

  const workspace_type = useWatch('workspace_type', form);

  const [selectedWorkspaceType, setSelectedWorkspaceType] = useState(null);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { productId } = useParams();

  useEffect(() => {
    setSelectedWorkspaceType(
      workspaces?.find?.(({ id }) => id === workspace_type)
    );
  }, [workspaces, workspace_type]);

  useEffect(() => {
    productId && dispatch(getProductMembers(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    dispatch(getProductLaunchers());
  }, [dispatch]);

  const onFinish = () => {
    onStart();
  };

  return (
    <Modal
      footer={null}
      open={open}
      closable={false}
      width={646}
      zIndex={1001}
      className="custom_styles"
    >
      <div className="px-2 py-3 product-launcher-container bg-white">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="h5 h5-lg text-black">{selectedWorkspaceType?.name}</h6>
          <img
            src="/assets/img/icons/close-icon.svg"
            alt=""
            onClick={onClose}
            className="cursor-pointer"
          />
        </div>
        <Divider
          className="my-0"
          style={{ borderBottom: '1px solid #C4C4C4' }}
        />

        <Form
          layout="vertical"
          form={workSpaceForm}
          name="control-hooks"
          className="custom-form-style mt-4 pt-3"
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            label={
              <h6 className="h6-lg text-black mb-0">
                {selectedWorkspaceType?.title || 'workspace'} name
              </h6>
            }
            className="mb-4 pb-2"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="project_id"
            label={
              <h6 className="h6-lg text-black mb-0">
                Link your {selectedWorkspaceType?.title || 'workspace'} to a
                project
              </h6>
            }
            className="mb-4 pb-2"
            initialValue={Number(productId)}
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Select
              // disabled
              placeholder="e.g. Project 1"
              className="mt-2"
              showSearch
              optionFilterProp="label"
              loading={userProductsLoading}
              options={productLaunchers?.map?.(
                ({ id: value, project_name: label }) => ({
                  value,
                  label,
                })
              )}
            />
          </Form.Item>

          <Form.Item
            name="workspace_member"
            label={
              <h6 className="h6-lg text-black mb-0 pb-2">
                {t('Add teammates')}
              </h6>
            }
            className="mb-4 pb-2"
          >
            <Select
              placeholder="e.g. Project 1"
              mode="multiple"
              optionFilterProp="label"
              options={productMembers?.map?.((user) => ({
                value: user.user_id?.email,
                label: (
                  <Space>
                    <div className="position-relative">
                      <Avatar
                        size="small"
                        src={user.user_id?.general_profile?.avatar}
                      />
                    </div>
                    <span>
                      {` ${user.user_id?.general_profile?.first_name}`}{' '}
                      {user.user_id?.general_profile?.last_name}
                    </span>
                  </Space>
                ),
              }))}
              loading={productMembersLoading}
            />
          </Form.Item>

          <Divider
            className="mt-0"
            style={{ borderBottom: '1px solid #C4C4C4' }}
          />

          {/* <Avatar
            size={51}
            src={defaultAvatar}
            style={{ border: "2px solid #8BC53F" }}
          />
          <Avatar
            size={51}
            src={defaultAvatar}
            style={{ border: "2px solid #8BC53F" }}
            className="mx-n2 bg-white"
          />
          <Avatar
            size={51}
            src={defaultAvatar}
            style={{ border: "2px solid #8BC53F" }}
            className="bg-white"
          /> */}

          <div className="d-flex w-100 justify-content-end mt-2">
            <Button
              style={{ height: 40 }}
              type="primary btn-text-md px-5 mt-3"
              size="large"
              onClick={() => workSpaceForm.submit()}
            >
              {t('Start')}
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default WorkSpaceForm;
